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
     let changed = false;
     let updates = {};

     // 1. Fix TBD for October 1 through October 9
     if (plan.date_start >= "2026-10-01" && plan.date_start <= "2026-10-09") {
         updates.topic = "[TBD] Pending Calendar Upload";
         updates.do_now = "TBD";
         updates.direct_instruction = "TBD";
         updates.exit_ticket = "TBD";
         updates.independent_practice = "TBD";
         updates.structured_exemplars = [];
         updates.checks_for_understanding = [];
         changed = true;
     } else {
         // 2. Fix the degree symbol issue for all other dates
         let planString = JSON.stringify(plan);
         if (planString.includes("\u00B0") || planString.includes("\uFFFD")) {
             planString = planString.replace(/\u00B0/g, " degrees").replace(/\uFFFD/g, " degrees");
             const fixedPlan = JSON.parse(planString);
             updates.do_now = fixedPlan.do_now;
             updates.direct_instruction = fixedPlan.direct_instruction;
             updates.structured_exemplars = fixedPlan.structured_exemplars;
             updates.exit_ticket = fixedPlan.exit_ticket;
             changed = true;
         }
     }
     
     if (changed) {
         console.log(`Updating ${plan.date_start}`);
         await fetch(`${supabaseUrl}?id=eq.${plan.id}`, {
            method: "PATCH",
            headers,
            body: JSON.stringify(updates)
         });
     }
  }
  console.log("Done fixing degrees and TBDs.");
}
run();
