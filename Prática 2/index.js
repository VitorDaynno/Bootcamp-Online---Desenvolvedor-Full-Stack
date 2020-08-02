import { promises as fs, stat } from 'fs';

const start = async () => {
  await generateFiles();
  await statesWithMoreCities();
  await statesWithLessCities();
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

const generateStateFile = async (state, cities) => {
  const citiesInState = [];
  cities.forEach((city) => {
    if (state.ID === city.Estado) {
      citiesInState.push(city);
    }
  });
  await fs.writeFile(
    `./states/${state.Sigla}.json`,
    JSON.stringify(citiesInState)
  );
};

const countCities = async (state) => {
  const filename = state.toUpperCase();
  const path = `states/${filename}.json`;
  const cities = await getInfoByFile(path);
  return cities.length;
};

const statesWithMoreCities = async () => {
  const states = await getStates();
  const statesInfo = await getStatesInfo(states);
  const statesWithMoreCities = statesInfo.splice(-5).reverse();
  const statesCitiesCount = statesWithMoreCities.map((stateInfo) => {
    return `${stateInfo.initials} - ${stateInfo.quantityCities}`;
  });
  console.log(statesCitiesCount);
};

const getStatesInfo = async (states) => {
  const statesInfo = [];

  for (const state of states) {
    const initials = state.Sigla;
    const quantityCities = await countCities(initials);

    const stateInfo = { initials, quantityCities };
    statesInfo.push(stateInfo);
  }

  statesInfo.sort((a, b) => a.quantityCities - b.quantityCities);

  return statesInfo;
};

const statesWithLessCities = async () => {
  const states = await getStates();
  const statesInfo = await getStatesInfo(states);
  const statesWithLessCities = statesInfo.splice(0, 5);
  const statesCitiesCount = statesWithLessCities.map((stateInfo) => {
    return `${stateInfo.initials} - ${stateInfo.quantityCities}`;
  });
  console.log(statesCitiesCount);
};

start();
