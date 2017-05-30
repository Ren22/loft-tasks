/* ДЗ 6.1 - Асинхронность и работа с сетью */

/**
 * Функция должна создавать Promise, который должен быть resolved через seconds секунду после создания
 *
 * @param {number} seconds - количество секунд, через которое Promise должен быть resolved
 * @return {Promise}
 */
function delayPromise(seconds = 1000) {
    var promise = new Promise((resolve, reject) => {

        setTimeout(() => {
            resolve(1);
        }, 1000); // если задать 1000 явно то сработает
    });

    return promise
}

/**
 * Функция должна вернуть Promise, который должен быть разрешен массивом городов, загруженным из
 * https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * Элементы полученного массива должны быть отсортированы по имени города
 *
 * @return {Promise<Array<{name: String}>>}
 */
function loadAndSortTowns() {
    var promise = new Promise((resolve, reject) => {
        var req = new XMLHttpRequest();

        req.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json', true)
        req.responseType = 'json';
        req.onload = () => {
            var res = req.response;

            res.sort(function (a, b) { //является ли эта ф-ия callback ?
                if (a.name > b.name) {
                    return 1;
                }
                if (a.name < b.name) {
                    return -1;
                }
                // a должно быть равным b
                return 0;
            });

            resolve(res);
        };
        req.send();
    });

    return promise;
}

export {
    delayPromise,
    loadAndSortTowns
};
