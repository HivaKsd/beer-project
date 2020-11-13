const api = 'https://api.punkapi.com/v2/beers';
const formElementName = document.querySelector('form.searchByName');
const formElementMalt = document.querySelector('form.searchByMalt');
const formElementHops = document.querySelector('form.searchByHops');
const mainElement = document.querySelector('main');
const SearchResultElement = document.querySelector('div.searchResult');
const pageNumElement = document.querySelector('div.pageNum');
var pl;
var page = 1;
var curURL;

formElementName.addEventListener('submit', onSubmitName);
formElementMalt.addEventListener('submit', onSubmitMalt);
formElementHops.addEventListener('submit', onSubmitHops);


function onSubmitName(evt) {

    removeAllChildNodes(pageNumElement);

    const searchStr = evt.target[0].value;

    const url = `${api}?beer_name=${searchStr}`;
    curURL = `${api}?malt=${searchStr}`;
    findpl(url, getData);
    evt.preventDefault();
}

function onSubmitMalt(evt) {

    removeAllChildNodes(pageNumElement);

    const searchStr = evt.target[0].value;

    const url = `${api}?malt=${searchStr}`;
    curURL = `${api}?malt=${searchStr}`;
    findpl(url, getData);
    evt.preventDefault();
}

function onSubmitHops(evt) {

    removeAllChildNodes(pageNumElement);

    const searchStr = evt.target[0].value;

    const url = `${api}?hops=${searchStr}`;
    findpl(url, getData);
    evt.preventDefault();
}

function findpl(url, callbaback) {
    fetch(url)
    .then(res => res.json())

    .then(data =>{
        var pl = data.length / 10;
        getData(url, render, page, pl);

    })
    .catch(error => console.log(error));
}


function getData(url, callback, page = 1, pl) {
    fetch(`${url}&page=${page}&per_page=10`)
    .then(res => res.json())

    .then(data =>{

        callback(url, data, pl);

    })
    .catch(error => console.log(error));
}

function removeAllChildNodes(parent) {
    
    while (parent.firstChild) {
        
        parent.removeChild(parent.firstChild);
    }
}


function render(url, data, pl) {
    const ulElement = document.createElement('ul');

    ulElement.addEventListener('click', onUlClicked);

    removeAllChildNodes(SearchResultElement);

    for (let i = 0; i < data.length; i++) {

        const beer = data[i];

        const liElement = document.createElement('li');
        liElement.setAttribute('name', beer.id);
        liElement.textContent = beer.name;

        ulElement.appendChild(liElement);
    }

    SearchResultElement.appendChild(ulElement);

    // removeAllChildNodes(pageNumElement);

    for (let p = 0; p <= pl; p++) {

        const buttonElement = document.createElement('button');
        buttonElement.textContent = p+1;
        buttonElement.setAttribute("class", "btn");

        pageNumElement.appendChild(buttonElement);

    }

    const buttonClickes = document.querySelectorAll("button");
    buttonClickes.forEach(function(el){el.addEventListener('click', onButtonClicked)});

}

function onUlClicked(evt) {
    const id = evt.target.getAttribute('name');
    const url = `BeerDetails.html?name=${id}`;
    document.location.href = url;
}

function onButtonClicked(evt) {
    let pageNum = evt.target.textContent;
    console.log(pageNum);
        fetch(`${curURL}&page=${pageNum}&per_page=10`)
        .then(res => res.json())
    
        .then(data =>{
    
            render(curURL, data, pl);
    
        })
        .catch(error => console.log(error));
    
}