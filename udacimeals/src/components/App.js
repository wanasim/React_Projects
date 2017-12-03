import React, { Component } from 'react'
import { addRecipe } from '../actions'

class App extends Component {
  state = {
    calendar: null
  }

  componentDidMount () {
    const { store } = this.props
    store.subscribe(() => {
      this.setState(() => ({
        calendar: store.getState()
      }))
    })
  }

  submitFood = () => {
     console.log(this.input)
    this.props.store.dispatch(addRecipe({
      day: 'monday',
      meal: 'breakfast',
      recipe: {
        label: this.input.value
     }
  }))
    this.input.value = ''
  }

  // **notice the 'ref' attribute. this is a special attribute in React that can be added to any component
  // **In particular, it takes a callback function that executes immediately after the component is mounted/unmounted.
  // ** The ref callback receives the underlying DOM element as its argument. 

  render() {
    return (
      <div>
        <input
          type='text'
          ref={(input) => this.input = input}
          placeholder="Monday's Breakfast"
        />
        <button onClick={this.submitFood}>Submit</button>

        <pre>
          Mondays Breakfast: {this.state.calendar && this.state.calendar.monday.breakfast}
        </pre>
      </div>
    )
  }
}
export default App
