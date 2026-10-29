import fetch from "node-fetch";

const supabaseUrl = "https://qnmndsnbftcspzrlfnab.supabase.co/rest/v1/lesson_plans";
const headers = {
  "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFubW5kc25iZnRjc3B6cmxmbmFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5NDAwNzcsImV4cCI6MjEwMTUxNjA3N30.xSFqQrO6iCxkE4AqvrDC541zH0oWUatDkxzRxcpe5co",
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFubW5kc25iZnRjc3B6cmxmbmFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5NDAwNzcsImV4cCI6MjEwMTUxNjA3N30.xSFqQrO6iCxkE4AqvrDC541zH0oWUatDkxzRxcpe5co",
  "Content-Type": "application/json",
  "Prefer": "return=minimal"
};

async function run() {
  const res = await fetch(supabaseUrl, { headers });
  const plans = await res.json();
  
  for (let plan of plans) {
     if (!plan.structured_exemplars) continue;
     
     let changed = false;
     const newExemplars = plan.structured_exemplars.map(ex => {
         let modified = { ...ex };
         if (ex.text && !ex.question) {
             modified.question = ex.text;
             changed = true;
         }
         if (ex.type === "multiple_choice") {
             modified.type = "multiple-choice";
             changed = true;
         }
         if (ex.type === "open_ended") {
             modified.type = "open-ended";
             changed = true;
         }
         return modified;
     });
     
     if (changed) {
         console.log(`Fixing schema for ${plan.date_start}`);
         await fetch(`${supabaseUrl}?id=eq.${plan.id}`, {
            method: "PATCH",
            headers,
            body: JSON.stringify({ structured_exemplars: newExemplars })
         });
     }
  }
  console.log("Done fixing schema.");
}
run();
