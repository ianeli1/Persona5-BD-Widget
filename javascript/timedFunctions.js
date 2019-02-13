function setDateTime(){
	const currentTime = new Date();
	const day = (currentTime.getDay() + 6) % 7;

	updateTime(currentTime);
	// only update datestrings once per day, not every second
	if (day != currentDay){
		const date = currentTime.getDate();
		const month = currentTime.getMonth() + 1;

		const weekdaySprite = document.querySelector('.weekday-sprite');

		updateWeekdaySprite(day,weekdaySprite);
		updateDateDisplay(date);

		//updateMonthDisplay(month-1);
		updateStackedSprite(month-1, '.month',document);
		// update
		currentDay = day;
	}
	// for each of the functions below, test by toggling at the end of a minute
	// todo: write a script that toggles day to night etc at 6AM and 6PM
	// todo: write a script that toggles the current day at 12AM every night
}

function updateTime(currentTime){
	const timeString = document.getElementById("time");

	const currentHour = currentTime.getHours();
	const currentMinute = currentTime.getMinutes();
	const currentSeconds = currentTime.getSeconds();
	let AMPM = (currentHour >= 12) ? "pm" : "am";
	let hoursTwelve = currentHour % 12;
	if (hoursTwelve == 0) hoursTwelve = 12;

//  endTime.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
	// use ternary expressions to add extra 0s in formatting where necessary
	timeString.innerHTML = 		`${(hoursTwelve) < 10 ? '0' : ''}${hoursTwelve}:` +
								`${currentMinute < 10 ? '0' : ''}${currentMinute}` +
								//`:${currentSeconds < 10 ? '0' : ''}${currentSeconds} ` +
								`${AMPM}`;

	if (currentHour >= 18 || currentHour < 6){
		if (isDayTime) toggleBackground();
	}
	else { // between 6AM and 6PM
		if (!isDayTime) toggleBackground();
	}
}

function toggleBackground(){
	const overlayImages = document.querySelectorAll('.timeOfDay');
	isDayTime = !isDayTime;
	overlayImages.forEach(overlayImage => {
		if (isDayTime){
			overlayImage.classList.remove('night');
			//currentDay = (currentDay + 1) % 7;
		}
		else {
			overlayImage.classList.add('night');
		}
	});
};

function onLoadComplete(){
	const loadingOverlay = document.querySelector('.loading-overlay');
	const headerFlexbox = document.querySelector('#header-flexbox');
	const todaysWeather = document.querySelector('.todays-weather-container');

	//console
	//console.log(todaysWeather);

	pageLoading = !pageLoading;
	if (pageLoading){
		loadingOverlay.classList.add('hide');
		headerFlexbox.classList.add('bounceIn');
		todaysWeather.classList.add('mainBounceDown');
		setTimeout(function(){
			const weekDays = document.querySelectorAll('.weekday');
			weekDays.forEach(weekday => weekday.classList.add('bounceDown'));
		}, 400);

		// hacky since we're not getting precise delay but oh well
		setTimeout(function(){
			screenShake();
		},650);



		// remove overlay after a delay
		setTimeout(function(){
			//var element = document.getElementById(elementId);
			loadingOverlay.parentNode.removeChild(loadingOverlay);
		},1000);

	}
	else {
		loadingOverlay.classList.remove('hide');
		headerFlexbox.classList.remove('bounceIn');
		//weekDays.forEach(weekday => weekday.classList.remove('bounceDown'));
	}
	//console.log("toggleOverlay");
}


function screenShake(){
	const bgs = document.querySelectorAll('.background-image');

	bgs.forEach(bg => {
		//const shakeAmount = 1;
		//let top = parseInt((getComputedStyle(bg).marginTop).replace(/px/,""));
		//let top = getComputedStyle(bg).marginTop;
		//console.log(top);
		bg.classList.add('screenshake');
		//top += shakeAmount;
		//bg.style.marginTop = `${top}px`
	});
}


// only run once per second
setInterval(setDateTime, 1000);
setDateTime(); // call on page load

//window.addEventListener('mousedown', toggleBackground);
//window.addEventListener('mousedown', screenShake);
