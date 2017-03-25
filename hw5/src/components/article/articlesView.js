import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

const Card = ({article, index}) =>(
    <tbody>
        <tr>
            <td className="card-artilce">
                <div className="signature">{article.author} posted an article on {article.date}</div>
                <div className='articleText'>{article.text}</div>
                <button type='button' className='btn' data-toggle='collapse'
                        data-target={'#collapseComments' + index}>Comments ({article.comments.length})
                </button>
                <button type='button' className='btn'>Edit</button> 
                <br/><br/>
            </td>

            {article.picture == "" ? (
                <td className="card3">No Image</td>
            ) : (
                <td className="card3"><img src={article.picture} className="article-image"/></td>
            )}
        </tr>
        
        { article.comments.length > 0 ? (

            <tr className= "comment" id={'collapseComments' + index}>
                <td>
                    <ul>
                        {
                            article.comments.map((comment, index)=>{
                                return(
                                    
                                    <li key = {index}>
                                        {article.author}
                                        {comment.author}: {comment.text}}
                                    </li>
                                    
                                )
                            })
                        }
                    </ul>
                </td>
            </tr>
        ):(null)}
    </tbody>


)

export const ArticlesView = ({articles, search}) => {

    return(
        <div>
            <div className='card search'>
                    <input id="yourFeed" className="inputmsg form-control " type="text" 
                            placeholder="input your keyword" 
                            onChange={() => search(document.getElementById('yourFeed').value)}/>
            </div>
            <div className='articlesView'>
                    <table>
                        {
                            
                            articles.map((article, index) => {
                                return (
                                    <div>
                                    <br/>
                                    <Card key={index} article={article} index={index}/>
                                    </div>
                                )
                            })
                            
                        }
                    </table>
            </div>
        </div>
    )
}

export default connect(
    (state) =>{
        return{
            articles: state.articleDis
        }
    },
    (dispatch) =>{
        return{
            search:(keywords) => dispatch({type:'SEARCH', keywords})
        }
    }
)(ArticlesView)