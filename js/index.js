let submit = document.getElementById("submit");
let searchBox = document.getElementById("search");

submit.addEventListener("click", function () {
    checkWeather();
});
async function checkWeather() {
    let response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=daae251a2474423682e191719242406&q=${searchBox.value}07112&days=3`
    );
    let result = await response.json();
console.log(result);
    if (!result.error) {
        const currentDay = result.current;
        const forecastDays = result.forecast.forecastday;
        let dataContainer = /* HTML */ `
            <div class="today-card col-md-4 col-sm-12">
                <div class="card-header" id="today">
                    <div class="day">${result.forecast.forecastday[0].day}</div>
                    <div class="date">${result.forecast.forecastday[0].date}</div>
                </div>
                <!-- .card-header -->
                <div class="card-content" id="current">
                    <div class="location">${result.location.name}</div>
                    <div class="degree">
                        <div class="num">${currentDay.temp_c}<sup>o</sup>C</div>

                        <div class="card-icon">
                            <img
                                src="https://${currentDay.condition.icon}"
                                alt=""
                                width="90"
                            />
                        </div>
                    </div>
                    <div class="custom">${currentDay.condition.text}</div>
                    <span
                        ><img
                            src="https://routeweather.netlify.app/images/icon-umberella@2x.png"
                            alt=""
                            width="21"
                            height="21"
                        />20%</span
                    >
                    <span
                        ><img
                            src="https://routeweather.netlify.app/images/icon-wind@2x.png"
                            alt=""
                            width="23"
                            height="21"
                        />18km/h</span
                    >
                    <span
                        ><img
                            src="https://routeweather.netlify.app/images/icon-compass@2x.png"
                            alt=""
                            width="21"
                            height="21"
                        />East</span
                    >
                </div>
            </div>
        `;

        for (let i = 1; i < forecastDays.length; i++) {
            dataContainer += /* HTML */ `
                <div class="today-card col-md-4 col-sm-12" id="seconde-card">
                    <div class="card-header">
                        <div class="day">${forecastDays[i].date}</div>
                    </div>
                    <div class="card-content">
                        <div class="card-icon">
                            <img
                                src="https://${forecastDays[i].day.condition
                                    .icon}"
                                alt=""
                                width="48"
                            />
                        </div>
                        <div class="degree">
                            ${forecastDays[i].day.maxtemp_c} <sup>o</sup>C
                        </div>
                        <small
                            >${forecastDays[i].day.mintemp_c}<sup>o</sup></small
                        >
                        <div class="custom">
                            ${forecastDays[i].day.condition.text}
                        </div>
                    </div>
                </div>
            `;
        }
        document.getElementById("cards-container").innerHTML = dataContainer;
    }
}
