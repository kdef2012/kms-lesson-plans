import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import * as pdfjsLib from 'pdfjs-dist';
import { Upload, Save, FileText, Plus, Trash2, ChevronDown, ChevronRight, CheckSquare } from 'lucide-react';

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
  const [showChecklist, setShowChecklist] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
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

  const addCfu = () => {
    setCfus([...cfus, { cfu: '', method: '' }]);
  };

  const removeCfu = (index) => {
    setCfus(cfus.filter((_, i) => i !== index));
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      await parsePDF(selectedFile);
    }
  };

  const parsePDF = async (pdfFile) => {
    setMessage('Parsing PDF...');
    try {
      const arrayBuffer = await pdfFile.arrayBuffer();
      const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
      let fullText = '';
      
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
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
      if (file) {
        const fileName = `${Date.now()}_${file.name}`;
        const { error: uploadError } = await supabase.storage
          .from('pdfs')
          .upload(fileName, file);
          
        if (uploadError) throw uploadError;
        
        const { data: publicUrlData } = supabase.storage
          .from('pdfs')
          .getPublicUrl(fileName);
          
        pdf_url = publicUrlData.publicUrl;
      }

      // Filter out empty CFUs
      const validCfus = cfus.filter(c => c.cfu.trim() !== '' || c.method.trim() !== '');

      const { error } = await supabase
        .from('lesson_plans')
        .insert([{ ...formData, checks_for_understanding: validCfus, pdf_url }]);

      if (error) throw error;
      
      setMessage('Lesson Plan saved successfully!');
      setFormData({
        date_start: '', week_label: '', topic: '', objective_3m: '', standard: '',
        do_now: '', direct_instruction: '', group_practice: '', independent_practice: '',
        criteria_for_success: '', exit_ticket: ''
      });
      setCfus([{ cfu: '', method: '' }]);
      setFile(null);
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
      
      {/* Lesson Plan Checklist Collapsible */}
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
            <p><strong>Criteria for Success:</strong> Steps taken to ensure scholars reach outcome? Direct/guided/independent practice incorporated? Clear vision for expectations/directions? Routines incorporated? Exemplar included?</p>
            <p><strong>3M Objective:</strong> Aligned to standard? Measurable, manageable, most important next steps? Accurately conveys what scholars walk away with?</p>
            <p><strong>Product:</strong> Final product demonstrates mastery? Matches objective? Aligned to standard? Manageable before they leave?</p>
            <p><strong>Time Well Spent:</strong> All portions build to mastery? Scholars held accountable during all aspects? Ensuring active participation?</p>
            <p><strong>Next Steps:</strong> How does this flow into the next lesson? What will you do tomorrow to build off today?</p>
          </div>
        )}
      </div>

      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: 'rgba(0,128,128,0.1)', borderRadius: '8px' }}>
        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '10px', color: 'var(--kms-teal-dark)' }}>
          <Upload size={18} style={{ verticalAlign: 'middle', marginRight: '5px' }} />
          Auto-fill from PDF Template
        </label>
        <input type="file" accept="application/pdf" onChange={handleFileChange} />
        {message && <p style={{ color: message.includes('Error') || message.includes('Failed') ? 'red' : 'var(--kms-teal)', fontWeight: 'bold', marginTop: '10px' }}>{message}</p>}
      </div>

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

        <div className="form-group">
          <label>Independent Practice (Exemplar)</label>
          <textarea name="independent_practice" className="input-field" value={formData.independent_practice} onChange={handleInputChange} />
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
                type="text" 
                className="input-field" 
                placeholder="CFU" 
                value={c.cfu} 
                onChange={(e) => handleCfuChange(index, 'cfu', e.target.value)} 
              />
              <input 
                type="text" 
                className="input-field" 
                placeholder="Method/DOK" 
                value={c.method} 
                onChange={(e) => handleCfuChange(index, 'method', e.target.value)} 
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
