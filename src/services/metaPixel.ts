declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    _fbq?: any;
  }
}

let initialized = false;
let pixelReadyResolve: (() => void) | null = null;
const pixelReadyPromise = new Promise<void>((resolve) => {
  pixelReadyResolve = resolve;
});

const PIXEL_ID = '1396348278959400';

export function initMetaPixel() {
  if (initialized || typeof window === 'undefined') return;
  initialized = true;
  if (window.fbq) { pixelReadyResolve?.(); return; }

  const f = window as any;
  const n: any = (f.fbq = function () {
    n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
  });
  if (!f._fbq) f._fbq = n;
  n.push = n;
  n.loaded = false;
  n.version = '2.0';
  n.queue = [];

  const t = document.createElement('script');
  t.async = true;
  t.src = 'https://connect.facebook.net/en_US/fbevents.js';
  t.onload = () => setTimeout(() => pixelReadyResolve?.(), 300);
  document.head.appendChild(t);

  // Desativa autoConfig e pushState antes do init — evita eventos lixo
  f.fbq('set', 'autoConfig', 'false', PIXEL_ID);
  f.fbq('init', PIXEL_ID);
  f.fbq.disablePushState = true;
}

export function waitForPixel(timeout = 5000): Promise<boolean> {
  return new Promise((resolve) => {
    if (!initialized) return resolve(false);
    const timer = setTimeout(() => resolve(false), timeout);
    pixelReadyPromise.then(() => { clearTimeout(timer); resolve(true); });
  });
}

export function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

export function captureFbclid() {
  const params = new URLSearchParams(window.location.search);
  const fbclid = params.get('fbclid');
  if (!fbclid || getCookie('_fbc')) return;
  const fbc = `fb.1.${Date.now()}.${fbclid}`;
  document.cookie = `_fbc=${fbc};path=/;max-age=7776000;SameSite=Lax`;
}

export async function captureClientIp() {
  if (getCookie('_client_ip')) return;
  try {
    const res = await fetch('https://api64.ipify.org?format=json');
    const { ip } = await res.json();
    if (ip) document.cookie = `_client_ip=${ip};path=/;max-age=3600;SameSite=Lax`;
  } catch { /* opcional */ }
}

export function getClientIp(): string | undefined {
  return getCookie('_client_ip') ?? undefined;
}

export const generateEventId = (): string => crypto.randomUUID();

export const getFbCookies = (): { fbp?: string; fbc?: string } => ({
  fbp: getCookie('_fbp') ?? undefined,
  fbc: getCookie('_fbc') ?? undefined,
});

function track(eventName: string, params: Record<string, any>, eventId: string) {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, params, { eventID: eventId });
  }
}

export const trackPageView = (eventId: string) => track('PageView', {}, eventId);
export const trackViewContent = (eventId: string) => track('ViewContent', { content_name: 'diagnostico_iniciado' }, eventId);
export const trackCompleteRegistration = (eventId: string) => track('CompleteRegistration', { content_name: 'dados_empresa' }, eventId);
export const trackLead = (eventId: string) => track('Lead', { content_name: 'diagnostico_completo' }, eventId);
export const trackSchedule = (eventId: string) => track('Schedule', { content_name: 'reuniao_agendada' }, eventId);
