declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

// Gera um event_id único para deduplicação Pixel ↔ CAPI
export const generateEventId = (): string => {
  return `${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
};

// Lê os cookies _fbp e _fbc do navegador
export const getFbCookies = (): { fbp?: string; fbc?: string } => {
  const cookies = document.cookie.split(';').reduce((acc, c) => {
    const [key, val] = c.trim().split('=');
    acc[key] = val;
    return acc;
  }, {} as Record<string, string>);
  return { fbp: cookies['_fbp'], fbc: cookies['_fbc'] };
};

// Atualiza o Pixel com Advanced Matching quando temos dados do usuário
export const updateUserData = (userData: { phone?: string; email?: string; firstName?: string }) => {
  if (typeof window !== 'undefined' && window.fbq) {
    const params: Record<string, string> = {};
    if (userData.phone) params.ph = userData.phone.replace(/\D/g, '');
    if (userData.email) params.em = userData.email.toLowerCase().trim();
    if (userData.firstName) params.fn = userData.firstName.toLowerCase().trim();
    if (Object.keys(params).length > 0) {
      window.fbq('init', '1396348278959400', params);
    }
  }
};

// ViewContent — quando inicia o quiz
export const trackViewContent = (eventId: string) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'ViewContent', { content_name: 'diagnostico_iniciado' }, { eventID: eventId });
  }
};

// CompleteRegistration — quando preenche dados da empresa
export const trackCompleteRegistration = (eventId: string) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'CompleteRegistration', { content_name: 'dados_empresa' }, { eventID: eventId });
  }
};

// Lead — quando submete WhatsApp e vê o resultado
export const trackLead = (eventId: string) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead', { content_name: 'diagnostico_completo' }, { eventID: eventId });
  }
};

// Schedule — quando confirma agendamento (EVENTO PADRÃO)
export const trackSchedule = (eventId: string) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Schedule', { content_name: 'reuniao_agendada' }, { eventID: eventId });
  }
};
