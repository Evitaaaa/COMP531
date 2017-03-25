import React from 'react'
import NewArticle from './newArticle'
import ArticlesView from './articlesView'

const Article = (props) =>{
    return(
        <div className='content'>
            <NewArticle/>
            <ArticlesView articles={require('../data/articles.json').articles}/>
        </div>
    )
}
export default Article