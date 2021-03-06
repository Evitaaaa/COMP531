import { resource } from '../../actions'

export const initArticles = () =>{
    return (dispatch) => {
        dispatch(clearArticle())
        console.log("cleared all")
        resource('GET', 'articles')
        .then((response) => dispatch({type: 'UPDATE_ARTICLES', articles: response.articles}))
        .catch((error) => console.log(error))
    }
}

export const addArticle = (author, text, time)=> {
        console.log(author)
        const name = author.name
        return (dispatch) =>{
            resource('POST', 'article', {author: name, text: text, date: time})
            .then(r =>{
                dispatch({
                    type: 'ADD_NEW_ARTICLE',
                    newArticle: r.articles[0]
                })
            })
        }
}
export const addArticleWithImage = (fd) => {
    console.log('addArticleWithImage')
    return (dispatch) => {
        resource('POST', 'article',fd, false)
        .then ((response) => {
            dispatch(initArticles())
        })
        .catch((err) => {dispatch({type:'NEW_ARTICLE_MSG', newArticleMsg:'error happened when add new article'})})
    }
}

const clear = () =>{
    return (dispatch) => {
        dispatch({type: 'CLEARALL'})
    }
}
const clearArticle = () =>{
    return (dispatch) => {
        dispatch({type: 'CLEAR_ARTICLE'})
    }
}

export const editArticle = (articleId, content, commentId) =>{
    return (dispatch) =>{
        const payload = {text: content}
        if(commentId) payload.commentId = commentId
        console.log(content)
        console.log(commentId)
        resource('PUT', `articles/${articleId}`, payload)
         .then((response)=>{
            const article = response.articles[0]
            console.log(article)
            dispatch({type:'EDIT_ARTICLE',article})
            //dispatch({type:'EDIT_MSG', editArticleMsg:'Edited successfully'})
            //dispatch({type:'ON_SUCCESS', success:'Edited successfully'})
        })
    }
}