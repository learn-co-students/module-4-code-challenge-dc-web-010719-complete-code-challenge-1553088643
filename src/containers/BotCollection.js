import React from "react";
import BotCard from "../components/BotCard";

class BotCollection extends React.Component {
  constructor(){
    super()
    this.state = {

    }
  }

  render(){
  	return (
  	  <div className="ui four column grid">
    		<div className="row">
    		  {this.props.bots.map(botObj=> <BotCard key={botObj.id} bot={botObj} handleBotClick={this.props.handleBotClick}/>)}
    		  Collection of all bots
    		</div>
  	  </div>
  	);
  }

};

export default BotCollection;
