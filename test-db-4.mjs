async function run() {
  const res = await fetch("https://qnmndsnbftcspzrlfnab.supabase.co/rest/v1/lesson_plans?select=*&order=date_start.asc", {
    headers: {
      "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFubW5kc25iZnRjc3B6cmxmbmFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5NDAwNzcsImV4cCI6MjEwMTUxNjA3N30.xSFqQrO6iCxkE4AqvrDC541zH0oWUatDkxzRxcpe5co",
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFubW5kc25iZnRjc3B6cmxmbmFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5NDAwNzcsImV4cCI6MjEwMTUxNjA3N30.xSFqQrO6iCxkE4AqvrDC541zH0oWUatDkxzRxcpe5co"
    }
  });
  const data = await res.json();
  const weeks = data.filter(d => new Date(d.date_start) >= new Date('2026-09-21'));
  console.log(JSON.stringify(weeks.map(w => ({ date: w.date_start, topic: w.topic, ex: w.structured_exemplars?.[0]?.text?.substring(0, 50) })), null, 2));
}
run();
