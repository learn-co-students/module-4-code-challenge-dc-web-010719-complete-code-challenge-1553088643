import React from "react";
import BotCollection from "./BotCollection"
import YourBotArmy from "./YourBotArmy"
import BotSpecs from "../components/BotSpecs"
import SearchBar from '../components/SearchBar'

class BotsPage extends React.Component {
  constructor(){
    super()
    this.state = {
      allBots: [],
      myBots: [],
      selectedBot: null,
      searchTerm: ""
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
    return this.state.allBots.filter(bot => !this.state.myBots.includes(bot) && bot.name.includes(this.state.searchTerm))
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

//Building a Search Bar
  onSearch = (event) => {
    this.setState({
      searchTerm: event.target.value
    })
  }

  render() {
    return (
      <div>
        <YourBotArmy bots={this.state.myBots} handleBotClick={this.handleRemoveBot}/>
        <SearchBar onSearch={this.onSearch} text={this.state.searchTerm}/>
        {this.state.selectedBot=== null ? <BotCollection bots={this.getUnAsBots()} handleBotClick={this.handleBotSelect} /> :
      <BotSpecs bot={this.state.selectedBot} goBack={this.goBack} handleBotClick={this.handleAddBot}/>}
      </div>
    );
  }

}

export default BotsPage;
