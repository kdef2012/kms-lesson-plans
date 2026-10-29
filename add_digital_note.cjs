const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');
const SUPABASE_URL = 'https://qnmndsnbftcspzrlfnab.supabase.co';
const SUPABASE_KEY = fs.readFileSync('.env', 'utf-8').match(/VITE_SUPABASE_ANON_KEY=(.*)/)[1];
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function run() {
  const dates = ['2026-09-14', '2026-09-15', '2026-09-16', '2026-09-17', '2026-09-18'];
  for (const d of dates) {
    const { data } = await supabase.from('lesson_plans').select('direct_instruction').eq('date_start', d).single();
    if (data) {
      const updatedDI = data.direct_instruction + '\n\n---\n## Independent Practice\n---\n*Note: Students will complete their independent practice digitally.*';
      await supabase.from('lesson_plans').update({ direct_instruction: updatedDI }).eq('date_start', d);
    }
  }
  console.log('Added digital independent practice note to all 5 days!');
}
run();
