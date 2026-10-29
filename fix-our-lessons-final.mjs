import fetch from "node-fetch";
import fs from "fs";

const supabaseUrl = "https://qnmndsnbftcspzrlfnab.supabase.co/rest/v1/lesson_plans";
const headers = {
  "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFubW5kc25iZnRjc3B6cmxmbmFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5NDAwNzcsImV4cCI6MjEwMTUxNjA3N30.xSFqQrO6iCxkE4AqvrDC541zH0oWUatDkxzRxcpe5co",
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFubW5kc25iZnRjc3B6cmxmbmFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5NDAwNzcsImV4cCI6MjEwMTUxNjA3N30.xSFqQrO6iCxkE4AqvrDC541zH0oWUatDkxzRxcpe5co",
  "Content-Type": "application/json",
  "Prefer": "return=minimal"
};

async function updatePlan(date, updates) {
  const res = await fetch(`${supabaseUrl}?date_start=eq.${date}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(updates)
  });
  if (!res.ok) console.error(`Failed to update ${date}: ${res.statusText}`);
  else console.log(`Updated ${date} successfully`);
}

const allData = JSON.parse(fs.readFileSync('generated-exemplars.json', 'utf8'));

const exitTickets = {
  "2026-09-22": "A triangle has a vertex at (4, -2). It is dilated by a scale factor of 2 centered at the origin. What are the coordinates of the new vertex?",
  "2026-09-23": "A point (-6, 9) is dilated by a scale factor of 1/3 centered at the origin. What is the image point?",
  "2026-09-24": "Triangle ABC has vertices A(1, 1), B(2, 3), and C(4, 1). Triangle A'B'C' has vertices A'(3, 3), B'(6, 9), and C'(12, 3). What is the scale factor of the dilation?",
  "2026-09-25": "Rectangle A is 3 by 5. Rectangle B is 6 by 10. Are they similar? What is the scale factor?",
  "2026-09-28": "Two triangles are similar. Triangle 1 has sides 5 and 8. The corresponding sides on Triangle 2 are 15 and x. Find x.",
  "2026-09-29": "Describe a sequence of transformations that maps a 2x2 square centered at the origin to a 4x4 square centered at (0, 5)."
};

async function run() {
  for(let date in allData) {
     const exemplars = allData[date];
     
     // Note: do_now and direct_instruction are ALREADY CORRECT in the DB from the Open Up Resources fetch!
     // We only need to update structured_exemplars, exit_ticket, and independent_practice.
     
     const plan = {
         structured_exemplars: exemplars,
         exit_ticket: exitTickets[date],
         independent_practice: "Students will complete the rigorous EOG-ready problems digitally on TicketOut."
     };
     await updatePlan(date, plan);
  }
}
run();
