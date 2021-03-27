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
        this.setState({stylingVar:null})



	}


	fetchWindData = () => {
        console.log("Im fetching wind data")
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
                <div class={style.title}>Wind Direction</div>
            </div>
            <div><img class={ this.state.stylingVar} src="../../assets/icons/arrowIcon.png"/></div>
            <div class={ style.conditions }>{ this.state.windDegree, this.toTextualDescription() }</div>
            <br></br>
            <span class={ style.tempStyles }>{ Math.round(this.state.windSpeed)+ "mph" }</span>
            <div><button class={ style.wind} onClick={this.showHome} ><img class={ style.windbutton} src="../../assets/icons/home.png"/></button></div>
			<div><button class={ style.calender} onClick={this.showCalendar} ><img class={ style.homebutton} src="../../assets/icons/wind.png"/></button></div>
			<div><button class={ style.map} onClick={this.showMap} ><img class={ style.mapbutton} src="../../assets/icons/map.png"/></button></div>
              	
            </div>
		);
            }else if(this.state.calender){
                return(<div><Calendar/></div>);
            }
            else if(this.state.map){
                return(<div><Map/></div>);
            }
            else{
                return(<div><Iphone/></div>);
            }
	
        }

        //let theWindDeg =this.state.windDegree

        toTextualDescription = () => {
            //let stylingVar
            /*
            if (this.state.windDegree>337.5){
                this.setState(stylingVar = style.arrowN)
                
                return 'Northerly';
            } 
            if (this.state.windDegree>292.5){ 
                this.setState(stylingVar = style.arrowNW)  
                return 'North Westerly';
            }
            if(this.state.windDegree>247.5){
                this.setState({stylingVar: style.arrowW})  
                console.log(this.state.stylingVar)
                return 'Westerly';
            } 
            if(this.state.windDegree>202.5){
                this.setState(stylingVar = style.arrowSW)
                return 'South Westerly';
            }
            if(this.state.windDegree>157.5){ 
                this.setState(stylingVar = style.arrowS)
                return 'Southerly';
            }
            if(this.state.windDegree>122.5){ 
                this.setState(stylingVar = style.arrowSE)
                return 'South Easterly';
            }
            if(this.state.windDegree>67.5){
                this.setState(stylingVar = style.arrowE)
                return 'Easterly';
            } 
            if(this.state.windDegree>22.5){
                this.setState(stylingVar = style.arrowNE)
                return 'North Easterly';
            }*/
            return 'Northerly';
            
        }
        
        
        
          
        showHome = () => {
            this.setState({Home: true})
    
        }
        showMap = () => {
            this.setState({map: true})
            this.setState({Home: false})
        }
        showCalendar = () => {
            this.setState({calendar: true})
            this.setState({Home: false})
        }



        parseWindResponse = (parsed_json) => {
            var windSpeed = parsed_json['list']['0']['wind']['speed'];
            var windDegree = parsed_json['list']['0']['wind']['deg'];
            console.log(windSpeed)
            console.log(windDegree)
            this.setState({
                windSpeed: windSpeed,
                windDegree: windDegree,
                fetchedWeather: true,
                fetchedCalendar: true
            });  
        }



        
}