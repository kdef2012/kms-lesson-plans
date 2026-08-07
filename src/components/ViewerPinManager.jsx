import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Users, Plus, Trash2 } from 'lucide-react';

const ViewerPinManager = () => {
  const [pins, setPins] = useState([]);
  const [newPin, setNewPin] = useState('');
  const [newAdminName, setNewAdminName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPins();
  }, []);

  const fetchPins = async () => {
    const { data, error } = await supabase
      .from('pins')
      .select('*')
      .eq('role', 'admin')
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setPins(data);
    }
  };

  const handleCreatePin = async (e) => {
    e.preventDefault();
    if (newPin.length !== 4 || !newAdminName.trim()) return;
    setLoading(true);

    const { error } = await supabase
      .from('pins')
      .insert([{ pin: newPin, role: 'admin', name: newAdminName.trim() }]);

    if (!error) {
      setNewPin('');
      setNewAdminName('');
      fetchPins();
    }
    setLoading(false);
  };

  const handleDeletePin = async (id) => {
    const { error } = await supabase
      .from('pins')
      .delete()
      .eq('id', id);
      
    if (!error) {
      fetchPins();
    }
  };

  return (
    <div className="glass" style={{ padding: '20px', marginBottom: '30px' }}>
      <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: 0 }}>
        <Users size={24} color="var(--kms-purple)" />
        Manage Admin/Viewer PINs
      </h3>
      
      <form onSubmit={handleCreatePin} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          className="input-field"
          placeholder="Admin Name (e.g. Principal Smith)"
          value={newAdminName}
          onChange={(e) => setNewAdminName(e.target.value)}
          style={{ width: '250px' }}
        />
        <input
          type="text"
          className="input-field"
          placeholder="New 4-Digit PIN"
          maxLength={4}
          value={newPin}
          onChange={(e) => setNewPin(e.target.value.replace(/[^0-9]/g, ''))}
          style={{ width: '150px' }}
        />
        <button type="submit" className="btn-secondary" disabled={loading || newPin.length !== 4 || !newAdminName.trim()}>
          <Plus size={18} style={{ verticalAlign: 'middle', marginRight: '5px' }} />
          Create
        </button>
      </form>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {pins.map(pin => (
          <li key={pin.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderBottom: '1px solid #eee' }}>
            <div>
              <span style={{ fontSize: '18px', fontWeight: 'bold', display: 'block', color: 'var(--kms-purple-dark)' }}>{pin.name || 'Unnamed Admin'}</span>
              <span style={{ fontSize: '14px', letterSpacing: '2px', color: '#666' }}>PIN: {pin.pin}</span>
            </div>
            <button 
              onClick={() => handleDeletePin(pin.id)} 
              style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer' }}
            >
              <Trash2 size={18} />
            </button>
          </li>
        ))}
        {pins.length === 0 && <p style={{ color: '#666', fontStyle: 'italic' }}>No viewer PINs created yet.</p>}
      </ul>
    </div>
  );
};

export default ViewerPinManager;
