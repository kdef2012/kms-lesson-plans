import fetch from "node-fetch";

const supabaseUrl = "https://qnmndsnbftcspzrlfnab.supabase.co/rest/v1/lesson_plans";
const headers = {
  "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFubW5kc25iZnRjc3B6cmxmbmFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5NDAwNzcsImV4cCI6MjEwMTUxNjA3N30.xSFqQrO6iCxkE4AqvrDC541zH0oWUatDkxzRxcpe5co",
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFubW5kc25iZnRjc3B6cmxmbmFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5NDAwNzcsImV4cCI6MjEwMTUxNjA3N30.xSFqQrO6iCxkE4AqvrDC541zH0oWUatDkxzRxcpe5co",
  "Content-Type": "application/json"
};

async function run() {
  const res = await fetch(`${supabaseUrl}?date_start=eq.2026-09-21`, { headers });
  const data = await res.json();
  const plan = data[0];
  console.log(JSON.stringify({
    do_now: plan.do_now?.substring(0, 200),
    direct_instruction: plan.direct_instruction?.substring(0, 200),
    guided_practice: plan.structured_exemplars?.[0],
    group_practice: plan.checks_for_understanding?.[0],
    exit_ticket: plan.exit_ticket?.[0],
    independent_practice: plan.independent_practice?.[0]
  }, null, 2));
}
run();
