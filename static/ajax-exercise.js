'use strict';

// PART 1: SHOW A FORTUNE

function showFortune(evt) {
  fetch('/fortune')
    .then(response => response.text())
    .then(result => document.querySelector('#fortune-text').innerHTML = result);
}

document.querySelector('#get-fortune-button').addEventListener('click', showFortune);

// PART 2: SHOW WEATHER

function showWeather(evt) {
  evt.preventDefault();

  const zipcode = document.querySelector('#zipcode-field').value;
  const queryString = new URLSearchParams({zipcode: zipcode}).toString();
  const url = `/weather.json?${queryString}`;

  fetch(url) 
    .then(response => response.json())
    .then(location => document.querySelector('#weather-info').innerHTML = location.forecast)
}

document.querySelector('#weather-form').addEventListener('submit', showWeather);

// PART 3: ORDER MELONS

function melonUpdate(result) {
  if (result.code == 'ERROR') {
    document.querySelector('#order-status').classList.add("order-error");
    document.querySelector('#order-status').innerHTML = result.message;
  } else {
    document.querySelector('#order-status').classList.remove("order-error");
    document.querySelector('#order-status').innerHTML = result.message;
  }
}
//.order-error
function orderMelons(evt) {
  evt.preventDefault();

  const formInputs ={
    melon_type: document.querySelector('#melon-type-field').value,
    qty: document.querySelector('#qty-field').value,
  };

  fetch('/order-melons.json', {
    method: 'POST',
    body: JSON.stringify(formInputs),
    headers: { 
      'Content-Type' : 'application/json',
    },
  })
    .then(response => response.json())
    .then(melonUpdate)
}
document.querySelector('#order-form').addEventListener('submit', orderMelons);

//Further Study

// function dogImage(){
  
//   const url = 'https://dog.ceo/api/breeds/image/random';
  
//   fetch(url)
//     .then((response) => response.json())
//     .then((dog_result) => {
//       const imageURL = dog_result.message;
//       document.querySelector("#dog-image").insertAdjacentHTML('beforeend', `<div><img src=${imageURL}></img></div>`);
//   });
// }

document.querySelector('#get-dog-image').addEventListener('click', () => {
  const url = 'https://dog.ceo/api/breeds/image/random';

  fetch(url)
    .then((response) => response.json())
    .then((dog_result) => {
      const imageURL = dog_result.message;
      document
        .querySelector("#dog-image #the-picture")
        .innerHTML = `<img src=${imageURL}></img>`;
  });
});
