import { promises as fs } from 'fs';

const start = () => {
  generateFiles();
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

const getInfoByFile = async (filename) => {
  const contentFile = await fs.readFile(filename);
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

start();
