

## Enviar respostas com texto legivel (labels) no banco e webhooks

### Problema atual

Hoje, as respostas sao salvas como IDs de opcao (ex: `"q1_1"`, `"q2_3"`, `["q4_1", "q4_3"]`). Isso nao permite entender o que o lead realmente respondeu sem consultar o codigo.

### Solucao

Transformar o campo `answers` antes de enviar para o backend, mapeando cada resposta ao texto visivel (label) da opcao escolhida. O formato final sera:

```text
{
  "1": {
    "question": "Qual a maior dor da sua empresa hoje?",
    "answer": "Leads entram, mas não viram venda"
  },
  "2": {
    "question": "O que você já tentou para resolver isso?",
    "answer": "Contratei agência de tráfego e não deu resultado"
  },
  "4": {
    "question": "O que você espera de uma empresa como a Shekinah?",
    "answer": ["Resolver rápido, sem enrolação", "Estrutura que funcione 24h sem depender de mim"]
  }
}
```

### Arquivo a modificar

**`src/pages/Index.tsx`** - Na funcao `handleFinalSubmit`, antes de chamar `save-lead`:

1. Importar `QUESTIONS` (ja importado)
2. Criar uma funcao que percorre `userData.responses` e para cada questionId:
   - Encontra a pergunta correspondente em `QUESTIONS`
   - Se a resposta for um array (multi-select), mapeia cada ID para o label da opcao
   - Se for um unico ID (single/tiles), encontra o label da opcao
   - Retorna um objeto com `question` (titulo) e `answer` (label ou array de labels)
3. Enviar esse objeto transformado no campo `answers` em vez do `userData.responses` original

### Detalhes tecnicos

```text
// Funcao de transformacao (dentro de handleFinalSubmit)
const formattedAnswers = Object.entries(updatedUserData.responses).reduce((acc, [qId, answer]) => {
  const question = QUESTIONS.find(q => q.id === Number(qId));
  if (!question) return acc;

  let formattedAnswer: string | string[];
  if (Array.isArray(answer)) {
    formattedAnswer = answer.map(optId => question.options.find(o => o.id === optId)?.label || optId);
  } else {
    formattedAnswer = question.options.find(o => o.id === answer)?.label || answer;
  }

  acc[qId] = { question: question.title, answer: formattedAnswer };
  return acc;
}, {} as Record<string, { question: string; answer: string | string[] }>);
```

Depois substituir `answers: updatedUserData.responses` por `answers: formattedAnswers` na chamada do `save-lead`.

### Impacto

- O banco de dados recebe as respostas legiveis (campo `answers` JSONB - sem mudanca de schema)
- O webhook do n8n recebe as mesmas respostas legiveis automaticamente (ja repassa o campo `answers`)
- Nenhuma mudanca necessaria no backend ou edge functions
