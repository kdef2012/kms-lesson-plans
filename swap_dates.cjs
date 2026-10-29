const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');
const SUPABASE_URL = 'https://qnmndsnbftcspzrlfnab.supabase.co';
const SUPABASE_KEY = fs.readFileSync('.env', 'utf-8').match(/VITE_SUPABASE_ANON_KEY=(.*)/)[1];
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function run() {
  // Fetch both plans
  const { data: plan1, error: err1 } = await supabase.from('lesson_plans').select('*').eq('date_start', '2026-09-09').single();
  const { data: plan2, error: err2 } = await supabase.from('lesson_plans').select('*').eq('date_start', '2026-09-10').single();

  if (err1 || err2) {
    console.error('Error fetching plans:', err1 || err2);
    return;
  }

  // Update plan1 to temp date
  await supabase.from('lesson_plans').update({ date_start: '2026-01-01' }).eq('id', plan1.id);
  
  // Update plan2 to 9/9
  await supabase.from('lesson_plans').update({ date_start: '2026-09-09' }).eq('id', plan2.id);

  // Update plan1 to 9/10
  const { error: errFinal } = await supabase.from('lesson_plans').update({ date_start: '2026-09-10' }).eq('id', plan1.id);

  if (errFinal) {
    console.error('Error on final update:', errFinal);
  } else {
    console.log(`Successfully swapped! 
    9/9 is now: ${plan2.topic}
    9/10 is now: ${plan1.topic}`);
  }
}

run();
