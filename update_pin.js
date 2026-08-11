import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const run = async () => {
  const { data, error } = await supabase
    .from('pins')
    .update({ pin: '0108', name: 'Mr. Bongweni' })
    .eq('role', 'teacher')
    .eq('pin', '1004'); // targeting the default pin just in case

  if (error) {
    console.error('Error updating pin:', error);
  } else {
    console.log('Successfully updated teacher pin and name!');
  }
};

run();
