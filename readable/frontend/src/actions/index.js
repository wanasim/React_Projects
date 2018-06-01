// ACTIONS
export const ALL_POSTS = 'ALL_POSTS'
export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'
export const CAT_POSTS = 'CAT_POSTS'
export const DET_POST = 'DET_POST'
export const VOTE_POST = 'VOTE_POST'

export const ALL_CATEGORIES = 'ALL_CATEGORIES'

export const ALL_COMMENTS = 'ALL_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'

//credentials
const API_HEADER = process.env.READABLE_HEADER;

export const allPosts = (all_posts) => ({
  type: ALL_POSTS,
  all_posts
})

export const catPosts = (all_posts) => ({
  type: CAT_POSTS,
  all_posts
})

export const editedComment = (comment) => ({
  type: EDIT_COMMENT,
  comment
})

export const detPost = (post) => ({
  type: DET_POST,
  post
})

export const deletedPost = (post) => ({
  type: DELETE_POST,
  post
})

export const editedPost = ({id, title, body}) => ({
  type: EDIT_POST,
  id,
  title,
  body
})

export const votedPost = (post) => ({
  type: VOTE_POST,
  post
})

export const allCategories = (all_categories) =>({
  type: ALL_CATEGORIES,
  all_categories
})

export const addPost = ({id,timestamp,title,body,author,category,voteScore,deleted}) => ({
   type: ADD_POST,
   id,
   timestamp,
   title,
   body,
   author,
   category
})


export const allComments = (all_comments) => ({
    type: ALL_COMMENTS,
    all_comments
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

export const votedComment = (comment) => ({
  type: VOTE_COMMENT,
  comment
})

export const deleteComment = (comment) => {
  return {
    type: DELETE_COMMENT,
    comment
  }
}

export function getPosts(){

  return function(dispatch){
    fetch('http://localhost:3001/posts', { headers: {'Authorization': API_HEADER}})
    .then((response)=>{
      return response.json()
    })
    .then((postArr)=>{
      dispatch(allPosts(postArr))
    })

  }
}

export function editPost(id, body) {

  return function(dispatch){
    fetch(`http://localhost:3001/posts/${id}`, {
      method: 'put',
      body: JSON.stringify(body),
      headers:{
        'Authorization':API_HEADER,
        'Accept': 'application/json',
       'Content-Type': 'application/json',
      }})
    .then((response)=>{

      return response.json()
    })
    .then((post)=>{
  
      dispatch(editedPost(post))
      dispatch(detPost(post))
    })
  }
}

export function deletePost(id) {
  return function(dispatch){
    fetch(`http://localhost:3001/posts/${id}`, {method: 'delete', headers:{'Authorization':API_HEADER}})
    .then((response)=>response.json())
    .then((post)=>{
      dispatch(deletedPost({id: post.id, title: post.title, body: post.body}))
      dispatch(editPost)

    })
  }
}

export function votePost(id, vote){
  return function(dispatch){
    fetch(`http://localhost:3001/posts/${id}`, {
      method: 'post',
      body: JSON.stringify(vote),
      headers: {
        'Authorization':API_HEADER,
        'Content-Type': 'application/json',
      }
    })
    .then(response=>response.json())
    .then(post=>dispatch(votedPost(post)))
  }
}

export function getCategories(){
  return function(dispatch){
    fetch('http://localhost:3001/categories', {headers:{'Authorization': API_HEADER}})
    .then((response)=> response.json())
    .then((categories)=>{
      dispatch(allCategories(categories.categories))
    })
  }
}

export function getCatPosts(category){
  return function(dispatch){
    fetch(`http://localhost:3001/${category}/posts`, {headers:{'Authorization': API_HEADER}})
    .then((response) => {
      return response.json()
    })
    .then((posts)=>dispatch(catPosts(posts)))
  }
}

export function getDetPost(id){
  return function(dispatch){
    fetch(`http://localhost:3001/posts/${id}`, {headers:{'Authorization' : API_HEADER}})
    .then((response)=> {
      return response.json()
    })
    .then((post)=>{
      dispatch(detPost(post))

    })
  }
}

export function submitComment(body){
  return function(dispatch){
    fetch('http://localhost:3001/comments', {
      method:'post',
      body: JSON.stringify(body),
      headers: {
        'Authorization':API_HEADER,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((response)=>response.json())
    .then((comment)=>{
      dispatch(addComment(comment))

    })
  }
}


export function thunkAddPost(newPost){
  newPost.timestamp = Date.now()

  return function(dispatch){
    fetch('http://localhost:3001/posts', {
      method: 'post',
      body: JSON.stringify(newPost),
      headers: {
        'Authorization' : API_HEADER,
        'Accept': 'application/json',
       'Content-Type': 'application/json',
     }
    })
    .then((response)=>{
      return response.json()
    })
    .then((response)=>{

      dispatch(addPost(response))
      return response
    })
  }
}

export function getComments(id){
  return function(dispatch){
    fetch(`http://localhost:3001/posts/${id}/comments`, {headers : {'Authorization': API_HEADER}})
    .then((response)=>response.json())
    .then((comments)=> dispatch(allComments(comments)))
  }
}

export function delComment(id){
  return function(dispatch){
    fetch(`http://localhost:3001/comments/${id}`, {
      method: 'delete',
      headers: {Authorization: API_HEADER}
    })
    .then((response)=>response.json())
    .then((comment)=>{

      dispatch(deleteComment(comment))
    })
  }
}

export function voteComment(id, vote){

  return function(dispatch){
    fetch(`http://localhost:3001/comments/${id}`, {
      method: 'post',
      body: JSON.stringify(vote),
      headers: {
        'Authorization':API_HEADER,
        'Content-Type': 'application/json',
      }
    })
    .then(response=>response.json())
    .then(comment=>dispatch(votedComment(comment)))
  }
}

export function editComment(id, body){
  return function(dispatch){
    fetch(`http://localhost:3001/comments/${id}`, {
      method: 'put',
      body: JSON.stringify(body),
      headers: {
        'Authorization':API_HEADER,
        'Content-Type': 'application/json'
      }
    })
    .then((response)=>response.json())
    .then((comment)=>{

      dispatch(editedComment(comment))
    })

  }

}
