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
      <header className="w-full py-6 px-6 border-b border-border/50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xl font-black text-foreground tracking-tight font-heading">SHEKINAH</span>
            <span className="text-[10px] text-muted-foreground font-medium tracking-widest uppercase">Marketing · Tecnologia · IA</span>
          </div>
          {step === 'funnel' && (
            <div className="text-right">
              <span className="text-xs text-muted-foreground mono-font">Etapa {getCurrentPhase()} de 3</span>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <AnimatePresence mode="wait">
          {/* INTRO SCREEN */}
          {step === 'intro' && (
            <motion.div 
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl w-full text-center space-y-10 py-6"
            >
              <div className="space-y-8">
                <div className="inline-block px-5 py-2 bg-primary/10 border border-primary/30 text-primary rounded-full text-[10px] mono-font font-black tracking-[0.2em] uppercase">
                  EXCLUSIVO PORTO VELHO – RO
                </div>
                
                <h1 className="text-4xl sm:text-5xl font-black text-foreground leading-[1.1] tracking-tight font-heading">
                  Diagnóstico Estratégico<br/>
                  <span className="text-primary glow-text">Clínicas High Ticket</span>
                </h1>
                
                <p className="text-muted-foreground text-lg sm:text-xl font-medium leading-relaxed max-w-xl mx-auto">
                  Esta avaliação é exclusiva para clínicas de Porto Velho – RO que vendem procedimentos de alto valor.
                </p>

                <div className="bg-card border border-border p-6 rounded-2xl max-w-md mx-auto">
                  <p className="text-foreground text-base font-semibold leading-relaxed">
                    Sua clínica tem a demanda. Mas sem sistema, cada lead que entra é uma consulta perdida.
                  </p>
                </div>
              </div>
              
              <button 
                onClick={handleStartDiagnosis}
                className="w-full max-w-md mx-auto bg-primary text-primary-foreground py-6 rounded-2xl font-black text-xl hover:opacity-90 transition-all glow-primary group flex items-center justify-center gap-3"
              >
                Iniciar Avaliação
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </button>

              <p className="text-primary text-xs font-bold mono-font uppercase tracking-wider">
                Mais de R$ 2M gerenciados em campanhas para clínicas no Brasil.
              </p>
              
              <p className="text-muted-foreground text-sm font-medium italic">
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
              className="max-w-md w-full bg-card p-8 sm:p-10 rounded-3xl border border-border space-y-8"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
                    <span className="text-primary font-black text-sm">✓</span>
                  </div>
                  <span className="text-sm text-primary font-bold mono-font uppercase tracking-wider">Etapa 1 concluída</span>
                </div>
                <p className="text-muted-foreground text-sm">Perfil da clínica em Porto Velho registrado.</p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-black text-foreground leading-tight tracking-tight font-heading">
                  Como podemos identificá-lo neste diagnóstico?
                </h2>
                
                <input 
                  autoFocus
                  type="text"
                  placeholder="Seu nome"
                  className="w-full bg-secondary border border-border p-5 rounded-xl text-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none text-foreground font-semibold transition-all"
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
                className="w-full bg-primary text-primary-foreground py-5 rounded-xl font-black text-lg glow-primary"
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
              className="max-w-md w-full bg-card p-8 sm:p-10 rounded-3xl border border-border space-y-8"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
                    <span className="text-primary font-black text-sm">✓</span>
                  </div>
                  <span className="text-sm text-primary font-bold mono-font uppercase tracking-wider">Etapa 2 concluída</span>
                </div>
                <p className="text-muted-foreground text-sm">Estrutura operacional mapeada.</p>
              </div>

              <div className="space-y-2 text-center">
                <h2 className="text-2xl sm:text-3xl font-black text-foreground leading-tight tracking-tight font-heading">
                  Seu diagnóstico está pronto.
                </h2>
                <p className="text-muted-foreground">Vamos mostrar onde está o vazamento — e como fechar.</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase mono-font tracking-wider">WhatsApp (Obrigatório)</label>
                  <input 
                    type="tel" 
                    placeholder="(69) 90000-0000" 
                    className="w-full bg-secondary border border-border p-4 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none text-foreground font-semibold text-lg transition-all" 
                    id="final-wa" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase mono-font tracking-wider">E-mail (Opcional)</label>
                  <input 
                    type="email" 
                    placeholder="seu@email.com" 
                    className="w-full bg-secondary border border-border p-4 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none text-foreground font-semibold text-lg transition-all" 
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
                className="w-full bg-primary text-primary-foreground py-5 rounded-xl font-black text-lg glow-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-3">
                    <Loader2 className="animate-spin" size={20} />
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
      <footer className="w-full py-4 px-6 border-t border-border/50">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs text-muted-foreground">
            Shekinah | Porto Velho – RO
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
