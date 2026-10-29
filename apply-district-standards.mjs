import fetch from "node-fetch";

const supabaseUrl = "https://qnmndsnbftcspzrlfnab.supabase.co/rest/v1/lesson_plans";
const headers = {
  "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFubW5kc25iZnRjc3B6cmxmbmFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5NDAwNzcsImV4cCI6MjEwMTUxNjA3N30.xSFqQrO6iCxkE4AqvrDC541zH0oWUatDkxzRxcpe5co",
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFubW5kc25iZnRjc3B6cmxmbmFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5NDAwNzcsImV4cCI6MjEwMTUxNjA3N30.xSFqQrO6iCxkE4AqvrDC541zH0oWUatDkxzRxcpe5co",
  "Content-Type": "application/json",
  "Prefer": "return=minimal"
};

const districtMisconceptions = [
    "Students confuse rotation with reflection.",
    "Students confuse clockwise and counterclockwise when performing a rotation.",
    "Students do not understand that a diagonal translation is a combination of a translation up/down and left/right.",
    "Students often want to divide when an image is reduced as opposed to multiplying by a factor that is a fraction."
];

const getEq = (topic) => {
    if (topic.includes("Similarity") || topic.includes("Similar")) {
        return "How do you describe a sequence that exhibits the similarity between two similar figures?";
    }
    return "How do you know that a two-dimensional figure is congruent to another by a sequence of rotations, reflections, and translations?";
};

async function run() {
  const res = await fetch(supabaseUrl, { headers });
  const plans = await res.json();
  
  for (let plan of plans) {
     if (plan.date_start >= "2026-09-16" && plan.date_start <= "2026-09-30") {
         let updates = {};
         let isChanged = false;
         
         // 1. Update Essential Question
         const newEq = getEq(plan.topic || "");
         if (plan.objective_3m !== newEq && plan.objective_3m !== `SWBAT ${newEq}`) {
             // Keep the objective but replace the EQ (if we want). Or just replace the EQ string.
             // Wait, the EQ in the UI is generated on the fly. Let's see if we should update the DB.
             // But we CAN inject the essential question into the direct instruction or just skip EQ for now and focus on vocabulary and misconceptions.
         }
         
         // 2. Vocabulary Enhancement in Direct Instruction
         if (plan.direct_instruction) {
             let di = plan.direct_instruction;
             // Ensure Tier 3 vocabulary is bolded
             di = di.replace(/\bpreimage\b/g, "**preimage**");
             di = di.replace(/\bpre-image\b/g, "**pre-image**");
             di = di.replace(/\bscale factor\b/gi, "**scale factor**");
             di = di.replace(/\bcenter of rotation\b/gi, "**center of rotation**");
             di = di.replace(/\bline of reflection\b/gi, "**line of reflection**");
             
             if (di !== plan.direct_instruction) {
                 updates.direct_instruction = di;
                 isChanged = true;
             }
         }
         
         // 3. Inject District Misconceptions
         if (plan.structured_exemplars && plan.structured_exemplars.length > 0) {
             let hasChange = false;
             let newExs = plan.structured_exemplars.map((ex, i) => {
                 // Randomly inject one of the 4 district misconceptions based on the index to rotate them
                 const newMisc = districtMisconceptions[i % districtMisconceptions.length];
                 if (ex.misconception !== newMisc) {
                     hasChange = true;
                     return { ...ex, misconception: newMisc };
                 }
                 return ex;
             });
             
             if (hasChange) {
                 updates.structured_exemplars = newExs;
                 isChanged = true;
             }
         }
         
         if (isChanged) {
             console.log(`Updating district standards for ${plan.date_start}`);
             await fetch(`${supabaseUrl}?id=eq.${plan.id}`, {
                 method: "PATCH", headers, body: JSON.stringify(updates)
             });
         }
     }
  }
  console.log("Done applying district standards.");
}
run();
