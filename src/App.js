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
    this.db = this.app.database().ref().child('links');

    this.addLink = this.addLink.bind(this)
    this.removeLink = this.removeLink.bind(this)

  }

  componentWillMount(){
    const prevLinks = this.state.links;

    this.db.on('child_added', snap => {
      prevLinks.push({
        id: snap.key,
        linkContent: snap.val().linkContent,
      })

      this.setState({
        links: prevLinks
      })
    })

    this.db.on('child_removed', snap => {
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
  }

  addLink(link){
    this.db.push().set({ linkContent: link })
  }

  removeLink(linkId){
    this.db.child(linkId).remove();
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
              return (
                <Link removeLink={this.removeLink} linkContent={link.linkContent} linkId={link.id} key={link.id}/>
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
