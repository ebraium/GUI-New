// import preact
// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
import Iphone from './index';
import Calendar from './calendar';

export default class Wind extends Component {
//var Iphone = React.createClass({
	// a constructor with initial set states
	constructor(props){
		super(props);
        this.fetchWindData()
        this.state = {
            selectValue: 0
          };
		// temperature state
		this.state.temp = "";
		// button display state
		this.setState({ display: true });
        this.setState({fetchedWeather: false});
        this.setState({fetchedCalendar: false});
        this.setState({Home: false})
        this.setState({calendar: false})
        this.setState({map: false})
        this.setState({stylingVar:null});
        this.setState({wind: true});
	}
    //gets wind data from an online source
	fetchWindData = () => {
		var url = "http://api.openweathermap.org/data/2.5/forecast?q=London&units=metric&APPID=bbe1b2a0cfe9d01b8ff8ceae42cc6ca1";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseWindResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
	}
	// the main render method for the iphone component
	render() {
        if(this.state.wind==true){	
		//this will display the weather data on the wind direction page in the given layout
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
                <div class={style.title}>Wind Direction</div>
            </div>
            <div class={ style.windName }> {this.toTextualDescription()} {this.windDirection()}</div>
            <span class={ style.tempStyles }>Wind Speed: </span>
            <div class={ style.tempStyles }>{ Math.round(this.state.windSpeed)+ "mph" }</div>
            <div><button class={ style.wind} onClick={this.showHome} ><img class={ style.windbutton} src="../../assets/icons/home.png"/></button></div>
			<div><button class={ style.calender} onClick={this.showCalendar} ><img class={ style.homebutton} src="../../assets/icons/calendar.png"/></button></div>
			<div><button class={ style.map} onClick={this.showMap} ><img class={ style.mapbutton} src="../../assets/icons/map.png"/></button></div>      	
            </div>
		);
            }else if(this.state.calendar){
                return(<div><Calendar/></div>);
            }
            else if(this.state.map){
                return(<div><Map/></div>);
            }
            else{
                return(<div><Iphone/></div>);
            }
        }

        //this will display a text describing the wind image according to the wind degrees
        toTextualDescription = () => {
             
            if (this.state.windDegree>337.5){
                return 'North';
            } 
            if (this.state.windDegree>292.5){ 
                return 'North West';
            }
            if(this.state.windDegree>247.5){
                return 'West';
            } 
            if(this.state.windDegree>202.5){
                return 'South West';
            }
            if(this.state.windDegree>157.5){ 
                return 'South';
            }
            if(this.state.windDegree>122.5){ 
                return 'South East';
            }
            if(this.state.windDegree>67.5){
                return 'East';
            } 
            if(this.state.windDegree>22.5){
                return 'North East';
            }
            return 'North';
            
        }
        //this will display an arrow image according to the degrees of the wind
        windDirection = () => {
            if (this.state.windDegree>337.5){
                return (<div><img class={ style.arrowN} src="../../assets/icons/arrowIcon.png"/></div>);
            } 
            if (this.state.windDegree>292.5){ 
                return (<div><img class={ style.arrowNW} src="../../assets/icons/arrowIcon.png"/></div>);
            }
            if(this.state.windDegree>247.5){
                return (<div><img class={ style.arrowW} src="../../assets/icons/arrowIcon.png"/></div>);
            } 
            if(this.state.windDegree>202.5){
                return (<div><img class={ style.arrowSW} src="../../assets/icons/arrowIcon.png"/></div>);
            }
            if(this.state.windDegree>157.5){ 
                return (<div><img class={ style.arrowS} src="../../assets/icons/arrowIcon.png"/></div>);
            }
            if(this.state.windDegree>122.5){ 
                return (<div><img class={ style.arrowSE} src="../../assets/icons/arrowIcon.png"/></div>);
            }
            if(this.state.windDegree>67.5){
                return (<div><img class={ style.arrowE} src="../../assets/icons/arrowIcon.png"/></div>);
            } 
            if(this.state.windDegree>22.5){
                return (<div><img class={ style.arrowNE} src="../../assets/icons/arrowIcon.png"/></div>);
            }
            return (<div><img class={ style.arrowN} src="../../assets/icons/arrowIcon.png"/></div>);

        }
        //this will set states for different pages, eg. showHome will hide the wind
        //page whilst keeping the home active, and similar for the rest
        showHome = () => {
            this.setState({Home: true});
            this.setState({wind: false});
        }
        showMap = () => {
            this.setState({map: true});
            this.setState({Home: false});
            this.setState({wind: false});
        }
        showCalendar = () => {
            this.setState({calendar: true});
            this.setState({Home: false});
            this.setState({wind: false});
        }

        parseWindResponse = (parsed_json) => {
            var windSpeed = parsed_json['list']['0']['wind']['speed'];
            var windDegree = parsed_json['list']['0']['wind']['deg'];
            var locate = parsed_json['city']['name'];
            this.setState({
                location: locate,
                windSpeed: windSpeed,
                windDegree: windDegree,
                fetchedWeather: true,
                fetchedCalendar: true
            });  
        }       
}