
import { myAPIKey } from "myAPIKey.js"
console.log(myAPIKey)
// Get the city name from the input and display on the page
{
    // Grab the input
    let form = document.getElementById('cityForm');
    console.log(form)

// Create a function to handle submit event
async function handleSubmit(e){
    e.preventDefault(); // Prevent the event from refreshing the page
    //console.log(e);
    let cityName = e.target.cityName.value;
    //console.log(cityName);
    let cityInfo = await getCityInfo(cityName);
    console.log(cityInfo)
    console.log(typeof cityInfo)
    buildCityCard(cityInfo);
    // Clear the input of the city name
    e.target.cityName.value = '';

}
// Function that takes in a city name, makes the request to the API, and returns a JavaScript object
async function getCityInfo(cityName){
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=2aa040a4b3f5fd222d4be71dd13ba7a8`);
    //console.log(response)
    //console.log(response.json())
    let data = await response.json()
    //console.log(data);
    return data
  
}






// Function that will take in a city object and build an HTML card and append to the city Display

function buildCityCard(cityObj){

// Create a card div

    let card = document.createElement('div');
    card.className = 'row d-flex justify-content-center align-items-center h-100';
    
    // Create card body
    let cardBody = document.createElement('div');
    cardBody.className = 'card-body card text-white bg-image shadow-4-strong'
    cardBody.style="background-image: url('image/A_black_image.jpeg')";
    
    let cityTitle = document.createElement('h5');
    cityTitle.className = 'card-title';
    cityTitle.innerHTML = cityObj.weather[0].description;
    card.append(cityTitle)

    let city1 = document.createElement('h2');
    city1.className = 'mb-1';
    city1.innerHTML = cityObj.wind.speed;
    card.append(city1)

    let city2 = document.createElement('p');
    city2.className = 'display-1 mb-1';
    city2.innerHTML = cityObj.main.feels_like+"K";
    card.append(city2)

    cardBody.append(cityTitle)
    cardBody.append(city1)
    cardBody.append(city2)

   
    

    // Add the card body to the card
    card.append(cardBody);

    // Create a column for the row
    let col = document.createElement('div');
    col.className = 'col-12 col-md-6 col-lg-3 my-3';

    // Add the card as a child to the column
    col.append(card);

    // Get the city display row and add the column
    let display = document.getElementById('cityDisplay');
    display.append(col);


    
    
}

// Add handleSubmit function to the input as a listener to the submit event
form.addEventListener('submit', handleSubmit);

}
