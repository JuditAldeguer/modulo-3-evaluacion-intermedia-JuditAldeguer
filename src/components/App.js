import '../styles/App.scss';
import { useEffect, useState } from 'react';
import dataJson from '../services/data.json';
import ls from '../services/local-storage.js'; //localStorage

function App() {
  let filterResult = 'all';
  //STATES-------------------------------------------------------------------------------------
  const [data, setData] = useState(dataJson);
  const [newData, setNewData] = useState({
    name: '',
    openOnWeekdays: false,
    openOnWeekend: false,
  });

  //HANDLE-----------------------------------------------------------------------------------------
  //pending
  const handleButton = (ev) => {
    ev.preventDefault();
  };
  const handleFilter = (ev) => {
    filterResult = ev.currentTarget.value;
    console.log(filterResult);
    renderClubs(filterResult);
    return filterResult;
  };
  //ok
  const handleButtonAdd = (ev) => {
    ev.preventDefault();
    data.push(newData);
    setData([...data]);
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
  //useEffect?
  // useEffect(() => {
  //   renderClubs();
  // }, [data]);
  const renderClubs = (filterResult) => {
    console.log(data); //pending delete
    // debugger;-----------------da error el flitro!!!!!!!!!!!!
    return data
      .filter((club) => {
        if (filterResult !== undefined) {
          if (filterResult === 'all') {
            return club;
          } else if (filterResult === 'week') {
            return club.openOnWeekdays === true;
          } else if (filterResult === 'weekend') {
            return club.openOnWeekend === true;
          }
        } else {
          return club;
        }
      })
      .map((el, i) => {
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
            </p>
            <p>
              <strong>Abierto el fin de semana: </strong>
              <small>{el.openOnWeekend ? 'Si' : 'No'}</small>
            </p>
          </li>
        );
      });
  };

  //HTML----------------------------------------------------------------------
  return (
    <div>
      <header>
        <h2 className="title">Mis clubs</h2>
        <select onChange={handleFilter} name="show" id="show">
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
    </div>
  );
}

export default App;
