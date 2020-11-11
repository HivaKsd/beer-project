const mainElement = document.querySelector('main');
const randomBeerSection = document.querySelector('section');
const randomBeerUrl = 'https://api.punkapi.com/v2/beers/random';


getData(randomBeerUrl, render);

function getData(url, callback) {
    fetch(url)
    .then(res => res.json())
    .then(data =>{
        callback(data);
    })
    .catch(error => console.log(error));
}

function render(data) {

    const beer = data[0];
    const name = beer.name;
    const imageUrl = beer.image_url;
   
    const h1Tag = document.createElement('h1');
    const imgTag = document.createElement('img');
    const buttonTag = document.createElement('button');

    buttonTag.setAttribute('name', beer.id);
    
    h1Tag.textContent = name;
    imgTag.setAttribute ('src', imageUrl);
    buttonTag.innerHTML = 'More Info';
    
    randomBeerSection.appendChild(h1Tag);
    randomBeerSection.appendChild(imgTag);
    randomBeerSection.appendChild(buttonTag);
    
    buttonTag.addEventListener('click', onButtonClicked);
}

function onButtonClicked(evt) {
    const id = evt.target.getAttribute('name');
    const url = `BeerDetails.html?name=${id}`;
    document.location.href = url;
}