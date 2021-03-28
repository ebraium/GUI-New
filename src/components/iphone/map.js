// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
import Iphone from './index';
import Wind from './wind';
import Calendar from './calendar';

export default class MapComp extends Component {
//var Iphone = React.createClass({
	// a constructor with initial set states
	constructor(props){
		super(props);
    this.fetchStateData();
		// page display input
		this.setState({ display: true });
    this.setState({ Home: false })
		this.setState({ Map: true })
		this.setState({ Wind: false })
		this.setState({ Calendar: false })
    this.setState({ allTemp: [] });  

	}
	fetchStateData = () => {
    //loops through the urls recieving the data for each locatrion we did, london, reading, etc..
		var urls = ["http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&APPID=b066944d877d9980a5e7667a70704f06",
    "http://api.openweathermap.org/data/2.5/weather?q=Reading&units=metric&APPID=b066944d877d9980a5e7667a70704f06",
    "http://api.openweathermap.org/data/2.5/weather?q=Ashford&units=metric&APPID=b066944d877d9980a5e7667a70704f06",
    "http://api.openweathermap.org/data/2.5/weather?q=Brighton&units=metric&APPID=b066944d877d9980a5e7667a70704f06",
    "http://api.openweathermap.org/data/2.5/weather?q=Luton&units=metric&APPID=b066944d877d9980a5e7667a70704f06"];

    for (let i =0; i < urls.length; i++) {
      $.ajax({
        url: urls[i],
        dataType: "jsonp",
        success : this.parseResponseState,
        error : function(req, err){ console.log('API call failed ' + err); }
      })
    }
	}
	render() {
    if( this.state.Map==true){
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
          <div>
            { this.createLabel() }
          </div>
          {/* displays the map taken from weatherapi page */}
          <div class={ style.mapSize}>
            <img src="//cartodb-basemaps-d.global.ssl.fastly.net/light_all/8/127/84.png"></img>
            <img src="//cartodb-basemaps-a.global.ssl.fastly.net/light_all/8/128/84.png"></img>
            <img src="//cartodb-basemaps-a.global.ssl.fastly.net/light_all/8/127/85.png"></img>
            <img src="//cartodb-basemaps-a.global.ssl.fastly.net/light_all/8/128/85.png"></img>
          </div>
          <div><button class={ style.wind} onClick={this.showHome} ><img class={ style.windbutton} src="../../assets/icons/home.png"/></button></div>
          <div><button class={ style.calender} onClick={this.showCalendar} ><img class={ style.calenderbutton} src="../../assets/icons/calendar.png"/></button></div>
          <div><button class={ style.wind} onClick={this.showWind} ><img class={ style.windbutton} src="../../assets/icons/wind.png"/></button></div>

        </div>
      )
    }
    else if (this.state.Wind == true){
      return(
        <div>
          <Wind/>
        </div>
      )
    } else if (this.state.Calendar == true){
      return(
        <div>
          <Calendar/>
        </div>
      )
    }else{
      return(
        <div>
          <Iphone/>
        </div>
      )
    }
	};
  //loops through every location and creates a label for each one with correct classes and ids
  createLabel = () => {
    let location = ["London", "Reading", "Ashford", "Brighton", "Luton"];
    let labels = []
    for (let i = 0; i < location.length; i++) {
      labels.push(<div class={ style.labelTag } id={ style[`${location[i]}`] }><div>{ Math.round(this.state.allTemp[i]) }</div><div>{ location[i] }</div></div>)
    }
    return labels
  }
  //change the current display buttons
  showHome = () => {
    this.setState({Home: true})
    this.setState({map:false})
	}
  showWind = () => {
    this.setState({wind: true})
    this.setState({map:false})
	}
  showCalendar = () => {
    this.setState({calender: true})
    this.setState({map:false})
  }
  parseResponseState = (parsed_json) => {
    //once we recieve the data we pash the temperature to an array
		var temperature = parsed_json['main']['temp'];

    this.setState({
      temp: temperature
    });
    this.state.allTemp.push(temperature);
	}
}
