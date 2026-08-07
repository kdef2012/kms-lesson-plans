import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Lock } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('pins')
        .select('role')
        .eq('pin', pin)
        .single();

      if (error || !data) {
        setError('Invalid PIN. Please try again.');
      } else {
        onLogin(data.role, pin);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass" style={{ maxWidth: '400px', margin: '60px auto', padding: '40px', textAlign: 'center' }}>
      <div style={{ marginBottom: '20px', color: 'var(--kms-purple)' }}>
        <Lock size={48} />
      </div>
      <h2 style={{ marginBottom: '30px' }}>Enter your PIN</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="password"
            className="input-field"
            placeholder="4-Digit PIN"
            maxLength={4}
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            style={{ textAlign: 'center', fontSize: '24px', letterSpacing: '8px' }}
            required
          />
        </div>
        
        {error && <p style={{ color: 'red', fontSize: '14px', marginBottom: '15px' }}>{error}</p>}
        
        <button 
          type="submit" 
          className="btn-primary" 
          style={{ width: '100%', fontSize: '18px' }}
          disabled={loading}
        >
          {loading ? 'Verifying...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
