let sunriseElement;
let sunsetElement;
let locationElement;
let timeLeftElement;
let sunElement;

let htmlElement;

let totalTime = 0;


const placeSun = (totalMinutes, city) => {
	const now = new Date();

	const sunrise = new Date(city.sunrise * 1000);
	const sunset = new Date(city.sunset * 1000);

	const totalMinutesDayTime = (sunset.getHours() * 60 + sunset.getMinutes()) - (sunrise.getHours() * 60 + sunrise.getMinutes()); 

	const timeNow  = (now.getHours() * 60 + now.getMinutes()) - (sunrise.getHours() * 60 + sunrise.getMinutes());



	console.log(totalMinutesDayTime, " :total minutes")
	console.log(timeNow, " :minutes now");

	const percentage = timeNow / totalMinutesDayTime * 100;

	console.log(percentage, " :percentage");

	

	const sunLeftPosition = percentage;
	const sunBottomPosition = percentage > 50 ? 100 - percentage : percentage * 2;

	sunElement.style.left = `${sunLeftPosition}%`;
	sunElement.style.bottom = `${sunBottomPosition}%`;

	updateTimeAndTimeLeft((sunset.getHours() * 60 + sunset.getMinutes()) - (now.getHours() * 60 + now.getMinutes()));

	
}



const updateTimeAndTimeLeft = (timeLeftTimeStamp) => {

	sunElement.dataset.time = new Date().toLocaleTimeString([], {
		hour: '2-digit',
		minute: '2-digit'
	});

	timeLeftElement.innerText = `${(timeLeftTimeStamp / 60).toFixed(2)} hours of `;
}

const setDOMElements = () => {
	sunriseElement = document.querySelector(".js-sunrise");
	sunsetElement = document.querySelector(".js-sunset");
	locationElement = document.querySelector(".js-location");
	sunElement = document.querySelector(".js-sun");
	timeLeftElement = document.querySelector(".js-time-left");
	htmlElement = document.querySelector(".js-html");

	if (!sunriseElement || 
		!sunsetElement || 
		!locationElement ||
		!sunElement ||
		!timeLeftElement ||
		!htmlElement)
	{
		throw new Error("Dom elements not found");
	}
}

const makeReadableTimeFormatFromTimestamp = (timeStamp) => {
	return new Date(timeStamp * 1000).toLocaleTimeString([], { 
		hour: '2-digit',
		minute: '2-digit'
	})
}

const setLocationData = (city) => {
	sunriseElement.innerText = makeReadableTimeFormatFromTimestamp(city.sunrise);
	sunsetElement.innerText = makeReadableTimeFormatFromTimestamp(city.sunset);
	locationElement.innerText = `${city.name}, ${city.country}`;
}

const getData = (endpoint) => {
	return fetch(endpoint)
	.then((r) => r.json())
	.catch((e) => console.error(e));
}



document.addEventListener("DOMContentLoaded", async function() {
	let lat = 50.8027841;
	let lon = -5.568146;
	const endpoint = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=82ee857e6cd334c897a1491fe2815f27&units=metric&lang=nl&cnt=1`;

	setDOMElements();

	const { city } = await getData(endpoint);
	setLocationData(city);

	console.log((city.sunset - city.sunrise) / 60 / 60, " hours");

	updateTimeAndTimeLeft();
	console.log(city);

});