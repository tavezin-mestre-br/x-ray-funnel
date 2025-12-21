import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserData } from '@/types/funnel';
import { QUESTIONS } from '@/constants/questions';
import Funnel from '@/components/funnel/Funnel';
import ScoreDisplay from '@/components/funnel/ScoreDisplay';
import { calculateResults } from '@/services/scoreLogic';
import { CheckCircle, ArrowRight, Activity } from 'lucide-react';
import { AudioManager } from '@/services/audio';

type Step = 'intro' | 'pre-intro' | 'funnel' | 'capture_name' | 'capture_final' | 'results';

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

  const handleGoToPreIntro = () => {
    AudioManager.startBGM();
    setStep('pre-intro');
  };

  const handleStartRaioX = () => {
    AudioManager.playClick();
    setStep('funnel');
  };

  const handleResponse = (questionId: number, answer: any, timeSpent: number) => {
    setUserData(prev => {
      const q = QUESTIONS.find(q => q.id === questionId)!;
      let xpGain = 10;
      const cognitiveTypes = ['multi', 'ranking', 'allocation'];
      xpGain += cognitiveTypes.includes(q.type) ? 4 : 2;
      const isQuick = timeSpent < 6000;
      if (isQuick) xpGain += 3;
      const isTimedSuccess = q.timerSeconds && timeSpent < q.timerSeconds * 1000;
      if (isTimedSuccess) xpGain += 4;
      if (prev.streak >= 3) xpGain += 5;
      const newStreak = isQuick ? prev.streak + 1 : 0;
      const updatedResponses = { ...prev.responses, [questionId]: answer };
      const updatedBadges = [...prev.badges];
      
      if (Object.keys(updatedResponses).length === 2 && !updatedBadges.includes('Explorador')) {
        updatedBadges.push('Explorador');
        AudioManager.playBadge();
      }

      return {
        ...prev,
        responses: updatedResponses,
        xp: prev.xp + xpGain,
        streak: newStreak,
        badges: updatedBadges
      };
    });

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
    setCurrentQuestionIndex(3);
  };

  const handleFinalSubmit = (whatsapp: string, email: string) => {
    setUserData(prev => ({ ...prev, whatsapp, email }));
    setStep('results');
  };

  const results = useMemo(() => {
    if (step !== 'results') return null;
    return calculateResults(userData.responses);
  }, [step, userData.responses]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 relative bg-background">
      {/* Grain overlay */}
      <div className="bg-grain" />
      {/* Scanline effect */}
      <div className="scanline" />

      <AnimatePresence mode="wait">
        {/* INTRO SCREEN */}
        {step === 'intro' && (
          <motion.div 
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            className="max-w-2xl w-full text-center space-y-10 sm:space-y-12 py-6 sm:py-10"
          >
            <div className="space-y-6">
              <div className="inline-block px-5 py-2 bg-primary text-primary-foreground rounded-full text-[10px] mono-font font-black tracking-[0.3em] uppercase shadow-2xl">
                DIAGNÓSTICO DE DINHEIRO NO CAIXA
              </div>
              <p className="text-muted-foreground text-[10px] sm:text-xs font-bold uppercase tracking-widest mono-font px-2">
                DESCUBRA EM POUCOS MINUTOS ONDE SUA OPERAÇÃO DEIXA DINHEIRO NA MESA HOJE.
              </p>
              <h1 className="text-4xl sm:text-6xl font-black text-foreground leading-[1.1] tracking-tighter px-2 font-heading">
                Você não precisa de mais "marketing". <br/>Precisa colocar mais dinheiro no bolso.
              </h1>
              <p className="text-foreground text-xl sm:text-2xl font-bold leading-tight px-4 max-w-xl mx-auto">
                Muitas empresas tentam vender mais quando o problema real é dinheiro escapando na operação. Este diagnóstico mostra onde você já poderia estar ganhando mais antes de tentar escalar vendas.
              </p>
              <div className="bg-secondary border border-border p-6 sm:p-8 rounded-[2.5rem] text-muted-foreground text-sm sm:text-base font-semibold leading-relaxed max-w-lg mx-auto shadow-sm">
                Identificamos onde o dinheiro se perde entre a chegada da demanda e o fechamento — e como recuperá-lo usando marketing e IA.
              </div>
            </div>
            
            <button 
              onClick={handleGoToPreIntro}
              className="w-full bg-primary text-primary-foreground py-7 sm:py-8 rounded-[2.2rem] font-black text-2xl sm:text-3xl hover:opacity-90 transition-all shadow-strong transform active:scale-95 group max-w-md mx-auto"
            >
              Descobrir onde posso ganhar mais
              <span className="block text-[10px] font-black opacity-40 mt-1 tracking-widest uppercase">DIAGNÓSTICO DIRETO • FOCO EM CAIXA</span>
            </button>
            
            <div className="flex justify-center gap-4 sm:gap-6 text-[9px] sm:text-[10px] text-foreground font-black mono-font tracking-widest uppercase opacity-60">
              <span>Sem Perda de Tempo</span>
              <span>•</span>
              <span>Foco em Resultado</span>
            </div>
          </motion.div>
        )}

        {/* PRE-INTRO SCREEN */}
        {step === 'pre-intro' && (
          <motion.div 
            key="pre-intro"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="max-w-[400px] w-full bg-card px-6 py-10 sm:px-10 sm:py-14 rounded-[2.5rem] border border-border shadow-strong space-y-8 sm:space-y-10"
          >
            <div className="space-y-8 text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary text-primary-foreground rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto shadow-xl">
                <Activity size={32} className="opacity-90" strokeWidth={1.5} />
              </div>
              
              <div className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-black text-foreground leading-[1.15] tracking-tight font-heading">
                  Iniciando seu Raio-X <br className="hidden sm:block" /> de Escala 3³
                </h2>
                
                <p className="text-muted-foreground text-base sm:text-lg font-medium leading-relaxed max-w-[280px] mx-auto">
                  Vamos identificar onde seu crescimento está travando e quais oportunidades geram mais resultado.
                </p>
                
                <div className="pt-2">
                  <p className="text-muted-foreground text-[9px] sm:text-[10px] font-black uppercase tracking-[0.15em] mono-font leading-relaxed">
                    Duração: ~3 minutos • Entrega:<br className="sm:hidden" /> Plano 7/30/90 dias
                  </p>
                </div>
              </div>
            </div>
            
            <div className="pt-2">
              <button 
                onClick={handleStartRaioX}
                className="w-full bg-primary text-primary-foreground py-6 rounded-2xl font-black text-lg tracking-tight hover:opacity-90 transition-all shadow-strong group flex items-center justify-center gap-3 active:scale-[0.97]"
              >
                COMEÇAR RAIO-X 3³
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform opacity-70" />
              </button>
            </div>
          </motion.div>
        )}

        {/* NAME CAPTURE */}
        {step === 'capture_name' && (
          <motion.div 
            key="capture_name"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-md w-full bg-card p-10 rounded-[3rem] border-2 border-primary shadow-strong space-y-10"
          >
            <div className="space-y-4">
              <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mono-font">Identificação do Decisor</span>
              <h2 className="text-4xl font-black text-foreground leading-none tracking-tighter font-heading">Como posso te chamar?</h2>
            </div>
            
            <input 
              autoFocus
              type="text"
              placeholder="Seu nome"
              className="w-full bg-secondary border-2 border-border p-6 rounded-2xl text-2xl focus:border-primary outline-none text-foreground font-black"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.target as HTMLInputElement).value) {
                  handleNameSubmit((e.target as HTMLInputElement).value);
                }
              }}
            />
            
            <button 
              onClick={(e) => {
                const input = (e.currentTarget.previousSibling as HTMLInputElement);
                if (input.value) handleNameSubmit(input.value);
              }}
              className="w-full bg-primary text-primary-foreground py-6 rounded-2xl font-black text-xl shadow-xl"
            >
              Continuar Análise
            </button>
          </motion.div>
        )}

        {/* FINAL CAPTURE */}
        {step === 'capture_final' && (
          <motion.div 
            key="capture_final"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full bg-card p-10 rounded-[3.5rem] border-2 border-primary shadow-strong space-y-10"
          >
            <div className="space-y-6 text-center">
              <div className="w-24 h-24 bg-primary text-primary-foreground rounded-[2.5rem] flex items-center justify-center mx-auto mb-4 shadow-strong transform rotate-3 relative overflow-hidden">
                <CheckCircle size={56} />
              </div>
              <h2 className="text-4xl font-black text-foreground leading-none tracking-tighter font-heading">Receber Plano de Lucro?</h2>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-foreground uppercase mono-font tracking-widest">WhatsApp (Obrigatório)</label>
                <input type="tel" placeholder="(00) 90000-0000" className="w-full bg-secondary border-2 border-border p-5 rounded-2xl focus:border-primary outline-none text-foreground font-black text-2xl shadow-sm" id="final-wa" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-foreground uppercase mono-font tracking-widest">E-mail (Opcional)</label>
                <input type="email" placeholder="seu@email.com" className="w-full bg-secondary border-2 border-border p-5 rounded-2xl focus:border-primary outline-none text-foreground font-black text-2xl shadow-sm" id="final-email" />
              </div>
            </div>

            <button 
              onClick={() => {
                const wa = (document.getElementById('final-wa') as HTMLInputElement).value;
                const email = (document.getElementById('final-email') as HTMLInputElement).value;
                const isEmailValid = !email || (email.includes('@') && email.includes('.'));
                
                if (wa && isEmailValid) {
                  AudioManager.playBadge();
                  handleFinalSubmit(wa, email);
                } else if (!wa) {
                  alert("O WhatsApp é obrigatório.");
                } else {
                  alert("E-mail inválido.");
                }
              }}
              className="w-full bg-primary text-primary-foreground py-8 rounded-[2rem] font-black text-2xl hover:opacity-90 transition-all shadow-strong group"
            >
              Liberar meu Plano de Lucro
            </button>
          </motion.div>
        )}

        {/* FUNNEL */}
        {step === 'funnel' && (
          <Funnel 
            question={QUESTIONS[currentQuestionIndex]} 
            onResponse={handleResponse}
            userData={userData}
            currentIndex={currentQuestionIndex + 1}
            totalSteps={QUESTIONS.length}
          />
        )}

        {/* RESULTS */}
        {step === 'results' && results && (
          <ScoreDisplay results={results} userData={userData} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
