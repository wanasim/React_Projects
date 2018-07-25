import React, {Component} from 'react'
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import {addCardToDeck} from '../utils/api'

export default class addCard extends Component {
  static navigationOptions = {
    title: "Add Card"
  }

  state = {
    question: "",
    answer: ""
  }

  submitCard = () => {
    const {id, addCard} = this.props.navigation.state.params

    const {question, answer} = this.state
    const card = {
      question,
      answer
    }
    addCardToDeck(id, card)
    addCard(id, card)
    this.props.navigation.navigate('Decks')

  }


  render(){
    return (
      <View>
        <Text>Add Card</Text>
        <TextInput onChangeText={(question)=>this.setState({question})}></TextInput>
        <TextInput onChangeText={(answer)=>this.setState({answer})} ></TextInput>

        <Button title="Submit Card" onPress={this.submitCard}></Button>
      </View>
    )
  }
}
