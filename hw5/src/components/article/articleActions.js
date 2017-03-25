import { resource } from '../../actions'

export const initArticles = () =>{
    return (dispatch) => {
        //dispatch(clear())
        resource('GET', 'articles')
        .then((response) => dispatch({type: 'UPDATE_ARTICLES', articles: response.articles}))
        .catch((error) => console.log(error))
    }
}

export const addArticle = ({text}) => {
    return (dispatch) => {
        resource('POST', 'article',{text})
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