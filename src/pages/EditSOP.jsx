import React from 'react';
import { useParams } from 'react-router-dom';
import SOPForm from '../components/SOPForm';
import { loadSOP } from '../lib/storage';

export default function EditSOP() {
  const { id } = useParams();
  const data = loadSOP(id);

  return (
    <div>
      <SOPForm initialData={data} />
    </div>
  );
}
