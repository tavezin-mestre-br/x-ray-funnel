

## Plano: Fix lead_id null + WhatsApp + PageView

### 1. Bug fix: lead_id null no agendamento

Em `src/pages/Index.tsx` e `src/pages/ClinicasFortaleza.tsx` (linha 187-191), mover `setStep('results')` para fora do `finally`:

```
} finally {
  setIsSubmitting(false);
  AudioManager.playReveal();
}

setStep('results');
```

Isso garante que o `setLeadId()` (dentro do `try`) execute antes da transição para a tela de resultados.

### 2. WhatsApp da página final

Em ambos os arquivos, trocar `5569992286633` por `5585976766180` no link do WhatsApp da página de confirmação de booking.

### 3. PageView apenas na primeira página

**Problema**: O Meta Pixel dispara PageView em todas as páginas, diluindo a qualidade do evento.

**Mudanças em `src/services/metaPixel.ts`**:
- Remover o disparo automático/global de PageView
- Criar uma função `trackPageView()` explícita que só é chamada uma vez

**Mudanças em `src/pages/Index.tsx` e `src/pages/ClinicasFortaleza.tsx`**:
- Chamar `trackPageView()` no `useEffect` inicial (mount), apenas quando `step === 'start'` ou equivalente
- Incluir no CAPI (edge function `meta-capi-pageview`) os parâmetros recomendados pela Meta: `client_user_agent`, `event_source_url`, `fbp`, `fbc`, `client_ip_address`

Preciso verificar a implementação atual do PageView antes de detalhar essa parte.

