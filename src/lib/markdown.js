export function generateMarkdown({ title, steps }) {
  let md = `# ${title}\n\n`;
  steps.forEach((step, idx) => {
    md += `## ${idx + 1}. ${step.title}\n\n`;
    md += `${step.description}\n\n`;
    if (step.checklist.length) {
      step.checklist.forEach((item) => {
        md += `- [ ] ${item.text}\n`;
      });
      md += '\n';
    }
  });
  return md;
}
