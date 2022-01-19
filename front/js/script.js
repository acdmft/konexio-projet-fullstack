document.addEventListener("DOMContentLoaded", function() {
    startProgram();
});

async function startProgram() {
	const countries = await getAllCountries();
    const listOfCountries = countries.map((country) => {
        return {
            name: country.name.common,
            capital: country.capital,
            continent: country.continents
        }
    });
    document.querySelector('main')
        .insertAdjacentHTML('afterbegin','<ul id="ulWithCountries"></ul>');
    listOfCountries.map((country) => {
        let li = document.createElement('li');
        let capital = country.capital ? country.capital : 'None';
        let content = '<span>Name: ' + country.name + '</span><br>\
                        <span>Capital: ' + capital + '</span><br>\
                        <span>Continent: ' + country.continent + '</span><br><br>'; 
        li.insertAdjacentHTML('afterbegin', content);
        document.querySelector('#ulWithCountries')
            .appendChild(li);        
    });
    console.log(countries[2])
}

async function getAllCountries() {
    let countries = await fetch("https://restcountries.com/v3.1/all");
    countries = await countries.json();
    console.log('getAllCountries');
    return countries;
} 