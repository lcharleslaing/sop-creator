import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { loadSOPList, deleteSOP } from '../lib/storage';

export default function Home() {
  const [sops, setSops] = useState([]);

  useEffect(() => {
    setSops(loadSOPList());
  }, []);

  const handleDelete = (id) => {
    deleteSOP(id);
    setSops(loadSOPList());
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Saved SOPs</h2>
      <ul>
        {sops.map((sop) => (
          <li key={sop.id} className="mb-2 flex justify-between items-center">
            <Link className="text-blue-600" to={`/edit/${sop.id}`}>{sop.title}</Link>
            <button className="text-red-500" onClick={() => handleDelete(sop.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
