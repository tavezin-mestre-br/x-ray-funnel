

## Plano: Trocar depoimento do Ricardo Almeida para Daniel Bervian

### Alteracoes

#### 1. Trocar TESTIMONIALS[0] no Testimonial.tsx (linhas 13-17)

Substituir Ricardo Almeida / RA Consultoria por:

- **Nome**: Daniel Bervian
- **Empresa**: Staff Motors
- **Quote**: manter o mesmo quote do Ricardo ("Ja tinha gasto R$ 80 mil com 2 agencias e nao sabia se voltava 1 real. A Shekinah montou tudo em 3 semanas. No primeiro mes eu ja sabia quanto cada campanha faturou.")
- **Result**: "ROI rastreado desde o dia 1"

#### 2. Reverter depoimento do diagnostico no ScoreDisplay.tsx (linhas 255-260)

Voltar o depoimento do diagnostico para o anterior. Como o Daniel Bervian agora vai para o funil, o depoimento do diagnostico volta para outro nome. Opcoes:

- Usar o antigo (Ana Beatriz / AB Arquitetura com o quote "Paramos de depender de indicacao...")
- Ou manter como esta se o usuario quiser Daniel Bervian em ambos

**Decisao**: Reverter para o depoimento original que estava antes (Ana Beatriz / AB Arquitetura), ja que Daniel Bervian sera o primeiro do funil.

### Resumo

| Arquivo | Alteracao |
|---------|-----------|
| `src/components/funnel/Testimonial.tsx` | TESTIMONIALS[0]: Ricardo Almeida → Daniel Bervian / Staff Motors |
| `src/components/funnel/ScoreDisplay.tsx` | Depoimento do diagnostico: Daniel Bervian → Ana Beatriz / AB Arquitetura (revertido) |

Nenhuma outra secao ou logica sera alterada.

