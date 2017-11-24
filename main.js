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
let amountOfCityView = React.createElement('h1', {id: 'amountOfCityView'}, 'Вам доступны id от 1 до ' + amountOfCity)
let input = React.createElement('input', {id: 'input'})
let buttonDelElement = <button id='buttonDelElement' onClick = {delElement}>Удалить</button>
let buttonTakeElementBack = <button id='buttonTakeElementBack' onClick = {takeElementBack}>Вернуть</button>
let inputCityName = <input id='inputCityName'></input>
let inputCityOkato = <input id='inputCityOkato'></input>
let buttonCreateCity = <button id='buttonCreateCity' onClick = {createCity}>Создать</button>
let button1 = <button id='button1' onClick = {saveFromServer}>Загрузить с сервера</button>
let button2 = <button id='button2' onClick = {zeroOutLocalStorage}>Обнулить LocalStorage</button>
let button3 = <button id='button3' onClick = {loadFromLocalStorage}>Загрузить из LocalStorage</button>
let button4 = <button id='button4' onClick = {saveToLocalStorage}>Загрузить в LocalStorage</button>
container.push(amountOfCityView, input, buttonDelElement, buttonTakeElementBack, inputCityName, inputCityOkato, buttonCreateCity,
    button1, button2, button3, button4)
ReactDOM.render(
    container,
    document.getElementById('main')
)

function zeroOutLocalStorage() {
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
    reactLocalStorage.set('backActions', container)
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

function renderAndCheck(attr) {
    container = []
    container.push(amountOfCityView, input, buttonDelElement, buttonTakeElementBack, inputCityName, inputCityOkato, buttonCreateCity,
        button1, button2, button3, button4)
    if(document.getElementById('input') && attr) {
        let inputValue = document.getElementById('input').value
        if(attr == 1 && json[inputValue - 1]) {
            rawContainer[inputValue - 1] = json[inputValue - 1]
            json[inputValue - 1] = null
        }
        else if(attr == 2 && !json[inputValue - 1] && amountOfCity >= inputValue) json[inputValue - 1] = rawContainer[inputValue - 1]
        else if(attr == 3) {
            let inputCityNameValue = document.getElementById('inputCityName').value
            let inputCityOkatoValue = document.getElementById('inputCityOkato').value
            if(inputCityNameValue && inputCityOkatoValue) {
                amountOfCity++
                let tmp = Object.assign({}, json[0])
                tmp.name = inputCityNameValue
                tmp.okato = inputCityOkatoValue
                json.push(tmp)
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