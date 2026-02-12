import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserData } from '@/types/funnel';
import { QUESTIONS } from '@/constants/questions';
import Funnel from '@/components/funnel/Funnel';
import ScoreDisplay from '@/components/funnel/ScoreDisplay';
import { calculateResults } from '@/services/scoreLogic';
import { ArrowRight, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

type Step = 'intro' | 'funnel' | 'capture_name' | 'capture_final' | 'results';

const Index: React.FC = () => {
  const [step, setStep] = useState<Step>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userData, setUserData] = useState<UserData>({
    name: '',
    whatsapp: '',
    email: '',
    responses: {},
    xp: 0,
    streak: 0,
    badges: []
  });

  const handleStartDiagnosis = () => {
    setStep('funnel');
  };

  const handleResponse = (questionId: number, answer: any) => {
    setUserData(prev => ({
      ...prev,
      responses: { ...prev.responses, [questionId]: answer }
    }));

    // After question 3 (end of Etapa 1), capture name
    if (currentQuestionIndex === 2 && step === 'funnel') {
      setStep('capture_name');
    } else if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setStep('capture_final');
    }
  };

  const handleNameSubmit = (name: string) => {
    setUserData(prev => ({ ...prev, name }));
    setStep('funnel');
    setCurrentQuestionIndex(3); // Continue to question 4 (Etapa 2)
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFinalSubmit = async (whatsapp: string, email: string) => {
    setIsSubmitting(true);
    
    const updatedUserData = { ...userData, whatsapp, email };
    setUserData(updatedUserData);
    
    const resultsToSave = calculateResults(updatedUserData.responses, updatedUserData.badges);
    
    try {
      const { error } = await supabase.functions.invoke('save-lead', {
        body: {
          name: updatedUserData.name,
          phone: whatsapp,
          email: email || null,
          answers: updatedUserData.responses,
          score_total: resultsToSave.totalScore,
          pillars: resultsToSave.pillars.reduce((acc, p) => ({ ...acc, [p.name]: p.score }), {}),
          bottleneck: resultsToSave.bottleneck,
          badges: resultsToSave.earnedBadges.map(b => b.name),
          recommendations: resultsToSave.recommendations,
          classification: resultsToSave.classification
        }
      });
      
      if (error) {
        console.error('Error saving lead:', error);
        toast.error('Erro ao salvar diagnóstico. Continuando...');
      }
    } catch (err) {
      console.error('Failed to save lead:', err);
      toast.error('Erro ao salvar diagnóstico. Continuando...');
    } finally {
      setIsSubmitting(false);
      setStep('results');
    }
  };

  const results = useMemo(() => {
    if (step !== 'results') return null;
    return calculateResults(userData.responses, userData.badges);
  }, [step, userData.responses, userData.badges]);

  // Calculate current phase for display
  const getCurrentPhase = () => {
    if (currentQuestionIndex < 3) return 1;
    return 2;
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-background">
      {/* Header */}
      <header className="w-full py-4 lg:py-5 px-4 lg:px-6 border-b border-border/50">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-lg lg:text-xl font-black text-foreground tracking-tight font-heading">SHEKINAH</span>
            <span className="text-[9px] lg:text-[10px] text-muted-foreground font-medium tracking-widest uppercase">Marketing · Tecnologia · IA</span>
          </div>
          {step === 'funnel' && (
            <div className="text-right">
              <span className="text-xs text-muted-foreground mono-font">Etapa {getCurrentPhase()} de 3</span>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-3 sm:p-4 lg:p-6">
        <AnimatePresence mode="wait">
          {/* INTRO SCREEN */}
          {step === 'intro' && (
            <motion.div 
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="max-w-xl w-full text-center space-y-6 lg:space-y-8 py-4"
            >
              <div className="space-y-5 lg:space-y-6">
                <div className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/30 text-primary rounded-full text-[9px] lg:text-[10px] mono-font font-black tracking-[0.2em] uppercase">
                  + R$ 2M GERENCIADOS EM TRÁFEGO PARA EMPRESAS
                </div>
                
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground leading-[1.1] tracking-tight font-heading">
                  Mais vendas. Mais clientes.<br/>
                  <span className="text-primary glow-text">Mais dinheiro no seu bolso.</span>
                </h1>
                
                <p className="text-muted-foreground text-base lg:text-lg font-medium leading-relaxed max-w-md mx-auto">
                  Descubra em 3 minutos onde sua empresa está perdendo faturamento — e como multiplicar seus resultados com tráfego pago qualificado e metrificado.
                </p>

                <div className="bg-destructive/5 border border-destructive/20 p-4 lg:p-5 rounded-xl lg:rounded-2xl max-w-sm mx-auto space-y-2">
                  <p className="text-foreground text-sm lg:text-base font-black leading-relaxed">
                    Este diagnóstico não é para todos.
                  </p>
                  <p className="text-muted-foreground text-xs lg:text-sm font-medium leading-relaxed">
                    Se você não está disposto a investir pelo menos <span className="text-foreground font-black">R$ 3.000/mês em tráfego</span> (fora mão de obra), este diagnóstico não é para você.
                  </p>
                </div>

                <div className="bg-card border border-border p-3 lg:p-4 rounded-xl max-w-sm mx-auto">
                  <p className="text-foreground text-xs lg:text-sm font-semibold leading-relaxed text-center">
                    Para empresários de todo o Brasil que querem vender mais com previsibilidade e escala.
                  </p>
                </div>
              </div>
              
              <button 
                onClick={handleStartDiagnosis}
                className="w-full max-w-sm mx-auto bg-primary text-primary-foreground py-4 lg:py-5 rounded-xl lg:rounded-2xl font-black text-lg lg:text-xl hover:opacity-90 transition-all glow-primary group flex items-center justify-center gap-3"
              >
                Quero multiplicar meu faturamento
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
              </button>

              <p className="text-muted-foreground text-[10px] lg:text-xs font-medium text-center">
                Vagas limitadas por região. Processo seletivo.
              </p>
              
              <p className="text-muted-foreground text-xs lg:text-sm font-medium italic">
                "Previsibilidade não é marketing. É sistema."
              </p>
            </motion.div>
          )}

          {/* NAME CAPTURE - After Etapa 1 */}
          {step === 'capture_name' && (
            <motion.div 
              key="capture_name"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="max-w-sm lg:max-w-md w-full bg-card p-5 sm:p-6 lg:p-8 rounded-2xl lg:rounded-3xl border border-border space-y-5 lg:space-y-6"
            >
              <div className="space-y-2 lg:space-y-3">
                <div className="flex items-center gap-2 lg:gap-3">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg lg:rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
                    <span className="text-primary font-black text-xs lg:text-sm">✓</span>
                  </div>
                  <span className="text-xs lg:text-sm text-primary font-bold mono-font uppercase tracking-wider">Etapa 1 concluída</span>
                </div>
                <p className="text-muted-foreground text-xs lg:text-sm">Perfil da empresa registrado.</p>
              </div>

              <div className="space-y-3 lg:space-y-4">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-foreground leading-tight tracking-tight font-heading">
                  Como podemos identificá-lo neste diagnóstico?
                </h2>
                
                <input 
                  autoFocus
                  type="text"
                  placeholder="Seu nome"
                  className="w-full bg-secondary border border-border p-4 lg:p-5 rounded-lg lg:rounded-xl text-lg lg:text-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none text-foreground font-semibold transition-all"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && (e.target as HTMLInputElement).value) {
                      handleNameSubmit((e.target as HTMLInputElement).value);
                    }
                  }}
                />
              </div>
              
              <button 
                onClick={(e) => {
                  const input = document.querySelector('input[type="text"]') as HTMLInputElement;
                  if (input?.value) handleNameSubmit(input.value);
                }}
                className="w-full bg-primary text-primary-foreground py-4 lg:py-5 rounded-lg lg:rounded-xl font-black text-base lg:text-lg glow-primary"
              >
                Continuar para Etapa 2
              </button>
            </motion.div>
          )}

          {/* FINAL CAPTURE - After Etapa 2 */}
          {step === 'capture_final' && (
            <motion.div 
              key="capture_final"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-sm lg:max-w-md w-full bg-card p-5 sm:p-6 lg:p-8 rounded-2xl lg:rounded-3xl border border-border space-y-5 lg:space-y-6"
            >
              <div className="space-y-2 lg:space-y-3">
                <div className="flex items-center gap-2 lg:gap-3">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg lg:rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
                    <span className="text-primary font-black text-xs lg:text-sm">✓</span>
                  </div>
                  <span className="text-xs lg:text-sm text-primary font-bold mono-font uppercase tracking-wider">Etapa 2 concluída</span>
                </div>
                <p className="text-muted-foreground text-xs lg:text-sm">Estrutura operacional mapeada.</p>
              </div>

              <div className="space-y-1.5 lg:space-y-2 text-center">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-foreground leading-tight tracking-tight font-heading">
                  Seu diagnóstico está pronto.
                </h2>
                <p className="text-muted-foreground text-sm lg:text-base">Veja onde sua empresa está deixando dinheiro na mesa — e como resolver.</p>
              </div>

              <div className="space-y-3 lg:space-y-4">
                <div className="space-y-1.5 lg:space-y-2">
                  <label className="text-[10px] lg:text-xs font-bold text-muted-foreground uppercase mono-font tracking-wider">WhatsApp (Obrigatório)</label>
                  <input 
                    type="tel" 
                    placeholder="(69) 90000-0000" 
                    className="w-full bg-secondary border border-border p-3 lg:p-4 rounded-lg lg:rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none text-foreground font-semibold text-base lg:text-lg transition-all" 
                    id="final-wa" 
                  />
                </div>
                <div className="space-y-1.5 lg:space-y-2">
                  <label className="text-[10px] lg:text-xs font-bold text-muted-foreground uppercase mono-font tracking-wider">E-mail (Opcional)</label>
                  <input 
                    type="email" 
                    placeholder="seu@email.com" 
                    className="w-full bg-secondary border border-border p-3 lg:p-4 rounded-lg lg:rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none text-foreground font-semibold text-base lg:text-lg transition-all" 
                    id="final-email" 
                  />
                </div>
              </div>

              <button 
                disabled={isSubmitting}
                onClick={() => {
                  const wa = (document.getElementById('final-wa') as HTMLInputElement).value;
                  const email = (document.getElementById('final-email') as HTMLInputElement).value;
                  const isEmailValid = !email || (email.includes('@') && email.includes('.'));
                  
                  if (wa && isEmailValid) {
                    handleFinalSubmit(wa, email);
                  } else if (!wa) {
                    toast.error("O WhatsApp é obrigatório.");
                  } else {
                    toast.error("E-mail inválido.");
                  }
                }}
                className="w-full bg-primary text-primary-foreground py-4 lg:py-5 rounded-lg lg:rounded-xl font-black text-base lg:text-lg glow-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-3">
                    <Loader2 className="animate-spin" size={18} />
                    Processando...
                  </span>
                ) : (
                  'Ver Diagnóstico'
                )}
              </button>
            </motion.div>
          )}

          {/* FUNNEL */}
          {step === 'funnel' && (
            <Funnel 
              question={QUESTIONS[currentQuestionIndex]} 
              onResponse={handleResponse}
              currentIndex={currentQuestionIndex + 1}
              totalSteps={QUESTIONS.length}
            />
          )}

          {/* RESULTS */}
          {step === 'results' && results && (
            <ScoreDisplay results={results} userData={userData} />
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="w-full py-3 lg:py-4 px-4 lg:px-6 border-t border-border/50">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-[10px] lg:text-xs text-muted-foreground">
            Shekinah | Marketing · Tecnologia · IA
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
