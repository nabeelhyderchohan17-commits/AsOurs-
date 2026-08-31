export type ContractorTradeId =
  | 'remodeling'
  | 'kitchen'
  | 'bathroom'
  | 'roofing'
  | 'deck_patio'
  | 'basement_adu'
  | 'hvac'
  | 'plumbing'
  | 'solar'
  | 'landscaping'
  | 'concrete'
  | 'electrical'
  | 'painting';

export interface BreadthOption {
  id: string;
  label: string;
  sublabel: string;
  multiplier: number;
}

export interface ContractorTradeInfo {
  id: ContractorTradeId;
  name: string;
  iconName: string;
  avgTicket: string;
  unitLabel: string;
  defaultScope: number;
  scopeMin: number;
  scopeMax: number;
  scopeStep: number;
  description: string;
  popularAddons: string[];
  breadthOptions?: BreadthOption[];
  typicalDuration?: string;
  baseCostLowPerUnit?: number;
  baseCostHighPerUnit?: number;
}

export interface QuoteCalculationResult {
  trade: string;
  low: number;
  high: number;
  formatted: string;
  aiNote?: string;
  itemizedBreakdown: {
    label: string;
    percent: number;
    amount: number;
  }[];
}

export interface LeadSubmission {
  id?: string;
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
  status?: 'New Quote' | 'Called (<1m)' | 'Site Visit' | 'Signed';
  submittedAt?: string;
}

export interface CaseStudy {
  id: string;
  contractorName: string;
  companyName: string;
  location: string;
  trade: string;
  image: string;
  beforeRevenue: string;
  afterRevenue: string;
  leadsPerMonth: number;
  instantQuoteConversion: string;
  timeToFirstCall: string;
  quote: string;
  highlightStats: string;
}

export interface RoiCalculatorInput {
  trade: ContractorTradeId;
  monthlyAdSpend: number;
  avgJobValue: number;
  closeRatePercent: number;
}

export interface StrategyCallBooking {
  contractorName: string;
  companyName: string;
  trade: string;
  email: string;
  phone: string;
  monthlyRevenue: string;
  preferredTime: string;
}

export interface ContractorQualificationLead {
  contractorName: string;
  companyName: string;
  trade: string;
  monthlyRevenue: string;
  adBudget: string;
  serviceArea: string;
  phone: string;
  email: string;
  biggestChallenge?: string;
  submittedAt?: string;
}
