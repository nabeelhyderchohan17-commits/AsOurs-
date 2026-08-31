import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory leads storage for live CRM preview
interface Lead {
  id: string;
  contractorTrade: string;
  homeownerName: string;
  phone: string;
  email: string;
  zipCode: string;
  projectScope: string;
  tier: string;
  estimatedBudget: {
    low: number;
    high: number;
    formatted: string;
  };
  status: 'New Quote' | 'Called (<1m)' | 'Site Visit' | 'Signed';
  submittedAt: string;
}

const leadsDatabase: Lead[] = [
  {
    id: 'lead-101',
    contractorTrade: 'Roofing',
    homeownerName: 'Marcus Vance',
    phone: '(512) 890-3412',
    email: 'm.vance@gmail.com',
    zipCode: '78701',
    projectScope: 'Architectural Shingle Replacement (2,400 sq ft)',
    tier: 'Premium',
    estimatedBudget: { low: 11500, high: 14200, formatted: '$11,500 - $14,200' },
    status: 'Called (<1m)',
    submittedAt: new Date(Date.now() - 1000 * 60 * 4).toISOString(),
  },
  {
    id: 'lead-102',
    contractorTrade: 'Kitchen Remodel',
    homeownerName: 'Sarah Jenkins',
    phone: '(407) 554-9201',
    email: 'sjenkins.design@yahoo.com',
    zipCode: '32801',
    projectScope: 'Full Kitchen Overhaul & Quartz Countertops',
    tier: 'Luxury',
    estimatedBudget: { low: 28000, high: 36500, formatted: '$28,000 - $36,500' },
    status: 'New Quote',
    submittedAt: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
  },
  {
    id: 'lead-103',
    contractorTrade: 'HVAC',
    homeownerName: 'David Miller',
    phone: '(602) 412-8876',
    email: 'dmiller.az@outlook.com',
    zipCode: '85001',
    projectScope: '5-Ton Heat Pump Replacement & Duct Work',
    tier: 'Standard',
    estimatedBudget: { low: 8200, high: 10400, formatted: '$8,200 - $10,400' },
    status: 'Site Visit',
    submittedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
  },
  {
    id: 'lead-104',
    contractorTrade: 'Bathroom Remodel',
    homeownerName: 'Elena Rostova',
    phone: '(305) 771-4099',
    email: 'elena.rostova@gmail.com',
    zipCode: '33101',
    projectScope: 'Master Bath Walk-in Tile Shower & Double Vanity',
    tier: 'Premium',
    estimatedBudget: { low: 16500, high: 21000, formatted: '$16,500 - $21,000' },
    status: 'Signed',
    submittedAt: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
  }
];

// Initialize Gemini client lazily
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({ apiKey });
}

const NOTIFICATION_EMAIL = 'nabeelhyderchohan767@gmail.com';

// Server-side email notification dispatcher
async function dispatchEmailToNabeel(formType: string, subject: string, details: Record<string, any>) {
  try {
    const payload = {
      _subject: subject,
      _template: 'table',
      _captcha: 'false',
      'Form Source': 'AsOurs Agency Web App',
      'Submission Type': formType,
      'Delivered To': NOTIFICATION_EMAIL,
      ...details,
      'Timestamp (UTC)': new Date().toISOString(),
      'Timestamp (Local)': new Date().toLocaleString(),
    };

    const response = await fetch(`https://formsubmit.co/ajax/${NOTIFICATION_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      console.log(`[Email Sent to ${NOTIFICATION_EMAIL}]: ${subject}`);
    } else {
      console.warn(`[Email Delivery Notice]:`, await response.text());
    }
  } catch (err) {
    console.error(`[Email Dispatch Exception]:`, err);
  }
}

// API Health
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', notificationEmail: NOTIFICATION_EMAIL, timestamp: new Date().toISOString() });
});

// API: Get Live CRM Leads
app.get('/api/leads', (req, res) => {
  res.json({ success: true, leads: leadsDatabase });
});

// API: Instant Quote Calculation & Optional AI Insight
app.post('/api/quote/calculate', async (req, res) => {
  try {
    const { trade, scopeValue, tier, zipCode, options } = req.body;

    // Base price algorithms for US contractor standards
    let baseRate = 100;
    let multiplier = 1.0;

    switch (tier) {
      case 'Premium':
        multiplier = 1.35;
        break;
      case 'Luxury':
        multiplier = 1.75;
        break;
      default:
        multiplier = 1.0;
    }

    // Trade calculation
    let calculatedLow = 0;
    let calculatedHigh = 0;

    const numericScope = Number(scopeValue) || 1000;

    switch (trade?.toLowerCase()) {
      case 'roofing':
        // Roofing usually $4.50 - $7.50 per sq ft
        calculatedLow = Math.round(numericScope * 4.5 * multiplier);
        calculatedHigh = Math.round(numericScope * 7.2 * multiplier);
        break;
      case 'kitchen_remodel':
      case 'kitchen':
        // Kitchen remodel per sq ft or fixed size tier ($18k - $45k)
        calculatedLow = Math.round((numericScope * 120 + 8000) * multiplier);
        calculatedHigh = Math.round((numericScope * 180 + 15000) * multiplier);
        break;
      case 'bathroom_remodel':
      case 'bathroom':
        calculatedLow = Math.round((numericScope * 110 + 5000) * multiplier);
        calculatedHigh = Math.round((numericScope * 160 + 9000) * multiplier);
        break;
      case 'hvac':
        // HVAC by tonnage (numericScope e.g. 3 ton, 4 ton, 5 ton or sq ft)
        const tons = numericScope > 10 ? Math.ceil(numericScope / 600) : numericScope;
        calculatedLow = Math.round((tons * 1800 + 3200) * multiplier);
        calculatedHigh = Math.round((tons * 2400 + 4500) * multiplier);
        break;
      case 'plumbing':
        calculatedLow = Math.round((numericScope * 15 + 1200) * multiplier);
        calculatedHigh = Math.round((numericScope * 28 + 2500) * multiplier);
        break;
      case 'solar':
        // Solar by system kW
        const kw = numericScope > 100 ? numericScope / 200 : numericScope;
        calculatedLow = Math.round((kw * 2200 + 4000) * multiplier);
        calculatedHigh = Math.round((kw * 2900 + 7000) * multiplier);
        break;
      case 'landscaping':
      case 'concrete':
        calculatedLow = Math.round(numericScope * 8.5 * multiplier);
        calculatedHigh = Math.round(numericScope * 14.0 * multiplier);
        break;
      default:
        calculatedLow = Math.round(numericScope * 6.0 * multiplier);
        calculatedHigh = Math.round(numericScope * 9.5 * multiplier);
    }

    // Format
    const formatted = `$${calculatedLow.toLocaleString()} - $${calculatedHigh.toLocaleString()}`;

    // Optional Gemini AI Breakdown Notes
    let aiNote = "Includes standard regional material estimates, certified labor warranty, and site inspection allowance.";
    const gemini = getGeminiClient();
    if (gemini) {
      try {
        const prompt = `You are an expert US Construction Estimator for a contractor agency. Write 2 concise sentences explaining what is included in an instant quote for a ${trade} project in zip code ${zipCode} valued around ${formatted}. Highlight material quality, certified installation, and key line items. Keep it encouraging and professional.`;
        const response = await gemini.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
        });
        if (response.text) {
          aiNote = response.text.trim();
        }
      } catch (err) {
        console.warn('Gemini AI quote summary fallback used:', err);
      }
    }

    res.json({
      success: true,
      trade,
      low: calculatedLow,
      high: calculatedHigh,
      formatted,
      aiNote,
      itemizedBreakdown: [
        { label: 'Materials & Supplies', percent: 45, amount: Math.round(calculatedLow * 0.45) },
        { label: 'Certified US Labor', percent: 35, amount: Math.round(calculatedLow * 0.35) },
        { label: 'Permitting & Site Prep', percent: 12, amount: Math.round(calculatedLow * 0.12) },
        { label: 'Workmanship Guarantee', percent: 8, amount: Math.round(calculatedLow * 0.08) },
      ]
    });
  } catch (error) {
    console.error('Error calculating quote:', error);
    res.status(500).json({ success: false, error: 'Failed to calculate quote' });
  }
});

// API: Submit Lead from Instant Quote Tool
app.post('/api/lead/submit', async (req, res) => {
  try {
    const { contractorTrade, homeownerName, phone, email, zipCode, projectScope, tier, estimatedBudget } = req.body;

    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      contractorTrade: contractorTrade || 'General Contracting',
      homeownerName: homeownerName || 'Valued Homeowner',
      phone: phone || '(555) 019-2831',
      email: email || 'lead@example.com',
      zipCode: zipCode || '78701',
      projectScope: projectScope || 'Full Scope Project',
      tier: tier || 'Standard',
      estimatedBudget: estimatedBudget || { low: 8500, high: 11200, formatted: '$8,500 - $11,200' },
      status: 'New Quote',
      submittedAt: new Date().toISOString(),
    };

    // Add to top of database
    leadsDatabase.unshift(newLead);

    // Dispatch email alert to Nabeel
    dispatchEmailToNabeel(
      'Instant Quote Tool Lead',
      `New Quote Lead: ${newLead.homeownerName} - ${newLead.contractorTrade} ($${newLead.estimatedBudget.low.toLocaleString()} - $${newLead.estimatedBudget.high.toLocaleString()})`,
      {
        'Lead ID': newLead.id,
        'Homeowner Name': newLead.homeownerName,
        'Phone Number': newLead.phone,
        'Email Address': newLead.email,
        'Zip Code': newLead.zipCode,
        'Trade / Service': newLead.contractorTrade,
        'Project Scope': newLead.projectScope,
        'Finish Tier': newLead.tier,
        'Estimated Budget': newLead.estimatedBudget.formatted,
      }
    );

    res.json({
      success: true,
      lead: newLead,
      message: 'Instant quote details generated and contractor alerted via instant SMS dispatch system.',
      contractorPhone: '1-800-555-0199',
    });
  } catch (error) {
    console.error('Error submitting lead:', error);
    res.status(500).json({ success: false, error: 'Failed to submit lead' });
  }
});

// API: Contractor Qualification Form Submission (Push to Nabeel)
app.post('/api/contractor-qualify', async (req, res) => {
  try {
    const {
      contractorName,
      companyName,
      trade,
      monthlyRevenue,
      adBudget,
      serviceArea,
      phone,
      email,
      biggestChallenge,
    } = req.body;

    const leadRecord = {
      id: `QUAL-${Date.now()}`,
      contractorName,
      companyName: companyName || `${contractorName}'s Business`,
      trade,
      monthlyRevenue,
      adBudget,
      serviceArea,
      phone,
      email,
      biggestChallenge: biggestChallenge || 'Looking for steady monthly contractor leads & instant quote tech',
      submittedAt: new Date().toISOString(),
      recipientEmail: NOTIFICATION_EMAIL,
    };

    console.log('[Contractor Qualification Submission for Nabeel]:', leadRecord);

    // Dispatch email notification to Nabeel
    dispatchEmailToNabeel(
      'Territory Exclusivity Qualification Application',
      `New Contractor Application: ${contractorName} - ${companyName || trade} (${serviceArea})`,
      {
        'Application ID': leadRecord.id,
        'Contractor Name': contractorName,
        'Company Name': companyName,
        'Trade / Specialty': trade,
        'Current Monthly Revenue': monthlyRevenue,
        'Ad Budget Plan': adBudget,
        'Service Territory': serviceArea,
        'Direct Phone': phone,
        'Email Address': email,
        'Biggest Growth Bottleneck': biggestChallenge,
      }
    );

    res.json({
      success: true,
      leadId: leadRecord.id,
      message: `Qualification application received for ${contractorName}! Nabeel will review your territory (${serviceArea}) and reach out directly at ${phone} or ${email} within 30 minutes.`,
    });
  } catch (error) {
    console.error('Error handling qualification:', error);
    res.status(500).json({ success: false, error: 'Failed to process qualification' });
  }
});

// API: Book Agency Strategy Call
app.post('/api/book-demo', async (req, res) => {
  try {
    const { contractorName, companyName, trade, email, phone, monthlyRevenue, preferredTime } = req.body;
    const bookingId = `CF-BOOK-${Math.floor(1000 + Math.random() * 9000)}`;

    // Dispatch email notification to Nabeel
    dispatchEmailToNabeel(
      'Strategy Call Booking',
      `New Strategy Call Booked: ${contractorName} - ${trade} (${preferredTime})`,
      {
        'Booking ID': bookingId,
        'Contractor Name': contractorName,
        'Company Name': companyName || 'Not specified',
        'Trade': trade,
        'Email Address': email,
        'Phone Number': phone,
        'Monthly Revenue': monthlyRevenue,
        'Scheduled Time': preferredTime,
      }
    );

    res.json({
      success: true,
      bookingId,
      message: `Strategy call scheduled with ContractorFlow growth team for ${contractorName}! Confirmation sent to ${email}.`,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Booking failed' });
  }
});

// Serve frontend with Vite middleware in development
async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

start();
