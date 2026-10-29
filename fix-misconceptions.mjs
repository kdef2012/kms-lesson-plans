import fetch from "node-fetch";

const supabaseUrl = "https://qnmndsnbftcspzrlfnab.supabase.co/rest/v1/lesson_plans";
const headers = {
  "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFubW5kc25iZnRjc3B6cmxmbmFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5NDAwNzcsImV4cCI6MjEwMTUxNjA3N30.xSFqQrO6iCxkE4AqvrDC541zH0oWUatDkxzRxcpe5co",
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFubW5kc25iZnRjc3B6cmxmbmFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5NDAwNzcsImV4cCI6MjEwMTUxNjA3N30.xSFqQrO6iCxkE4AqvrDC541zH0oWUatDkxzRxcpe5co",
  "Content-Type": "application/json",
  "Prefer": "return=minimal"
};

function getBetterMisconception(topic) {
    const t = (topic || "").toLowerCase();
    if (t.includes("rotat")) return "Confusing clockwise and counterclockwise, or rotating around a point other than the origin.";
    if (t.includes("reflect")) return "Reflecting across the x-axis instead of the y-axis, or miscounting the distance to the line of reflection.";
    if (t.includes("translat")) return "Adding to the x-coordinate instead of the y-coordinate, or moving in the negative direction instead of positive.";
    if (t.includes("dilat") || t.includes("scal") || t.includes("similar")) return "Adding the scale factor to the coordinates instead of multiplying by it.";
    if (t.includes("congruen")) return "Assuming figures are congruent just by appearance without verifying rigid motions.";
    if (t.includes("exponent") || t.includes("power")) return "Multiplying the bases together instead of adding the exponents.";
    if (t.includes("root") || t.includes("rational")) return "Dividing the number by 2 instead of finding its square root.";
    if (t.includes("review") || t.includes("assess") || t.includes("test")) return "Stopping after the first step of a multi-step problem without fully answering the prompt.";
    return "Applying the incorrect inverse operation when trying to isolate the variable.";
}

async function run() {
  const res = await fetch(supabaseUrl, { headers });
  const plans = await res.json();
  
  for (let plan of plans) {
     if (!plan.structured_exemplars) continue;
     
     let changed = false;
     const newExemplars = plan.structured_exemplars.map(ex => {
         if (ex.misconception && ex.misconception.trim().toLowerCase() === "check work carefully.") {
             changed = true;
             return { ...ex, misconception: getBetterMisconception(plan.topic) };
         }
         return ex;
     });
     
     if (changed) {
         console.log(`Fixing misconceptions for ${plan.date_start} (${plan.topic})`);
         await fetch(`${supabaseUrl}?id=eq.${plan.id}`, {
            method: "PATCH",
            headers,
            body: JSON.stringify({ structured_exemplars: newExemplars })
         });
     }
  }
  console.log("Done fixing misconceptions.");
}
run();
