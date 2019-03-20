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
  !this.state.myBots.includes(botObj) ?
  this.setState({
          myBots: [...this.state.myBots, botObj],
          selectedBot: null,
          searchTerm: ""
        }) : alert( "Cant Do That")
      }

handleRemoveBot = (botObj) => {
  this.setState({
      myBots: this.state.myBots.filter(bot => bot.name !== botObj.name),
      selectedBot: null,
      searchTerm: ""
    })
}

// getUnAsBots=()=>{
//     return this.state.allBots.filter(bot => !this.state.myBots.includes(bot) && bot.name.includes(this.state.searchTerm))
//   }

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
        <YourBotArmy bots={this.state.myBots} handleBotClick={this.handleBotSelect} bot={this.state.selectedBot}/>
        <SearchBar onSearch={this.onSearch} text={this.state.searchTerm}/> Search For Your Favorite Bot!
        <br />
        <br />
        {this.state.selectedBot=== null ? <BotCollection bots={this.state.allBots} handleBotClick={this.handleBotSelect} /> :
      <BotSpecs myBots= {this.state.myBots} bot={this.state.selectedBot} goBack={this.goBack} handleAddBot={this.handleAddBot} handleRemoveBot={this.handleRemoveBot}/>}
      </div>
    );
  }

}

export default BotsPage;
