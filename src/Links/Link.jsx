import React, { Component } from 'react';
import './Link.css';
import PropTypes from 'prop-types';
import thumbsUp from '../thumbsUp.png'

class Link extends Component{
	constructor(props){
		super(props)
		this.linkContent = props.linkContent
		this.linkId = props.linkId
		this.upvotes = 12

		this.handleRemoveLink = this.handleRemoveLink.bind(this)
	}

	handleRemoveLink(linkId){
		this.props.removeLink(linkId);
	}

	render(props){
		return(
			<div className="row">
				<div className="link-container">
					<h1 className="link-content">{ this.linkContent }</h1>
	            	<div className="upvote-container">
	            		<img className="thumbs-up" alt="thumbs-up"src={thumbsUp}/>
	            		<p className="number-upvotes">
	            			{ this.upvotes }
	            		</p>
	            	</div>
				</div>
            	<p className="remove" onClick={() => this.handleRemoveLink(this.linkId)}>x</p>

			</div>
		)
	}
}

Link.propTypes = {
	linkContent: PropTypes.string,
}

export default Link