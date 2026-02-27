

## Plano: Agenda de Agendamento Integrada (Seg-Sab, 08h-20h)

### 1. Criar tabela `bookings` no banco de dados

Nova tabela para persistir os agendamentos:

- `id` (uuid, PK, default gen_random_uuid())
- `lead_id` (uuid, nullable) - referencia opcional ao lead
- `name` (text) - nome do contato
- `phone` (text) - whatsapp
- `scheduled_date` (date) - data escolhida
- `scheduled_time` (text) - horario escolhido (ex: "10:00")
- `created_at` (timestamptz, default now())

RLS: permitir INSERT publico (mesmo padrao da tabela leads).

### 2. Criar componente `SchedulingDialog.tsx`

**Arquivo**: `src/components/funnel/SchedulingDialog.tsx`

- Dialog (modal) usando shadcn Dialog
- Etapa 1: Calendario (shadcn Calendar) para selecionar data
  - Bloquear domingos (day.getDay() === 0)
  - Bloquear datas passadas
- Etapa 2: Apos selecionar data, mostrar grade de horarios
  - Horarios de 08:00 ate 20:00, de hora em hora: 08:00, 09:00, 10:00, 11:00, 12:00, 13:00, 14:00, 15:00, 16:00, 17:00, 18:00, 19:00, 20:00
  - Grid responsivo de botoes
- Etapa 3: Ao confirmar, salvar no banco via Supabase e exibir toast de confirmacao
- Props: recebe `userData` para preencher nome/telefone automaticamente

### 3. Atualizar ScoreDisplay.tsx

- Importar e usar `SchedulingDialog`
- Substituir `openCalendly()` por estado `showScheduling` que abre o dialog
- Passar `userData` ao componente

### Resumo

| Acao | Arquivo/Recurso |
|------|----------------|
| Criar tabela `bookings` | Migracao SQL |
| Criar componente de agendamento | `src/components/funnel/SchedulingDialog.tsx` |
| Integrar no diagnostico | `src/components/funnel/ScoreDisplay.tsx` |

