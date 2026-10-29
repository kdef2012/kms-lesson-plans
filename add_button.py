import sys

with open('src/components/LessonPlanViewer.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_button = """            <button onClick={handlePrintWorksheet} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Printer size={18} /> Worksheet
            </button>"""

new_buttons = """            <button onClick={handlePrintGuidedNotes} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Printer size={18} /> Guided Notes
            </button>
            <button onClick={handlePrintWorksheet} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Printer size={18} /> Worksheet
            </button>"""

content = content.replace(old_button, new_buttons)

with open('src/components/LessonPlanViewer.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Added buttons")
