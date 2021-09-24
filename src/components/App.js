import '../styles/App.scss';
import { useEffect, useState } from 'react';
import data from '../services/data.json';
import ls from '../services/local-storage.js'; //localStorage

const handleButton = (ev) => {
  ev.preventDefault();
};

const renderClubs = () => {
  debugger;
  console.log(data);
  data.map((el, i) => {
    return (
      <li key={i} className="li_container">
        <h3>
          #{i} {el.name}
          <button onClick={handleButton} className="buttonX">
            x
          </button>
        </h3>
        <p>
          <strong>Abierto entre semana: </strong>
          <small>{el.openOnWeekdays ? 'Si' : 'No'}</small>
          <strong>Abierto el fin de semana: </strong>
          <small>{el.openOnWeekend ? 'Si' : 'No'}</small>
        </p>
      </li>
    );
  });
};

function App() {
  return (
    <div>
      <header>
        <h2 className="title">Mis clubs</h2>
        <select name="show" id="show">
          <option value="all">Todos</option>
          <option value="week">Los que abren entre semana</option>
          <option value="weekend">Los que abren el fin de semana</option>
        </select>
      </header>
      <main>
        <section>
          <ul>{renderClubs()}</ul>
        </section>
        <section>
          <h2>Añadir un nuevo club</h2>
          <form action="">
            <label htmlFor="name">
              Nombre del club:
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Nombre del club..."
              />
            </label>
            <label htmlFor="weekOpen">
              ¿Abre entre semana?
              <input
                type="checkbox"
                name="weekOpen"
                id="weekOpen"
                checked={true}
              />
            </label>
            <label htmlFor="weekOpen">
              ¿Abre el fin de semana?
              <input
                type="checkbox"
                name="weekendOpen"
                id="weekendOpen"
                checked={false}
              />
            </label>
            <button className="submitBtn">Añadir un nuevo club</button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default App;
