// function delayPromise(seconds = 1000) {
//     var promise = new Promise((resolve, reject) => {
//
//         setTimeout(() => {
//             resolve(1);
//         }, seconds); // если задать 1000 явно то сработает
//     });
//
//     return promise
// }
//
// delayPromise()

function isMatching(full, chunk) {
    full = full.toLowerCase();
    chunk = chunk.toLowerCase();
    if (~full.indexOf(chunk)) {

        return true;
    }
}

isMatching('Widget', 'GEt');

