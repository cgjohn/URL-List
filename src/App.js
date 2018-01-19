import React, { Component } from 'react';
import Link from './Links/Link';
import Input from './Input/Input'
import { DB_CONFIG } from './config/config';
import firebase from 'firebase/app';
import 'firebase/database';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      links: [],
    }

    this.app = firebase.initializeApp(DB_CONFIG);
    this.listRef = this.app.database().ref().child('links');

    this.addLink = this.addLink.bind(this)
    this.removeLink = this.removeLink.bind(this)
    this.updateVotes = this.updateVotes.bind(this)

  }

  componentDidMount(){
    const prevLinks = this.state.links;

    this.listRef.on('child_added', snap => {
      prevLinks.push({
        id: snap.key,
        linkContent: snap.val().linkContent,
        linkUpvotes: snap.val().upvotes
      })

      this.setState({
        links: prevLinks
      })
      this.forceUpdate()
    })

    this.listRef.on('child_removed', snap => {
      //loop through array to find matching erased id
      for(var i=0; i < prevLinks.length; i ++){
        if(prevLinks[i].id === snap.key) {
          prevLinks.splice(i, 1);
        }
      }

      this.setState({
        links: prevLinks
      })

    })

    this.listRef.on('child_changed', snap => {
      //loop through array to find matching erased id
      for(var i=0; i < prevLinks.length; i ++){
        // console.log('snap key = '+ snap.key + "// length = " + prevLinks.length)

        if(prevLinks[i].id === snap.key) {
          prevLinks[i].linkUpvotes += 1;
        }
      }

      this.setState({
        links: prevLinks
      })
    })
  }

  addLink(link){
    this.listRef.push().set({ linkContent: link, upvotes: 0 })
  }

  removeLink(linkId){
    this.listRef.child(linkId).remove();
  }

  updateVotes(linkId){

    const prevLinks = this.state.links;
    for(var i=0; i < prevLinks.length; i ++){
      if(prevLinks[i].id === linkId) {
        prevLinks[i].linkUpvotes;
        var incrementedVote = prevLinks[i].linkUpvotes + 1;
      }
    }

    var update = {}
    update['upvotes'] = incrementedVote;

    this.listRef.child(linkId).update(update);
  } 
  
  render() {
    return (
      <div className="LinksApp">
        <div className="header">
          <h1>
            The Best URL's on the Web
          </h1>
        </div>

        <div className="links-container">
          {

            this.state.links.map((link) => {
              console.log("upvotes being passed in" + link.linkUpvotes);
              return (
                <Link 
                  updateVotes={ this.updateVotes }
                  removeLink={ this.removeLink } 
                  linkContent={ link.linkContent }
                  linkUpvotes={ link.linkUpvotes } 
                  linkId={ link.id } 
                  key={ link.id }/>
              )
            })
          }
        </div>
        <div className="input-container">
          <Input addLink={this.addLink}/>
        </div>
      </div>
    );
  }
}

export default App;
