import React, { useState } from 'react';
import api from '../api';
import InputField from './InputField';

const GameForm = () => {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [difficulty, setDifficulty] = useState('Medium');
  const [hardwareNotes, setHardwareNotes] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    if (!title || !genre) {
      setStatus({ type: 'error', message: 'ALL FIELDS ARE REQUIRED.' });
      return;
    }

    try {
      const response = await api.post('/games/', {
        title,
        genre,
        difficulty,
        hardware_notes: hardwareNotes
      });

      if (response.status === 201) {
        setStatus({ type: 'success', message: 'GAME SUCCESSFULLY ADDED TO CATALOG.' });
        setTitle('');
        setGenre('');
        setDifficulty('Medium');
        setHardwareNotes('');
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.detail) {
        setStatus({ type: 'error', message: err.response.data.detail });
      } else {
        setStatus({ type: 'error', message: 'FAILED TO COMMUNICATE WITH SERVER.' });
      }
    }
  };

  return (
    <div className="border border-cr_gray p-6 mb-8 relative">
      <div className="absolute -top-3 left-4 bg-black px-2 text-xs text-cr_green tracking-widest uppercase">
        Create_Game_Record
      </div>
      
      <form onSubmit={handleSubmit} className="mt-4">
        <InputField
          label="Game_Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="E.g., Dark Souls"
          required={true}
        />
        
        <InputField
          label="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          placeholder="E.g., Action RPG"
          required={true}
        />

        <div className="flex flex-col mb-6">
          <label className="mb-2 text-sm uppercase tracking-wider text-cr_gray">Difficulty_Level</label>
          <select 
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full bg-cr_bg border border-gray-700 p-3 text-cr_gray outline-none focus:border-cr_green transition-colors font-mono appearance-none"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div className="flex flex-col mb-6">
          <label className="mb-2 text-sm uppercase tracking-wider text-cr_gray">Hardware_Notes (Optional)</label>
          <textarea 
            value={hardwareNotes}
            onChange={(e) => setHardwareNotes(e.target.value)}
            placeholder="E.g., Requires Xbox controller, not optimized for keyboard."
            className="w-full bg-cr_bg border border-gray-700 p-3 text-cr_gray outline-none focus:border-cr_green transition-colors font-mono h-24 resize-none"
          />
        </div>

        {status.message && (
          <p className={`mb-4 text-xs uppercase tracking-wider ${status.type === 'error' ? 'text-cr_red' : 'text-cr_green'}`}>
            [{status.type === 'error' ? 'ERR' : 'SYS'}] {status.message}
          </p>
        )}

        <button 
          type="submit"
          className="bg-[#dbe8d4] text-black font-bold uppercase tracking-widest px-6 py-2 hover:bg-white transition-colors"
        >
          Execute_Insert
        </button>
      </form>
    </div>
  );
};

export default GameForm;
