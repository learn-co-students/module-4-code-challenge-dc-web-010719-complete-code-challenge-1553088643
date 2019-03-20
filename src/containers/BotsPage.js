import React from "react";
import BotCollection from "./BotCollection"
import YourBotArmy from "./YourBotArmy"

class BotsPage extends React.Component {
  constructor(){
    super()
    this.state = {
      allBots: [],
      myBots: []
    }
  }


componentDidMount(){
  fetch("https://bot-battler-api.herokuapp.com/api/v1/bots")
  .then(res=> res.json())
  .then(bots=> this.setState({
    allBots: bots
  }))
}

handleAddBot = (botObj) => {
  this.setState({
          myBots: [...this.state.myBots, botObj]
        })
      }

handleRemoveBot = (botObj) => {
  this.setState({
      myBots: this.state.myBots.filter(bot => bot.name !== botObj.name)
    })
}

getUnAsBots=()=>{
    return this.state.allBots.filter(bot => !this.state.myBots.includes(bot))
  }

  render() {
    return (
      <div>
        <YourBotArmy bots={this.state.myBots} handleBotClick={this.handleRemoveBot}/>
        <BotCollection bots={this.getUnAsBots()} handleBotClick={this.handleAddBot}/>
      </div>
    );
  }

}

export default BotsPage;
