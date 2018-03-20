// action
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const ADD_COMMENT = 'ADD_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'

export const addPost = ({id,timestamp,title,body,author,category,voteScore,deleted}) => ({
   type: ADD_POST,
   id,
   timestamp,
   title,
   body,
   author,
   category,
   voteScore,
   deleted
})

export const addComment = ({id,parentId,timestamp,body,author,voteScore,deleted,parentDeleted}) => ({
   type: ADD_COMMENT,
   id,
   parentId,
   timestamp,
   body,
   author,
   voteScore,
   deleted,
   parentDeleted
})

export function thunkAddPost(){
  return function(dispatch){
    fetch('http://localhost:3001/posts', {
      method: 'post',
      body: {
        id: '8xf0y6z123dhgft65253nd',
        timestamp: Date.now(),
        title: 'Udacity is the best place to learn React',
        body: 'Everyone says so after all.',
        author: 'thingtwo',
        category: 'react',
      },
      headers: {
        'Authorization' : 'asdsad',
        'Accept': 'application/json',
       'Content-Type': 'application/json',
     }
    })
    .then((response)=>{
      console.log("RESPONSE", response)
      return response.json()
    })
    .then((response)=>{
      console.log("RESPONSE2", response)
      return response
    })
  }
}
