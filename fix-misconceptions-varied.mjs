import fetch from "node-fetch";

const supabaseUrl = "https://qnmndsnbftcspzrlfnab.supabase.co/rest/v1/lesson_plans";
const headers = {
  "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFubW5kc25iZnRjc3B6cmxmbmFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5NDAwNzcsImV4cCI6MjEwMTUxNjA3N30.xSFqQrO6iCxkE4AqvrDC541zH0oWUatDkxzRxcpe5co",
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFubW5kc25iZnRjc3B6cmxmbmFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5NDAwNzcsImV4cCI6MjEwMTUxNjA3N30.xSFqQrO6iCxkE4AqvrDC541zH0oWUatDkxzRxcpe5co",
  "Content-Type": "application/json",
  "Prefer": "return=minimal"
};

const misconceptionBanks = {
    rotation: [
        "Confused clockwise and counterclockwise directions.",
        "Rotated around a vertex instead of the origin.",
        "Swapped the x and y coordinates but forgot to change the sign.",
        "Applied a 90-degree rule instead of the 180-degree rule.",
        "Lost track of the quadrant the image should end up in.",
        "Reflected the figure instead of rotating it."
    ],
    reflection: [
        "Reflected across the x-axis instead of the y-axis.",
        "Miscounted the distance from the point to the line of reflection.",
        "Reflected across the line y=x instead of the given axis.",
        "Translated the figure instead of reflecting it.",
        "Forgot to reflect all vertices, distorting the shape.",
        "Counted the distance to the origin instead of the axis."
    ],
    translation: [
        "Added to the x-coordinate instead of the y-coordinate.",
        "Moved in the negative direction instead of the positive direction.",
        "Translated only one vertex and guessed the rest of the shape.",
        "Subtracted the translation vector instead of adding it.",
        "Confused 'left/right' moves with 'up/down' changes in the coordinates.",
        "Swapped the x and y values of the translation vector."
    ],
    dilation: [
        "Added the scale factor to the coordinates instead of multiplying by it.",
        "Multiplied the x-coordinate but forgot to multiply the y-coordinate.",
        "Confused an enlargement (k > 1) with a reduction (k < 1).",
        "Multiplied by the reciprocal of the scale factor.",
        "Dilated from a vertex instead of the origin.",
        "Set up the ratio as Pre-Image / Image instead of Image / Pre-Image."
    ],
    congruent: [
        "Assumed figures were congruent just by appearance without verifying rigid motions.",
        "Believed that a dilation preserves congruence.",
        "Matched the wrong corresponding vertices when writing the congruence statement.",
        "Thought the orientation had to be the same for figures to be congruent.",
        "Failed to identify the sequence of rigid motions correctly.",
        "Compared non-corresponding side lengths."
    ],
    exponent: [
        "Multiplied the bases together instead of adding the exponents.",
        "Added the bases and multiplied the exponents.",
        "Multiplied the exponent by the base instead of raising to the power.",
        "When dividing, added the exponents instead of subtracting.",
        "Treated a negative exponent as making the entire number negative.",
        "Forgot that any non-zero number to the power of 0 is 1."
    ],
    root: [
        "Divided the number by 2 instead of finding its square root.",
        "Divided the number by 3 instead of finding its cube root.",
        "Thought a non-perfect square root was a rational number.",
        "Assumed the square root of a negative number was possible in real numbers.",
        "Confused the square root symbol with long division.",
        "Estimated the root linearly instead of finding perfect square benchmarks."
    ],
    review: [
        "Stopped after the first step of a multi-step problem.",
        "Made a simple arithmetic error in calculation.",
        "Did not verify if the final answer made sense in the context of the problem.",
        "Misread the prompt and solved for the wrong variable.",
        "Applied a formula incorrectly.",
        "Dropped a negative sign during calculation."
    ]
};

function getCategory(topic) {
    const t = (topic || "").toLowerCase();
    if (t.includes("rotat")) return "rotation";
    if (t.includes("reflect")) return "reflection";
    if (t.includes("translat")) return "translation";
    if (t.includes("dilat") || t.includes("scal") || t.includes("similar")) return "dilation";
    if (t.includes("congruen")) return "congruent";
    if (t.includes("exponent") || t.includes("power")) return "exponent";
    if (t.includes("root") || t.includes("rational")) return "root";
    if (t.includes("review") || t.includes("assess") || t.includes("test")) return "review";
    return "review"; // fallback
}

async function run() {
  const res = await fetch(supabaseUrl, { headers });
  const plans = await res.json();
  
  for (let plan of plans) {
     if (!plan.structured_exemplars) continue;
     
     const category = getCategory(plan.topic);
     const bank = misconceptionBanks[category];
     
     let changed = false;
     const newExemplars = plan.structured_exemplars.map((ex, idx) => {
         // If we replaced it recently with a generic string, OR if it's the exact same string repeated
         // We will just reassign varied misconceptions to all of them so it looks natural.
         changed = true;
         const variedMisconception = bank[idx % bank.length];
         return { ...ex, misconception: variedMisconception };
     });
     
     if (changed) {
         console.log(`Varying misconceptions for ${plan.date_start} (${plan.topic})`);
         await fetch(`${supabaseUrl}?id=eq.${plan.id}`, {
            method: "PATCH",
            headers,
            body: JSON.stringify({ structured_exemplars: newExemplars })
         });
     }
  }
  console.log("Done varying misconceptions.");
}
run();
