import fetch from "node-fetch";

const supabaseUrl = "https://qnmndsnbftcspzrlfnab.supabase.co/rest/v1/lesson_plans";
const headers = {
  "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFubW5kc25iZnRjc3B6cmxmbmFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5NDAwNzcsImV4cCI6MjEwMTUxNjA3N30.xSFqQrO6iCxkE4AqvrDC541zH0oWUatDkxzRxcpe5co",
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFubW5kc25iZnRjc3B6cmxmbmFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5NDAwNzcsImV4cCI6MjEwMTUxNjA3N30.xSFqQrO6iCxkE4AqvrDC541zH0oWUatDkxzRxcpe5co"
};

async function run() {
  const r21 = await fetch(`${supabaseUrl}?date_start=eq.2026-09-21&select=date_start,structured_exemplars`, { headers });
  const d21 = await r21.json();
  
  const r23 = await fetch(`${supabaseUrl}?date_start=eq.2026-09-23&select=date_start,structured_exemplars`, { headers });
  const d23 = await r23.json();

  console.log("=== 9/21 ALL ===");
  d21[0].structured_exemplars.forEach((ex, i) => console.log(i, ex.question));
  
  console.log("=== 9/23 ALL ===");
  d23[0].structured_exemplars.forEach((ex, i) => console.log(i, ex.question));
}
run();
