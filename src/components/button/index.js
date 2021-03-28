// import preact
import { h, render, Component } from 'preact';
	
export default class Button extends Component {

	// rendering a function when the button is clicked
	render() {
		let cFunction = this.props.clickFunction;
		//check if passed was not a function
		if(typeof cFunction !== 'function'){
			cFunction = () => {
				console.log("passed something as 'clickFunction' that wasn't a function !");
			}
		}
		return (
			//when the button is clicked, cFunction is executed
			<div>
				<button onClick={cFunction}>
					Display Weather
				</button>
			</div>
		);
	}
}
