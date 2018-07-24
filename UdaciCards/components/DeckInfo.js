import React, {Component} from 'react'
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import {getDeck} from '../utils/api'
import {newCard} from '../actions'
import {connect} from 'react-redux'

class DeckInfo extends Component {
  static navigationOptions = {
    title: 'Deck Details'
  }

  state={
    current_deck: {},
    questionsIsEmpty: this.props.all_decks[this.props.navigation.state.params.id].questions.length ? false : true
  }

  componentDidMount(){
    const {id} = this.props.navigation.state.params
    this.setState({current_deck:this.props.all_decks[id]})
  }



  render(){
    const {current_deck, questionsIsEmpty} = this.state
    const {deck, addCard} = this.props
    const {navigate} = this.props.navigation
    const {id} = this.props.navigation.state.params

    return (
      <View>
        <Text>{current_deck.title}</Text>
        {console.log("TADSFDF", current_deck.questions)}
        <Button title="Add Card" onPress={()=>navigate('addCard', {id, addCard} )}></Button>
        {!questionsIsEmpty && (
          <Button title="Start Quiz" onPress={()=>navigate('Quiz', {id, current_deck} )}></Button>

        )}
      </View>
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
    addCard: (id, card) => dispatch(newCard(id, card))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckInfo)
