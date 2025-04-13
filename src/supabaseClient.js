import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ziefkjrozpcagzzvdfgo.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InppZWZranJvenBjYWd6enZkZmdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0ODc2ODEsImV4cCI6MjA2MDA2MzY4MX0.OUiM5x25fFx56VnNBCu_0Z26RxlW2ra8v4HjgUwDH5o'  // trovi tutto in Supabase > Project Settings > API
export const supabase = createClient(supabaseUrl, supabaseKey)
