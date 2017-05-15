const fs = require('fs');
const moment = require('moment');
const elementsGenerator = require('./elements');
const dataGenerator = require('./data');
const faker = require('faker');

module.exports = {
  generateAndSaveElements
};

/* Генератор элементов: Id, Name по Geo из { geoFilename } */
function generateAndSaveElements(
  count = 1,
  geoFilename = 'data/geo.pipe.json',
  filename = 'data/elements.json'
) {
  const geoData = JSON.parse(fs.readFileSync(geoFilename).toString());
  const coordinates = geoData.geometry.coordinates;
  const elements = elementsGenerator.generateMany(coordinates);
  fs.writeFileSync(filename, JSON.stringify(elements));
}

/* Генератор показаний датчиков для элементов за последние {hours} часов с частотой {perHour} в час */
function generateData(
  elements,
  badProbability = 0.5,
  hours = 7 * 24,
  perHour = 1
) {
  const result = [];

  const end = moment();
  const start = end.subtract(hours, 'hours');

  const perElement = hours / perHour;
  const stepInSeconds = 60 * 60 / perHour;

  let stepStart = start.clone();
  let stepEnd = start.clone();

  for (let i = 0; i < perElement; i++) {
    stepStart = stepEnd;
    stepEnd = stepStart.clone().add(stepInSeconds, 's');

    const isBadSystem = Math.random() < badProbability;

    elements.forEach(element => {
      let isBadElement = false;
      if (isBadSystem) {
        isBadElement = Math.random() < badProbability;
      }
      const date = faker.date.between(stepStart, stepEnd);
      const data = dataGenerator.generateOne(element, date, isBadElement);
      result.push(data);
    });
  }

  result.sort((a, b) => {
    return b.date - a.date;
  });

  return result;
}

function generateOneTimeLayer(elements, badProbability, timeDuration) {
  const result = [];

  const end = moment();
  const start = end.clone().subtract(timeDuration, 'seconds');

  const isBadSystem = Math.random() < badProbability;

  elements.forEach(element => {
    let isBadElement = false;
    if (isBadSystem) {
      isBadElement = Math.random() < badProbability;
    }
    const date = faker.date.between(start, end);
    const data = dataGenerator.generateOne(element, date, isBadElement);
    result.push(data);
  });

  return result;
}

function generateAndSaveData(
  badProbability,
  elementsFilename = 'data/elements.json',
  dataFilename = 'data/data1.json'
) {
  const elements = JSON.parse(fs.readFileSync(elementsFilename).toString());
  const data = generateData(elements, badProbability);
  fs.writeFileSync(dataFilename, JSON.stringify(data));
}

// generateAndSaveElements();
// generateAndSaveData(0.5);

module.exports = {
  generateOneTimeLayer,
  generateData
};
