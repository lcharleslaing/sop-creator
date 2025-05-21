import React from 'react';
import ChecklistItem from './ChecklistItem';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt();

export default function StepBlock({ step, onChange, onRemove, onMoveUp, onMoveDown }) {
  const handleChecklistChange = (index, newItem) => {
    const items = step.checklist.map((it, i) => (i === index ? newItem : it));
    onChange({ ...step, checklist: items });
  };

  const handleChecklistRemove = (index) => {
    const items = step.checklist.filter((_, i) => i !== index);
    onChange({ ...step, checklist: items });
  };

  const addChecklistItem = () => {
    onChange({ ...step, checklist: [...step.checklist, { text: '' }] });
  };

  return (
    <div className="border p-4 mb-4 bg-white">
      <div className="flex justify-between mb-2">
        <input
          type="text"
          className="border p-1 flex-1 mr-2"
          placeholder="Step Title"
          value={step.title}
          onChange={(e) => onChange({ ...step, title: e.target.value })}
        />
        <div className="space-x-2">
          <button onClick={onMoveUp}>↑</button>
          <button onClick={onMoveDown}>↓</button>
          <button className="text-red-500" onClick={onRemove}>Delete</button>
        </div>
      </div>
      <textarea
        className="border p-1 w-full mb-2"
        rows="4"
        placeholder="Description (Markdown supported)"
        value={step.description}
        onChange={(e) => onChange({ ...step, description: e.target.value })}
      />
      <div className="prose mb-2" dangerouslySetInnerHTML={{ __html: md.render(step.description || '') }} />
      <div>
        <h4 className="font-semibold">Checklist</h4>
        {step.checklist.map((item, index) => (
          <ChecklistItem
            key={index}
            item={item}
            onChange={(val) => handleChecklistChange(index, val)}
            onRemove={() => handleChecklistRemove(index)}
          />
        ))}
        <button className="text-blue-600" onClick={addChecklistItem}>Add Item</button>
      </div>
    </div>
  );
}
