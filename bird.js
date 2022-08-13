let jsonData = {};
let filteredData = {};

async function fetchData() {
    const requestUrl = "data/nzbird.json";

    try {
        let response = await fetch(requestUrl); // blocks
        let data = await response.text(); // blocks
        jsonData = JSON.parse(data);
    } catch (error) {
        console.error("Error: " + error); // failure!
    }
    filteredData = jsonData;
    displayBirds(jsonData);
    results();
}
fetchData();


function displayBirds(data) {
    /* 2: clear chat-log-container */
    document.querySelector("#bird-display-container").value = '';

    let container = document.querySelector("#bird-display-container");
    container.innerHTML = "";

    /* 3: for each bird object in array */
    /* create each bird element */
    for (let i = 0; i < data.length; i++) {
        createBirdElement(data[i]);
    }
}
displayBirds(filteredData);

function createBirdElement(bird) {

    let img = document.createElement('img');
    let primaryName = document.createElement('h4');
    let credit = document.createElement('p');
    let englishName = document.createElement('h2');
    let scientificHeader = document.createElement('p');
    let scientificName = document.createElement('p');
    let familyHeader = document.createElement('p');
    let family = document.createElement('p');
    let orderHeader = document.createElement('p');
    let order = document.createElement('p');
    let statusHeader = document.createElement('p');
    let status = document.createElement('p');
    let lengthHeader = document.createElement('p');
    let length = document.createElement('p');
    let weightHeader = document.createElement('p');
    let weight = document.createElement('p');
    let div = document.createElement('div');
    let dot = document.createElement('span');


    img.setAttribute('src', bird.photo.source);

    primaryName.setAttribute('class', 'primary-name');
    primaryName.textContent = bird.primary_name;

    credit.setAttribute('class', 'credit');
    credit.textContent = "Photo by " + bird.photo.credit;

    englishName.setAttribute('class', 'english-name');
    englishName.textContent = bird.english_name;

    scientificHeader.setAttribute('class', 'scientific-header');
    scientificHeader.textContent = 'Scientific name';

    scientificName.setAttribute('class', 'scientific-name');
    scientificName.textContent = bird.scientific_name;

    familyHeader.setAttribute('class', 'family-header');
    familyHeader.textContent = 'Family';

    family.setAttribute('class', 'family');
    family.textContent = bird.family;

    orderHeader.setAttribute('class', 'order-header');
    orderHeader.textContent = 'Order';

    order.setAttribute('class', 'order');
    order.textContent = bird.order;

    statusHeader.setAttribute('class', 'status-header');
    statusHeader.textContent = 'Status';

    status.setAttribute('class', 'status');
    status.textContent = bird.status;

    lengthHeader.setAttribute('class', 'length-header');
    lengthHeader.textContent = 'Length';

    length.setAttribute('class', 'length');
    length.textContent = bird.size.length.value + " " + bird.size.length.units;

    weightHeader.setAttribute('class', 'weight-header');
    weightHeader.textContent = 'Weight';

    weight.setAttribute('class', 'weight');
    weight.textContent = bird.size.weight.value + " " + bird.size.weight.units;

    div.setAttribute('class', 'bird_container');

    if (bird.status === "Not Threatened") {
        dot.setAttribute('class', 'dot');
        dot.setAttribute('id', 'not-threatened');
    } else if (bird.status === "Naturally Uncommon") {
        dot.setAttribute('class', 'dot');
        dot.setAttribute('id', 'naturally-uncommon');
    } else if (bird.status === "Relict") {
        dot.setAttribute('class', 'dot');
        dot.setAttribute('id', 'relict');
    } else if (bird.status === "Recovering") {
        dot.setAttribute('class', 'dot');
        dot.setAttribute('id', 'recovering');
    } else if (bird.status === "Declining") {
        dot.setAttribute('class', 'dot');
        dot.setAttribute('id', 'declining');
    } else if (bird.status === "Nationally Increasing") {
        dot.setAttribute('class', 'dot');
        dot.setAttribute('id', 'nationally-increasing');
    } else if (bird.status === "Nationally Vulnerable") {
        dot.setAttribute('class', 'dot');
        dot.setAttribute('id', 'nationally-vulnerable');
    } else if (bird.status === "Nationally Endangered") {
        dot.setAttribute('class', 'dot');
        dot.setAttribute('id', 'nationally-endangered');
    } else if (bird.status === "Nationally Critical") {
        dot.setAttribute('class', 'dot');
        dot.setAttribute('id', 'nationally-critical');
    } else if (bird.status === "Extinct") {
        dot.setAttribute('class', 'dot');
        dot.setAttribute('id', 'extinct');
    } else if (bird.status === "Data Deficient") {
        dot.setAttribute('class', 'dot');
        dot.setAttribute('id', 'data-deficient');
    }

    let main = document.querySelector("#bird-display-container")

    // append it all together, into <main>
    div.append(img);
    div.append(primaryName);
    div.append(credit);
    div.append(englishName);
    div.append(scientificHeader);
    div.append(scientificName);
    div.append(familyHeader);
    div.append(family);
    div.append(orderHeader);
    div.append(order);
    div.append(statusHeader);
    div.append(status);
    div.append(lengthHeader);
    div.append(length);
    div.append(weightHeader);
    div.append(weight);
    div.append(dot);

    main.append(div);
}

async function searchHandler(eventData) {
    try {
        let input = document.getElementById('search').value
        input = input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        filteredData = [];
        let index = 0;
        for (let i = 0; i < jsonData.length; i++) {
            if (jsonData[i].english_name.toLowerCase().includes(input) || jsonData[i].scientific_name.toLowerCase().includes(input) || jsonData[i].primary_name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(input)) {
                filteredData[index] = jsonData[i];
                index++;
            }
        }

        displayBirds(filteredData);

        // It prevents the page from reloading
        eventData.preventDefault();
    } catch (error) {
        console.error("Error: " + error); // failure!
    }
    results();
}
document.querySelector("#searchbtn").addEventListener('click', searchHandler);

async function statusFilterHandler(eventData) {
    try {
        let input = document.getElementById('status').value
        if (input === "Please select status") {
            return;
        }

        filteredData = filteredData.filter(obj => {
            return obj.status === input;
        });

        displayBirds(filteredData);

        // It prevents the page from reloading
        eventData.preventDefault();
    } catch (error) {
        console.error("Error: " + error); // failure!
    }
    results();
}
document.querySelector("#searchbtn").addEventListener('click', statusFilterHandler);


async function sortHandler(eventData) {
    try {

        let input = document.getElementById('sort').value
        if (input === "Please select subject") {
            return;
        } else if (input === "size.length.value") {
            filteredData.sort(function (a, b) { return a.size.length.value - b.size.length.value });
        } else if (input === "size.weight.value") {
            filteredData.sort(function (a, b) { return a.size.weight.value - b.size.weight.value });
        } else {
            filteredData.sort((a, b) => (a[input] > b[input]) ? 1 : -1)
        }

        displayBirds(filteredData);

        // It prevents the page from reloading
        eventData.preventDefault();
    } catch (error) {
        console.error("Error: " + error); // failure!
    }
    results();
}
document.querySelector("#searchbtn").addEventListener('click', sortHandler);

async function results() {

    let result = document.querySelector("#result")
    result.textContent = filteredData.length + ' results found';
}

