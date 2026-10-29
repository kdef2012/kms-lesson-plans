import re

with open('src/components/LessonPlanViewer.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update default cfuText to randomly pick from a list
cfu_logic = """
    const cfuStrategies = [
      'Turn and Talk: Discuss the core concept with your neighbor.',
      'Stop and Jot: Write down the most important thing you learned in the last 5 minutes.',
      'Think-Pair-Share: Think about the core concept for 30 seconds, then pair up and share your thoughts.',
      'Fist to Five: Rate your understanding from 0 (completely lost) to 5 (I could teach it) by holding up your fingers.',
      'Thumbs Up/Down: Show a thumbs up if you feel confident about the concept, or thumbs down if you need more help.',
      'Cold Call Prep: Take 30 seconds to formulate a summary in your head. The teacher will call on a random student.'
    ];
    // Hash the topic string to consistently pick the same CFU strategy for the same lesson plan
    const hashStr = (plan.topic || '').split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const defaultCfu = cfuStrategies[hashStr % cfuStrategies.length];

    const cfuText = plan.checks_for_understanding && plan.checks_for_understanding.length > 0 
      ? plan.checks_for_understanding[0].cfu 
      : defaultCfu;
"""
content = re.sub(
    r"const cfuText = plan\.checks_for_understanding && plan\.checks_for_understanding\.length > 0\s*\?\s*plan\.checks_for_understanding\[0\]\.cfu\s*:\s*'Turn and talk to your neighbor about the core concept we just discussed\.';",
    cfu_logic.strip(),
    content
)

# 2. Update Formative Assessment / CFU timer from 2 minutes to 1:30 (1.5 minutes)
content = re.sub(
    r'<div class="timer" onclick="startTimer\(this, 2\)">2:00</div>',
    '<div class="timer" onclick="startTimer(this, 1.5)">1:30</div>',
    content
)

# 3. Update Direct Instruction timer from 10 minutes to 5 minutes
content = re.sub(
    r"content: part\.trim\(\) \+ `\\n\\n<div class=\"timer\" onclick=\"startTimer\(this, 10\)\">10:00</div>`",
    r"content: part.trim() + `\\n\\n<div class=\"timer\" onclick=\"startTimer(this, 5)\">5:00</div>`",
    content
)

with open('src/components/LessonPlanViewer.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Patched LessonPlanViewer.jsx successfully.")
