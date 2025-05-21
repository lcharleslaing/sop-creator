import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import NewSOP from './pages/NewSOP';
import EditSOP from './pages/EditSOP';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between">
          <h1 className="text-xl font-bold">
            <Link to="/">SOP Creator</Link>
          </h1>
          <nav>
            <Link className="mr-4" to="/">Home</Link>
            <Link to="/new">New SOP</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<NewSOP />} />
          <Route path="/edit/:id" element={<EditSOP />} />
        </Routes>
      </main>
    </div>
  );
}
