// import preact
// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
import Iphone from './index';
import Wind from './wind'

export default class Calendar extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
        this.fetchForcastData()
        this.state = {
            selectValue: 0
          };
		// temperature state
		this.state.temp = "";
		// button display state
		this.setState({ display: true });
        this.setState({AllWeatherData: ["Null"]});
        this.setState({fetchedWeather: false});
        this.setState({fetchedCalendar: false});
        this.setState({Home: false});
        this.setState({calendar: true});
        this.handleDropdownChange = this.handleDropdownChange.bind(this);

	}
    // gets forecast data available online
	fetchForcastData = () => {
		var url = "http://api.openweathermap.org/data/2.5/forecast?q=London&units=metric&APPID=bbe1b2a0cfe9d01b8ff8ceae42cc6ca1";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseCalendarResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
	}
	// the main render method for the iphone component
	render() {
        if(this.state.calendar==true){
		//this will display the calendar page in this layout. We have mostly used a table and buttons.
		return (
			<div class={ style.container }>		
            <div class={ style.header }>
				<nav>
                    <table class = {style.leftGrid}>
						<tr>		
							<td class={style.setting} ><a href="#"><img src="../../assets/icons/settings.png" class={style.settings}></img></a></td>									
							<td class={style.location}><a id={style.location} href="#" >{ this.state.location }</a></td>
							<td><img src="../../assets/icons/location-icon.png" class={style.settings}></img></td>
						</tr>
					</table>
                </nav>
                    <div class={style.title}>Calender</div>
                    <div>{this.state.fetchedWeather?  this.weekdays(): null }</div>
            </div>
                <div class={ style.conditions }>{ this.state.cond }</div>
                <br></br>
                <span class={ style.tempStyles }>{ this.state.temp }</span>
                <div class={ style.details }></div> 
                <div><button class={ style.wind} onClick={this.showHome} ><img class={ style.windbutton}  src="../../assets/icons/home.png"/></button></div>
				<div><button class={ style.calender} onClick={this.showWind} ><img class={ style.homebutton} src="../../assets/icons/wind.png"/></button></div>
				<div><button class={ style.map} onClick={this.showMap} ><img class={ style.mapbutton} src="../../assets/icons/map.png"/></button></div>
            </div>
		);
            }
        //if the wind button is clicked, it will show the wind page
        else if(this.state.wind == true){
            return(
                <div>
                    <Wind/>
                </div>);
        }else if(this.state.map == true){ //if the map button is clicked, it will show the map page
            return(
                <div>
                    <Map/>
                </div>);
        }else{
            return(
                <div>
                    <Iphone/>
                </div>
            )
        }
	};

	calendarGrid = () => {
        //console.log("This is the value of l: "+l)
        var listIcon = " "
		let calendarGrid = []
        let weekDay = []
		for (let j = 0; j < 5; j++) {
			var stateNow = this.state.AllWeatherData[`${j}`]
			var condNow = (stateNow['weather']['0']['main'])
			var timeNow = (stateNow['dt_txt'].split(" ")[1]).split(":")
			var correctTimeNow = `${timeNow[0]}:${timeNow[1]}`
            var forecastDay = (stateNow['dt_txt'].split(" ")[0])//Make an input and set the date entered to this variable
            //console.log(forecastDay)
            weekDay.push(forecastDay);
			if (condNow == "Clouds"){
				listIcon = "../../assets/icons/clouds.png"
			}else if(condNow == "Rain"){
				listIcon = "../../assets/icons/rainy.png"
			}else if(condNow == "Clear"){
				listIcon = "../../assets/icons/sun.png"
			}          
			calendarGrid.push(
                <div class={ style.forecastList }>
                    <table> 
                        <tr><th>{ correctTimeNow }</th></tr>
                        <tr><td><img src={ listIcon } class={ style.forecastIcons }></img></td></tr>
                        <tr><td>{ Math.round(stateNow['main']['temp']) }</td></tr>
                    </table>
                </div> 
                )
		}
		return (
            calendarGrid
        );
	}
    //this will set the state to the selected date
    handleDropdownChange(e) {
        this.setState({ selectValue: e.target.value });
      }
    dropdownDay = (weekDay,days,weather,degree) => {
        let x
        let chosenDate
        let l
        let dropdownList = []
        for(l=0; l<weekDay.length; l++){
            dropdownList.push( 
                <option class={style.dropdown} value={l}>{weekDay[l]}</option>
            )
        }
            return(
                <div>
                      Select Date: <select class={style.mySelect} onChange={this.handleDropdownChange} >{dropdownList}</select>
                    <h3>{weekDay[this.state.selectValue]}
                        <br/>
                        <img src={ this.displayImage(weather[this.state.selectValue]) } class={ style.calenderIcons }></img>
                        <br/>
                        <div class={style.calendarfont} >{degree[this.state.selectValue]}°ᶜ</div>
                    {weather[this.state.selectValue]}
                    </h3>
                </div>
            )
    }
    //will display an image based on the string given
    displayImage = (condNow) => {
        let listIcon = ""
        if (condNow == "Clouds"){
            listIcon = "../../assets/icons/clouds.png"
        }else if(condNow == "Rain"){
            listIcon = "../../assets/icons/rainy.png"
        }else if(condNow == "Clear"){
            listIcon = "../../assets/icons/sun.png"
        }
        return listIcon;
    }
    //as the api provides data for every 3 hours but we need data for every day,
    //the loop selects data for every 8 datas in the api to make it 24 hours.
    //it stops at 32 as we only need 5 days
    weekdays = () => {
        let weekDay = []
        let days = []
        let weather = []
        let degree = []
        var j;
        for ( j = 0; j < 33; j+=8) {
            var stateNow = this.state.AllWeatherData[j]
            var condNow = (stateNow['weather']['0']['main'])
            degree.push(Math.round(stateNow['main']['temp'])) 
            weather.push(condNow);
            var forecastDay = stateNow['dt_txt'].split(" ")[0]//Make an input and set the date entered to this variable
            days.push(forecastDay)
            weekDay.push(forecastDay);    
        }
        return (this.dropdownDay(weekDay,days,weather,degree));      
    }
    //sets states to true/false accordingly, eg. showHome will only show the home page
    //and hide the rest, showWind will show the wind page and hide the rest, and
    //same with the calendar. 
    showHome = () => {
		this.setState({Home: true});
        this.setState({calendar:false});
        this.setState({wind: false});
	}
    showWind = () => {
		this.setState({wind: true});
        this.setState({calendar:false});
        this.setState({Home: false});
	}
	parseCalendarResponse = (parsed_json) => {
		var AllWeatherData = parsed_json['list'];
        var locate = parsed_json['city']['name'];
		this.setState({
            location: locate,
			AllWeatherData: AllWeatherData,
            fetchedWeather: true,
            fetchedCalendar: true
		});  
	}
}