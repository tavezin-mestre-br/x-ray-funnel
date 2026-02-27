import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserData } from '@/types/funnel';
import { QUESTIONS } from '@/constants/questions';
import Funnel from '@/components/funnel/Funnel';
import ScoreDisplay from '@/components/funnel/ScoreDisplay';
import { calculateResults } from '@/services/scoreLogic';
import { ArrowRight, Loader2, Shield, BarChart3, Users, Check, MessageCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import ThemeToggle from '@/components/ThemeToggle';
import Testimonial, { getTestimonialForStep } from '@/components/funnel/Testimonial';

type Step = 'intro' | 'funnel' | 'capture_company' | 'capture_final' | 'results' | 'booking_confirmed';

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
  const [companyData, setCompanyData] = useState({
    companyName: '',
    instagram: '',
    monthlyRevenue: '',
    contactName: ''
  });
  const [bookedDate, setBookedDate] = useState('');
  const [bookedTime, setBookedTime] = useState('');

  const handleBookingConfirmed = (date: string, time: string) => {
    setBookedDate(date);
    setBookedTime(time);
    setStep('booking_confirmed');
  };

  const handleStartDiagnosis = () => {
    setStep('funnel');
  };

  const handleResponse = (questionId: number, answer: any) => {
    setUserData(prev => ({
      ...prev,
      responses: { ...prev.responses, [questionId]: answer }
    }));

    if (currentQuestionIndex === 3 && step === 'funnel') {
      setStep('capture_company');
    } else if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setStep('capture_final');
    }
  };

  const handleCompanySubmit = () => {
    if (!companyData.contactName || !companyData.companyName || !companyData.monthlyRevenue) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }
    setUserData(prev => ({ ...prev, name: companyData.contactName }));
    setStep('funnel');
    setCurrentQuestionIndex(4);
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
          company_name: companyData.companyName,
          instagram: companyData.instagram,
          monthly_revenue: companyData.monthlyRevenue,
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
    if (step !== 'results' && step !== 'booking_confirmed') return null;
    return calculateResults(userData.responses, userData.badges);
  }, [step, userData.responses, userData.badges]);

  const getCurrentPhase = () => {
    if (currentQuestionIndex < 4) return 1;
    return 2;
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-background transition-colors duration-300">
      {/* Header */}
      <header className="w-full py-4 lg:py-5 px-4 lg:px-6 border-b border-border/50">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-lg lg:text-xl font-black text-foreground tracking-tight font-heading">SHEKINAH</span>
            <span className="text-[9px] lg:text-[10px] text-muted-foreground font-medium tracking-widest uppercase">Marketing · Tecnologia · IA</span>
          </div>
          <div className="flex items-center gap-3">
            {step === 'funnel' && (
              <span className="text-xs text-muted-foreground mono-font">Etapa {getCurrentPhase()} de 2</span>
            )}
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-start sm:items-center justify-center p-3 sm:p-4 lg:p-6 pt-4 sm:pt-4">
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
                <div className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/20 text-primary rounded-full text-[9px] lg:text-[10px] mono-font font-black tracking-[0.2em] uppercase">
                  IMPLEMENTAÇÃO DE MÁQUINA COMERCIAL COM IA
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground leading-[1.1] tracking-tight font-heading">
                  Sua empresa tem um problema comercial.<br/>
                  <span className="text-primary">Nós resolvemos em 30 dias.</span>
                </h1>

                <p className="text-muted-foreground text-base lg:text-lg font-medium leading-relaxed max-w-md mx-auto">
                  Responda 8 perguntas. Vamos te mostrar exatamente onde está o gargalo e como a Shekinah vai agir na sua empresa.
                </p>

                {/* Social proof badges */}
                <div className="flex flex-wrap items-center justify-center gap-3 lg:gap-4">
                  <div className="flex items-center gap-2 bg-card border border-border px-3 py-2 rounded-lg">
                    <Shield size={14} className="text-primary" />
                    <span className="text-xs font-semibold text-foreground">Dados protegidos</span>
                  </div>
                  <div className="flex items-center gap-2 bg-card border border-border px-3 py-2 rounded-lg">
                    <BarChart3 size={14} className="text-primary" />
                    <span className="text-xs font-semibold text-foreground">Diagnóstico gratuito</span>
                  </div>
                  <div className="flex items-center gap-2 bg-card border border-border px-3 py-2 rounded-lg">
                    <Users size={14} className="text-primary" />
                    <span className="text-xs font-semibold text-foreground">+R$ 2M gerenciados em tráfego</span>
                  </div>
                </div>

                <div className="bg-destructive/5 border border-destructive/20 p-4 lg:p-5 rounded-xl lg:rounded-2xl max-w-sm mx-auto space-y-2">
                  <p className="text-foreground text-sm lg:text-base font-black leading-relaxed">
                    Este diagnóstico é para empresários sérios.
                  </p>
                  <p className="text-muted-foreground text-xs lg:text-sm font-medium leading-relaxed">
                    Se você <span className="text-foreground font-black">fatura menos de R$ 30 mil/mês</span>, ainda não é o momento certo para a nossa solução.
                  </p>
                </div>
              </div>
              
              <button 
                onClick={handleStartDiagnosis}
                className="w-full max-w-sm mx-auto bg-primary text-primary-foreground py-4 lg:py-5 rounded-xl lg:rounded-2xl font-black text-base lg:text-xl hover:opacity-90 transition-all glow-primary group flex items-center justify-center gap-3"
              >
                Iniciar meu diagnóstico
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
              </button>

              {/* Intro testimonial */}
              <Testimonial data={getTestimonialForStep(0)} className="max-w-sm mx-auto text-left" />

              <p className="text-muted-foreground text-[10px] lg:text-xs font-medium text-center">
                Atendemos um número limitado de empresas por vez para garantir resultado.
              </p>
            </motion.div>
          )}

          {/* COMPANY DATA CAPTURE - After Etapa 1 */}
          {step === 'capture_company' && (
            <motion.div 
              key="capture_company"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="max-w-sm lg:max-w-md w-full space-y-5"
            >
              <div className="bg-card p-5 sm:p-6 lg:p-8 rounded-2xl lg:rounded-3xl border border-border space-y-5 lg:space-y-6">
                <div className="space-y-2 lg:space-y-3">
                  <div className="flex items-center gap-2 lg:gap-3">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg lg:rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <span className="text-primary font-black text-xs lg:text-sm">✓</span>
                    </div>
                    <span className="text-xs lg:text-sm text-primary font-bold mono-font uppercase tracking-wider">Etapa 1 concluída</span>
                  </div>
                  <p className="text-muted-foreground text-xs lg:text-sm">Perfil da empresa registrado.</p>
                </div>

                <div className="space-y-1.5 lg:space-y-2">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-foreground leading-tight tracking-tight font-heading">
                    Para personalizar seu plano de ação
                  </h2>
                  <p className="text-muted-foreground text-xs lg:text-sm">Precisamos de alguns dados para personalizar o diagnóstico.</p>
                </div>

                <div className="space-y-3 lg:space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] lg:text-xs font-bold text-muted-foreground uppercase mono-font tracking-wider">Seu Nome *</label>
                    <input 
                      autoFocus
                      type="text"
                      placeholder="Ex: João Silva"
                      value={companyData.contactName}
                      onChange={(e) => setCompanyData(prev => ({ ...prev, contactName: e.target.value }))}
                      className="w-full bg-secondary border border-border p-3.5 lg:p-4 rounded-lg lg:rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none text-foreground font-semibold text-base transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] lg:text-xs font-bold text-muted-foreground uppercase mono-font tracking-wider">Nome da Empresa *</label>
                    <input 
                      type="text"
                      placeholder="Ex: Studio Bella"
                      value={companyData.companyName}
                      onChange={(e) => setCompanyData(prev => ({ ...prev, companyName: e.target.value }))}
                      className="w-full bg-secondary border border-border p-3.5 lg:p-4 rounded-lg lg:rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none text-foreground font-semibold text-base transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] lg:text-xs font-bold text-muted-foreground uppercase mono-font tracking-wider">Faturamento Mensal *</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { label: 'Menos de R$ 100k', value: 'menos-100k' },
                        { label: 'R$ 100k – R$ 300k', value: '100k-300k' },
                        { label: 'R$ 300k – R$ 500k', value: '300k-500k' },
                        { label: 'R$ 500k – R$ 1M', value: '500k-1m' },
                        { label: 'Acima de R$ 1M', value: 'acima-1m' },
                      ].map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => setCompanyData(prev => ({ ...prev, monthlyRevenue: opt.value }))}
                          className={`p-3 rounded-lg border text-sm font-bold transition-all ${
                            companyData.monthlyRevenue === opt.value
                              ? 'bg-primary text-primary-foreground border-primary'
                              : 'bg-secondary border-border text-foreground hover:border-primary/50'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={handleCompanySubmit}
                  className="w-full bg-primary text-primary-foreground py-4 lg:py-5 rounded-lg lg:rounded-xl font-black text-base lg:text-lg glow-primary"
                >
                  Ver onde vamos agir →
                </button>
              </div>

              {/* Testimonial after company capture */}
              <Testimonial data={getTestimonialForStep(1)} />
            </motion.div>
          )}

          {/* FINAL CAPTURE - After Etapa 2 */}
          {step === 'capture_final' && (
            <motion.div 
              key="capture_final"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-sm lg:max-w-md w-full space-y-5"
            >
              <div className="bg-card p-5 sm:p-6 lg:p-8 rounded-2xl lg:rounded-3xl border border-border space-y-5 lg:space-y-6">
                <div className="space-y-2 lg:space-y-3">
                  <div className="flex items-center gap-2 lg:gap-3">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg lg:rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <span className="text-primary font-black text-xs lg:text-sm">✓</span>
                    </div>
                    <span className="text-xs lg:text-sm text-primary font-bold mono-font uppercase tracking-wider">Etapa 2 concluída</span>
                  </div>
                  <p className="text-muted-foreground text-xs lg:text-sm">Estrutura operacional mapeada.</p>
                </div>

                <div className="space-y-1.5 lg:space-y-2 text-center">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-foreground leading-tight tracking-tight font-heading">
                    Seu plano de ação está pronto.
                  </h2>
                  <p className="text-muted-foreground text-sm lg:text-base">Veja onde sua empresa está deixando dinheiro na mesa e como resolver.</p>
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
              </div>

              {/* Testimonial before results */}
              <Testimonial data={getTestimonialForStep(2)} />
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
            <ScoreDisplay results={results} userData={userData} onBookingConfirmed={handleBookingConfirmed} />
          )}

          {/* BOOKING CONFIRMED */}
          {step === 'booking_confirmed' && (
            <motion.div
              key="booking_confirmed"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-sm lg:max-w-md w-full text-center space-y-6 lg:space-y-8 py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                className="w-20 h-20 lg:w-24 lg:h-24 bg-success/10 border-2 border-success/30 rounded-full flex items-center justify-center mx-auto"
              >
                <Check size={40} className="text-success lg:hidden" />
                <Check size={48} className="hidden lg:block text-success" />
              </motion.div>

              <div className="space-y-2">
                <h2 className="text-2xl lg:text-3xl font-black text-foreground tracking-tight font-heading">
                  Reunião Agendada!
                </h2>
                <p className="text-base lg:text-lg text-muted-foreground font-medium">
                  {bookedDate} às {bookedTime}
                </p>
              </div>

              <div className="bg-card border border-border rounded-2xl p-5 lg:p-6 space-y-3">
                <p className="text-sm lg:text-base text-foreground font-medium leading-relaxed">
                  Entraremos em contato pelo WhatsApp para confirmar os detalhes da sua reunião de implementação.
                </p>
                <p className="text-xs text-muted-foreground">
                  Prepare-se: vamos analisar juntos o diagnóstico e montar seu plano de ação personalizado.
                </p>
              </div>

              <a
                href={`https://wa.me/5569992286633?text=${encodeURIComponent('Olá! Acabei de agendar minha reunião de implementação.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full max-w-sm mx-auto bg-[hsl(142,71%,45%)] hover:bg-[hsl(142,71%,40%)] text-white py-4 lg:py-5 rounded-xl lg:rounded-2xl font-black text-base lg:text-lg flex items-center justify-center gap-3 transition-all shadow-lg"
              >
                <MessageCircle size={20} />
                Falar pelo WhatsApp
              </a>

              <p className="text-[10px] lg:text-xs text-muted-foreground font-medium">
                Shekinah | Marketing · Tecnologia · IA
              </p>
            </motion.div>
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
