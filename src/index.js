/* ДЗ 3 - работа с массивами и объеектами */

/*
 Задача 1:
 Напишите аналог встроенного метода forEach для работы с массивами
 */
function forEach(array, fn) {
    for (var i=0; i<array.length; i++) {
        fn(array[i], i, array);
    }
}

/*
 Задача 2:
 Напишите аналог встроенного метода map для работы с массивами
 */
function map(array, fn) {
    var b = [];

    for (var i=0; i<array.length; i++) {

        b.push(fn(array[i], i, array));
    }

    return b;
}

/*
 Задача 3:
 Напишите аналог встроенного метода reduce для работы с массивами
 */
function reduce(array, fn, initial) {
    if ((typeof initial) == 'undefined') {
        var prev = array[0],
            i = 1;
    } else {
        prev = initial,
        i = 0;
    }
    var x = prev;

    for (i; i < array.length; i++) {

        x = fn(x, array[i], i, array);

    }

    return x;
}

/*
 Задача 4:
 Функция принимает объект и имя свойства, которое необходиом удалить из объекта
 Функция должна удалить указанное свойство из указанного объекта
 */
function deleteProperty(obj, prop) {
    /*а если prop - число? - но это невозможно, тк имя свойства всегда строчного типа */
    if (prop in obj) {
        delete obj[prop];
    }
}

/*
 Задача 5:
 Функция принимает объект и имя свойства и возвращает true или false
 Функция должна проверить существует ли укзаанное свойство в указанном объекте
 */
function hasProperty(obj, prop) {
    var aa = false;

    if (prop in obj) {
        aa = true;
    }

    return aa;
}

/*
 Задача 6:
 Функция должна получить все перечисляемые свойства объекта и вернуть их в виде массива
 */
function getEnumProps(obj) {
    // var b= [];
    var prop = Object.keys(obj);

    // b = prop.forEach(function (a) {
    //     return obj[prop[a]]
    // }) Те Свойства это Не значения , а названия??

    return prop;
}

/*
 Задача 7:
 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистра и вернуть в виде массива
 */
function upperProps(obj) {
    var prop = Object.getOwnPropertyNames(obj);
    var cc = [];

    prop.forEach(function fn(a) {
        cc.push(a.toUpperCase());
    })

    return cc;
}

/*
 Задача 8 *:
 Напишите аналог встроенного метода slice для работы с массивами
 */
function slice(array, from, to) {
}

/*
 Задача 9 *:
 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
}

export {
    forEach,
    map,
    reduce,
    deleteProperty,
    hasProperty,
    getEnumProps,
    upperProps,
    slice,
    createProxy
};
