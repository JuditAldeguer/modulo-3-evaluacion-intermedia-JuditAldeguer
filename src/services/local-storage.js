// Función que obtiene una propiedad del local storage
const get = (key, defaultValue) => {
  const localStorageData = localStorage.getItem(key);
  if (localStorageData === null) {
    return defaultValue; // Si esta propiedad no existe porque es la primera vez que la usuaria entra en la página la función devuelve el valor de defaultValue
  } else {
    return JSON.parse(localStorageData);
  }
};

// Función que guarda una propiedad y su valor en el local storage
const set = (key, value) => {
  const localStorageData = JSON.stringify(value);
  localStorage.setItem(key, localStorageData);
};

// Función que borra una propiedad del local storage
const remove = (key) => {
  localStorage.removeItem(key);
};

// Función que limpia todo el local storage
const clear = () => {
  localStorage.clear();
};

// Creamos un objeto temporal con las mini Funciones
const objectToExport = {
  get: get,
  set: set,
  remove: remove,
  clear: clear,
};

// Exportamos el objeto para que pueda ser usado desde App
export default objectToExport;
