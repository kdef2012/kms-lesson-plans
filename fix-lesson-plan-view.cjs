const fs = require('fs');
const path = 'src/components/LessonPlanViewer.jsx';
let code = fs.readFileSync(path, 'utf8');

const regex = /<Section id="group_practice" title="Group Practice" content=\{plan\.group_practice\} \/>\s*\{\/\* Advanced Exemplar Section \*\/\}\s*<Section id="independent_practice" title="Independent Practice \(Exemplar\)">\s*\{plan\.exemplar_image_url && \([\s\S]*?\{\s*plan\.structured_exemplars && plan\.structured_exemplars\.length > 0 \? \(\s*<div>\s*<h5 style=\{\{ margin: '0 0 15px 0', color: '#555' \}\}>Structured Problem Breakdown<\/h5>\s*\{plan\.structured_exemplars\.map\(\(ex, idx\) => \(\s*<div key=\{idx\} style=\{\{ marginBottom: '20px', border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden' \}\}>\s*<div style=\{\{ backgroundColor: 'var\(--kms-purple\)', color: 'white', padding: '10px 15px', fontWeight: 'bold' \}\}>\s*Problem \{idx \+ 1\}: <span dangerouslySetInnerHTML=\{\{ __html: renderQuestionContent\(ex\) \}\} \/>\s*<\/div>\s*<div style=\{\{ display: 'flex', flexWrap: 'wrap', backgroundColor: '#fff' \}\}>\s*<div style=\{\{ flex: '1 1 50%', padding: '15px', borderRight: '1px solid #eee' \}\}>\s*<div style=\{\{ color: 'var\(--kms-teal-dark\)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '8px' \}\}>\s*<CheckCircle2 size=\{16\} \/> Correct Process \/ Answer\s*<\/div>\s*<div style=\{\{ whiteSpace: 'pre-wrap', fontSize: '14px' \}\}>\{ex\.correct_answer\}<\/div>\s*<\/div>\s*<div style=\{\{ flex: '1 1 50%', padding: '15px', backgroundColor: '#fff5f5' \}\}>\s*<div style=\{\{ color: '#d32f2f', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '8px' \}\}>\s*<AlertTriangle size=\{16\} \/> Anticipated Misconception & Intervention\s*<\/div>\s*<div style=\{\{ whiteSpace: 'pre-wrap', fontSize: '14px' \}\}>\{ex\.misconception\}<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*\)\}\s*<\/div>\s*\) : \(\s*<div style=\{\{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', fontStyle: 'italic', color: '#666' \}\}>\s*No structured problems found\. Edit the plan to add them\.\s*<\/div>\s*\)\}\s*<\/Section>/;

const newJSX = `
        {/* Advanced Exemplar Section */}
        {plan.exemplar_image_url && (
            <Section id="exemplar_image" title="Handwritten Exemplar">
                <div style={{ marginBottom: '20px' }}>
                    <a href={plan.exemplar_image_url} target="_blank" rel="noopener noreferrer">
                        <img 
                            src={plan.exemplar_image_url} 
                            alt="Handwritten Exemplar" 
                            style={{ maxWidth: '100%', maxHeight: '400px', borderRadius: '8px', border: '1px solid #ddd' }} 
                        />
                    </a>
                </div>
            </Section>
        )}

        <Section id="guided_practice" title="Guided Practice (We Do)">
            {plan.structured_exemplars && plan.structured_exemplars.length >= 2 ? (
                <div>
                    {plan.structured_exemplars.slice(0, 2).map((ex, idx) => (
                        <div key={'guided-'+idx} style={{ marginBottom: '20px', border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden' }}>
                            <div style={{ backgroundColor: 'var(--kms-purple)', color: 'white', padding: '10px 15px', fontWeight: 'bold' }}>
                                Problem {idx + 1}: <span dangerouslySetInnerHTML={{ __html: renderQuestionContent(ex) }} />
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: '#fff' }}>
                                <div style={{ flex: '1 1 50%', padding: '15px', borderRight: '1px solid #eee' }}>
                                    <div style={{ color: 'var(--kms-teal-dark)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '8px' }}>
                                        <CheckCircle2 size={16} /> Correct Process / Answer
                                    </div>
                                    <div style={{ whiteSpace: 'pre-wrap', fontSize: '14px' }}>{ex.correct_answer}</div>
                                </div>
                                <div style={{ flex: '1 1 50%', padding: '15px', backgroundColor: '#fff5f5' }}>
                                    <div style={{ color: '#d32f2f', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '8px' }}>
                                        <AlertTriangle size={16} /> Anticipated Misconception & Intervention
                                    </div>
                                    <div style={{ whiteSpace: 'pre-wrap', fontSize: '14px' }}>{ex.misconception}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', fontStyle: 'italic', color: '#666' }}>
                    No guided practice problems found.
                </div>
            )}
        </Section>

        <Section id="group_practice" title="Group Practice">
            {plan.structured_exemplars && plan.structured_exemplars.length >= 6 ? (
                <div>
                    {plan.structured_exemplars.slice(2, 6).map((ex, idx) => (
                        <div key={'group-'+idx} style={{ marginBottom: '20px', border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden' }}>
                            <div style={{ backgroundColor: 'var(--kms-purple)', color: 'white', padding: '10px 15px', fontWeight: 'bold' }}>
                                Problem {idx + 3}: <span dangerouslySetInnerHTML={{ __html: renderQuestionContent(ex) }} />
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: '#fff' }}>
                                <div style={{ flex: '1 1 50%', padding: '15px', borderRight: '1px solid #eee' }}>
                                    <div style={{ color: 'var(--kms-teal-dark)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '8px' }}>
                                        <CheckCircle2 size={16} /> Correct Process / Answer
                                    </div>
                                    <div style={{ whiteSpace: 'pre-wrap', fontSize: '14px' }}>{ex.correct_answer}</div>
                                </div>
                                <div style={{ flex: '1 1 50%', padding: '15px', backgroundColor: '#fff5f5' }}>
                                    <div style={{ color: '#d32f2f', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '8px' }}>
                                        <AlertTriangle size={16} /> Anticipated Misconception & Intervention
                                    </div>
                                    <div style={{ whiteSpace: 'pre-wrap', fontSize: '14px' }}>{ex.misconception}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', fontStyle: 'italic', color: '#666' }}>
                    No group practice problems found.
                </div>
            )}
        </Section>

        <Section id="independent_practice" title="Independent Practice">
            {plan.structured_exemplars && plan.structured_exemplars.length >= 16 ? (
                <div>
                    {plan.structured_exemplars.slice(6, 16).map((ex, idx) => (
                        <div key={'ind-'+idx} style={{ marginBottom: '20px', border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden' }}>
                            <div style={{ backgroundColor: 'var(--kms-purple)', color: 'white', padding: '10px 15px', fontWeight: 'bold' }}>
                                Problem {idx + 7}: <span dangerouslySetInnerHTML={{ __html: renderQuestionContent(ex) }} />
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: '#fff' }}>
                                <div style={{ flex: '1 1 50%', padding: '15px', borderRight: '1px solid #eee' }}>
                                    <div style={{ color: 'var(--kms-teal-dark)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '8px' }}>
                                        <CheckCircle2 size={16} /> Correct Process / Answer
                                    </div>
                                    <div style={{ whiteSpace: 'pre-wrap', fontSize: '14px' }}>{ex.correct_answer}</div>
                                </div>
                                <div style={{ flex: '1 1 50%', padding: '15px', backgroundColor: '#fff5f5' }}>
                                    <div style={{ color: '#d32f2f', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '8px' }}>
                                        <AlertTriangle size={16} /> Anticipated Misconception & Intervention
                                    </div>
                                    <div style={{ whiteSpace: 'pre-wrap', fontSize: '14px' }}>{ex.misconception}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', fontStyle: 'italic', color: '#666' }}>
                    No independent practice problems found.
                </div>
            )}
        </Section>
`;

if (code.match(regex)) {
    code = code.replace(regex, newJSX);
    fs.writeFileSync(path, code);
    console.log("Re-organized the sections!");
} else {
    console.log("Regex didn't match.");
}
