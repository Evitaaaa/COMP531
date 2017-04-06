import { resource } from '../../actions'
import { initArticles } from '../article/articleActions'

export const initFollowing = () => {
    return (dispatch) => {
        dispatch({type: 'CLEARALL'})
        resource('GET', 'following')
        .then((response) => {
            console.log(response.following)
            response.following.map(function(user)  {
                dispatch(displayFollowing(user))         
            }) 
        })
        .catch((error) => console.log(error))
    }
}

export const follow = (name) => {
    return (dispatch) => {
        resource('PUT', 'following/' + name)
        .then((response) => {
            dispatch(initFollowing())
            dispatch(initArticles())
        })     
    }
}

export const unfollow = (name) => {
    return (dispatch) => {
        resource('DELETE', 'following/' + name)
        .then((response) => {
            dispatch(initFollowing())
            dispatch(initArticles())
        })
    }
}

const displayFollowing = (name) => {
    return (dispatch) =>{
        const following = {
            name: name,
            picture: "",
            status: ""
        }
        const avatar = resource('GET', 'avatars/' + name)
        .then((response) => following.picture = response.avatars[0].avatar)
        const headline = resource('GET', 'headlines/' + name)
        .then((response) => following.status = response.headlines[0].headline)
        Promise.all([avatar, headline] ).then(() => {
            dispatch({ type:'FOLLOW_USER', following: following })
        })    
    }
}