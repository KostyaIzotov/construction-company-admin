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
  });
}
