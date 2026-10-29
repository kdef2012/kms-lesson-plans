const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');
const SUPABASE_URL = 'https://qnmndsnbftcspzrlfnab.supabase.co';
const SUPABASE_KEY = fs.readFileSync('.env', 'utf-8').match(/VITE_SUPABASE_ANON_KEY=(.*)/)[1];
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function run() {
  const { data: plans } = await supabase.from('lesson_plans').select('id, date_start, topic').gte('date_start', '2026-09-21');
  
  for (const plan of plans) {
    let newDoNow = '';
    
    // Generate a specific math problem based on the topic
    if (plan.topic.includes('Dilation')) {
      newDoNow = 'Graph triangle ABC with A(0,2), B(2,2), C(2,0). Dilate it by a scale factor of 2 centered at the origin. What are the new coordinates?';
    } else if (plan.topic.includes('Similar')) {
      newDoNow = 'Two rectangles are similar. The first has a length of 4 and width of 3. If the second has a length of 12, what is its width?';
    } else if (plan.topic.includes('Quotient')) {
      newDoNow = 'Solve the proportion: 3/x = 9/15. Show your work.';
    } else if (plan.topic.includes('Review') || plan.topic.includes('Assessment')) {
      newDoNow = 'A point P(-3, 5) is rotated 90 degrees clockwise around the origin, then translated down 2 units. Find the final coordinates.';
    } else {
      newDoNow = 'Identify the rigid motion that maps the point (1, -4) to (-1, 4).';
    }
    
    await supabase.from('lesson_plans').update({ do_now: newDoNow }).eq('id', plan.id);
  }
  
  console.log('Successfully replaced all generic Do Nows with specific math tasks!');
}

run();
