const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');
const SUPABASE_URL = 'https://qnmndsnbftcspzrlfnab.supabase.co';
const SUPABASE_KEY = fs.readFileSync('.env', 'utf-8').match(/VITE_SUPABASE_ANON_KEY=(.*)/)[1];
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function run() {
    const dates = ['2026-09-24', '2026-09-25', '2026-09-28', '2026-09-29', '2026-09-30', '2026-10-01'];
    await supabase.from('lesson_plans').delete().in('date_start', dates);

    const lessons = [];

    lessons.push({
        date_start: '2026-09-24',
        topic: '[Open-Up U2 L9] Quotients in Similar Triangles (8.G.4)',
        week_label: '9/21-9/25',
        direct_instruction: `Slide 1\n---\n**Welcome** class! Today we will dive deep into **[Open-Up U2 L9] Quotients in Similar Triangles (8.G.4)**. **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. `,
        structured_exemplars: [
            {
                question: `If triangle A has side lengths of $3$, $4$, and $5$, and is **similar** to triangle B with a shortest side of $6$, what is the perimeter of triangle B?`,
                correct_answer: `$24$`,
                misconception: `A student might incorrectly calculate the perimeter as $12$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $6$, $8$, and $10$, and is **similar** to triangle B with a shortest side of $12$, what is the perimeter of triangle B?`,
                correct_answer: `$48$`,
                misconception: `A student might incorrectly calculate the perimeter as $24$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $9$, $12$, and $15$, and is **similar** to triangle B with a shortest side of $18$, what is the perimeter of triangle B?`,
                correct_answer: `$72$`,
                misconception: `A student might incorrectly calculate the perimeter as $36$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $12$, $16$, and $20$, and is **similar** to triangle B with a shortest side of $24$, what is the perimeter of triangle B?`,
                correct_answer: `$96$`,
                misconception: `A student might incorrectly calculate the perimeter as $48$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $15$, $20$, and $25$, and is **similar** to triangle B with a shortest side of $30$, what is the perimeter of triangle B?`,
                correct_answer: `$120$`,
                misconception: `A student might incorrectly calculate the perimeter as $60$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $18$, $24$, and $30$, and is **similar** to triangle B with a shortest side of $36$, what is the perimeter of triangle B?`,
                correct_answer: `$144$`,
                misconception: `A student might incorrectly calculate the perimeter as $72$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $21$, $28$, and $35$, and is **similar** to triangle B with a shortest side of $42$, what is the perimeter of triangle B?`,
                correct_answer: `$168$`,
                misconception: `A student might incorrectly calculate the perimeter as $84$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $24$, $32$, and $40$, and is **similar** to triangle B with a shortest side of $48$, what is the perimeter of triangle B?`,
                correct_answer: `$192$`,
                misconception: `A student might incorrectly calculate the perimeter as $96$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $27$, $36$, and $45$, and is **similar** to triangle B with a shortest side of $54$, what is the perimeter of triangle B?`,
                correct_answer: `$216$`,
                misconception: `A student might incorrectly calculate the perimeter as $108$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $30$, $40$, and $50$, and is **similar** to triangle B with a shortest side of $60$, what is the perimeter of triangle B?`,
                correct_answer: `$240$`,
                misconception: `A student might incorrectly calculate the perimeter as $120$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $33$, $44$, and $55$, and is **similar** to triangle B with a shortest side of $66$, what is the perimeter of triangle B?`,
                correct_answer: `$264$`,
                misconception: `A student might incorrectly calculate the perimeter as $132$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $36$, $48$, and $60$, and is **similar** to triangle B with a shortest side of $72$, what is the perimeter of triangle B?`,
                correct_answer: `$288$`,
                misconception: `A student might incorrectly calculate the perimeter as $144$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $39$, $52$, and $65$, and is **similar** to triangle B with a shortest side of $78$, what is the perimeter of triangle B?`,
                correct_answer: `$312$`,
                misconception: `A student might incorrectly calculate the perimeter as $156$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $42$, $56$, and $70$, and is **similar** to triangle B with a shortest side of $84$, what is the perimeter of triangle B?`,
                correct_answer: `$336$`,
                misconception: `A student might incorrectly calculate the perimeter as $168$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $45$, $60$, and $75$, and is **similar** to triangle B with a shortest side of $90$, what is the perimeter of triangle B?`,
                correct_answer: `$360$`,
                misconception: `A student might incorrectly calculate the perimeter as $180$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $48$, $64$, and $80$, and is **similar** to triangle B with a shortest side of $96$, what is the perimeter of triangle B?`,
                correct_answer: `$384$`,
                misconception: `A student might incorrectly calculate the perimeter as $192$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
        ]
    });

    lessons.push({
        date_start: '2026-09-25',
        topic: '[Open-Up U2 L7] Similar Polygons (8.G.4)',
        week_label: '9/21-9/25',
        direct_instruction: `Slide 1\n---\n**Welcome** class! Today we will dive deep into **[Open-Up U2 L7] Similar Polygons (8.G.4)**. **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. `,
        structured_exemplars: [
            {
                question: `If triangle A has side lengths of $3$, $4$, and $5$, and is **similar** to triangle B with a shortest side of $6$, what is the perimeter of triangle B?`,
                correct_answer: `$24$`,
                misconception: `A student might incorrectly calculate the perimeter as $12$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $6$, $8$, and $10$, and is **similar** to triangle B with a shortest side of $12$, what is the perimeter of triangle B?`,
                correct_answer: `$48$`,
                misconception: `A student might incorrectly calculate the perimeter as $24$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $9$, $12$, and $15$, and is **similar** to triangle B with a shortest side of $18$, what is the perimeter of triangle B?`,
                correct_answer: `$72$`,
                misconception: `A student might incorrectly calculate the perimeter as $36$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $12$, $16$, and $20$, and is **similar** to triangle B with a shortest side of $24$, what is the perimeter of triangle B?`,
                correct_answer: `$96$`,
                misconception: `A student might incorrectly calculate the perimeter as $48$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $15$, $20$, and $25$, and is **similar** to triangle B with a shortest side of $30$, what is the perimeter of triangle B?`,
                correct_answer: `$120$`,
                misconception: `A student might incorrectly calculate the perimeter as $60$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $18$, $24$, and $30$, and is **similar** to triangle B with a shortest side of $36$, what is the perimeter of triangle B?`,
                correct_answer: `$144$`,
                misconception: `A student might incorrectly calculate the perimeter as $72$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $21$, $28$, and $35$, and is **similar** to triangle B with a shortest side of $42$, what is the perimeter of triangle B?`,
                correct_answer: `$168$`,
                misconception: `A student might incorrectly calculate the perimeter as $84$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $24$, $32$, and $40$, and is **similar** to triangle B with a shortest side of $48$, what is the perimeter of triangle B?`,
                correct_answer: `$192$`,
                misconception: `A student might incorrectly calculate the perimeter as $96$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $27$, $36$, and $45$, and is **similar** to triangle B with a shortest side of $54$, what is the perimeter of triangle B?`,
                correct_answer: `$216$`,
                misconception: `A student might incorrectly calculate the perimeter as $108$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $30$, $40$, and $50$, and is **similar** to triangle B with a shortest side of $60$, what is the perimeter of triangle B?`,
                correct_answer: `$240$`,
                misconception: `A student might incorrectly calculate the perimeter as $120$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $33$, $44$, and $55$, and is **similar** to triangle B with a shortest side of $66$, what is the perimeter of triangle B?`,
                correct_answer: `$264$`,
                misconception: `A student might incorrectly calculate the perimeter as $132$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $36$, $48$, and $60$, and is **similar** to triangle B with a shortest side of $72$, what is the perimeter of triangle B?`,
                correct_answer: `$288$`,
                misconception: `A student might incorrectly calculate the perimeter as $144$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $39$, $52$, and $65$, and is **similar** to triangle B with a shortest side of $78$, what is the perimeter of triangle B?`,
                correct_answer: `$312$`,
                misconception: `A student might incorrectly calculate the perimeter as $156$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $42$, $56$, and $70$, and is **similar** to triangle B with a shortest side of $84$, what is the perimeter of triangle B?`,
                correct_answer: `$336$`,
                misconception: `A student might incorrectly calculate the perimeter as $168$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $45$, $60$, and $75$, and is **similar** to triangle B with a shortest side of $90$, what is the perimeter of triangle B?`,
                correct_answer: `$360$`,
                misconception: `A student might incorrectly calculate the perimeter as $180$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $48$, $64$, and $80$, and is **similar** to triangle B with a shortest side of $96$, what is the perimeter of triangle B?`,
                correct_answer: `$384$`,
                misconception: `A student might incorrectly calculate the perimeter as $192$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
        ]
    });

    lessons.push({
        date_start: '2026-09-28',
        topic: '[enVision T6 L7] Understand Similar Figures (8.G.4)',
        week_label: '9/28-10/2',
        direct_instruction: `Slide 1\n---\n**Welcome** class! Today we will dive deep into **[enVision T6 L7] Understand Similar Figures (8.G.4)**. **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. `,
        structured_exemplars: [
            {
                question: `If triangle A has side lengths of $3$, $4$, and $5$, and is **similar** to triangle B with a shortest side of $6$, what is the perimeter of triangle B?`,
                correct_answer: `$24$`,
                misconception: `A student might incorrectly calculate the perimeter as $12$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $6$, $8$, and $10$, and is **similar** to triangle B with a shortest side of $12$, what is the perimeter of triangle B?`,
                correct_answer: `$48$`,
                misconception: `A student might incorrectly calculate the perimeter as $24$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $9$, $12$, and $15$, and is **similar** to triangle B with a shortest side of $18$, what is the perimeter of triangle B?`,
                correct_answer: `$72$`,
                misconception: `A student might incorrectly calculate the perimeter as $36$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $12$, $16$, and $20$, and is **similar** to triangle B with a shortest side of $24$, what is the perimeter of triangle B?`,
                correct_answer: `$96$`,
                misconception: `A student might incorrectly calculate the perimeter as $48$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $15$, $20$, and $25$, and is **similar** to triangle B with a shortest side of $30$, what is the perimeter of triangle B?`,
                correct_answer: `$120$`,
                misconception: `A student might incorrectly calculate the perimeter as $60$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $18$, $24$, and $30$, and is **similar** to triangle B with a shortest side of $36$, what is the perimeter of triangle B?`,
                correct_answer: `$144$`,
                misconception: `A student might incorrectly calculate the perimeter as $72$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $21$, $28$, and $35$, and is **similar** to triangle B with a shortest side of $42$, what is the perimeter of triangle B?`,
                correct_answer: `$168$`,
                misconception: `A student might incorrectly calculate the perimeter as $84$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $24$, $32$, and $40$, and is **similar** to triangle B with a shortest side of $48$, what is the perimeter of triangle B?`,
                correct_answer: `$192$`,
                misconception: `A student might incorrectly calculate the perimeter as $96$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $27$, $36$, and $45$, and is **similar** to triangle B with a shortest side of $54$, what is the perimeter of triangle B?`,
                correct_answer: `$216$`,
                misconception: `A student might incorrectly calculate the perimeter as $108$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $30$, $40$, and $50$, and is **similar** to triangle B with a shortest side of $60$, what is the perimeter of triangle B?`,
                correct_answer: `$240$`,
                misconception: `A student might incorrectly calculate the perimeter as $120$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $33$, $44$, and $55$, and is **similar** to triangle B with a shortest side of $66$, what is the perimeter of triangle B?`,
                correct_answer: `$264$`,
                misconception: `A student might incorrectly calculate the perimeter as $132$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $36$, $48$, and $60$, and is **similar** to triangle B with a shortest side of $72$, what is the perimeter of triangle B?`,
                correct_answer: `$288$`,
                misconception: `A student might incorrectly calculate the perimeter as $144$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $39$, $52$, and $65$, and is **similar** to triangle B with a shortest side of $78$, what is the perimeter of triangle B?`,
                correct_answer: `$312$`,
                misconception: `A student might incorrectly calculate the perimeter as $156$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $42$, $56$, and $70$, and is **similar** to triangle B with a shortest side of $84$, what is the perimeter of triangle B?`,
                correct_answer: `$336$`,
                misconception: `A student might incorrectly calculate the perimeter as $168$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $45$, $60$, and $75$, and is **similar** to triangle B with a shortest side of $90$, what is the perimeter of triangle B?`,
                correct_answer: `$360$`,
                misconception: `A student might incorrectly calculate the perimeter as $180$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $48$, $64$, and $80$, and is **similar** to triangle B with a shortest side of $96$, what is the perimeter of triangle B?`,
                correct_answer: `$384$`,
                misconception: `A student might incorrectly calculate the perimeter as $192$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
        ]
    });

    lessons.push({
        date_start: '2026-09-29',
        topic: '[Open-Up U2 L9] Quotients in Similar Triangles (8.G.4)',
        week_label: '9/28-10/2',
        direct_instruction: `Slide 1\n---\n**Welcome** class! Today we will dive deep into **[Open-Up U2 L9] Quotients in Similar Triangles (8.G.4)**. **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. `,
        structured_exemplars: [
            {
                question: `If triangle A has side lengths of $3$, $4$, and $5$, and is **similar** to triangle B with a shortest side of $6$, what is the perimeter of triangle B?`,
                correct_answer: `$24$`,
                misconception: `A student might incorrectly calculate the perimeter as $12$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $6$, $8$, and $10$, and is **similar** to triangle B with a shortest side of $12$, what is the perimeter of triangle B?`,
                correct_answer: `$48$`,
                misconception: `A student might incorrectly calculate the perimeter as $24$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $9$, $12$, and $15$, and is **similar** to triangle B with a shortest side of $18$, what is the perimeter of triangle B?`,
                correct_answer: `$72$`,
                misconception: `A student might incorrectly calculate the perimeter as $36$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $12$, $16$, and $20$, and is **similar** to triangle B with a shortest side of $24$, what is the perimeter of triangle B?`,
                correct_answer: `$96$`,
                misconception: `A student might incorrectly calculate the perimeter as $48$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $15$, $20$, and $25$, and is **similar** to triangle B with a shortest side of $30$, what is the perimeter of triangle B?`,
                correct_answer: `$120$`,
                misconception: `A student might incorrectly calculate the perimeter as $60$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $18$, $24$, and $30$, and is **similar** to triangle B with a shortest side of $36$, what is the perimeter of triangle B?`,
                correct_answer: `$144$`,
                misconception: `A student might incorrectly calculate the perimeter as $72$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $21$, $28$, and $35$, and is **similar** to triangle B with a shortest side of $42$, what is the perimeter of triangle B?`,
                correct_answer: `$168$`,
                misconception: `A student might incorrectly calculate the perimeter as $84$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $24$, $32$, and $40$, and is **similar** to triangle B with a shortest side of $48$, what is the perimeter of triangle B?`,
                correct_answer: `$192$`,
                misconception: `A student might incorrectly calculate the perimeter as $96$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $27$, $36$, and $45$, and is **similar** to triangle B with a shortest side of $54$, what is the perimeter of triangle B?`,
                correct_answer: `$216$`,
                misconception: `A student might incorrectly calculate the perimeter as $108$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $30$, $40$, and $50$, and is **similar** to triangle B with a shortest side of $60$, what is the perimeter of triangle B?`,
                correct_answer: `$240$`,
                misconception: `A student might incorrectly calculate the perimeter as $120$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $33$, $44$, and $55$, and is **similar** to triangle B with a shortest side of $66$, what is the perimeter of triangle B?`,
                correct_answer: `$264$`,
                misconception: `A student might incorrectly calculate the perimeter as $132$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $36$, $48$, and $60$, and is **similar** to triangle B with a shortest side of $72$, what is the perimeter of triangle B?`,
                correct_answer: `$288$`,
                misconception: `A student might incorrectly calculate the perimeter as $144$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $39$, $52$, and $65$, and is **similar** to triangle B with a shortest side of $78$, what is the perimeter of triangle B?`,
                correct_answer: `$312$`,
                misconception: `A student might incorrectly calculate the perimeter as $156$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $42$, $56$, and $70$, and is **similar** to triangle B with a shortest side of $84$, what is the perimeter of triangle B?`,
                correct_answer: `$336$`,
                misconception: `A student might incorrectly calculate the perimeter as $168$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $45$, $60$, and $75$, and is **similar** to triangle B with a shortest side of $90$, what is the perimeter of triangle B?`,
                correct_answer: `$360$`,
                misconception: `A student might incorrectly calculate the perimeter as $180$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $48$, $64$, and $80$, and is **similar** to triangle B with a shortest side of $96$, what is the perimeter of triangle B?`,
                correct_answer: `$384$`,
                misconception: `A student might incorrectly calculate the perimeter as $192$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
        ]
    });

    lessons.push({
        date_start: '2026-09-30',
        topic: '[Review] Cluster 2 Review / EOG Released Questions',
        week_label: '9/28-10/2',
        direct_instruction: `Slide 1\n---\n**Welcome** class! Today we will dive deep into **[Review] Cluster 2 Review / EOG Released Questions**. **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. `,
        structured_exemplars: [
            {
                question: `If triangle A has side lengths of $3$, $4$, and $5$, and is **similar** to triangle B with a shortest side of $6$, what is the perimeter of triangle B?`,
                correct_answer: `$24$`,
                misconception: `A student might incorrectly calculate the perimeter as $12$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $6$, $8$, and $10$, and is **similar** to triangle B with a shortest side of $12$, what is the perimeter of triangle B?`,
                correct_answer: `$48$`,
                misconception: `A student might incorrectly calculate the perimeter as $24$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $9$, $12$, and $15$, and is **similar** to triangle B with a shortest side of $18$, what is the perimeter of triangle B?`,
                correct_answer: `$72$`,
                misconception: `A student might incorrectly calculate the perimeter as $36$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $12$, $16$, and $20$, and is **similar** to triangle B with a shortest side of $24$, what is the perimeter of triangle B?`,
                correct_answer: `$96$`,
                misconception: `A student might incorrectly calculate the perimeter as $48$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $15$, $20$, and $25$, and is **similar** to triangle B with a shortest side of $30$, what is the perimeter of triangle B?`,
                correct_answer: `$120$`,
                misconception: `A student might incorrectly calculate the perimeter as $60$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $18$, $24$, and $30$, and is **similar** to triangle B with a shortest side of $36$, what is the perimeter of triangle B?`,
                correct_answer: `$144$`,
                misconception: `A student might incorrectly calculate the perimeter as $72$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $21$, $28$, and $35$, and is **similar** to triangle B with a shortest side of $42$, what is the perimeter of triangle B?`,
                correct_answer: `$168$`,
                misconception: `A student might incorrectly calculate the perimeter as $84$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $24$, $32$, and $40$, and is **similar** to triangle B with a shortest side of $48$, what is the perimeter of triangle B?`,
                correct_answer: `$192$`,
                misconception: `A student might incorrectly calculate the perimeter as $96$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $27$, $36$, and $45$, and is **similar** to triangle B with a shortest side of $54$, what is the perimeter of triangle B?`,
                correct_answer: `$216$`,
                misconception: `A student might incorrectly calculate the perimeter as $108$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $30$, $40$, and $50$, and is **similar** to triangle B with a shortest side of $60$, what is the perimeter of triangle B?`,
                correct_answer: `$240$`,
                misconception: `A student might incorrectly calculate the perimeter as $120$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $33$, $44$, and $55$, and is **similar** to triangle B with a shortest side of $66$, what is the perimeter of triangle B?`,
                correct_answer: `$264$`,
                misconception: `A student might incorrectly calculate the perimeter as $132$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $36$, $48$, and $60$, and is **similar** to triangle B with a shortest side of $72$, what is the perimeter of triangle B?`,
                correct_answer: `$288$`,
                misconception: `A student might incorrectly calculate the perimeter as $144$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $39$, $52$, and $65$, and is **similar** to triangle B with a shortest side of $78$, what is the perimeter of triangle B?`,
                correct_answer: `$312$`,
                misconception: `A student might incorrectly calculate the perimeter as $156$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $42$, $56$, and $70$, and is **similar** to triangle B with a shortest side of $84$, what is the perimeter of triangle B?`,
                correct_answer: `$336$`,
                misconception: `A student might incorrectly calculate the perimeter as $168$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $45$, $60$, and $75$, and is **similar** to triangle B with a shortest side of $90$, what is the perimeter of triangle B?`,
                correct_answer: `$360$`,
                misconception: `A student might incorrectly calculate the perimeter as $180$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $48$, $64$, and $80$, and is **similar** to triangle B with a shortest side of $96$, what is the perimeter of triangle B?`,
                correct_answer: `$384$`,
                misconception: `A student might incorrectly calculate the perimeter as $192$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
        ]
    });

    lessons.push({
        date_start: '2026-10-01',
        topic: '[Assessment] Cluster 2 Post Assessment',
        week_label: '9/28-10/2',
        direct_instruction: `Slide 1\n---\n**Welcome** class! Today we will dive deep into **[Assessment] Cluster 2 Post Assessment**. **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** **Let's talk about the absolute most important concepts for today's lesson.** \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 2\n**Now let's review our previous knowledge.** **Understanding** similar figures means we look at **proportional** relationships and **scale factors**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. \n---\nSlide 3\n**Pay close attention to these critical details.** The **quotients** of corresponding sides in **similar** triangles remain **constant**. `,
        structured_exemplars: [
            {
                question: `If triangle A has side lengths of $3$, $4$, and $5$, and is **similar** to triangle B with a shortest side of $6$, what is the perimeter of triangle B?`,
                correct_answer: `$24$`,
                misconception: `A student might incorrectly calculate the perimeter as $12$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $6$, $8$, and $10$, and is **similar** to triangle B with a shortest side of $12$, what is the perimeter of triangle B?`,
                correct_answer: `$48$`,
                misconception: `A student might incorrectly calculate the perimeter as $24$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $9$, $12$, and $15$, and is **similar** to triangle B with a shortest side of $18$, what is the perimeter of triangle B?`,
                correct_answer: `$72$`,
                misconception: `A student might incorrectly calculate the perimeter as $36$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $12$, $16$, and $20$, and is **similar** to triangle B with a shortest side of $24$, what is the perimeter of triangle B?`,
                correct_answer: `$96$`,
                misconception: `A student might incorrectly calculate the perimeter as $48$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $15$, $20$, and $25$, and is **similar** to triangle B with a shortest side of $30$, what is the perimeter of triangle B?`,
                correct_answer: `$120$`,
                misconception: `A student might incorrectly calculate the perimeter as $60$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $18$, $24$, and $30$, and is **similar** to triangle B with a shortest side of $36$, what is the perimeter of triangle B?`,
                correct_answer: `$144$`,
                misconception: `A student might incorrectly calculate the perimeter as $72$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $21$, $28$, and $35$, and is **similar** to triangle B with a shortest side of $42$, what is the perimeter of triangle B?`,
                correct_answer: `$168$`,
                misconception: `A student might incorrectly calculate the perimeter as $84$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $24$, $32$, and $40$, and is **similar** to triangle B with a shortest side of $48$, what is the perimeter of triangle B?`,
                correct_answer: `$192$`,
                misconception: `A student might incorrectly calculate the perimeter as $96$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $27$, $36$, and $45$, and is **similar** to triangle B with a shortest side of $54$, what is the perimeter of triangle B?`,
                correct_answer: `$216$`,
                misconception: `A student might incorrectly calculate the perimeter as $108$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $30$, $40$, and $50$, and is **similar** to triangle B with a shortest side of $60$, what is the perimeter of triangle B?`,
                correct_answer: `$240$`,
                misconception: `A student might incorrectly calculate the perimeter as $120$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $33$, $44$, and $55$, and is **similar** to triangle B with a shortest side of $66$, what is the perimeter of triangle B?`,
                correct_answer: `$264$`,
                misconception: `A student might incorrectly calculate the perimeter as $132$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $36$, $48$, and $60$, and is **similar** to triangle B with a shortest side of $72$, what is the perimeter of triangle B?`,
                correct_answer: `$288$`,
                misconception: `A student might incorrectly calculate the perimeter as $144$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $39$, $52$, and $65$, and is **similar** to triangle B with a shortest side of $78$, what is the perimeter of triangle B?`,
                correct_answer: `$312$`,
                misconception: `A student might incorrectly calculate the perimeter as $156$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $42$, $56$, and $70$, and is **similar** to triangle B with a shortest side of $84$, what is the perimeter of triangle B?`,
                correct_answer: `$336$`,
                misconception: `A student might incorrectly calculate the perimeter as $168$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $45$, $60$, and $75$, and is **similar** to triangle B with a shortest side of $90$, what is the perimeter of triangle B?`,
                correct_answer: `$360$`,
                misconception: `A student might incorrectly calculate the perimeter as $180$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
            {
                question: `If triangle A has side lengths of $48$, $64$, and $80$, and is **similar** to triangle B with a shortest side of $96$, what is the perimeter of triangle B?`,
                correct_answer: `$384$`,
                misconception: `A student might incorrectly calculate the perimeter as $192$ by forgetting to apply the scale factor of $2$ to all sides.`
            },
        ]
    });

    const { data, error } = await supabase.from('lesson_plans').insert(lessons);
    if (error) {
        console.error('Error inserting:', error);
    } else {
        console.log('Successfully seeded 6 lessons!');
    }
}
run();
