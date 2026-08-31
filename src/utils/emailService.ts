/**
 * Email Dispatch Service
 * Routes contractor applications, instant quote leads, and strategy call bookings
 * directly to Nabeel (nabeelhyderchohan767@gmail.com).
 */

export const NOTIFICATION_EMAIL = 'nabeelhyderchohan767@gmail.com';

export interface EmailDispatchData {
  formType: 'Territory Qualification Application' | 'Instant Quote Lead' | 'Strategy Call Booking';
  subject: string;
  fields: Record<string, string | number | undefined | null>;
}

export async function sendEmailNotification(data: EmailDispatchData): Promise<boolean> {
  try {
    const payload = {
      _subject: data.subject,
      _template: 'table',
      _captcha: 'false',
      'Agency Platform': 'AsOurs Agency',
      'Submission Type': data.formType,
      'Delivered To': NOTIFICATION_EMAIL,
      ...data.fields,
      'Submission Timestamp': new Date().toLocaleString('en-US', {
        timeZoneName: 'short',
      }),
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
      console.log(`[Email Notification Dispatched to ${NOTIFICATION_EMAIL}]:`, data.subject);
      return true;
    } else {
      const errorText = await response.text();
      console.warn(`[Email Notification Delivery Notice]:`, errorText);
      return false;
    }
  } catch (error) {
    console.error(`[Email Notification Error]:`, error);
    return false;
  }
}
