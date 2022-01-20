document.addEventListener("DOMContentLoaded", function() {
    startProgram();
});

async function startProgram() {
    // clean previous radio choice and input data
    const radioInputs = document.querySelectorAll('input[type=radio]');
    radioInputs[0].checked = true;
    document.querySelector('input#country').value = "";    
    // add events to the radio inputs 
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
    const form = document.querySelector('form');
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        displayCountry();
    });
}

async function makeSearch() {
    let searchType = getSearchType();
    let searchSubj = "";
    if (searchType === 'region') {
        searchSubj = document.querySelector('select').value;
    } else {
        searchSubj = document.querySelector('#country').value.toLowerCase();
    }
    let url = `https://restcountries.com/v3.1/${searchType}/${searchSubj}`;
    // get county information
    let res = await fetch(url);
    res = await res.json();
    return res;
}

function getSearchType() {
    let form = document.querySelector('form');
    let data = new FormData(form);
    // return value from input[type=radio, name=search-param] 
    return data.getAll('search-param')[0];
}

async function displayCountry() {
    let countries = await makeSearch();
    let countriesUl = document.querySelector('#ulWithCountries');
    if (countriesUl) {
        countriesUl.remove();
    } 
    document.querySelector('main')
        .insertAdjacentHTML('afterbegin','<ul id="ulWithCountries"></ul>');
    countries
    countries.forEach((country)=> {
        let li = document.createElement('li');
        let capital = country.capital[0] ? country.capital[0] : "None";
        let content = '<span>Name: ' + country.name.common + '</span><br>\
                        <span>Capital: ' + capital + '</span><br>\
                        <span>Continent: ' + country.continents[0] + '</span><br><br>';
        li.insertAdjacentHTML('afterbegin', content);
        document.querySelector('#ulWithCountries').appendChild(li);

    });      
}