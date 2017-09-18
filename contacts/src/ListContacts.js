import React from 'react'
import PropTypes from 'prop-types'

// stateless functional component example:
// function ListContacts(props){
//    static propTypes = {
//       contacts: PropTypes.array.isRe
//    }
//    return (
//       <ol className = 'contact-list'>
//          {props.contacts.map( contact =>
//             <li key={contact.id} className= 'contact-list-item'>
//                <div className='contact-avatar' style={{backgroundImage:`url(${contact.avatarURL})`}}>
//                </div>
//                <div className='contact-details'>
//                   <p>{contact.name}</p>
//                   <p>{contact.email}</p>
//                </div>
//                <button onClick={() => props.onDeleteContact(contact)} className='contact-remove'>
//                Remove
//                </button>
//             </li>
//          )}
//       </ol>
//    )
// }
//
// ListContacts.propTypes = {
//    contacts: PropTypes.array.isRequired,
//    onDeleteContact: PropTypes.func.isRequired
// }

// traditional way of creating a React component
class ListContacts extends React.Component {

   static propTypes = {
      contacts: PropTypes.array.isRequired,
      onDeleteContact: PropTypes.func.isRequired
   }
   // initial state
   state = {
      query:''
   }
   // update query method - note that state is the only place that will hold value. Whenever text is entered in input field, state is actually being changed, and then input field is updated!
   updateQuery = (event) => {
      console.log(event)
      this.setState({query:event.target.value.trim()})
   }

   render() {
      console.log('Props', this.props)
      return (
         <div className= 'list-contacts'>
         {JSON.stringify(this.state)}
            <input
               className='search-contacts'
               type = 'text'
               placeholder = 'Search contacts'
               value={this.state.query}
               onChange={(event) => this.updateQuery(event)}
            />
            <ol className = 'contact-list'>
               {this.props.contacts.map( contact =>
                  <li key={contact.id} className= 'contact-list-item'>
                     <div className='contact-avatar' style={{backgroundImage:`url(${contact.avatarURL})`}}>
                     </div>
                     <div className='contact-details'>
                        <p>{contact.name}</p>
                        <p>{contact.email}</p>
                     </div>
                     <button onClick={() => this.props.onDeleteContact(contact)} className='contact-remove'>
                     Remove
                     </button>
                  </li>
               )}
            </ol>
         </div>
      )
   }
}

export default ListContacts
