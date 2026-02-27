

## Ajustes na pagina de diagnostico final

### Alteracoes no arquivo `src/components/funnel/ScoreDisplay.tsx`

**1. Remover o botao "Falar no WhatsApp"** (linhas 247-255) do bloco de CTA principal. O foco dessa pagina e gerar agendamento.

**2. Adicionar um segundo botao de agendamento no final da pagina**, apos o Testimonial e antes do SchedulingDialog. Sera um bloco simples com o mesmo botao "Agendar minha implementacao", reutilizando o mesmo `onClick={() => setShowScheduling(true)}` e o mesmo estilo do botao principal. Isso garante que quem rolou ate o final tenha um CTA acessivel sem precisar voltar.

**3. Remover o import de `MessageCircle`** que nao sera mais usado neste componente.

### Resultado

- Pagina de diagnostico: foco 100% em agendamento, com CTA no meio e no final
- WhatsApp da Shekinah continua disponivel apenas na pagina de confirmacao de agendamento (ja existente em `Index.tsx`)
