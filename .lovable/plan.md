

## Plano: Pagina de Confirmacao de Agendamento

### Visao Geral

Apos o cliente confirmar o agendamento no dialog, fechar o dialog e carregar uma nova tela de "Reuniao Agendada" — o passo final do funil. Essa tela mostra a confirmacao com data/hora e um botao de WhatsApp (69992286633).

### Alteracoes

**1. Adicionar novo step `booking_confirmed` no Index.tsx**

- Adicionar `'booking_confirmed'` ao tipo `Step`
- Criar estado para guardar data/hora do agendamento confirmado (`bookedDate`, `bookedTime`)
- Renderizar uma nova tela quando `step === 'booking_confirmed'`
- A tela tera:
  - Icone de check grande com animacao
  - Titulo "Reuniao Agendada!"
  - Data e horario formatados
  - Texto "Entraremos em contato para confirmar os detalhes"
  - Botao verde de WhatsApp com link `https://wa.me/5569992286633` abrindo em nova aba
  - Texto secundario de suporte

**2. Atualizar SchedulingDialog.tsx**

- Adicionar prop `onBookingConfirmed: (date: string, time: string) => void`
- Apos salvar no banco com sucesso, chamar `onBookingConfirmed` com data e hora em vez de mostrar o estado `confirmed` interno
- Fechar o dialog automaticamente

**3. Atualizar ScoreDisplay.tsx**

- Receber e repassar a prop `onBookingConfirmed` ao `SchedulingDialog`

### Detalhes Tecnicos

- O link do WhatsApp usa formato internacional: `https://wa.me/5569992286633` com mensagem pre-preenchida (ex: "Ola! Acabei de agendar minha reuniao de implementacao.")
- A tela de confirmacao segue o mesmo estilo visual (cards com border, rounded-2xl, font-heading)
- Nenhuma nova rota e necessaria — continua sendo um step dentro do Index.tsx
- O estado `confirmed` do SchedulingDialog pode ser removido ja que a confirmacao agora acontece na pagina principal
