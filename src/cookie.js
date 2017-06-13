/**
 * ДЗ 7.2 - Создать редактор cookie с возможностью фильтрации
 *
 * На странице должна быть таблица со списком имеющихся cookie:
 * - имя
 * - значение
 * - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)
 *
 * На странице должна быть форма для добавления новой cookie:
 * - имя
 * - значение
 * - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)
 *
 * Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено
 *
 * На странице должно быть текстовое поле для фильтрации cookie
 * В таблице должны быть только те cookie, в имени или значении которых есть введенное значение
 * Если в поле фильтра пусто, то должны выводиться все доступные cookie
 * Если добавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 * Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 * то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена
 *
 * Для более подробной информации можно изучить код тестов
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
//    Define main container

let homeworkContainer = document.querySelector('#homework-container');

//    Define auxiliary html container elements

var form = document.createElement('form');
form.setAttribute('class', 'the_form');
form.innerHTML = '<input type="text" name="cook_name" placeholder="Cookie name" style="margin-top: 20px"></br>' +
    '<input type="text" name="cook_value" placeholder="Cookie value"></br>' +
    '<button id="add-button">Add</button></form>';

var filterblock = document.createElement('div');
filterblock.innerHTML = '<input type ="text" id="filter-name-input" style ="margin-bottom:20px">';

var divtable = document.createElement('div');
divtable.innerHTML = '<table id ="list-table" style="border:1px solid grey; border-collapse: collapse;"></table>';


//    Adding these html elements
homeworkContainer.appendChild(filterblock);
homeworkContainer.appendChild(divtable);
homeworkContainer.appendChild(form);

//    Getting html elements for further processing

let listTable = homeworkContainer.querySelector('#list-table');
let addButton = homeworkContainer.querySelector('#add-button');
let filterNameInput = homeworkContainer.querySelector('#filter-name-input');

//    Main code

//    document.cookie = 'name=Value; expires= Thu, 01 Jan 2025 00:00:00 GMT;';
//    document.cookie = 'name2=Value2';
//    document.cookie = 'name3=Value3';
list_table();

function list_table() {
    var cookie_split = document.cookie.split(';');

    cookie_split.forEach(function (item, i , cookie_split) {
        var name_value = cookie_split[i].split('=');
        var line = document.createElement('tr');
        var button = document.createElement('button');

        name_value.forEach((item) => {
            var cell = document.createElement('td');
            cell.setAttribute('style', 'border:1px solid grey;');
            cell.innerHTML = item;
            line.appendChild(cell);
        });

        button.innerText = 'Delete';
        button.addEventListener('click', (e) => {
            var promise = new Promise ((resolve) => {
                var line = e.target.parentElement;
                document.cookie = line.children[0].innerText + '=' + line.children[1].innerText +
                    ';expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                resolve(line);
            })
                .then ((line) => {
                    for (var i = 0; i <line.children.length; i++) {
                        line.removeChild(line.children[i]);
                        i--;
                    };
                });
        });
        line.appendChild(button);
        listTable.appendChild(line);
    });
}

//  adding new cookie line to form

addButton.addEventListener('click', () => {

    var form_one = document.forms[0];
    var cell_name = form_one.cook_name.value;
    var cell_value = form_one.cook_value.value;
    var line = document.createElement('tr');
    var button = document.createElement('button');
    var cell = document.createElement('td');

    document.cookie = cell_name + '=' + cell_value;

    cell.setAttribute('style', 'border:1px solid grey;')
//        cell.innerHTML = cell_name;
    line.appendChild(cell);
    listTable.appendChild(line);

});

function isMatching(full, chunk) {
    full = full.toLowerCase();
    chunk = chunk.toLowerCase();
    if (~full.indexOf(chunk)) {

        return true;
    } else {

        return false;
    }
}