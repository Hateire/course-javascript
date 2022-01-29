/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array

 Пример:
   forEach([1, 2, 3], (el) => console.log(el))
 */
function forEach(array, fn) {
  for (let i = 0; i < array.length; i++) {
    fn(array[i], i, array);
  }
}

forEach([1, 2, 3], (fn) => console.log(fn));
// const arr = [10, 20, 30];
// Array.prototype.myForEach = forEach;
// arr.myForEach((fn) => console.log(fn));

/*
 Задание 2:
 
 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 
 Пример:
   map([1, 2, 3], (el) => el ** 2) // [1, 4, 9]
 */
function map(array, fn) {
  const arrayReturn = [];

  for (let i = 0; i < array.length; i++) {
    arrayReturn.push(fn(array[i], i, array));
  }

  return arrayReturn;
}

console.log(map([7, 7, 7], (fn) => fn + 30));

/*
 Задание 3:
 
 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 
 Пример:
   reduce([1, 2, 3], (all, current) => all + current) // 6
 */
function reduce(array, fn, initial) {
  let initiated = initial || array[0],
    i = initial ? 0 : 1;

  for (; i < array.length; i++) {
    initiated = fn(initiated, array[i], i, array);
  }

  return initiated;
}

console.log(reduce([6, 6, 6], (all, current) => all + current));

/*
 Задание 4:
 
 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива
 
 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
  const ups = [];

  for (const name in obj) {
    ups.push(name.toUpperCase());
  }

  return ups;
}

console.log(upperProps({ name: 'джун', lastName: 'ли' }));

/*
 Задание 5 *:
 
 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 
 Пример:
   const obj = createProxy({});
   obj.foo = 2;
   console.log(obj.foo); // 4
 */
function createProxy(obj) {}

export { forEach, map, reduce, upperProps, createProxy };
