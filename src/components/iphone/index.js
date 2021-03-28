// import preact
// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';
// import the Forecast component
import Calendar from './calendar';
import Wind from './wind';
import Map from './map';


export default class Iphone extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
		// temperature state
		this.state.temp = "";
		// button display state
		this.setState({ display: true });
		this.setState({calendar: false});
		this.setState({wind: false});
		this.setState({Home: true});
		this.setState({map: false})
		setInterval(this.fetchWeatherData(), 60*1000);

	}
	// a call to fetch weather data via wunderground 
	
	fetchWeatherData = () => {
		//this.fetchHourlyWeatherTwo();
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		var url = "http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&APPID=f4ac5d1f1ca1d23b2dff60f3a350e5c3";
			
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseCurrentResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
			
		})
		// once the data grabbed, hide the button
		this.setState({ display: false });
		this.fetchForcastData();
	}



	fetchForcastData = () => {
		var url = "http://api.openweathermap.org/data/2.5/forecast?q=London&units=metric&APPID=f4ac5d1f1ca1d23b2dff60f3a350e5c3";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseForcastResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
	}
	// the main render method for the iphone component
	render() {
		if (this.state.Home == true){
			// check if temperature data is fetched, if so add the sign styling to the page
			const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;
			var hourly = this.state.hourlyTemp;
			var iconLink = " "; 
			//Change Weather icons depending on conditions
			if (this.state.main === "Clouds"){
				iconLink = "../../assets/icons/clouds.png";
			}else if(this.state.main === "Rain") {
				iconLink="../../assets/icons/rainy.png";
			}else if(this.state.main == "Clear"){
				iconLink = "../../assets/icons/sun.png"
			}
			if (this.state.AllWeather != undefined) {
	
			// display all weather data
			return (
				<div class={ style.container }>				
					<div class={ style.header }>
						<nav>
							<table class = {style.leftGrid}>
								<tr>
									<td class={style.setting} ><a href="#"><img src="../../assets/icons/settings.png" class={style.settings}></img></a></td>
									
									<td class={style.location}><a id={style.location} href="#" >{ this.state.locate }</a></td>

									<td><img src="../../assets/icons/location-icon.png" class={style.settings}></img></td>
								</tr>
							</table>
						</nav>
					</div>
						<div class={style.title}>Today</div>
					<div>
						<img src={iconLink} class={style.weatherIcons}></img>
							
					</div>
						<span class={ tempStyles }>{ Math.round(this.state.temp) }</span>
						<div class={ style.conditions }>{ this.state.cond }</div>
						<div class={ style.details }></div>
					<div class={style.forecastorder}>
							{ this.createGrid() }
					</div>
						<div><button class={ style.wind} onClick={this.showWind} ><img class={ style.windbutton} src="../../assets/icons/wind.png"/></button></div>
						<div><button class={ style.calender} onClick={this.showCalendar} ><img class={ style.calenderbutton} src="../../assets/icons/calendar.png"/></button></div>
						<div><button class={ style.map} onClick={this.showMap} ><img class={ style.mapbutton} src="../../assets/icons/map.png"/></button></div>
				</div>
			);
		}

		}
		else if(this.state.calendar == true) {
			return(
			<div>
				<Calendar/>
			</div>);
		}else if(this.state.wind == true){
			return(
				<div>
					<Wind/>
				</div>);
		}else if(this.state.map == true){
			return(
				<div>
					<Map/>
				</div>);
		}
	};
	
	showCalendar = () => {
		this.setState({calendar: true})
		this.setState({Home: false})
	}

	showMap = () => {
		this.setState({map: true})
		this.setState({Home: false})
	}

	showWind = () => {
		this.setState({wind: true})
		this.setState({Home: false})
	}

	createGrid = () => {
		var listIcon = " "
		let grid = []
		for (let i = 0; i < 5; i++) {
			const currentState = this.state.AllWeather[`${i}`]
			const currentCond = (currentState['weather']['0']['main'])
			const time = (currentState['dt_txt'].split(" ")[1]).split(":")
			const correctTime = `${time[0]}:${time[1]}`

			if (currentCond == "Clouds"){
				listIcon = "../../assets/icons/clouds.png"
			}else if(currentCond == "Rain"){
				listIcon = "../../assets/icons/rainy.png"
			}else if(currentCond == "Clear"){
				listIcon = "../../assets/icons/sun.png"
			}

			grid.push(
				<div class={ style.forecastList }>
					<table>
						<tr> 
							<th>{ correctTime }</th>
						</tr>
						<tr>
							<td>
								<img src={ listIcon } class={ style.forecastIcons }></img>
							</td>
						</tr>
						<tr>
							<td>{ Math.round(currentState['main']['temp']) }</td>
						</tr>
					</table>
				</div>
			);
		}
		return grid;
	}

	parseCurrentResponse = (parsed_json) => {
			var location = parsed_json['name'];
			var temp_c = parsed_json['main']['temp'];
			var conditions = parsed_json['weather']['0']['description'];
			var mainWeather = parsed_json['weather']['0']['main']
			// set states for fields so they could be rendered later on
			this.setState({
				locate: location,
				temp: temp_c,
				cond : conditions,
				main: mainWeather
			}
		
			);      
	}

	parseForcastResponse = (parsed_json) => {
		var AllWeather = parsed_json['list'];

		this.setState({
			AllWeather: AllWeather
		});      
	}

}