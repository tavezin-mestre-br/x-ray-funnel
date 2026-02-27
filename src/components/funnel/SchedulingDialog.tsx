import React, { useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarCheck, Clock, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { UserData } from '@/types/funnel';

const TIME_SLOTS = [
  '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00',
  '18:00', '19:00', '20:00',
];

interface SchedulingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userData: UserData;
  leadId?: string;
  onBookingConfirmed?: (date: string, time: string) => void;
}

const SchedulingDialog: React.FC<SchedulingDialogProps> = ({
  open,
  onOpenChange,
  userData,
  leadId,
  onBookingConfirmed,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isSunday = (date: Date) => date.getDay() === 0;

  const handleConfirm = async () => {
    if (!selectedDate || !selectedTime) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('bookings').insert({
        lead_id: leadId || null,
        name: userData.name,
        phone: userData.whatsapp,
        scheduled_date: format(selectedDate, 'yyyy-MM-dd'),
        scheduled_time: selectedTime,
      });

      if (error) throw error;

      const formattedDate = format(selectedDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
      if (onBookingConfirmed) {
        onBookingConfirmed(formattedDate, selectedTime);
      } else {
        toast({
          title: '✅ Reunião agendada!',
          description: `${formattedDate} às ${selectedTime}`,
        });
      }
    } catch {
      toast({
        title: 'Erro ao agendar',
        description: 'Tente novamente ou entre em contato pelo WhatsApp.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = (value: boolean) => {
    if (!value) {
      setSelectedDate(undefined);
      setSelectedTime(null);
    }
    onOpenChange(value);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-black font-heading">
            <CalendarCheck size={20} className="text-primary" />
            Agendar Implementação
          </DialogTitle>
        </DialogHeader>

        <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              {/* Step 1: Date */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-muted-foreground mono-font uppercase tracking-widest">
                  Escolha a data
                </p>
                <div className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      setSelectedDate(date);
                      setSelectedTime(null);
                    }}
                    disabled={(date) => {
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      return date < today || isSunday(date);
                    }}
                    locale={ptBR}
                    className={cn("p-3 pointer-events-auto")}
                  />
                </div>
              </div>

              {/* Step 2: Time */}
              <AnimatePresence>
                {selectedDate && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2 overflow-hidden"
                  >
                    <p className="text-xs font-bold text-muted-foreground mono-font uppercase tracking-widest flex items-center gap-1.5">
                      <Clock size={12} />
                      Escolha o horário — {format(selectedDate, "dd/MM", { locale: ptBR })}
                    </p>
                    <div className="grid grid-cols-4 gap-2">
                      {TIME_SLOTS.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={cn(
                            "py-2 px-1 rounded-lg text-xs font-bold transition-all border",
                            selectedTime === time
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-secondary/50 text-foreground border-border hover:border-primary/50"
                          )}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Confirm */}
              <AnimatePresence>
                {selectedDate && selectedTime && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                  >
                    <button
                      onClick={handleConfirm}
                      disabled={isSubmitting}
                      className="w-full bg-primary text-primary-foreground py-3.5 rounded-xl font-black text-sm glow-primary flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-50 min-h-[48px]"
                    >
                      {isSubmitting ? 'Agendando...' : (
                        <>
                          <CalendarCheck size={16} />
                          Confirmar {format(selectedDate, "dd/MM")} às {selectedTime}
                        </>
                      )}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default SchedulingDialog;
