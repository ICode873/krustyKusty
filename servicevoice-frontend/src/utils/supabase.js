import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lequadkzlfuefrpobqeo.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlcXVhZGt6bGZ1ZWZycG9icWVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0MzY2NTksImV4cCI6MjA2MDAxMjY1OX0.aQ4Jk8qwL8TFXrGIdLXnza8syGIKEz9hZ7-25to5maI'
export const supabase = createClient(supabaseUrl, supabaseKey)
