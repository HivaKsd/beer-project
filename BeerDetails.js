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
    let listOfIngredients = [];
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

    const bTagDescriptionTitle = document.createElement('b');
    const pTagDescription = document.createElement('p');

    const bTagAlcoholVolumeTitle = document.createElement('b');
    const pTagAlcoholByVolume = document.createElement('p');

    const bTagVolumeTitle = document.createElement('b');
    const pTagVolume = document.createElement('p');

    const bTagIngedientsTitle = document.createElement('b');
    const pTagIngredients = document.createElement('p');

    const bTagFoodPairTitle = document.createElement('b');
    const pTagFoodPairing = document.createElement('section');

    const bTagBrewersTitle = document.createElement('b');
    const pTagBrewersTips = document.createElement('p');

    h1Tag.textContent = name;
    imgTag.setAttribute('src', imageUrl);

    bTagDescriptionTitle.textContent = "Description: ";
    pTagDescription.textContent = `${description}`;

    bTagAlcoholVolumeTitle.textContent = 'Alcohol By Volume: ';
    pTagAlcoholByVolume.textContent = `${alcoholByVolume}`;

    bTagVolumeTitle.textContent = 'Volume: ';
    pTagVolume.textContent = `${volumeValue} ${volumeUnit}`;

    bTagIngedientsTitle.textContent = 'Ingredients: ';
    pTagIngredients.textContent = `Malt: ${listOfIngredientsMalt}\n \t Hops: ${listOfIngredientsHops}\n \t Yeast: ${IngredientsYeast}`;

    bTagFoodPairTitle.textContent = 'Food Pairing: ';
    pTagFoodPairing.textContent = `${foodPairing}`;

    bTagBrewersTitle.textContent = "Brewer's tips: ";
    pTagBrewersTips.textContent = `${brewersTips}`;

    mainElement.appendChild(h1Tag);
    mainElement.appendChild(imgTag);
    mainElement.appendChild(bTagDescriptionTitle);
    mainElement.appendChild(pTagDescription);
    mainElement.appendChild(bTagAlcoholVolumeTitle);
    mainElement.appendChild(pTagAlcoholByVolume);
    mainElement.appendChild(bTagVolumeTitle);
    mainElement.appendChild(pTagVolume);
    mainElement.appendChild(bTagIngedientsTitle);
    mainElement.appendChild(pTagIngredients);
    mainElement.appendChild(bTagFoodPairTitle);
    mainElement.appendChild(pTagFoodPairing);
    mainElement.appendChild(bTagBrewersTitle);
    mainElement.appendChild(pTagBrewersTips);
}
