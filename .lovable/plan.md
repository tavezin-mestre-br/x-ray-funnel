

## Plano: Trilha sonora MP3 + SFX sintetizados + Otimizações de conversão

### 1. Trilha sonora — MP3 como BGM

**Copiar** o arquivo `user-uploads://ByErik_ヵ_-_desolate_Slowed_-_ByErik_ヵ_youtube.mp3` para `public/audio/bgm.mp3`.

**Reescrever `src/services/audio.ts`** para:
- Substituir o BGM sintetizado (osciladores) por reprodução do MP3 via `Audio` element
- Loop infinito com crossfade suave
- Volume baixo (0.06) com fade-in de 2s
- Manter a estrutura de mute/unmute existente
- Manter todos os SFX sintetizados mas melhorar para serem mais sutis e agradáveis

**SFX a criar/melhorar** (todos sintetizados via Web Audio API — sem dependência externa):
- `playClick()` — tap suave ao selecionar opção (sine sweep descendente, curto)
- `playTransition()` — whoosh suave na troca de pergunta
- `playSuccess()` — novo — arpejo ascendente ao completar etapa (capture_company, capture_final)
- `playReveal()` — novo — som de "revelação" na tela de resultados
- `playBadge()` — manter — arpejo de conquista

### 2. Integrar áudio no funil

**`src/pages/Index.tsx`**:
- No `handleStartDiagnosis`: chamar `AudioManager.startBGM()` + `AudioManager.playClick()`
- No `handleCompanySubmit`: chamar `AudioManager.playSuccess()`
- No `handleFinalSubmit` (ao ir pra results): chamar `AudioManager.playReveal()`

**`src/components/funnel/Funnel.tsx`**:
- No `handleAnswer`: chamar `AudioManager.playClick()`
- Na troca de pergunta (useEffect do currentIndex): chamar `AudioManager.playTransition()`

**`src/components/funnel/QuestionRenderer.tsx`**:
- No click de opção single/tiles: chamar `AudioManager.playClick()`

**`src/components/Header.tsx`**:
- Adicionar botão mute/unmute (ícone Volume2/VolumeX) ao lado do ThemeToggle
- Estado gerenciado pelo AudioManager.toggleMute()

### 3. Otimizações de conversão identificadas

Após analisar o funil completo, identifiquei pontos de atrito:

**3a. Remover pergunta Q3 (urgência)** — De 8 para 7 perguntas
- Q3 ("Se a gente resolvesse isso em 30 dias...") não gera dados acionáveis e adiciona fricção. O score de urgência não influencia o resultado final de forma significativa. Menos perguntas = menos abandono.

**3b. Simplificar capture_company** — Remover campo "Instagram"
- O campo Instagram já não está no form mas existe no state. Limpar o state `companyData` removendo `instagram`.

**3c. Auto-scroll suave** — Já existe no Funnel.tsx mas adicionar também nas transições de step no Index.tsx para mobile.

**3d. Feedback visual mais rápido** — Reduzir o delay do micro-feedback de 800ms para 500ms no Funnel.tsx. Cada 300ms a menos no funil reduz abandono.

**3e. Botão "Confirmar" no multi-select** — Trocar texto de "Confirmar (X selecionados)" para "Continuar →" quando pelo menos 1 item selecionado. Menos intimidante.

### Resumo de arquivos

| Arquivo | Alteração |
|---|---|
| `public/audio/bgm.mp3` | Copiar MP3 uploadado |
| `src/services/audio.ts` | Reescrever: BGM via MP3, SFX melhorados, novos sons |
| `src/pages/Index.tsx` | Integrar AudioManager nos handlers |
| `src/components/funnel/Funnel.tsx` | Adicionar SFX em answer e transition, reduzir feedback delay |
| `src/components/funnel/QuestionRenderer.tsx` | Adicionar click SFX, melhorar botão multi |
| `src/components/Header.tsx` | Botão mute/unmute |
| `src/constants/questions.tsx` | Remover Q3 (8→7 perguntas), reindexar IDs |

