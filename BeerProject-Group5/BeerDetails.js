const mainElement = document.querySelector('main');
const searchParams = new URLSearchParams(window.location.search);
const api = 'https://api.punkapi.com/v2/beers';
const id = searchParams.get('name');
const url = `${api}/${id}`;


getData(url, render);

function getData(url, callback) {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            callback(data);
        })
        .catch(error => console.log(error));
}

function render(data) {

    const beer = data[0];
    const name = beer.name;
    const imageUrl = beer.image_url;
    const description = beer.description;
    const alcoholByVolume = beer.abv;
    const volumeValue = beer.volume.value;
    const volumeUnit = beer.volume.unit;
    const ingredients = beer.ingredients;
    let listOfIngredientsMalt = [];
    for (var i in (ingredients.malt)) {

        listOfIngredientsMalt.push(ingredients.malt[i].name);

    }
    let listOfIngredientsHops = [];
    for (var i in (ingredients.hops)) {

        listOfIngredientsHops.push(ingredients.hops[i].name);

    }
    let IngredientsYeast = beer.ingredients.yeast;
    
    const foodpair = beer.food_pairing;
    const foodPairing = [];
    for (var i in (foodpair)) {

        foodPairing.push(foodpair[i]);

    }

    const brewersTips = beer.brewers_tips;

    const h1Tag = document.createElement('h1');
    const imgTag = document.createElement('img');
    const pTagDescription = document.createElement('p');
    const pTagAlcoholByVolume = document.createElement('p');
    const pTagVolume = document.createElement('p');
    const pTagIngredients = document.createElement('p');
    const pTagFoodPairing = document.createElement('section');
    const pTagBrewersTips = document.createElement('p');

    h1Tag.textContent = name;
    imgTag.setAttribute('src', imageUrl);
    pTagDescription.textContent = `Description: ${description}`;
    pTagAlcoholByVolume.textContent = `Alcohol By Volume: ${alcoholByVolume}`;
    pTagVolume.textContent = `Volume: ${volumeValue} ${volumeUnit}`;
    pTagIngredients.textContent = `Ingredients = \n \t Malt: ${listOfIngredientsMalt}\n \t Hops: ${listOfIngredientsHops}\n \t Yeast: ${IngredientsYeast}`;
    pTagFoodPairing.textContent = `Food Pairing: ${foodPairing}`;
    pTagBrewersTips.textContent = `Brewer's tips: ${brewersTips}`;

    mainElement.appendChild(h1Tag);
    mainElement.appendChild(imgTag);
    mainElement.appendChild(pTagDescription);
    mainElement.appendChild(pTagAlcoholByVolume);
    mainElement.appendChild(pTagVolume);
    mainElement.appendChild(pTagIngredients);
    mainElement.appendChild(pTagFoodPairing);
    mainElement.appendChild(pTagBrewersTips);
}