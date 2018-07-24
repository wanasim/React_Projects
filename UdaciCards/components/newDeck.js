import React, {Component} from 'React'
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import {connect} from 'react-redux'
import {addDeckTitle} from '../utils/api'
import {addingDeck, newCard} from '../actions'

class newDeck extends Component {

  state = {
    title: '',
    empty: false
  }

  render(){
    submitDeck = () => {
      const {title} = this.state
      const {addingDeck, addCard} = this.props

      if(!title.length){
        this.setState({empty:true})
        return
      } else{

        addDeckTitle(title)
        addingDeck(title)
        const id = title
        this.setState({empty:false,title:''}, ()=> {
          this.props.navigation.navigate('addCard', {id, addCard})
        })
      }

    }
    return (

      <View>
        <Text>What is the title of your new deck?</Text>
        <TextInput placeholder={'Please enter a title'} value={!this.state.title.length ? null : this.state.title} onChangeText={(title) => this.setState({title})}></TextInput>
        <Button onPress={submitDeck} title="submit">Submit</Button>
        {
          this.state.empty ? <Text>Please enter a valid title</Text> : null
        }
      </View>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    addingDeck: (title) => dispatch(addingDeck(title)),
    addCard: (id, card) => dispatch(newCard(id, card))
  }
}

export default connect(null, mapDispatchToProps)(newDeck)
