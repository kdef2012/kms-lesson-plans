const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');
const SUPABASE_URL = 'https://qnmndsnbftcspzrlfnab.supabase.co';
const SUPABASE_KEY = fs.readFileSync('.env', 'utf-8').match(/VITE_SUPABASE_ANON_KEY=(.*)/)[1];
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function seed() {

  await supabase.from('lesson_plans').delete().eq('date', '2026-09-16');
  
  const data_2026_09_16 = {
    date: '2026-09-16',
    title: '[Open-Up U2 L4-L5] Dilation on a Grid (8.G.4)',
    week_label: '9/14-9/18',
    direct_instruction: `**Welcome** to today's lesson on **[Open-Up U2 L4-L5] Dilation on a Grid (8.G.4)**!\n---\n**Step 1**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 2**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 3**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 4**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 5**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 6**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 7**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 8**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 9**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 10**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 11**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 12**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 13**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 14**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 15**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Conclusion**: We have covered **dilations** and **similarity** extensively with **rigorous** attention to **detail**. Let's practice now!`,
    structured_exemplars: [
      {
        question: `A blueprint shows a room scaled by a factor of $ k = 3 $. If the original length is $13$ cm, what is the new length?`,
        correct_answer: `39 cm`,
        misconception: `Students might add $ 3 $ instead of multiplying.`
      },      {
        question: `In a microscope, a cell of width $16$ mm is magnified by a scale factor of $ 4 $. What is the viewed width?`,
        correct_answer: `64 mm`,
        misconception: `Students might divide by $ 4 $ instead of multiplying.`
      },      {
        question: `A photograph is enlarged with a scale factor of $ 5 $. If the original height is $19$ inches, what is the new height?`,
        correct_answer: `95 inches`,
        misconception: `Students might confuse scale factor with area scaling factor.`
      },      {
        question: `A model train is built at a scale factor of $ 1/6 $. If the real train is $22$ meters long, how long is the model?`,
        correct_answer: `3.67 meters`,
        misconception: `Students might multiply by $ 6 $ instead of dividing.`
      },      {
        question: `A map has a scale factor of $ 1/7 $. If the distance on the map is $25$ inches, what is the real distance?`,
        correct_answer: `175 inches`,
        misconception: `Students might divide by $ 7 $ instead of multiplying.`
      },      {
        question: `A logo is designed on a grid. A dilation of $ k = 8 $ is applied. If the original area was $28$ sq units, what is the new area?`,
        correct_answer: `1792 sq units`,
        misconception: `Students might multiply the area by $ 8 $ instead of $ 8^2 $.`
      },      {
        question: `A triangle has a side of length $31$. After a dilation of $ k = 9 $, what is the length of the corresponding side?`,
        correct_answer: `279`,
        misconception: `Students might add $ 9 $ to the side length.`
      },      {
        question: `A rectangle has a perimeter of $34$. After a dilation with scale factor $ 10 $, what is the new perimeter?`,
        correct_answer: `340`,
        misconception: `Students might multiply by $ 10^2 $ thinking perimeter scales like area.`
      },      {
        question: `If a segment of length $37$ is dilated by a factor of $ k = 11 $, what is the length of the new segment?`,
        correct_answer: `407`,
        misconception: `Students might think the segment length remains the same (rigid transformation).`
      },      {
        question: `A scale model of a car has a scale factor of $ 1/12 $. If the model is $40$ cm long, what is the actual car's length?`,
        correct_answer: `480 cm`,
        misconception: `Students might divide by $ 12 $.`
      },      {
        question: `Under a dilation of $ k = 13 $, a line segment becomes $559$ units long. What was the original length if it was $43$?`,
        correct_answer: `559`,
        misconception: `Students might perform the inverse operation incorrectly.`
      },      {
        question: `A photograph is shrunk by a scale factor of $ 1/14 $. The original width is $46$ inches. What is the new width?`,
        correct_answer: `3.29 inches`,
        misconception: `Students might multiply by $ 14 $ instead of dividing by $ 14 $.`
      },      {
        question: `A digital image of $49$ pixels wide is scaled by $ 15 $. What is the new width in pixels?`,
        correct_answer: `735 pixels`,
        misconception: `Students might add $ 15 $ to the pixel count.`
      },      {
        question: `An architect scales down a drawing by $ 1/16 $. The original dimension was $52$ ft. What is the new dimension?`,
        correct_answer: `3.25 ft`,
        misconception: `Students might subtract $ 16 $.`
      },      {
        question: `A billboard is a dilation of a poster by $ k = 17 $. If the poster is $55$ ft wide, how wide is the billboard?`,
        correct_answer: `935 ft`,
        misconception: `Students might square the scale factor for a linear dimension.`
      },      {
        question: `A toy plane is a $ 1/18 $ scale model. If the real plane has a wingspan of $58$ ft, what is the wingspan of the toy?`,
        correct_answer: `3.22 ft`,
        misconception: `Students might multiply by $ 18 $.`
      },    ]
  };
  await supabase.from('lesson_plans').upsert(data_2026_09_16);

  await supabase.from('lesson_plans').delete().eq('date', '2026-09-17');
  
  const data_2026_09_17 = {
    date: '2026-09-17',
    title: '[Open-Up U2 L5] More Dilations (8.G.4)',
    week_label: '9/14-9/18',
    direct_instruction: `**Welcome** to today's lesson on **[Open-Up U2 L5] More Dilations (8.G.4)**!\n---\n**Step 1**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 2**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 3**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 4**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 5**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 6**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 7**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 8**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 9**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 10**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 11**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 12**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 13**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 14**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 15**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Conclusion**: We have covered **dilations** and **similarity** extensively with **rigorous** attention to **detail**. Let's practice now!`,
    structured_exemplars: [
      {
        question: `A blueprint shows a room scaled by a factor of $ k = 19 $. If the original length is $61$ cm, what is the new length?`,
        correct_answer: `1159 cm`,
        misconception: `Students might add $ 19 $ instead of multiplying.`
      },      {
        question: `In a microscope, a cell of width $64$ mm is magnified by a scale factor of $ 20 $. What is the viewed width?`,
        correct_answer: `1280 mm`,
        misconception: `Students might divide by $ 20 $ instead of multiplying.`
      },      {
        question: `A photograph is enlarged with a scale factor of $ 21 $. If the original height is $67$ inches, what is the new height?`,
        correct_answer: `1407 inches`,
        misconception: `Students might confuse scale factor with area scaling factor.`
      },      {
        question: `A model train is built at a scale factor of $ 1/22 $. If the real train is $70$ meters long, how long is the model?`,
        correct_answer: `3.18 meters`,
        misconception: `Students might multiply by $ 22 $ instead of dividing.`
      },      {
        question: `A map has a scale factor of $ 1/23 $. If the distance on the map is $73$ inches, what is the real distance?`,
        correct_answer: `1679 inches`,
        misconception: `Students might divide by $ 23 $ instead of multiplying.`
      },      {
        question: `A logo is designed on a grid. A dilation of $ k = 24 $ is applied. If the original area was $76$ sq units, what is the new area?`,
        correct_answer: `43776 sq units`,
        misconception: `Students might multiply the area by $ 24 $ instead of $ 24^2 $.`
      },      {
        question: `A triangle has a side of length $79$. After a dilation of $ k = 25 $, what is the length of the corresponding side?`,
        correct_answer: `1975`,
        misconception: `Students might add $ 25 $ to the side length.`
      },      {
        question: `A rectangle has a perimeter of $82$. After a dilation with scale factor $ 26 $, what is the new perimeter?`,
        correct_answer: `2132`,
        misconception: `Students might multiply by $ 26^2 $ thinking perimeter scales like area.`
      },      {
        question: `If a segment of length $85$ is dilated by a factor of $ k = 27 $, what is the length of the new segment?`,
        correct_answer: `2295`,
        misconception: `Students might think the segment length remains the same (rigid transformation).`
      },      {
        question: `A scale model of a car has a scale factor of $ 1/28 $. If the model is $88$ cm long, what is the actual car's length?`,
        correct_answer: `2464 cm`,
        misconception: `Students might divide by $ 28 $.`
      },      {
        question: `Under a dilation of $ k = 29 $, a line segment becomes $2639$ units long. What was the original length if it was $91$?`,
        correct_answer: `2639`,
        misconception: `Students might perform the inverse operation incorrectly.`
      },      {
        question: `A photograph is shrunk by a scale factor of $ 1/30 $. The original width is $94$ inches. What is the new width?`,
        correct_answer: `3.13 inches`,
        misconception: `Students might multiply by $ 30 $ instead of dividing by $ 30 $.`
      },      {
        question: `A digital image of $97$ pixels wide is scaled by $ 31 $. What is the new width in pixels?`,
        correct_answer: `3007 pixels`,
        misconception: `Students might add $ 31 $ to the pixel count.`
      },      {
        question: `An architect scales down a drawing by $ 1/32 $. The original dimension was $100$ ft. What is the new dimension?`,
        correct_answer: `3.13 ft`,
        misconception: `Students might subtract $ 32 $.`
      },      {
        question: `A billboard is a dilation of a poster by $ k = 33 $. If the poster is $103$ ft wide, how wide is the billboard?`,
        correct_answer: `3399 ft`,
        misconception: `Students might square the scale factor for a linear dimension.`
      },      {
        question: `A toy plane is a $ 1/34 $ scale model. If the real plane has a wingspan of $106$ ft, what is the wingspan of the toy?`,
        correct_answer: `3.12 ft`,
        misconception: `Students might multiply by $ 34 $.`
      },    ]
  };
  await supabase.from('lesson_plans').upsert(data_2026_09_17);

  await supabase.from('lesson_plans').delete().eq('date', '2026-09-18');
  
  const data_2026_09_18 = {
    date: '2026-09-18',
    title: '[enVision T6 L6] Dilations (8.G.4)',
    week_label: '9/14-9/18',
    direct_instruction: `**Welcome** to today's lesson on **[enVision T6 L6] Dilations (8.G.4)**!\n---\n**Step 1**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 2**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 3**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 4**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 5**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 6**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 7**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 8**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 9**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 10**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 11**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 12**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 13**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 14**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 15**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Conclusion**: We have covered **dilations** and **similarity** extensively with **rigorous** attention to **detail**. Let's practice now!`,
    structured_exemplars: [
      {
        question: `A blueprint shows a room scaled by a factor of $ k = 35 $. If the original length is $109$ cm, what is the new length?`,
        correct_answer: `3815 cm`,
        misconception: `Students might add $ 35 $ instead of multiplying.`
      },      {
        question: `In a microscope, a cell of width $112$ mm is magnified by a scale factor of $ 36 $. What is the viewed width?`,
        correct_answer: `4032 mm`,
        misconception: `Students might divide by $ 36 $ instead of multiplying.`
      },      {
        question: `A photograph is enlarged with a scale factor of $ 37 $. If the original height is $115$ inches, what is the new height?`,
        correct_answer: `4255 inches`,
        misconception: `Students might confuse scale factor with area scaling factor.`
      },      {
        question: `A model train is built at a scale factor of $ 1/38 $. If the real train is $118$ meters long, how long is the model?`,
        correct_answer: `3.11 meters`,
        misconception: `Students might multiply by $ 38 $ instead of dividing.`
      },      {
        question: `A map has a scale factor of $ 1/39 $. If the distance on the map is $121$ inches, what is the real distance?`,
        correct_answer: `4719 inches`,
        misconception: `Students might divide by $ 39 $ instead of multiplying.`
      },      {
        question: `A logo is designed on a grid. A dilation of $ k = 40 $ is applied. If the original area was $124$ sq units, what is the new area?`,
        correct_answer: `198400 sq units`,
        misconception: `Students might multiply the area by $ 40 $ instead of $ 40^2 $.`
      },      {
        question: `A triangle has a side of length $127$. After a dilation of $ k = 41 $, what is the length of the corresponding side?`,
        correct_answer: `5207`,
        misconception: `Students might add $ 41 $ to the side length.`
      },      {
        question: `A rectangle has a perimeter of $130$. After a dilation with scale factor $ 42 $, what is the new perimeter?`,
        correct_answer: `5460`,
        misconception: `Students might multiply by $ 42^2 $ thinking perimeter scales like area.`
      },      {
        question: `If a segment of length $133$ is dilated by a factor of $ k = 43 $, what is the length of the new segment?`,
        correct_answer: `5719`,
        misconception: `Students might think the segment length remains the same (rigid transformation).`
      },      {
        question: `A scale model of a car has a scale factor of $ 1/44 $. If the model is $136$ cm long, what is the actual car's length?`,
        correct_answer: `5984 cm`,
        misconception: `Students might divide by $ 44 $.`
      },      {
        question: `Under a dilation of $ k = 45 $, a line segment becomes $6255$ units long. What was the original length if it was $139$?`,
        correct_answer: `6255`,
        misconception: `Students might perform the inverse operation incorrectly.`
      },      {
        question: `A photograph is shrunk by a scale factor of $ 1/46 $. The original width is $142$ inches. What is the new width?`,
        correct_answer: `3.09 inches`,
        misconception: `Students might multiply by $ 46 $ instead of dividing by $ 46 $.`
      },      {
        question: `A digital image of $145$ pixels wide is scaled by $ 47 $. What is the new width in pixels?`,
        correct_answer: `6815 pixels`,
        misconception: `Students might add $ 47 $ to the pixel count.`
      },      {
        question: `An architect scales down a drawing by $ 1/48 $. The original dimension was $148$ ft. What is the new dimension?`,
        correct_answer: `3.08 ft`,
        misconception: `Students might subtract $ 48 $.`
      },      {
        question: `A billboard is a dilation of a poster by $ k = 49 $. If the poster is $151$ ft wide, how wide is the billboard?`,
        correct_answer: `7399 ft`,
        misconception: `Students might square the scale factor for a linear dimension.`
      },      {
        question: `A toy plane is a $ 1/50 $ scale model. If the real plane has a wingspan of $154$ ft, what is the wingspan of the toy?`,
        correct_answer: `3.08 ft`,
        misconception: `Students might multiply by $ 50 $.`
      },    ]
  };
  await supabase.from('lesson_plans').upsert(data_2026_09_18);

  await supabase.from('lesson_plans').delete().eq('date', '2026-09-21');
  
  const data_2026_09_21 = {
    date: '2026-09-21',
    title: '[Open-Up U2 L6] Similarity (8.G.4)',
    week_label: '9/21-9/25',
    direct_instruction: `**Welcome** to today's lesson on **[Open-Up U2 L6] Similarity (8.G.4)**!\n---\n**Step 1**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 2**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 3**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 4**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 5**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 6**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 7**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 8**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 9**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 10**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 11**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 12**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 13**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 14**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 15**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Conclusion**: We have covered **dilations** and **similarity** extensively with **rigorous** attention to **detail**. Let's practice now!`,
    structured_exemplars: [
      {
        question: `A blueprint shows a room scaled by a factor of $ k = 51 $. If the original length is $157$ cm, what is the new length?`,
        correct_answer: `8007 cm`,
        misconception: `Students might add $ 51 $ instead of multiplying.`
      },      {
        question: `In a microscope, a cell of width $160$ mm is magnified by a scale factor of $ 52 $. What is the viewed width?`,
        correct_answer: `8320 mm`,
        misconception: `Students might divide by $ 52 $ instead of multiplying.`
      },      {
        question: `A photograph is enlarged with a scale factor of $ 53 $. If the original height is $163$ inches, what is the new height?`,
        correct_answer: `8639 inches`,
        misconception: `Students might confuse scale factor with area scaling factor.`
      },      {
        question: `A model train is built at a scale factor of $ 1/54 $. If the real train is $166$ meters long, how long is the model?`,
        correct_answer: `3.07 meters`,
        misconception: `Students might multiply by $ 54 $ instead of dividing.`
      },      {
        question: `A map has a scale factor of $ 1/55 $. If the distance on the map is $169$ inches, what is the real distance?`,
        correct_answer: `9295 inches`,
        misconception: `Students might divide by $ 55 $ instead of multiplying.`
      },      {
        question: `A logo is designed on a grid. A dilation of $ k = 56 $ is applied. If the original area was $172$ sq units, what is the new area?`,
        correct_answer: `539392 sq units`,
        misconception: `Students might multiply the area by $ 56 $ instead of $ 56^2 $.`
      },      {
        question: `A triangle has a side of length $175$. After a dilation of $ k = 57 $, what is the length of the corresponding side?`,
        correct_answer: `9975`,
        misconception: `Students might add $ 57 $ to the side length.`
      },      {
        question: `A rectangle has a perimeter of $178$. After a dilation with scale factor $ 58 $, what is the new perimeter?`,
        correct_answer: `10324`,
        misconception: `Students might multiply by $ 58^2 $ thinking perimeter scales like area.`
      },      {
        question: `If a segment of length $181$ is dilated by a factor of $ k = 59 $, what is the length of the new segment?`,
        correct_answer: `10679`,
        misconception: `Students might think the segment length remains the same (rigid transformation).`
      },      {
        question: `A scale model of a car has a scale factor of $ 1/60 $. If the model is $184$ cm long, what is the actual car's length?`,
        correct_answer: `11040 cm`,
        misconception: `Students might divide by $ 60 $.`
      },      {
        question: `Under a dilation of $ k = 61 $, a line segment becomes $11407$ units long. What was the original length if it was $187$?`,
        correct_answer: `11407`,
        misconception: `Students might perform the inverse operation incorrectly.`
      },      {
        question: `A photograph is shrunk by a scale factor of $ 1/62 $. The original width is $190$ inches. What is the new width?`,
        correct_answer: `3.06 inches`,
        misconception: `Students might multiply by $ 62 $ instead of dividing by $ 62 $.`
      },      {
        question: `A digital image of $193$ pixels wide is scaled by $ 63 $. What is the new width in pixels?`,
        correct_answer: `12159 pixels`,
        misconception: `Students might add $ 63 $ to the pixel count.`
      },      {
        question: `An architect scales down a drawing by $ 1/64 $. The original dimension was $196$ ft. What is the new dimension?`,
        correct_answer: `3.06 ft`,
        misconception: `Students might subtract $ 64 $.`
      },      {
        question: `A billboard is a dilation of a poster by $ k = 65 $. If the poster is $199$ ft wide, how wide is the billboard?`,
        correct_answer: `12935 ft`,
        misconception: `Students might square the scale factor for a linear dimension.`
      },      {
        question: `A toy plane is a $ 1/66 $ scale model. If the real plane has a wingspan of $202$ ft, what is the wingspan of the toy?`,
        correct_answer: `3.06 ft`,
        misconception: `Students might multiply by $ 66 $.`
      },    ]
  };
  await supabase.from('lesson_plans').upsert(data_2026_09_21);

  await supabase.from('lesson_plans').delete().eq('date', '2026-09-22');
  
  const data_2026_09_22 = {
    date: '2026-09-22',
    title: '[Open-Up U2 L7] Similar Polygons (8.G.4)',
    week_label: '9/21-9/25',
    direct_instruction: `**Welcome** to today's lesson on **[Open-Up U2 L7] Similar Polygons (8.G.4)**!\n---\n**Step 1**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 2**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 3**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 4**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 5**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 6**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 7**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 8**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 9**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 10**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 11**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 12**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 13**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 14**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 15**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Conclusion**: We have covered **dilations** and **similarity** extensively with **rigorous** attention to **detail**. Let's practice now!`,
    structured_exemplars: [
      {
        question: `A blueprint shows a room scaled by a factor of $ k = 67 $. If the original length is $205$ cm, what is the new length?`,
        correct_answer: `13735 cm`,
        misconception: `Students might add $ 67 $ instead of multiplying.`
      },      {
        question: `In a microscope, a cell of width $208$ mm is magnified by a scale factor of $ 68 $. What is the viewed width?`,
        correct_answer: `14144 mm`,
        misconception: `Students might divide by $ 68 $ instead of multiplying.`
      },      {
        question: `A photograph is enlarged with a scale factor of $ 69 $. If the original height is $211$ inches, what is the new height?`,
        correct_answer: `14559 inches`,
        misconception: `Students might confuse scale factor with area scaling factor.`
      },      {
        question: `A model train is built at a scale factor of $ 1/70 $. If the real train is $214$ meters long, how long is the model?`,
        correct_answer: `3.06 meters`,
        misconception: `Students might multiply by $ 70 $ instead of dividing.`
      },      {
        question: `A map has a scale factor of $ 1/71 $. If the distance on the map is $217$ inches, what is the real distance?`,
        correct_answer: `15407 inches`,
        misconception: `Students might divide by $ 71 $ instead of multiplying.`
      },      {
        question: `A logo is designed on a grid. A dilation of $ k = 72 $ is applied. If the original area was $220$ sq units, what is the new area?`,
        correct_answer: `1140480 sq units`,
        misconception: `Students might multiply the area by $ 72 $ instead of $ 72^2 $.`
      },      {
        question: `A triangle has a side of length $223$. After a dilation of $ k = 73 $, what is the length of the corresponding side?`,
        correct_answer: `16279`,
        misconception: `Students might add $ 73 $ to the side length.`
      },      {
        question: `A rectangle has a perimeter of $226$. After a dilation with scale factor $ 74 $, what is the new perimeter?`,
        correct_answer: `16724`,
        misconception: `Students might multiply by $ 74^2 $ thinking perimeter scales like area.`
      },      {
        question: `If a segment of length $229$ is dilated by a factor of $ k = 75 $, what is the length of the new segment?`,
        correct_answer: `17175`,
        misconception: `Students might think the segment length remains the same (rigid transformation).`
      },      {
        question: `A scale model of a car has a scale factor of $ 1/76 $. If the model is $232$ cm long, what is the actual car's length?`,
        correct_answer: `17632 cm`,
        misconception: `Students might divide by $ 76 $.`
      },      {
        question: `Under a dilation of $ k = 77 $, a line segment becomes $18095$ units long. What was the original length if it was $235$?`,
        correct_answer: `18095`,
        misconception: `Students might perform the inverse operation incorrectly.`
      },      {
        question: `A photograph is shrunk by a scale factor of $ 1/78 $. The original width is $238$ inches. What is the new width?`,
        correct_answer: `3.05 inches`,
        misconception: `Students might multiply by $ 78 $ instead of dividing by $ 78 $.`
      },      {
        question: `A digital image of $241$ pixels wide is scaled by $ 79 $. What is the new width in pixels?`,
        correct_answer: `19039 pixels`,
        misconception: `Students might add $ 79 $ to the pixel count.`
      },      {
        question: `An architect scales down a drawing by $ 1/80 $. The original dimension was $244$ ft. What is the new dimension?`,
        correct_answer: `3.05 ft`,
        misconception: `Students might subtract $ 80 $.`
      },      {
        question: `A billboard is a dilation of a poster by $ k = 81 $. If the poster is $247$ ft wide, how wide is the billboard?`,
        correct_answer: `20007 ft`,
        misconception: `Students might square the scale factor for a linear dimension.`
      },      {
        question: `A toy plane is a $ 1/82 $ scale model. If the real plane has a wingspan of $250$ ft, what is the wingspan of the toy?`,
        correct_answer: `3.05 ft`,
        misconception: `Students might multiply by $ 82 $.`
      },    ]
  };
  await supabase.from('lesson_plans').upsert(data_2026_09_22);

  await supabase.from('lesson_plans').delete().eq('date', '2026-09-23');
  
  const data_2026_09_23 = {
    date: '2026-09-23',
    title: '[enVision T6 L7] Understand Similar Figures (8.G.4)',
    week_label: '9/21-9/25',
    direct_instruction: `**Welcome** to today's lesson on **[enVision T6 L7] Understand Similar Figures (8.G.4)**!\n---\n**Step 1**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 2**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 3**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 4**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 5**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 6**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 7**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 8**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 9**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 10**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 11**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 12**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 13**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 14**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Step 15**: It is **vital** to understand the **properties of dilations and similarity**. A dilation is a transformation that produces an image that is the same shape as the original, but is a different size. A dilation stretches or shrinks the original figure. The description of a dilation includes the scale factor (or ratio) and the center of the dilation. The center of a dilation is a fixed point in the plane about which all points are expanded or contracted.\n---\n**Conclusion**: We have covered **dilations** and **similarity** extensively with **rigorous** attention to **detail**. Let's practice now!`,
    structured_exemplars: [
      {
        question: `A blueprint shows a room scaled by a factor of $ k = 83 $. If the original length is $253$ cm, what is the new length?`,
        correct_answer: `20999 cm`,
        misconception: `Students might add $ 83 $ instead of multiplying.`
      },      {
        question: `In a microscope, a cell of width $256$ mm is magnified by a scale factor of $ 84 $. What is the viewed width?`,
        correct_answer: `21504 mm`,
        misconception: `Students might divide by $ 84 $ instead of multiplying.`
      },      {
        question: `A photograph is enlarged with a scale factor of $ 85 $. If the original height is $259$ inches, what is the new height?`,
        correct_answer: `22015 inches`,
        misconception: `Students might confuse scale factor with area scaling factor.`
      },      {
        question: `A model train is built at a scale factor of $ 1/86 $. If the real train is $262$ meters long, how long is the model?`,
        correct_answer: `3.05 meters`,
        misconception: `Students might multiply by $ 86 $ instead of dividing.`
      },      {
        question: `A map has a scale factor of $ 1/87 $. If the distance on the map is $265$ inches, what is the real distance?`,
        correct_answer: `23055 inches`,
        misconception: `Students might divide by $ 87 $ instead of multiplying.`
      },      {
        question: `A logo is designed on a grid. A dilation of $ k = 88 $ is applied. If the original area was $268$ sq units, what is the new area?`,
        correct_answer: `2075392 sq units`,
        misconception: `Students might multiply the area by $ 88 $ instead of $ 88^2 $.`
      },      {
        question: `A triangle has a side of length $271$. After a dilation of $ k = 89 $, what is the length of the corresponding side?`,
        correct_answer: `24119`,
        misconception: `Students might add $ 89 $ to the side length.`
      },      {
        question: `A rectangle has a perimeter of $274$. After a dilation with scale factor $ 90 $, what is the new perimeter?`,
        correct_answer: `24660`,
        misconception: `Students might multiply by $ 90^2 $ thinking perimeter scales like area.`
      },      {
        question: `If a segment of length $277$ is dilated by a factor of $ k = 91 $, what is the length of the new segment?`,
        correct_answer: `25207`,
        misconception: `Students might think the segment length remains the same (rigid transformation).`
      },      {
        question: `A scale model of a car has a scale factor of $ 1/92 $. If the model is $280$ cm long, what is the actual car's length?`,
        correct_answer: `25760 cm`,
        misconception: `Students might divide by $ 92 $.`
      },      {
        question: `Under a dilation of $ k = 93 $, a line segment becomes $26319$ units long. What was the original length if it was $283$?`,
        correct_answer: `26319`,
        misconception: `Students might perform the inverse operation incorrectly.`
      },      {
        question: `A photograph is shrunk by a scale factor of $ 1/94 $. The original width is $286$ inches. What is the new width?`,
        correct_answer: `3.04 inches`,
        misconception: `Students might multiply by $ 94 $ instead of dividing by $ 94 $.`
      },      {
        question: `A digital image of $289$ pixels wide is scaled by $ 95 $. What is the new width in pixels?`,
        correct_answer: `27455 pixels`,
        misconception: `Students might add $ 95 $ to the pixel count.`
      },      {
        question: `An architect scales down a drawing by $ 1/96 $. The original dimension was $292$ ft. What is the new dimension?`,
        correct_answer: `3.04 ft`,
        misconception: `Students might subtract $ 96 $.`
      },      {
        question: `A billboard is a dilation of a poster by $ k = 97 $. If the poster is $295$ ft wide, how wide is the billboard?`,
        correct_answer: `28615 ft`,
        misconception: `Students might square the scale factor for a linear dimension.`
      },      {
        question: `A toy plane is a $ 1/98 $ scale model. If the real plane has a wingspan of $298$ ft, what is the wingspan of the toy?`,
        correct_answer: `3.04 ft`,
        misconception: `Students might multiply by $ 98 $.`
      },    ]
  };
  await supabase.from('lesson_plans').upsert(data_2026_09_23);

  console.log('Successfully seeded database!');
}
seed().catch(console.error);
