import '../styles/App.scss';
import { useEffect, useState } from 'react';
import dataJson from '../services/data.json';
import image from '../images/webpreview.png';
import ls from '../services/local-storage.js'; //localStorage

function App() {
  //STATES-------------------------------------------------------------------------------------
  const [data, setData] = useState([]);
  const [filterResult, setFilterResult] = useState('all');
  const [newData, setNewData] = useState({
    name: '',
    openOnWeekdays: false,
    openOnWeekend: false,
  });

  //
  useEffect(() => {
    getDataInfo();
  }, []);

  const getDataInfo = () => {
    const infoInLS = ls.get('Clubsdata');
    if (infoInLS === undefined) {
      setData(dataJson);
    } else {
      setData(infoInLS);
    }
  };
  //useEffect with LocalStorage-------------------------------------------------------------------
  useEffect(() => {
    ls.set('Clubsdata', data);
  }, [data]);

  //HANDLE-----------------------------------------------------------------------------------------
  const handleButtonReset = (ev) => {
    ev.preventDefault();
    setData([]);
  };
  const handleButtonX = (ev) => {
    ev.preventDefault();
    const parentLiId = ev.currentTarget.parentElement.id;
    data.splice(parentLiId, 1);
    setData([...data]);
  };
  const handleFilter = (ev) => {
    setFilterResult(ev.currentTarget.value);
  };
  const handleButtonAdd = (ev) => {
    ev.preventDefault();
    data.push(newData);
    setData([...data]);
    setNewData({
      name: '',
      openOnWeekdays: false,
      openOnWeekend: false,
    });
  };
  const handleInput = (ev) => {
    setNewData({ ...newData, name: ev.currentTarget.value });
  };
  const handleCheckWeek = (ev) => {
    newData.openOnWeekdays = !newData.openOnWeekdays;
    setNewData({ ...newData });
  };
  const handleCheckWeekend = (ev) => {
    newData.openOnWeekend = !newData.openOnWeekend;
    setNewData({ ...newData });
  };

  //RENDER---------------------------------------------------------------------------------------------

  const htmlClub = data
    .filter((club) => {
      if (filterResult === 'week') {
        return club.openOnWeekdays === true;
      } else if (filterResult === 'weekend') {
        return club.openOnWeekend === true;
      } else {
        return true;
      }
    })
    .map((el, i) => {
      return (
        <li key={i} id={i} className="li_container">
          <button onClick={handleButtonX} className="buttonX">
            x
          </button>
          <h3>
            #{i} {el.name}
          </h3>
          <p>
            <strong>Abierto entre semana: </strong>
            <small>{el.openOnWeekdays ? 'Si' : 'No'}</small>
          </p>
          <p>
            <strong>Abierto el fin de semana: </strong>
            <small>{el.openOnWeekend ? 'Si' : 'No'}</small>
          </p>
        </li>
      );
    });

  //HTML----------------------------------------------------------------------
  return (
    <div className="page">
      <header>
        <h2 className="title">Mis clubs</h2>
        <select
          value={filterResult}
          onChange={handleFilter}
          name="show"
          id="show"
        >
          <option value="all">Todos</option>
          <option value="week">Los que abren entre semana</option>
          <option value="weekend">Los que abren el fin de semana</option>
        </select>
      </header>
      <main>
        <section className="section_clubs_list">
          <button onClick={handleButtonReset} className="buttonReset">
            Borrar todo
          </button>
          <ul>{htmlClub}</ul>
        </section>
        <section className="section_new_club">
          <h2>Añadir un nuevo club</h2>
          <form action="" className="form" onSubmit={handleButtonAdd}>
            <label htmlFor="name">
              Nombre del club:
              <input
                className="form--text_input"
                type="text"
                name="name"
                id="name"
                placeholder="Club..."
                value={newData.name}
                onChange={handleInput}
              />
            </label>
            <label htmlFor="weekOpen">
              ¿Abre entre semana?
              <input
                type="checkbox"
                name="weekOpen"
                id="weekOpen"
                onChange={handleCheckWeek}
                checked={newData.openOnWeekdays ? true : false}
              />
            </label>
            <label htmlFor="weekOpen">
              ¿Abre el fin de semana?
              <input
                type="checkbox"
                name="weekendOpen"
                id="weekendOpen"
                onChange={handleCheckWeekend}
                checked={newData.openOnWeekend ? true : false}
              />
            </label>
            <button className="submitBtn" onClick={handleButtonAdd}>
              Añadir un nuevo club
            </button>
          </form>
        </section>
      </main>
      <footer className="footer">
        <small> &copy; Todos los derechos reservados </small>
      </footer>
    </div>
  );
}

export default App;
