document.addEventListener("DOMContentLoaded", function() {
    startProgram();
});

async function startProgram() {
    // form url according to user's choice (country name or capital)
    const form = document.querySelector('form');
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        displayCountry();
    });
}

async function getCountry(url) {
    let country = await fetch(url);
    country = await country.json();
    return country;
} 

async function makeSearch() {
    let form = document.querySelector('form');
    let data = new FormData(form);
    let searchChoice = data.getAll('search-param')[0];
    console.log(searchChoice);
    let searchInput = document.querySelector('#country').value.toLowerCase();
    let url = `https://restcountries.com/v3.1/${searchChoice}/${searchInput}`;
    // get county information
    const country = await getCountry(url);
    return country;
}

async function displayCountry() {
    let country = await makeSearch();
    document.querySelector('main')
        .insertAdjacentHTML('afterbegin','<ul id="ulWithCountries"></ul>');        
    let li = document.createElement('li');
    let capital = country[0].capital[0] ? country[0].capital[0] : "None";
    let content = '<span>Name: ' + country[0].name.common + '</span><br>\
                    <span>Capital: ' + capital + '</span><br>\
                    <span>Continent: ' + country[0].continents[0] + '</span><br><br>';
    li.insertAdjacentHTML('afterbegin', content);
    document.querySelector('#ulWithCountries').appendChild(li);
}