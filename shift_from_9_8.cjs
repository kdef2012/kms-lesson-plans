const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');
const SUPABASE_URL = 'https://qnmndsnbftcspzrlfnab.supabase.co';
const SUPABASE_KEY = fs.readFileSync('.env', 'utf-8').match(/VITE_SUPABASE_ANON_KEY=(.*)/)[1];
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

function getNextSchoolDay(dateString) {
  const d = new Date(dateString + 'T12:00:00Z');
  d.setUTCDate(d.getUTCDate() + 1);
  if (d.getUTCDay() === 6) { // Saturday
    d.setUTCDate(d.getUTCDate() + 2); // Skip to Monday
  } else if (d.getUTCDay() === 0) { // Sunday
    d.setUTCDate(d.getUTCDate() + 1); // Skip to Monday
  }
  return d.toISOString().split('T')[0];
}

function getWeekLabel(dateString) {
  const d = new Date(dateString + 'T12:00:00Z');
  const dayOfWeek = d.getUTCDay(); // 0 is Sunday, 1 is Monday
  
  // Find the Monday of this week
  const monday = new Date(d);
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  monday.setUTCDate(monday.getUTCDate() + diffToMonday);
  
  // Find the Friday of this week
  const friday = new Date(monday);
  friday.setUTCDate(friday.getUTCDate() + 4);
  
  return `${monday.getUTCMonth() + 1}/${monday.getUTCDate()}-${friday.getUTCMonth() + 1}/${friday.getUTCDate()}`;
}

async function run() {
  // Fetch all plans from 9/8 onwards
  const { data: plans, error: fetchError } = await supabase
    .from('lesson_plans')
    .select('*')
    .gte('date_start', '2026-09-08')
    .order('date_start', { ascending: false }); // Start from the latest to avoid unique constraint collisions if updating, though we will delete/insert.

  if (fetchError) {
    console.error(fetchError);
    return;
  }

  // Delete all existing plans from 9/8 onwards
  const idsToDelete = plans.map(p => p.id);
  const { error: deleteError } = await supabase.from('lesson_plans').delete().in('id', idsToDelete);
  
  if (deleteError) {
    console.error(deleteError);
    return;
  }

  // Map to new dates
  const newPlans = plans.map(p => {
    const newDate = getNextSchoolDay(p.date_start);
    const newWeekLabel = getWeekLabel(newDate);
    
    return {
      ...p,
      id: undefined, // Let supabase generate a new id or keep the old? We can just keep the old id or omit it. Omitting is safer for inserts.
      date_start: newDate,
      week_label: newWeekLabel
    };
  });
  
  // Clean up undefined ids
  newPlans.forEach(p => delete p.id);

  // Add the Testing placeholder for 9/8
  newPlans.push({
    date_start: '2026-09-08',
    week_label: '9/7-9/11',
    topic: '[Testing] Finish up testing',
    objective_3m: 'Complete testing requirements.',
    standard: 'N/A',
    do_now: 'Prepare for testing.',
    direct_instruction: 'Students will finish their ongoing testing today.',
    exit_ticket: 'Testing complete.',
    structured_exemplars: []
  });

  const { error: insertError } = await supabase.from('lesson_plans').insert(newPlans);
  if (insertError) {
    console.error(insertError);
  } else {
    console.log('Successfully shifted all lesson plans up a day and added a Testing placeholder for 9/8!');
  }
}

run();
