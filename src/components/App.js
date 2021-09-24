import '../styles/App.scss';
import { useEffect, useState } from 'react';
import callToApi from '../services/api';
import ls from '../services/local-storage.js'; //localStorage

function App() {
  return (
    <div>
      <header>
        <h1 className="title">Starter Kit</h1>
      </header>
    </div>
  );
}

export default App;
