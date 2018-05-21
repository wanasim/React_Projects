// ACTIONS
export const ALL_POSTS = 'ALL_POSTS'
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const CAT_POSTS = 'CAT_POSTS'
export const DET_POST = 'DET_POST'

export const ALL_CATEGORIES = 'ALL_CATEGORIES'

export const ALL_COMMENTS = 'ALL_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'

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

export const detPost = (post) => ({
  type: DET_POST,
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
   category,
   voteScore,
   deleted
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

export function getCategories(){
  return function(dispatch){
    fetch('http://localhost:3001/categories', {headers:{'Authorization': API_HEADER}})
    .then((response)=> response.json())
    .then((categories)=>{
      console.log("CATEGORIES", categories)
      dispatch(allCategories(categories.categories))
    })
  }
}

export function getCatPosts(category){
  console.log("TEST")
  return function(dispatch){
    fetch(`http://localhost:3001/${category}/posts`, {headers:{'Authorization': API_HEADER}})
    .then((response) => {
      console.log("RESPONSE", response)
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
    .then((post)=>dispatch(detPost(post)))
  }
}

export function getComments(id){
  return function(dispatch){
    fetch(`http://localhost:3001/posts/${id}/comments`, {headers : {'Authorization': API_HEADER}})
    .then((response)=>response.json())
    .then((comments)=> dispatch(allComments(comments)))
  }
}

export function thunkAddPost(newPost){
  newPost.timestamp = Date.now()
  newPost.voteScore = 1
  newPost.deleted = null

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
      console.log("RESPONSE", response)
      dispatch(addPost(response))
      return response
    })
  }
}
