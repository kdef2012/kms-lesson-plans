import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import * as pdfjsLib from 'pdfjs-dist';
import { Upload, Save, FileText, Plus, Trash2, ChevronDown, ChevronRight, CheckSquare, Image as ImageIcon } from 'lucide-react';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const LessonPlanForm = () => {
  const [formData, setFormData] = useState({
    date_start: '',
    week_label: '',
    topic: '',
    objective_3m: '',
    standard: '',
    do_now: '',
    direct_instruction: '',
    group_practice: '',
    independent_practice: '',
    criteria_for_success: '',
    exit_ticket: '',
  });
  
  const [cfus, setCfus] = useState([{ cfu: '', method: '' }]);
  const [structuredExemplars, setStructuredExemplars] = useState([{ question: '', correct_answer: '', misconception: '' }]);
  const [showChecklist, setShowChecklist] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const [exemplarImage, setExemplarImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCfuChange = (index, field, value) => {
    const newCfus = [...cfus];
    newCfus[index][field] = value;
    setCfus(newCfus);
  };

  const addCfu = () => setCfus([...cfus, { cfu: '', method: '' }]);
  const removeCfu = (index) => setCfus(cfus.filter((_, i) => i !== index));

  const handleExemplarChange = (index, field, value) => {
    const newEx = [...structuredExemplars];
    newEx[index][field] = value;
    setStructuredExemplars(newEx);
  };

  const addExemplar = () => setStructuredExemplars([...structuredExemplars, { question: '', correct_answer: '', misconception: '' }]);
  const removeExemplar = (index) => setStructuredExemplars(structuredExemplars.filter((_, i) => i !== index));

  const handlePdfChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setPdfFile(selectedFile);
      await parsePDF(selectedFile);
    }
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setExemplarImage(selectedFile);
    }
  };

  const parsePDF = async (pdf) => {
    setMessage('Parsing PDF...');
    try {
      const arrayBuffer = await pdf.arrayBuffer();
      const pdfDoc = await pdfjsLib.getDocument(arrayBuffer).promise;
      let fullText = '';
      
      for (let i = 1; i <= pdfDoc.numPages; i++) {
        const page = await pdfDoc.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(' ');
        fullText += pageText + ' ';
      }
      
      const parsedData = { ...formData };
      
      const extractSection = (startKeyword, endKeyword) => {
        const regex = new RegExp(`${startKeyword}(.*?)(?=${endKeyword}|$)`, 'i');
        const match = fullText.match(regex);
        return match ? match[1].trim() : '';
      };

      parsedData.topic = extractSection('Date/Topic', '3M Objective');
      parsedData.objective_3m = extractSection('3M Objective', 'Standard');
      parsedData.standard = extractSection('Standard', 'Do Now');
      parsedData.do_now = extractSection('Do Now', 'Direct Instruction');
      parsedData.direct_instruction = extractSection('Direct Instruction', 'Group Practice');
      parsedData.group_practice = extractSection('Group Practice', 'Independent Practice');
      parsedData.independent_practice = extractSection('Independent Practice', 'Criteria for Success');
      parsedData.criteria_for_success = extractSection('Criteria for Success', 'Exit Ticket');
      parsedData.exit_ticket = extractSection('Exit Ticket', 'Checks for Understanding');

      setFormData(parsedData);
      setMessage('PDF Parsed successfully. Please review the extracted fields.');
    } catch (err) {
      console.error(err);
      setMessage('Failed to parse PDF.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      let pdf_url = null;
      let exemplar_image_url = null;

      if (pdfFile) {
        const fileName = `pdf_${Date.now()}_${pdfFile.name}`;
        const { error: uploadError } = await supabase.storage.from('pdfs').upload(fileName, pdfFile);
        if (uploadError) throw uploadError;
        const { data } = supabase.storage.from('pdfs').getPublicUrl(fileName);
        pdf_url = data.publicUrl;
      }

      if (exemplarImage) {
        const imgName = `img_${Date.now()}_${exemplarImage.name}`;
        const { error: uploadError } = await supabase.storage.from('pdfs').upload(imgName, exemplarImage);
        if (uploadError) throw uploadError;
        const { data } = supabase.storage.from('pdfs').getPublicUrl(imgName);
        exemplar_image_url = data.publicUrl;
      }

      const validCfus = cfus.filter(c => c.cfu.trim() !== '' || c.method.trim() !== '');
      const validExemplars = structuredExemplars.filter(e => e.question.trim() !== '');

      const { error } = await supabase
        .from('lesson_plans')
        .insert([{ 
          ...formData, 
          checks_for_understanding: validCfus, 
          structured_exemplars: validExemplars,
          pdf_url,
          exemplar_image_url
        }]);

      if (error) throw error;
      
      setMessage('Lesson Plan saved successfully!');
      setFormData({
        date_start: '', week_label: '', topic: '', objective_3m: '', standard: '',
        do_now: '', direct_instruction: '', group_practice: '', independent_practice: '',
        criteria_for_success: '', exit_ticket: ''
      });
      setCfus([{ cfu: '', method: '' }]);
      setStructuredExemplars([{ question: '', correct_answer: '', misconception: '' }]);
      setPdfFile(null);
      setExemplarImage(null);
    } catch (err) {
      console.error(err);
      setMessage('Error saving lesson plan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass" style={{ padding: '30px' }}>
      <h3 style={{ marginTop: 0, color: 'var(--kms-purple-dark)', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <FileText size={24} /> Create / Upload Lesson Plan
      </h3>
      
      <div style={{ marginBottom: '20px', border: '1px solid var(--kms-teal)', borderRadius: '8px', overflow: 'hidden' }}>
        <div 
          onClick={() => setShowChecklist(!showChecklist)}
          style={{ background: 'var(--kms-teal)', color: 'white', padding: '10px 15px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'bold' }}
        >
          {showChecklist ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          <CheckSquare size={18} /> Lesson Plan Checklist (Reference)
        </div>
        {showChecklist && (
          <div style={{ padding: '15px', background: 'rgba(0,128,128,0.05)', fontSize: '14px', lineHeight: '1.5' }}>
            <p><strong>Criteria for Success:</strong> Steps taken to ensure scholars reach outcome? Exemplar included?</p>
            <p><strong>3M Objective:</strong> Aligned to standard? Measurable, manageable, most important next steps?</p>
            <p><strong>Product:</strong> Final product demonstrates mastery? Matches objective? Aligned to standard?</p>
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        <div style={{ padding: '15px', backgroundColor: 'rgba(0,128,128,0.1)', borderRadius: '8px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '10px', color: 'var(--kms-teal-dark)' }}>
            <Upload size={18} style={{ verticalAlign: 'middle', marginRight: '5px' }} />
            Auto-fill from PDF Template
          </label>
          <input type="file" accept="application/pdf" onChange={handlePdfChange} />
        </div>
        
        <div style={{ padding: '15px', backgroundColor: 'rgba(102, 51, 153, 0.1)', borderRadius: '8px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '10px', color: 'var(--kms-purple-dark)' }}>
            <ImageIcon size={18} style={{ verticalAlign: 'middle', marginRight: '5px' }} />
            Upload Handwritten Exemplar (Image)
          </label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
      </div>
      
      {message && <p style={{ color: message.includes('Error') || message.includes('Failed') ? 'red' : 'var(--kms-teal)', fontWeight: 'bold', marginBottom: '20px' }}>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div className="form-group">
            <label>Start Date (Select specific day)</label>
            <input type="date" name="date_start" className="input-field" value={formData.date_start} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>Week Label (e.g. 8/10-8/14)</label>
            <input type="text" name="week_label" className="input-field" placeholder="8/10-8/14" value={formData.week_label} onChange={handleInputChange} required />
          </div>
        </div>

        <div className="form-group">
          <label>Topic</label>
          <input type="text" name="topic" className="input-field" value={formData.topic} onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label>3M Objective</label>
          <textarea name="objective_3m" className="input-field" value={formData.objective_3m} onChange={handleInputChange} />
        </div>
        
        <div className="form-group">
          <label>Standard</label>
          <textarea name="standard" className="input-field" value={formData.standard} onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label>Do Now (Spiral Topics)</label>
          <textarea name="do_now" className="input-field" value={formData.do_now} onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label>Direct Instruction (Launch)</label>
          <textarea name="direct_instruction" className="input-field" value={formData.direct_instruction} onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label>Group Practice</label>
          <textarea name="group_practice" className="input-field" value={formData.group_practice} onChange={handleInputChange} />
        </div>

        {/* Structured Exemplar Builder */}
        <div className="form-group" style={{ backgroundColor: '#fdfdfd', padding: '15px', borderRadius: '8px', border: '1px solid #ddd' }}>
          <label style={{ borderBottom: '2px solid var(--kms-purple)', paddingBottom: '5px', marginBottom: '15px', display: 'block', fontSize: '16px' }}>
            Structured Exemplar Builder (Step-by-Step)
          </label>
          <p style={{ fontSize: '12px', color: '#666', marginBottom: '15px' }}>Break down the independent practice into specific problems, showing exactly how to solve them correctly and anticipating common mistakes.</p>
          
          {structuredExemplars.map((ex, index) => (
            <div key={index} style={{ marginBottom: '15px', padding: '15px', backgroundColor: 'white', border: '1px solid #eee', borderRadius: '4px', position: 'relative' }}>
              <button type="button" onClick={() => removeExemplar(index)} style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer' }}>
                <Trash2 size={18} />
              </button>
              <div style={{ fontWeight: 'bold', marginBottom: '10px', color: 'var(--kms-teal)' }}>Problem {index + 1}</div>
              
              <input type="text" className="input-field" placeholder="Problem Question (e.g. Solve for x: 2x = 10)" value={ex.question} onChange={(e) => handleExemplarChange(index, 'question', e.target.value)} style={{ marginBottom: '10px' }} />
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <textarea className="input-field" placeholder="Correct Process / Teacher Work" value={ex.correct_answer} onChange={(e) => handleExemplarChange(index, 'correct_answer', e.target.value)} rows="3" />
                <textarea className="input-field" placeholder="Anticipated Misconception & Intervention" value={ex.misconception} onChange={(e) => handleExemplarChange(index, 'misconception', e.target.value)} rows="3" />
              </div>
            </div>
          ))}
          <button type="button" onClick={addExemplar} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '5px 10px', fontSize: '14px' }}>
            <Plus size={16} /> Add Problem to Exemplar
          </button>
        </div>
        
        <div className="form-group">
          <label>Criteria for Success</label>
          <textarea name="criteria_for_success" className="input-field" value={formData.criteria_for_success} onChange={handleInputChange} />
        </div>
        
        <div className="form-group">
          <label>Exit Ticket (Question)</label>
          <textarea name="exit_ticket" className="input-field" value={formData.exit_ticket} onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label style={{ borderBottom: '2px solid var(--kms-purple)', paddingBottom: '5px', marginBottom: '15px' }}>Checks for Understanding</label>
          {cfus.map((c, index) => (
            <div key={index} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '10px', marginBottom: '10px', alignItems: 'center' }}>
              <input 
                type="text" className="input-field" placeholder="CFU" 
                value={c.cfu} onChange={(e) => handleCfuChange(index, 'cfu', e.target.value)} 
              />
              <input 
                type="text" className="input-field" placeholder="Method/DOK" 
                value={c.method} onChange={(e) => handleCfuChange(index, 'method', e.target.value)} 
              />
              <button type="button" onClick={() => removeCfu(index)} style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer', padding: '10px' }}>
                <Trash2 size={20} />
              </button>
            </div>
          ))}
          <button type="button" onClick={addCfu} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '5px 10px', fontSize: '14px' }}>
            <Plus size={16} /> Add CFU
          </button>
        </div>

        <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', fontSize: '18px', marginTop: '20px' }}>
          <Save size={20} style={{ verticalAlign: 'middle', marginRight: '8px' }} />
          {loading ? 'Saving...' : 'Save Lesson Plan'}
        </button>
      </form>
    </div>
  );
};

export default LessonPlanForm;
