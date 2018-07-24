import React, {Component} from 'react'
import { StyleSheet, Text, View, Button, TextInput, ScrollView ,Dimensions, Modal } from 'react-native'


export default class Quiz extends Component {
  static navigationOptions = {
    title: "Take Quiz"
  }
  state = {
    showQuestion: true,
    currentIndex: 0,
    correct: 0,
    modalVisible: false
  }

  flipCard(){
    this.setState((prevState)=> ({showQuestion:!prevState.showQuestion}))
  }
  _correct(){
    const {current_deck} = this.props.navigation.state.params
    if(this.state.currentIndex +1 === current_deck.questions.length){
      return this.finishedQuiz()
    }
    this.setState((prevState)=>({
      currentIndex:prevState.currentIndex+1,
      correct:prevState.correct+1
    }))
  }

  nextCard(){
    const {current_deck} = this.props.navigation.state.params
    if(this.state.currentIndex +1 === current_deck.questions.length){
      return this.finishedQuiz()
    }
    this.setState((prevState)=>({
      currentIndex:prevState.currentIndex+1
    }))
  }

  finishedQuiz(){
    console.log("OCCUREC")
    this.setState({modalVisible:true})
  }

  _reset(){
    this.setState({
      showQuestion: true,
      currentIndex: 0,
      correct: 0,
      modalVisible: false
    })
  }

  returnHome(){
    this.setState({modalVisible:false}, ()=>{
      this._reset()
      this.props.navigation.navigate('Decks')
    })
  }



  render(){
    const {currentIndex, modalVisible, correct} = this.state
    const {current_deck} = this.props.navigation.state.params
    const card = current_deck.questions[currentIndex]
    return (
      <View style={styles.container}>
        <Text>{currentIndex + 1} / {current_deck.questions.length}</Text>

        {modalVisible && (
          <Modal>
            <View style={styles.modal}>
              <Text>Congratulations! You finished the quiz with a score of: {Math.floor((correct/current_deck.questions.length)*100)}%</Text>
              <Button title="Start Over"  onPress={this._reset.bind(this)}></Button>
              <Button title="Home"  onPress={this.returnHome.bind(this) }></Button>
            </View>
          </Modal>
        )}

        <View >
            <View style={styles.card}>
              <Text >{this.state.showQuestion ? card.question : card.answer}</Text>
              <Button title={this.state.showQuestion ? 'Answer' : 'Question'} onPress={this.flipCard.bind(this)}></Button>
            </View>

            <Button onPress={this._correct.bind(this)} title="Correct"></Button>
            <Button onPress={this.nextCard.bind(this)} title="Incorrect"></Button>
        </View>

      </View>
    )
  }
}


const styles = StyleSheet.create({
  container:{

  },
  card: {

    height: Dimensions.get('window').height/3,
    width: Dimensions.get('window').width,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  modal: {
    // backgroundColor: 'blue',
    height: Dimensions.get('window').height,
    justifyContent: 'center'
  }
})
