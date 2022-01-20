document.addEventListener("DOMContentLoaded", function() {
    startProgram();
});

async function startProgram() {
    // form url according to user's choice (country name or capital)
    const form = document.querySelector('form');
    // add events to the radio inputs 
    const radioInputs = document.querySelectorAll('input[type=radio]');
    radioInputs.forEach((i)=>{
        i.addEventListener('click', function(){
            if (i.value === 'region') {
                document.querySelector('#selectGroup').style.display = 'block';
                document.querySelector('input#country').disabled = true;
            } else {
                document.querySelector('#selectGroup').style.display = 'none';
                document.querySelector('input#country').disabled = false;
            }
        });
    });


    form.addEventListener("submit", function(e) {
        e.preventDefault();
        let typeOfSearch = getSearchType();
        if (typeOfSearch === 'region') {
            getRegion();
            console.log('getRegion');
        } else {
            displayCountry();
            console.log('displayCountry');
        }
    });
}

async function getCountry(url) {
    let country = await fetch(url);
    country = await country.json();
    return country;
} 

async function makeSearch() {
    let searchType = getSearchType();
    let searchInput = document.querySelector('#country').value.toLowerCase();
    let url = `https://restcountries.com/v3.1/${searchType}/${searchInput}`;
    // get county information
    const country = await getCountry(url);
    console.log(country);
    return country;
}

function getSearchType() {
    let form = document.querySelector('form');
    let data = new FormData(form);
    // return value from input[type=radio, name=search-param] 
    return data.getAll('search-param')[0];
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

async function getRegion() {
    let region = document.querySelector('select').value;
    let countries = await fetch(`https://restcountries.com/v3.1/region/${region}`);
    countries = await countries.json();
    console.log(countries);
    
}