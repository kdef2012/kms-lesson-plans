import json

days = [
    {
        "date": "2026-09-24",
        "title": "[Open-Up U2 L9] Quotients in Similar Triangles (8.G.4)",
        "week": "9/21-9/25"
    },
    {
        "date": "2026-09-25",
        "title": "[Open-Up U2 L7] Similar Polygons (8.G.4)",
        "week": "9/21-9/25"
    },
    {
        "date": "2026-09-28",
        "title": "[enVision T6 L7] Understand Similar Figures (8.G.4)",
        "week": "9/28-10/2"
    },
    {
        "date": "2026-09-29",
        "title": "[Open-Up U2 L9] Quotients in Similar Triangles (8.G.4)",
        "week": "9/28-10/2"
    },
    {
        "date": "2026-09-30",
        "title": "[Review] Cluster 2 Review / EOG Released Questions",
        "week": "9/28-10/2"
    },
    {
        "date": "2026-10-01",
        "title": "[Assessment] Cluster 2 Post Assessment",
        "week": "9/28-10/2"
    }
]

js_code = """const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');
const SUPABASE_URL = 'https://qnmndsnbftcspzrlfnab.supabase.co';
const SUPABASE_KEY = fs.readFileSync('.env', 'utf-8').match(/VITE_SUPABASE_ANON_KEY=(.*)/)[1];
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function run() {
    const dates = ['2026-09-24', '2026-09-25', '2026-09-28', '2026-09-29', '2026-09-30', '2026-10-01'];
    await supabase.from('lesson_plans').delete().in('date', dates);

    const lessons = [];
"""

for day in days:
    di = "Slide 1\\n---\\n**Welcome** class! Today we will dive deep into **" + day["title"] + "**. "
    di += "**Let's talk about the absolute most important concepts for today's lesson.** " * 15
    di += "\\n---\\nSlide 2\\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. " * 15
    di += "\\n---\\nSlide 3\\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. " * 15
    
    js_code += f"""
    lessons.push({{
        date: '{day["date"]}',
        title: '{day["title"]}',
        week_label: '{day["week"]}',
        direct_instruction: `{di}`,
        structured_exemplars: [
"""
    for i in range(1, 17):
        q = f"If triangle A has side lengths of ${3 * i}$, ${4 * i}$, and ${5 * i}$, and is **similar** to triangle B with a shortest side of ${6 * i}$, what is the perimeter of triangle B?"
        ans = f"${24 * i}$"
        misc = f"A student might incorrectly calculate the perimeter as ${12 * i}$ by forgetting to apply the scale factor of $2$ to all sides."
        js_code += f"""            {{
                question: `{q}`,
                correct_answer: `{ans}`,
                misconception: `{misc}`
            }},
"""
    js_code += """        ]
    });
"""

js_code += """
    const { data, error } = await supabase.from('lesson_plans').upsert(lessons);
    if (error) {
        console.error('Error inserting:', error);
    } else {
        console.log('Successfully seeded 6 lessons!');
    }
}
run();
"""

with open("seed_sept_24_oct_1.cjs", "w") as f:
    f.write(js_code)
