import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {editArticle,initArticles} from './articleActions'
let ContentEditable = require('react-contenteditable')
let newMessage = ''
let user
const Card = ({article, index, username, dispatch}) =>(
    //console.log(dispatch),
    <tbody>
        <tr>
            <td className="card-artilce">
                <div className="signature">{article.author} posted an article on {article.date}</div>
                <ContentEditable id='articleTextId'
                    className='articleText'
                    html = {article.text}
                    
                    disabled = {article.author != username}
                    onChange={(e)=>{newMessage = e.target.value}}
                    />
                <button type='button' className='btn' data-toggle='collapse'
                        data-target={'#collapseComments' + index}>Show Comments ({article.comments.length})
                </button>
                <button type='button' className='btn' data-toggle='collapse'
                        data-target={'#collapseNewComments' + index}> Add Comments
                </button>
                <button type='button' className='btn' id='editArticleId' onClick = {() => {dispatch(editArticle(article._id, newMessage))}}>Edit Article</button> 
                <br/><br/>
            </td>

            {article.picture == "" ? (
                <td className="card3">No Image</td>
            ) : (
                <td className="card3"><img src={article.img} className="article-image"/></td>
            )}
        </tr>
        
        <tr className="collapse" id={'collapseNewComments' + index}>
            <td>
                <textarea className='form-control' rows='5' id= {'newComment'+index} placeholder="What's your point"/>
                <button className="btn" onClick = {() =>{
                    let text = document.getElementById('newComment'+index).value
                    //console.log('text')
                    //console.log(text)
                         if(text != ''){
                            dispatch(editArticle(article._id, text, -1))
                            console.log("add new comment")
                            dispatch(initArticles())

                         }
                         document.getElementById('newComment'+index).value=''
                    }}>Add</button>
            </td>
        </tr>
        { article.comments.length > 0 ? (

            <tr className= "collapse" id={'collapseComments' + index}>
                <td>
                    <ul>
                        {
                            article.comments.map((comment, index)=>{
                                return(
                                    
                                    <li key = {index}>
                                        <p className="commentHeader">{comment.author} {comment.date}</p>
                                        <ContentEditable
                                            html = {comment.text}
                                            disabled = {username != comment.author}
                                            onChange = {(e)=>{newMessage = e.target.value}}
                                        />
                                        {username != comment.author ? '' :
                            
                                            <button className="btn" onClick = {() => 
                                                {   console.log(comment)
                                                    console.log(article._id)
                                                    dispatch(editArticle(article._id, newMessage,comment.commentId))}}>Edit</button>}
                                            <br/><br/>
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

export const ArticlesView = ({articles, search, user, dispatch}) => {

    return(
        <div>
            <div className='card search'>
                    <input id="search" className="inputmsg form-control " type="text" 
                            placeholder="input your keyword" 
                            onChange={() => {
                                const keywords = document.getElementById('search').value
                                dispatch({type:'SEARCH', keywords})
                                }}/>
            </div>
            <div className='articlesView' id='articlesList'>
                    <table>
                        {
                            
                            articles.map((article, index) => {

                                return (
                                    
                                    <div id='card'>
                                    <br/>
                                    <Card key={index} article={article} index={index} username={user.name} dispatch={dispatch}/>
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
        console.log(state.user)
        return{
            articles: state.articleDis.sort(function(a,b){
                return new Date(b.date) - new Date(a.date)
            }),
            user: state.user,
        }
    },
   null)(ArticlesView)