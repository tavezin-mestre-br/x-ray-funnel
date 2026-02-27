declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

export const trackLead = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead');
  }
};

export const trackSchedule = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', 'Schedule');
  }
};
