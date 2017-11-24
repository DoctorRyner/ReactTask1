import React from 'react'
import ReactDOM from 'react-dom'
import {reactLocalStorage} from 'reactjs-localstorage'

var jsonRaw
var jsonSite = []
var json = []


var amountOfCity = 0
var container = []
var rawContainer

var isDone = false

container = []
let amountOfCityView = amountOfCityView = React.createElement('h1', {id: 'amountOfCityView'}, 'У вас нет еще элементов!')
let input = React.createElement('input', {id: 'input'})
let buttonDelElement = <button id='buttonDelElement' onClick = {delElement}>Удалить</button>
let buttonTakeElementBack = <button id='buttonTakeElementBack' onClick = {takeElementBack}>Вернуть</button>
let inputCityName = <input id='inputCityName'></input>
let inputCityOkato = <input id='inputCityOkato'></input>
let buttonCreateCity = <button id='buttonCreateCity' onClick = {createCity}>Создать</button>
let button0 = <button id='button0' onClick = {edit}>Редактировать</button>
let button1 = <button id='button1' onClick = {saveFromServer}>Загрузить с сервера</button>
let button2 = <button id='button2' onClick = {zeroOutLocalStorage}>Обнулить LocalStorage</button>
let button3 = <button id='button3' onClick = {loadFromLocalStorage}>Загрузить из LocalStorage</button>
let button4 = <button id='button4' onClick = {saveToLocalStorage}>Загрузить в LocalStorage</button>
container.push(amountOfCityView, input, buttonDelElement, buttonTakeElementBack, inputCityName, inputCityOkato, buttonCreateCity,
    button0, button1, button2, button3, button4)
ReactDOM.render(
    container,
    document.getElementById('main')
)

function zeroOutLocalStorage() {
    amountOfCity = 0
    reactLocalStorage.setObject('json', undefined)
    json = []
}

function saveFromServer() {
    amountOfCity = 0
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            jsonRaw = JSON.parse(this.responseText);
            jsonSite = jsonRaw.data
            reactLocalStorage.setObject('json', jsonSite)
            json = reactLocalStorage.getObject('json')
            for(let element of json) amountOfCity++
            //renderAndCheck(0)
            rawContainer = container
        }
    };
    xmlhttp.open('GET', 'https://raw.githubusercontent.com/asakasinsky/russia.json/master/json/russia.locality.json', true);
    xmlhttp.send();
}

function saveToLocalStorage() {
    reactLocalStorage.setObject('json', json)
    rawContainer = container.slice()
}

function loadFromLocalStorage() {
    json = reactLocalStorage.getObject('json')
    for(let element of json) amountOfCity++
    //renderAndCheck(0)
    rawContainer = container
}

function delElement() { renderAndCheck(1) }
function takeElementBack() { renderAndCheck(2) }
function createCity() { renderAndCheck(3) }
function edit() { renderAndCheck(4) }

function renderAndCheck(attr) {
    container = []
    if(amountOfCity > 0)
        amountOfCityView = React.createElement('h1', {id: 'amountOfCityView'}, 'Максимальный ID элемента: ' + amountOfCity)
    else amountOfCityView = React.createElement('h1', {id: 'amountOfCityView'}, 'У вас нет еще элементов!')
    container.push(amountOfCityView, input, buttonDelElement, buttonTakeElementBack, inputCityName, inputCityOkato, buttonCreateCity,
        button0, button1, button2, button3, button4)
    if(document.getElementById('input') && attr) {
        let inputValue = document.getElementById('input').value
        if(attr == 1 && json[inputValue - 1]) {
            if(rawContainer == undefined) rawContainer = container.slice()
            rawContainer[inputValue - 1] = json[inputValue - 1]
            json[inputValue - 1] = null
            if(inputValue == amountOfCity) amountOfCity--
            container = []
            if(amountOfCity > 0)
                amountOfCityView = React.createElement('h1', {id: 'amountOfCityView'}, 'Максимальный ID элемента: ' + amountOfCity)
            else amountOfCityView = React.createElement('h1', {id: 'amountOfCityView'}, 'У вас нет еще элементов!')
            container.push(amountOfCityView, input, buttonDelElement, buttonTakeElementBack, inputCityName, inputCityOkato, buttonCreateCity,
                button0, button1, button2, button3, button4)
        } else if(attr == 2 && !json[inputValue - 1]) {
            json[inputValue - 1] = rawContainer[inputValue - 1]
            amountOfCity = 0
            for(let element of json) amountOfCity++
            container = []
            if(amountOfCity > 0)
                amountOfCityView = React.createElement('h1', {id: 'amountOfCityView'}, 'Максимальный ID элемента: ' + amountOfCity)
            else amountOfCityView = React.createElement('h1', {id: 'amountOfCityView'}, 'У вас нет еще элементов!')
            container.push(amountOfCityView, input, buttonDelElement, buttonTakeElementBack, inputCityName, inputCityOkato, buttonCreateCity,
                button0, button1, button2, button3, button4)
        }
        else if(attr == 3) {
            let inputCityNameValue = document.getElementById('inputCityName').value
            let inputCityOkatoValue = document.getElementById('inputCityOkato').value
            if(inputCityNameValue && inputCityOkatoValue) {
                amountOfCity++
                container = []
                if(amountOfCity > 0)
                    amountOfCityView = React.createElement('h1', {id: 'amountOfCityView'}, 'Максимальный ID элемента: ' + amountOfCity)
                else amountOfCityView = React.createElement('h1', {id: 'amountOfCityView'}, 'У вас нет еще элементов!')
                container.push(amountOfCityView, input, buttonDelElement, buttonTakeElementBack, inputCityName, inputCityOkato, buttonCreateCity,
                    button0, button1, button2, button3, button4)
                ReactDOM.render(
                    container,
                    document.getElementById('main')
                )
                let tmp = Object.assign({}, json[0])
                tmp.name = inputCityNameValue
                tmp.okato = inputCityOkatoValue
                json.push(tmp)
            }
        } else if(attr == 4) {
            let inputValue = document.getElementById('input').value
            let inputCityNameValue = document.getElementById('inputCityName').value
            let inputCityOkatoValue = document.getElementById('inputCityOkato').value
            if(inputValue && inputCityNameValue && inputCityOkatoValue) {
                json[inputValue - 1].name = inputCityNameValue
                json[inputValue - 1].okato = inputCityOkatoValue
            }
        }
    }

    var i = 0
    for(let element of json) {
        if(element) {
            container.push(<h1 id={'object' + (i + 1)} className='city'>{
                'Объект(' + (i + 1) + '): ' + element.name + ' | okato = ' + element.okato
            }</h1>)
        }
        i++
    }
    //alert(json[0])
    ReactDOM.render(
        container,
        document.getElementById('main')
    )
}