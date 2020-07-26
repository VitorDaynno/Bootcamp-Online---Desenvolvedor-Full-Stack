const start = async () => {
  const users = await getUsers();
  const searchInput = document.querySelector('#search-input');
  const searchButton = document.querySelector('#search-button');
  searchButton.addEventListener('click', (event) =>
    search(event, searchInput, users)
  );
  searchInput.addEventListener('keyup', (event) =>
    search(event, searchInput, users)
  );
  mountZeroUsers();
};

const getUsers = async () => {
  try {
    const url =
      'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo';
    const response = await fetch(url);
    const entities = await response.json();
    const users = entities.results.map((item) => {
      const { name, picture, dob, gender } = item;
      const { first, last } = name;
      const { age } = dob;
      return { name: `${first} ${last}`, picture, age, gender };
    });

    return users;
  } catch (error) {
    console.error(error);
  }
};

const searchUsers = async (searchText, users) => {
  const filteredUsers = users.filter((user) => {
    let { name } = user;
    name = name.toLowerCase();
    return name.search(searchText) >= 0;
  });

  if (filteredUsers.length === 0) {
    mountZeroUsers();
    return;
  }
  mountUsersPanel(filteredUsers);
  mountConsolidate(filteredUsers);
};

const search = async (event, searchInput, users) => {
  const { type, code } = event;
  let searchText = searchInput.value;
  searchText = searchText.toLowerCase();

  if (searchText.length === 0) {
    return;
  }

  if (type === 'click' || (type === 'keyup' && code === 'Enter')) {
    searchUsers(searchText, users);
  }
};

const mountUsersPanel = (users) => {
  const userPanel = document.querySelector('#user-panel');
  userPanel.innerHTML = '';

  const summary = document.createElement('h4');
  summary.textContent = `${users.length} usuário(s) foram encontrado(s).`;

  userPanel.append(summary);

  users.forEach((user) => {
    const userLine = document.createElement('div');
    const userInfo = document.createElement('span');
    const userPhoto = document.createElement('img');

    userLine.classList.add('valign-wrapper');
    userLine.classList.add('user-line');

    userInfo.classList.add('col');
    userInfo.classList.add('s10');
    userInfo.innerText = `${user.name}, ${user.age} anos`;

    userPhoto.classList.add('circle');
    userPhoto.classList.add('responsive-img');

    userPhoto.src = user.picture.thumbnail;

    userLine.append(userPhoto);
    userLine.append(userInfo);
    userPanel.append(userLine);
  });
};

const mountConsolidate = (users) => {
  const consolidatedPanel = document.querySelector('#consolidated-panel');
  consolidatedPanel.innerHTML = '';

  const title = document.createElement('h4');
  const femaleQuantity = document.createElement('span');
  const maleQuantity = document.createElement('span');
  const ageSum = document.createElement('span');
  const ageAverage = document.createElement('span');

  let maleCount = 0;
  let femaleCount = 0;
  let totalAge = 0;
  let averageAge = 0;

  users.forEach((user) => {
    femaleCount = user.gender === 'female' ? femaleCount + 1 : femaleCount;
    maleCount = user.gender === 'male' ? maleCount + 1 : maleCount;
    totalAge = totalAge + user.age;
  });

  title.textContent = 'Estátisticas';
  femaleQuantity.innerHTML = `Sexo feminino: <b>${femaleCount}</b><br>`;
  maleQuantity.innerHTML = `Sexo masculino: <b>${maleCount}</b><br>`;
  ageSum.innerHTML = `Soma das idades: <b>${totalAge}</b><br>`;

  averageAge = totalAge / users.length;
  averageAge = averageAge.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  ageAverage.innerHTML = `Média das idades: <b>${averageAge}</b><br>`;

  consolidatedPanel.append(title);
  consolidatedPanel.append(femaleQuantity);
  consolidatedPanel.append(maleQuantity);
  consolidatedPanel.append(ageSum);
  consolidatedPanel.append(ageAverage);
};

const mountZeroUsers = () => {
  const userPanel = document.querySelector('#user-panel');
  const consolidatedPanel = document.querySelector('#consolidated-panel');

  userPanel.innerHTML = '';
  consolidatedPanel.innerHTML = '';

  const summary = document.createElement('h4');
  const title = document.createElement('h4');

  summary.textContent = 'Nenhum usuário filtrado';
  title.textContent = 'Nada a ser exibido';

  userPanel.append(summary);
  consolidatedPanel.append(title);
};

start();
