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
        this.setState({Home: false})
        this.handleDropdownChange = this.handleDropdownChange.bind(this);

	}


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
	
        if(this.state.Home==false){
		
		// display all weather data
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
                <div class={ style.details }>
                    
                    </div> 

                    <div><button class={ style.wind} onClick={this.showWind} ><img class={ style.windbutton}  src="../../assets/icons/wind.png"/></button></div>
					<div><button class={ style.calender} onClick={this.showHome} ><img class={ style.homebutton} src="../../assets/icons/home.png"/></button></div>
					<div><button class={ style.map} onClick={this.showMap} ><img class={ style.mapbutton} src="../../assets/icons/map.png"/></button></div>
              	
            </div>
		);
            }
            else if(this.state.wind == true){
                console.log("hhdhdhdhdhhd#2")
                return(
                    <div>
                        <Wind/>
                    </div>);
            }else if(this.state.map == true){
                console.log("hhdhdhdhdhhd#2")
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
                            <tr>
                            <td>
                                <img src={ listIcon } class={ style.forecastIcons }></img>
                            </td>
                            </tr>
                            <tr>
                            <td>{ Math.round(stateNow['main']['temp']) }</td>
                            </tr>
                        </table>
                </div>
                
                
                )

		}
		return (
            calendarGrid
        );
	}
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

        for (let apiIndex = 0; apiIndex<this.state.AllWeatherData.length; apiIndex++){
            if (days.includes(this.state.AllWeatherData[apiIndex]['dt_txt'].split(" ")[0])){
                console.log("They match at linst index: "+apiIndex) 
                chosenDate = apiIndex
                break
            }else{
                console.log("There is no common item.")
                
            }
            
        }

        //console.log(chosenDate)
            return(
                <div>
                      Select Date: <select class={style.mySelect} onChange={this.handleDropdownChange} >{dropdownList}</select>
                    <h3>{weekDay[this.state.selectValue]}
                    <br/>
                    <img src={ this.displayImage(weather[this.state.selectValue]) } class={ style.calenderIcons }></img>
                    <br/>
                    <div class={style.calendarfont} >{degree[this.state.selectValue]}°</div>
                    {weather[this.state.selectValue]}
                    </h3>
                    </div>
            )
    }
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
            console.log(forecastDay);
            weekDay.push(forecastDay);
            
        }
        return (this.dropdownDay(weekDay,days,weather,degree));
        
    }
    showHome = () => {
		this.setState({Home: true})
        this.setState({calender:false})


	}
    showWind = () => {
		this.setState({wind: true})
        this.setState({calender:false})
		console.log("Apple Raspberry")
	}

	parseCalendarResponse = (parsed_json) => {
		var AllWeatherData = parsed_json['list'];
        var locate = parsed_json['city']['name'];
        console.log(locate)
		this.setState({
            location: locate,
			AllWeatherData: AllWeatherData,
            fetchedWeather: true,
            fetchedCalendar: true
		});  
	}

}