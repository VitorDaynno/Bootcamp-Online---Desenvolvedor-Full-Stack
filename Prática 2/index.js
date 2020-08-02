import { promises as fs } from 'fs';

const start = async () => {
  generateFiles();
  const quantityCity = await countCities('MG');
  console.log(quantityCity);
};

const generateFiles = async () => {
  const states = await getStates();
  const cities = await getCities();

  states.forEach((state) => {
    generateStateFile(state, cities);
  });
};

const getStates = async () => {
  const states = await getInfoByFile('files/Estados.json');
  return states;
};

const getCities = async () => {
  const cities = await getInfoByFile('files/Cidades.json');
  return cities;
};

const getInfoByFile = async (path) => {
  const contentFile = await fs.readFile(path);
  return JSON.parse(contentFile);
};

const generateStateFile = (state, cities) => {
  const citiesInState = [];
  cities.forEach((city) => {
    if (state.ID === city.Estado) {
      citiesInState.push(city);
    }
  });
  fs.writeFile(`./states/${state.Sigla}.json`, JSON.stringify(citiesInState));
};

const countCities = async (state) => {
  const filename = state.toUpperCase();
  const path = `states/${filename}.json`;
  const cities = await getInfoByFile(path);
  return cities.length;
};

start();
