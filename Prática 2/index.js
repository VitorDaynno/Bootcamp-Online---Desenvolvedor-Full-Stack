import { promises as fs, stat } from 'fs';

const start = async () => {
  console.log('Atividade 1:');
  await generateFiles();

  console.log('\nAtividade 3:');
  await statesWithMoreCities();

  console.log('\nAtividade 4:');
  await statesWithLessCities();

  console.log('\nAtividade 5:');
  await biggestCityNames();

  console.log('\nAtividade 6:');
  await minorCityNames();

  console.log('\nAtividade 7:');
  await biggestNameCityInStates();

  console.log('\nAtividade 8:');
  await smallestNameCityInStates();
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

const getBiggestCityNames = async () => {
  const biggestCityNames = [];
  const states = await getStates();
  const statesInfo = await getCitiesInfo(states);

  for (const state of statesInfo) {
    const cities = state.cities;
    cities.sort((a, b) => b.sizeName - a.sizeName);
    biggestCityNames.push({ city: cities[0].name, state: state.initials });
  }

  return biggestCityNames;
};

const getCitiesInfo = async (states) => {
  const citiesInfo = [];

  for (const state of states) {
    const initials = state.Sigla;

    const filename = initials.toUpperCase();
    const path = `states/${filename}.json`;
    let cities = await getInfoByFile(path);
    cities = cities.map((city) => {
      const { ID, Nome } = city;
      const id = ID;
      const name = Nome;
      const sizeName = name.length;
      return { id, name, sizeName };
    });

    citiesInfo.push({ initials, cities });
  }

  return citiesInfo;
};

const getMinorCityNames = async () => {
  const minorCityNames = [];
  const states = await getStates();
  const statesInfo = await getCitiesInfo(states);

  for (const state of statesInfo) {
    const cities = state.cities;
    cities.sort((a, b) => a.sizeName - b.sizeName);
    minorCityNames.push({ city: cities[0].name, state: state.initials });
  }

  return minorCityNames;
};

const biggestCityNames = async () => {
  const biggestCityNames = await getBiggestCityNames();
  const result = biggestCityNames.map((biggestCity) => {
    const { state, city } = biggestCity;
    return `${city} - ${state}`;
  });
  console.log(result);
};

const minorCityNames = async () => {
  const minorCityNames = await getMinorCityNames();
  const result = minorCityNames.map((minorCity) => {
    const { state, city } = minorCity;
    return `${city} - ${state}`;
  });
  console.log(result);
};

const biggestNameCityInStates = async () => {
  const biggestCityNames = await getBiggestCityNames();
  biggestCityNames.sort((a, b) => {
    return b.city.length - a.city.length;
  });
  console.log(biggestCityNames[0].city);
};

const smallestNameCityInStates = async () => {
  const smallestNameCityInStates = await getMinorCityNames();
  smallestNameCityInStates.sort((a, b) => {
    return b.city.length - a.city.length;
  });
  console.log(smallestNameCityInStates[0].city);
};

start();
