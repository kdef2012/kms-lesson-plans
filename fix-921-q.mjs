import fetch from "node-fetch";

const supabaseUrl = "https://qnmndsnbftcspzrlfnab.supabase.co/rest/v1/lesson_plans";
const headers = {
  "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFubW5kc25iZnRjc3B6cmxmbmFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5NDAwNzcsImV4cCI6MjEwMTUxNjA3N30.xSFqQrO6iCxkE4AqvrDC541zH0oWUatDkxzRxcpe5co",
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFubW5kc25iZnRjc3B6cmxmbmFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5NDAwNzcsImV4cCI6MjEwMTUxNjA3N30.xSFqQrO6iCxkE4AqvrDC541zH0oWUatDkxzRxcpe5co",
  "Content-Type": "application/json",
  "Prefer": "return=minimal"
};

async function run() {
  const res = await fetch(`${supabaseUrl}?date_start=eq.2026-09-21`, { headers });
  const plans = await res.json();
  const plan = plans[0];
  
  const newExemplars = plan.structured_exemplars.map(ex => {
      if (ex.question && ex.question.includes("area of 10") && ex.question.includes("scale factor of 4")) {
          return {
              ...ex,
              text: "Triangle ABC has an area of 10. It is dilated by a scale factor of 4. Does the area change?",
              question: "Triangle ABC has an area of 10. It is dilated by a scale factor of 4. Does the area change?",
              type: "multiple-choice",
              options: ["Yes", "No"],
              correctAnswer: "Yes",
              correct_answer: "Yes, because a dilation changes the size of the figure."
          };
      }
      return ex;
  });
  
  await fetch(`${supabaseUrl}?id=eq.${plan.id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ structured_exemplars: newExemplars })
  });
  
  console.log("Successfully updated the question for 9/21!");
}
run();
