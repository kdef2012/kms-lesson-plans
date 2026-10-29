import fetch from "node-fetch";

const supabaseUrl = "https://qnmndsnbftcspzrlfnab.supabase.co/rest/v1/lesson_plans";
const headers = {
  "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFubW5kc25iZnRjc3B6cmxmbmFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5NDAwNzcsImV4cCI6MjEwMTUxNjA3N30.xSFqQrO6iCxkE4AqvrDC541zH0oWUatDkxzRxcpe5co",
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFubW5kc25iZnRjc3B6cmxmbmFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5NDAwNzcsImV4cCI6MjEwMTUxNjA3N30.xSFqQrO6iCxkE4AqvrDC541zH0oWUatDkxzRxcpe5co",
  "Content-Type": "application/json",
  "Prefer": "return=minimal"
};

const cfuStrategies = [
    { cfu: 'Turn and Talk: Discuss the core concept with your neighbor.', method: 'DOK 2 / Turn & Talk' },
    { cfu: 'Stop and Jot: Write down the most important thing you learned in the last 5 minutes.', method: 'DOK 2 / Stop & Jot' },
    { cfu: 'Think-Pair-Share: Think about the core concept for 30 seconds, then pair up and share your thoughts.', method: 'DOK 2 / Think-Pair-Share' },
    { cfu: 'Fist to Five: Rate your understanding from 0 (completely lost) to 5 (I could teach it) by holding up your fingers.', method: 'DOK 1 / Fist to Five' },
    { cfu: 'Thumbs Up/Down: Show a thumbs up if you feel confident about the concept, or thumbs down if you need more help.', method: 'DOK 1 / Thumbs' },
    { cfu: 'Cold Call Prep: Take 1 minute to formulate summary in your head. A random student will be called upon.', method: 'DOK 2 / Cold Call' }
];

async function run() {
  const res = await fetch(supabaseUrl, { headers });
  const plans = await res.json();
  
  for (let plan of plans) {
     let isGarbage = false;
     
     if (plan.checks_for_understanding && plan.checks_for_understanding.length > 0) {
         if (!plan.checks_for_understanding[0].cfu) {
             isGarbage = true;
         }
     } else {
         isGarbage = true; // Either null or empty
     }
     
     // 10/1 - 10/9 TBD check so we don't mess up the TBDs
     if (plan.date_start >= "2026-10-01" && plan.date_start <= "2026-10-09") {
         if (plan.checks_for_understanding && plan.checks_for_understanding.length !== 0) {
             console.log(`Fixing TBD CFU for ${plan.date_start}`);
             await fetch(`${supabaseUrl}?id=eq.${plan.id}`, {
                 method: "PATCH", headers, body: JSON.stringify({ checks_for_understanding: [] })
             });
         }
         continue;
     }
     
     if (isGarbage) {
         const hashStr = (plan.topic || '').split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
         const defaultCfu = cfuStrategies[hashStr % cfuStrategies.length];
         
         const newCFU = [
            { cfu: defaultCfu.cfu, method: defaultCfu.method }
         ];
         
         console.log(`Fixing CFU for ${plan.date_start}`);
         await fetch(`${supabaseUrl}?id=eq.${plan.id}`, {
            method: "PATCH",
            headers,
            body: JSON.stringify({ checks_for_understanding: newCFU })
         });
     }
  }
  console.log("Done fixing CFUs.");
}
run();
