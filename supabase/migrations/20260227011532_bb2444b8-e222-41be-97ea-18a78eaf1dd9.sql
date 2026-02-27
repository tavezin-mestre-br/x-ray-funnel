
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  scheduled_date DATE NOT NULL,
  scheduled_time TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert bookings"
ON public.bookings
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Service role can manage bookings"
ON public.bookings
FOR ALL
USING (auth.role() = 'service_role'::text);
