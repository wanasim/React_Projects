import React, {Component} from 'React'
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, ScrollView } from 'react-native';
import {connect} from 'react-redux'
import {allDecks} from '../actions'
import {loadDecks} from '../utils/api.js'


class Decks extends Component {
  componentDidMount(){
    //get all Decks from storage and pass to action
    const {getDecks} = this.props
    loadDecks().then((decks)=> getDecks(decks))
  }

  render(){
    const {all_decks} = this.props

    return (

      <ScrollView>
          {Object.keys(all_decks).map((deck)=>([

            <TouchableOpacity key={deck} onPress={()=>this.props.navigation.navigate('DeckInfo', {id: deck})}>
              <Text> {deck} </Text>,
              <Text> {all_decks[deck].questions.length} cards</Text>
            </TouchableOpacity>

          ]))}

      </ScrollView>
    )
  }
}

function mapStateToProps({all_decks}){
  return {
    all_decks
  }

}

function mapDispatchToProps(dispatch){
  return {
    getDecks: (decks) => dispatch(allDecks(decks)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Decks)
