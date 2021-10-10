console.log("client side js has been loaded");

const form = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
const icon = document.querySelector("#icon");
const caption= document.querySelector("#caption")

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  icon.src = "";
 caption.textContent= "";
messageOne.textContent = "";
messageTwo.textContent ="";
  messageOne.textContent = "Loading....";
  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response.json().then((result) => {
        if (result.error) {
          messageOne.textContent = result.error;
        } else {
          icon.src = result.weatherData.weather_icons[0];
          caption.textContent= result.Weather_Description 
          messageOne.textContent = "Weather Data for " + result.address;
          messageTwo.textContent =
            "Temperature: " +
            result.weatherData.temperature +
            "," +
            " Humidity:" +
            result.weatherData.humidity 

          console.log(result.weatherData);
        }
      });
    }
  );
});
