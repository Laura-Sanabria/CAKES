import React from 'react';
import './App.css';
import Gallery from './components/Gallery';

function App() {
  return (
    <div className="App">
      <h1 style={{ color: '#dfa9ff', textAlign: 'center', marginTop: '20px' }}>
        🎂 ¡Pasteles De Olfa! 🍰
      </h1>
      <Gallery />
    </div>
  );
}

export default App;