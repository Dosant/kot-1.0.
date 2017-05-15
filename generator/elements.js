/*
  Генерация элементов трубопровода - датчиков КОТ С-1.0
*/

const faker = require('faker');
faker.locale = 'ru';

module.exports = {
  generateOne,
  generateMany,
};

function generateEmptyArray(count = 1) {
  return new Array(count).fill('_');
}

function generateId() {
  return generateEmptyArray(6).map(pos => faker.random.alphaNumeric()).join('');
}

function generateOne(inc = 1, coordinates) {
  return {
    id: generateId(),
    name: `element_${inc}`,
    geo: {
      latitude: coordinates[0],
      longitude: coordinates[1],
    },
  };
}

function generateMany(coordinates) {
  const count = coordinates.length;
  return generateEmptyArray(count).map((element, index) =>
    generateOne(index + 1, coordinates[index]));
}
