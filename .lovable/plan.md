

## Plano: Corrigir erro ao salvar diagnóstico

### Problema identificado
A função `handleFinalSubmit` tem uma falha estrutural: as linhas 130-149 (`calculateResults`, `formattedAnswers`, etc.) estão **fora do bloco try/catch**. Se qualquer erro acontecer nessa preparação de dados, a exceção não é capturada, o botão fica travado em "Processando..." e o usuário não avança para os resultados.

Além disso, se `supabase.functions.invoke` retornar um erro (rede, timeout, etc.), o toast aparece mas o fluxo continua normalmente -- o que está correto. Porém, preciso garantir resiliência total.

### Correção em ambos os arquivos

**`src/pages/Index.tsx` e `src/pages/ClinicasFortaleza.tsx`** -- função `handleFinalSubmit`:

1. **Mover toda a preparação de dados para dentro do try/catch**, incluindo `calculateResults` e `formattedAnswers`
2. **Garantir que `setStep('results')` SEMPRE execute**, mesmo se calculateResults ou a chamada à API falhar
3. **Adicionar `console.error` detalhado** no catch para capturar o erro real

Estrutura final:
```
const handleFinalSubmit = async (...) => {
  setIsSubmitting(true);
  
  const normalizedPhone = normalizePhone(whatsapp);
  const updatedUserData = { ...userData, whatsapp: normalizedPhone, email };
  setUserData(updatedUserData);

  try {
    const resultsToSave = calculateResults(...);
    const formattedAnswers = ...;
    
    const { data, error } = await supabase.functions.invoke('save-lead', { body: {...} });
    
    if (error) {
      console.error('Error saving lead:', error);
      toast.error('Erro ao salvar diagnóstico. Continuando...');
    } else {
      if (data?.lead_id) setLeadId(data.lead_id);
      // track pixel...
    }
  } catch (err) {
    console.error('Failed to save lead:', err);
    toast.error('Erro ao salvar diagnóstico. Continuando...');
  } finally {
    setIsSubmitting(false);
    AudioManager.playReveal();
  }

  setStep('results');
};
```

### Resumo
A mudança principal é colocar `calculateResults` e `formattedAnswers` dentro do try/catch. Isso garante que qualquer erro na preparação dos dados seja capturado graciosamente, o loading seja removido, e o usuário sempre avance para a tela de resultados.

