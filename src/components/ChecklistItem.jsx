import React from 'react';

export default function ChecklistItem({ item, onChange, onRemove }) {
  return (
    <div className="flex items-center mb-2">
      <input
        type="text"
        className="border p-1 flex-1 mr-2"
        value={item.text}
        onChange={(e) => onChange({ ...item, text: e.target.value })}
      />
      <button className="text-red-500" onClick={onRemove}>x</button>
    </div>
  );
}
