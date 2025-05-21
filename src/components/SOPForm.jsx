import React, { useState, useEffect } from 'react';
import StepBlock from './StepBlock';
import { saveSOP, generateId } from '../lib/storage';
import { generateMarkdown } from '../lib/markdown';
import html2pdf from 'html2pdf.js';

export default function SOPForm({ initialData }) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [steps, setSteps] = useState(initialData?.steps || []);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setSteps(initialData.steps);
    }
  }, [initialData]);

  const addStep = () => {
    setSteps([...steps, { title: '', description: '', checklist: [] }]);
  };

  const updateStep = (index, newStep) => {
    const newSteps = steps.map((s, i) => (i === index ? newStep : s));
    setSteps(newSteps);
  };

  const removeStep = (index) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  const moveStep = (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= steps.length) return;
    const newSteps = [...steps];
    const [moved] = newSteps.splice(index, 1);
    newSteps.splice(newIndex, 0, moved);
    setSteps(newSteps);
  };

  const handleSave = () => {
    const id = initialData?.id || generateId();
    saveSOP({ id, title, steps });
    alert('Saved!');
  };

  const handleExportMarkdown = () => {
    const markdown = generateMarkdown({ title, steps });
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title || 'sop'}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportPDF = () => {
    const element = document.getElementById('sop-preview');
    html2pdf().from(element).save(`${title || 'sop'}.pdf`);
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const data = JSON.parse(ev.target.result);
      setTitle(data.title);
      setSteps(data.steps);
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          className="border p-2 w-full mb-2"
          placeholder="SOP Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="space-x-2">
          <button className="bg-blue-600 text-white px-4 py-2" onClick={handleSave}>Save</button>
          <button className="bg-green-600 text-white px-4 py-2" onClick={addStep}>Add Step</button>
          <button className="bg-gray-600 text-white px-4 py-2" onClick={handleExportMarkdown}>Export MD</button>
          <button className="bg-gray-600 text-white px-4 py-2" onClick={handleExportPDF}>Export PDF</button>
          <label className="bg-gray-200 px-4 py-2 cursor-pointer">
            Import JSON
            <input type="file" accept="application/json" className="hidden" onChange={handleImport} />
          </label>
        </div>
      </div>
      {steps.map((step, index) => (
        <StepBlock
          key={index}
          step={step}
          onChange={(s) => updateStep(index, s)}
          onRemove={() => removeStep(index)}
          onMoveUp={() => moveStep(index, -1)}
          onMoveDown={() => moveStep(index, 1)}
        />
      ))}
      <div id="sop-preview" className="hidden">
        <h1>{title}</h1>
        {steps.map((step, i) => (
          <div key={i}>
            <h2>{step.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: step.description }} />
            <ul>
              {step.checklist.map((item, idx) => (
                <li key={idx}>{item.text}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
