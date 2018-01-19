import React, { Component } from 'react';
import './input.css';

class Input extends Component{
	constructor(props){
		super(props)
		this.state = {
			inputContent: "",
		};

		this.handleInput = this.handleInput.bind(this);
		this.writeInput = this.writeInput.bind(this);

	}

	handleInput(event){
		this.setState({
			inputContent: event.target.value,
		})
	}

	writeInput(){
		this.props.addLink(this.state.inputContent);

		this.setState({
			inputContent: '',
		})
	}

	render(props){
		return(
			<div className="input-section">
				<input 
					className="inputBox"
					placeholder="Add A URL" 
					value={this.state.inputContent}
					onChange={this.handleInput}/>
				<button
					onClick={this.writeInput}>
					Add URL
				</button>
			</div>
		)
	}
}

export default Input