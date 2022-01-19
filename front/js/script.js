async function getAllCountries() {
    let countries = await fetch("https://restcountries.com/v3.1/all");
    countries = await countries.json();
    return countries;
} 