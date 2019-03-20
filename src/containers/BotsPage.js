import React from "react";
import BotCollection from "./BotCollection"
import YourBotArmy from "./YourBotArmy"
import BotSpecs from "../components/BotSpecs"

class BotsPage extends React.Component {
  constructor(){
    super()
    this.state = {
      allBots: [],
      myBots: [],
      selectedBot: null
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
          myBots: [...this.state.myBots, botObj],
          selectedBot: null
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

  handleBotSelect = (botObj) =>{
    this.setState({
      selectedBot: botObj
    })
  }

  goBack = () =>{
    this.setState({
      selectedBot: null
    })
  }

  render() {
    return (
      <div>
        <YourBotArmy bots={this.state.myBots} handleBotClick={this.handleRemoveBot}/>
        {this.state.selectedBot=== null ? <BotCollection bots={this.getUnAsBots()} handleBotClick={this.handleBotSelect} /> :
      <BotSpecs bot={this.state.selectedBot} goBack={this.goBack} handleBotClick={this.handleAddBot}/>}
      </div>
    );
  }

}

export default BotsPage;
