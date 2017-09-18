import React from 'react'

// stateless functional component example:
function ListContacts(props){
   return (
      <ol className = 'contact-list'>
         {props.contacts.map( contact =>
            <li key={contact.id} className= 'contact-list-item'>
               <div className='contact-avatar' style={{backgroundImage:`url(${contact.avatarURL})`}}>
               </div>
               <div className='contact-details'>
                  <p>{contact.name}</p>
                  <p>{contact.email}</p>
               </div>
               <button className='contact-remove'>
               Remove
               </button>
            </li>
         )}
      </ol>
   )
}

// traditional way of creating a React component
// class ListContacts extends React.Component {
//    render() {
//       console.log('Props', this.props)
//       return (
//          <ol className = 'contact-list'>
//             {this.props.contacts.map(contact =>
//                <li key={contact.id} className= 'contact-list-item'>
//                   <div className='contact-avatar' style={{backgroundImage:`url(${contact.avatarURL})`}}>
//                   </div>
//                   <div className='contact-details'>
//                      <p>{contact.name}</p>
//                      <p>{contact.email}</p>
//                   </div>
//                   <button className='contact-remove'>
//                   Remove
//                   </button>
//                </li>
//             )}
//          </ol>
//       )
//    }
// }

export default ListContacts
