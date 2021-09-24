// Fichero src/services/api.js
const callToApi = () => {
  // Llamamos al API
  return fetch('https://swapi.dev/api/people/5')
    .then((response) => response.json())
    .then((response) => {
      // Cuando responde el API podemos limpiar los datos aquí
      const result = {
        name: response.name,
        birthYear: response.birth_year,
        height: response.height,
        mass: response.mass,
        eyeColor: response.eye_color,
      };
      return result;
    });
};

export default callToApi;
