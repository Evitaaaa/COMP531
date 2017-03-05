import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

const Card = ({article, index}) =>(
    <tbody>
        <tr>
            <td className="card-artilce">
                <div className="signature">{article.author} posted an article on {article.timestamp}</div>
                <div className='articleText'>{article.text}</div>
                <button type='button' className='btn'>Comment</button>
                <button type='button' className='btn'>Edit</button> 
                <br/><br/>
            </td>
            {article.picture == "" ? (
                <td className="card3">No Image</td>
            ) : (
                <td className="card3"><img src={article.picture} className="article-image"/></td>
            )}
        </tr>
    </tbody>
)

const ArticlesView = ({articles, search}) => {

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