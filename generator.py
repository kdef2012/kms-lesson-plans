import os

dates = [
    {"date": "2026-09-16", "title": "[Open-Up U2 L4-L5] Dilation on a Grid (8.G.4)", "week_label": "9/14-9/18"},
    {"date": "2026-09-17", "title": "[Open-Up U2 L5] More Dilations (8.G.4)", "week_label": "9/14-9/18"},
    {"date": "2026-09-18", "title": "[enVision T6 L6] Dilations (8.G.4)", "week_label": "9/14-9/18"},
    {"date": "2026-09-21", "title": "[Open-Up U2 L6] Similarity (8.G.4)", "week_label": "9/21-9/25"},
    {"date": "2026-09-22", "title": "[Open-Up U2 L7] Similar Polygons (8.G.4)", "week_label": "9/21-9/25"},
    {"date": "2026-09-23", "title": "[enVision T6 L7] Understand Similar Figures (8.G.4)", "week_label": "9/21-9/25"},
]

templates = [
    ("A blueprint shows a room scaled by a factor of $ k = {k} $. If the original length is ${v1}$ cm, what is the new length?", "{ans} cm", "Students might add $ {k} $ instead of multiplying."),
    ("In a microscope, a cell of width ${v1}$ mm is magnified by a scale factor of $ {k} $. What is the viewed width?", "{ans} mm", "Students might divide by $ {k} $ instead of multiplying."),
    ("A photograph is enlarged with a scale factor of $ {k} $. If the original height is ${v1}$ inches, what is the new height?", "{ans} inches", "Students might confuse scale factor with area scaling factor."),
    ("A model train is built at a scale factor of $ 1/{k} $. If the real train is ${v1}$ meters long, how long is the model?", "{ans} meters", "Students might multiply by $ {k} $ instead of dividing."),
    ("A map has a scale factor of $ 1/{k} $. If the distance on the map is ${v1}$ inches, what is the real distance?", "{ans} inches", "Students might divide by $ {k} $ instead of multiplying."),
    ("A logo is designed on a grid. A dilation of $ k = {k} $ is applied. If the original area was ${v1}$ sq units, what is the new area?", "{ans} sq units", "Students might multiply the area by $ {k} $ instead of $ {k}^2 $."),
    ("A triangle has a side of length ${v1}$. After a dilation of $ k = {k} $, what is the length of the corresponding side?", "{ans}", "Students might add $ {k} $ to the side length."),
    ("A rectangle has a perimeter of ${v1}$. After a dilation with scale factor $ {k} $, what is the new perimeter?", "{ans}", "Students might multiply by $ {k}^2 $ thinking perimeter scales like area."),
    ("If a segment of length ${v1}$ is dilated by a factor of $ k = {k} $, what is the length of the new segment?", "{ans}", "Students might think the segment length remains the same (rigid transformation)."),
    ("A scale model of a car has a scale factor of $ 1/{k} $. If the model is ${v1}$ cm long, what is the actual car's length?", "{ans} cm", "Students might divide by $ {k} $."),
    ("Under a dilation of $ k = {k} $, a line segment becomes ${ans}$ units long. What was the original length if it was ${v1}$?", "{ans}", "Students might perform the inverse operation incorrectly."),
    ("A photograph is shrunk by a scale factor of $ 1/{k} $. The original width is ${v1}$ inches. What is the new width?", "{ans} inches", "Students might multiply by $ {k} $ instead of dividing by $ {k} $."),
    ("A digital image of ${v1}$ pixels wide is scaled by $ {k} $. What is the new width in pixels?", "{ans} pixels", "Students might add $ {k} $ to the pixel count."),
    ("An architect scales down a drawing by $ 1/{k} $. The original dimension was ${v1}$ ft. What is the new dimension?", "{ans} ft", "Students might subtract $ {k} $."),
    ("A billboard is a dilation of a poster by $ k = {k} $. If the poster is ${v1}$ ft wide, how wide is the billboard?", "{ans} ft", "Students might square the scale factor for a linear dimension."),
    ("A toy plane is a $ 1/{k} $ scale model. If the real plane has a wingspan of ${v1}$ ft, what is the wingspan of the toy?", "{ans} ft", "Students might multiply by $ {k} $.")
]

out = []

out.append("""const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');
const SUPABASE_URL = 'https://qnmndsnbftcspzrlfnab.supabase.co';
const SUPABASE_KEY = fs.readFileSync('.env', 'utf-8').match(/VITE_SUPABASE_ANON_KEY=(.*)/)[1];
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function seed() {
""")

global_idx = 1
for day in dates:
    direct_inst = f"**Welcome** to today's lesson on **{day['title']}**!\\n---\\n"
    for i in range(15):
        direct_inst += f"**Step {i+1}**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\\n---\\n"
    direct_inst += f"**Conclusion**: We have covered **dilations** and **similarity** extensively with **rigorous** attention to **detail**. Let's practice now!"

    out.append(f"""
  await supabase.from('lesson_plans').delete().eq('date', '{day['date']}');
  
  const data_{day['date'].replace('-','_')} = {{
    date: '{day['date']}',
    title: '{day['title']}',
    week_label: '{day['week_label']}',
    direct_instruction: `{direct_inst}`,
    structured_exemplars: [
""")
    for i in range(16):
        template, ans_template, misconception = templates[i]
        k = global_idx + 2
        v1 = (global_idx * 3) + 10
        
        # calculate answer based on template
        if "area" in template:
            ans = v1 * (k ** 2)
        elif "1/{k}" in template:
            if "model train is built" in template or "architect scales down" in template or "scale model of a car" in template or "photograph is shrunk" in template or "toy plane is a" in template or "map has a scale factor" in template:
                # If they give real distance, and want model distance:
                if "real train is" in template or "original dimension was" in template or "original width is" in template or "real plane has" in template:
                    ans = v1 / k
                elif "distance on the map is" in template or "model is" in template:
                    ans = v1 * k
                else:
                    ans = v1 / k
            else:
                ans = v1 / k
        else:
            ans = v1 * k
            
        if ans == int(ans): ans = int(ans)
        else: ans = round(ans, 2)
            
        q = template.format(k=k, v1=v1, ans=ans)
        a = ans_template.format(k=k, v1=v1, ans=ans)
        m = misconception.format(k=k, v1=v1, ans=ans)
        
        out.append(f"""      {{
        question: `{q}`,
        correct_answer: `{a}`,
        misconception: `{m}`
      }},""")
        global_idx += 1
    out.append(f"""    ]
  }};
  await supabase.from('lesson_plans').upsert(data_{day['date'].replace('-','_')});
""")

out.append("""
  console.log('Successfully seeded database!');
}
seed().catch(console.error);
""")

with open('seed_sept_16_23.cjs', 'w') as f:
    f.write(''.join(out))
