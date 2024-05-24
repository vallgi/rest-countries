document.addEventListener('DOMContentLoaded', () => {
    const resultsDiv = document.getElementById('results');
    const searchInput = document.getElementById('search-input');
    const regionFilter = document.getElementById('region-filter');
    const countryDetails = document.getElementById('country-details');
    const backButton = document.getElementById('back-button');
    const themeToggle = document.getElementById('theme-toggle');
    let countriesData = [];

    // Fetch countries data
    async function fetchCountries() {
        try {
            const response = await fetch('data.json');
            countriesData = await response.json();
            displayCountries(countriesData);
        } catch (error) {
            console.error('Error fetching countries:', error);
        }
    }
    

    // Display countries
    function displayCountries(countries) {
        resultsDiv.innerHTML = '';
        countries.forEach(country => {
            const countryElement = document.createElement('div');
            countryElement.className = 'country';
            console.log(country)
            countryElement.innerHTML = `
                <img src="${country.flags.png}" alt="Flag of ${country.name.common}">
                <h2>${country.name}</h2>
                <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                <p><strong>Region:</strong> ${country.region}</p>
                <p><strong>Capital:</strong> ${country.capital}</p>
            `;
            countryElement.addEventListener('click', () => showCountryDetails(country));
            resultsDiv.appendChild(countryElement);
        });
    }

    // Show country details
    function showCountryDetails(country) {
        detailsContent.innerHTML = `
            <img src="${country.flags.png}" alt="Flag of ${country.name.common}">
            <h2>${country.name.common}</h2>
            <p><strong>Native Name:</strong> ${country.name.nativeName ? Object.values(country.name.nativeName)[0].common : country.name.common}</p>
            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <p><strong>Sub Region:</strong> ${country.subregion}</p>
            <p><strong>Capital:</strong> ${country.capital}</p>
            <p><strong>Top Level Domain:</strong> ${country.tld}</p>
            <p><strong>Currencies:</strong> ${country.currencies ? Object.values(country.currencies).map(currency => currency.name).join(', ') : 'N/A'}</p>
            <p><strong>Languages:</strong> ${country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</p>
            <p><strong>Border Countries:</strong> ${country.borders ? country.borders.join(', ') : 'None'}</p>
        `;
        resultsDiv.style.display = 'none';
        countryDetails.style.display = 'block';
    }

    // Back button handler
    backButton.addEventListener('click', () => {
        resultsDiv.style.display = 'grid';
        countryDetails.style.display = 'none';
    });

    // Search input handler
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filteredCountries = countriesData.filter(country => country.name.common.toLowerCase().includes(query));
        displayCountries(filteredCountries);
    });

    // Region filter handler
    regionFilter.addEventListener('change', (e) => {
        const region = e.target.value;
        const filteredCountries = region ? countriesData.filter(country => country.region === region) : countriesData;
        displayCountries(filteredCountries);
    });

    // Theme toggle handler
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        themeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️ Light Mode' : '🌙 Dark Mode';
    });

    // Fetch countries data on load
    fetchCountries();
});

