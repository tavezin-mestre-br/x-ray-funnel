

## Desativar Eventos Automaticos do Meta Pixel

### Problema

Os eventos "SubscribedButtonClick" que estao inflando o Pixel nao sao disparados pelo seu codigo. Eles vem de um recurso do Meta Pixel chamado **Automatic Events** (Configuracao Automatica de Eventos), que rastreia automaticamente todos os cliques em botoes da pagina. Isso esta poluindo seus dados e prejudicando a otimizacao do Pixel.

### Solucao

Adicionar `fbq('set', 'autoConfig', 'false', '1396348278959400');` **antes** do `fbq('init', ...)` no `index.html`. Isso desativa a deteccao automatica de cliques em botoes, mantendo apenas os eventos que voce configurou manualmente (PageView, ViewContent, CompleteRegistration, Lead, Schedule).

### Arquivo a modificar

**`index.html`** — No bloco do Meta Pixel (linhas 24-35), adicionar uma linha antes do `fbq('init', ...)`:

```text
fbq('set', 'autoConfig', 'false', '1396348278959400');
fbq('init', '1396348278959400');
fbq('track', 'PageView');
```

### Resultado esperado

Apos essa alteracao, o Meta Events Manager mostrara apenas:
- **PageView** — ao carregar a pagina
- **ViewContent** — ao iniciar o diagnostico
- **CompleteRegistration** — ao preencher dados da empresa
- **Lead** — ao concluir o diagnostico
- **Schedule** — ao agendar reuniao

Nenhum "SubscribedButtonClick" sera mais registrado.

