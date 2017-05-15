/*
  Генерация данных датчиков КОТ С-1.0
*/

const faker = require('faker');
faker.locale = 'ru';

module.exports = {
  generateOne,
};

/* Генератор непрерывной случайно величины с эксопненциальным распределением, Лямба = {param}*/
function expBSP(param) {
  return (-(1 / param)) * Math.log(Math.random());
}

/* Для датчика {sensor} сгенирировать показания */
function generateOne(info, date = new Date.now(), isBad = false) {
  let isolation;
  let resistance;
  let power;


  if (!isBad) {
    /* Высокая вероятность хороших данных */
    /* Изоляция в кОМ: ~ от 1 до 1000. Медиана = 100. Тогда параметр для эксопненциального распределения = ln2 / 100 = 0.007 */
    isolation = Math.random() * 995 + 5;

    /* Сопротивление в ОМ: ~ от 2 до 200. Медиана = 100. Тогда параметр для эксопненциального распределения = ln2 / 100 = 0.007 */
    resistance = Math.random() * 100 + 5;

    /* Заряд в %: от 0 до 100. Равномерное распределение */
    power = Math.min((Math.random() * 100) + 15, 100);
  } else {
    /* Высокая вероятность плохих данных */
    /* Изоляция в кОМ: ~ от 1 до 1000. Медиана = 100. Тогда параметр для эксопненциального распределения = ln2 / 100 = 0.007 */
    isolation = +expBSP(0.007);

    /* Сопротивление в ОМ: ~ от 2 до 200. Медиана = 100. Тогда параметр для эксопненциального распределения = ln2 / 100 = 0.007 */
    resistance = +expBSP(0.007);

    /* Заряд в %: от 0 до 100. Равномерное распределение */
    power = +(Math.random() * 100);
  }

  return {
    isolation: isolation.toFixed(2),
    resistance: resistance.toFixed(2),
    power: power.toFixed(2),
    element: info,
    date: date.getTime()
  };
}
