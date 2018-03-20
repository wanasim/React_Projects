import React, {Component} from 'react'

class Category extends Component {
state = {
   categories: []
}

   getCategories = () => {
      fetch('http://localhost:3001/categories', { headers: { 'Authorization': 'lkns848w9bsd8'}})
      .then((categories) => {
         return categories.json()
      })
      .then(categories => {
         this.setState({categories})
         console.log("Categories:", this.state.categories)
      })
   }

   componentDidMount = () => {
      this.getCategories()
   }
   render(){
      return(

      )
   }
}
