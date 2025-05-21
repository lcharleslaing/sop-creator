export function generateId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

export function loadSOPList() {
  const data = localStorage.getItem('sops');
  return data ? JSON.parse(data) : [];
}

export function loadSOP(id) {
  const list = loadSOPList();
  return list.find((s) => s.id === id);
}

export function saveSOP(sop) {
  const list = loadSOPList();
  const existingIndex = list.findIndex((s) => s.id === sop.id);
  if (existingIndex >= 0) list[existingIndex] = sop;
  else list.push(sop);
  localStorage.setItem('sops', JSON.stringify(list));
}

export function deleteSOP(id) {
  const list = loadSOPList().filter((s) => s.id !== id);
  localStorage.setItem('sops', JSON.stringify(list));
}
