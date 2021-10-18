export const workers = [];

for (let i = 0; i <= 100; i++) {
  workers.push({
    id: i,
    firstName: 'Иван',
    secondName: 'Иванов',
    phone: '38 (099) 322-33--33',
    partsCount: i,
  });
}

export const instruments = [];

for (let i = 0; i <= 100; i++) {
  instruments.push({
    id: i,
    name: 'Болгарка',
    worker: 'Петр Петров',
    serial: 'LT-93321321',
    stories: [
      {
        workerName: 'Иван Иванов',
        dateOfReceiving: '25.01.2021',
        dateOfDelivery: '27.01.2021',
      },
      {
        workerName: 'Петр Петров',
        dateOfReceiving: '25.01.2021',
        dateOfDelivery: '27.01.2021',
      },
      {
        workerName: 'Василий Васильев',
        dateOfReceiving: '25.01.2021',
        dateOfDelivery: '27.01.2021',
      },
      {
        workerName: 'Константин Константинов',
        dateOfReceiving: '25.01.2021',
        dateOfDelivery: '27.01.2021',
      },
    ],
  });
}

export const companies = [];

for (let i = 0; i <= 100; i++) {
  companies.push({
    id: i,
    name: 'ЦИТ',
    password: '********',
  });
}
