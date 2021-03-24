import React from "react";
import BotCard from "../components/BotCard";

class YourBotArmy extends React.Component {
constructor(props){
  super(props)
  this.state = {

  }
}

  render(){
    return (
      <div className="ui segment inverted olive bot-army">
        <div className="ui five column grid">
          <div className="row bot-army-row">
            {this.props.bots.map(botObj=> <BotCard key={botObj.id} bot={botObj} handleBotClick={this.props.handleBotClick} />)}
            Your Bot Army
          </div>
        </div>
      </div>
    );
  }

};

export default YourBotArmy;
