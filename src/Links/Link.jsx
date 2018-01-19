import React, { Component } from 'react';
import './Link.css';
import PropTypes from 'prop-types';
import thumbsUp from '../thumbsUp.png'

class Link extends Component{
	constructor(props){
		super(props)

		this.linkContent = props.linkContent
		this.linkId = props.linkId
		this.state = {
			upvotes: this.props.linkUpvotes
		}

		this.handleUpvote = this.handleUpvote.bind(this)
		this.handleRemoveLink = this.handleRemoveLink.bind(this)


	}

	handleRemoveLink(linkId){
		this.props.removeLink(linkId);
	}

	handleUpvote(linkId){
		this.props.updateVotes(linkId)
	}


	componentWillReceiveProps(nextProps) {
	    this.setState ({
			upvotes: nextProps.linkUpvotes
		})
	}

	shouldComponentUpdate(nextProps) {
    	return this.state.upvotes !== nextProps.upvotes;
	}

	render(props){
		return(
			<div className="row">
				{console.log("link is rendered and upvote = " + this.state.upvotes)}

				<div className="link-container">
					<p className="link-content">{ this.linkContent }</p>
	            	<div className="upvote-container">
	            		<img 
	            			className="thumbs-up" 
	            			alt="thumbs-up"
	            			src={thumbsUp}
	            			onClick={() => this.handleUpvote(this.linkId)}/>
	            		<p className="number-upvotes">
	            			{ this.state.upvotes }
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