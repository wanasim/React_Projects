import React from 'react'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

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
   clearQuery = () => {
      this.setState({
         query:''
      })
   }

   render() {
      // object deconstructuring
      const { contacts, onDeleteContact} = this.props;
      const {query} = this.state;



      console.log('Props', this.props)
      let showingContacts
      if (query){
         // escapeRegExp gets rid of special characters and 'i' ignores caps
         const match = new RegExp(escapeRegExp(query), 'i');
         showingContacts = contacts.filter((contact) => match.test(contact.name))
      } else{
         showingContacts = contacts
      }

      console.log("currently shown contacts", showingContacts)
      showingContacts.sort(sortBy('name'))
      return (
         <div className= 'list-contacts'>
         {JSON.stringify(this.state)}
            <div className= 'list-contacts-top'>

               <input
                  className='search-contacts'
                  type = 'text'
                  placeholder = 'Search contacts'
                  value={query}
                  onChange={(event) => this.updateQuery(event)}
               />
            </div>

            {showingContacts.length !== contacts.length && (
               <div className='showingContacts'>
                  <span> Now showing {showingContacts.length} of {contacts.length} total </span>
                  <button onClick={this.clearQuery}> Show all </button>
               </div>
            )}

            <ol className = 'contact-list'>
               {showingContacts.map( contact =>
                  <li key={contact.id} className= 'contact-list-item'>
                     <div className='contact-avatar' style={{backgroundImage:`url(${contact.avatarURL})`}}>
                     </div>
                     <div className='contact-details'>
                        <p>{contact.name}</p>
                        <p>{contact.email}</p>
                     </div>
                     <button onClick={() => onDeleteContact(contact)} className='contact-remove'>
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
