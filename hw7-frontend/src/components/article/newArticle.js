import React from 'react'
import {connect} from 'react-redux'
import {addArticle} from './articleActions'

'use strict'
let fd = new FormData()
let file = ''
const NewArticle = ({dispatch, user}) =>{
    
    return(
        
        <div className= 'newArticle content'>
            <label id='whatIsNew'> Anything new to catch up????? </label>
            <textarea className='form-control' rows='5' id='newArticle' placeholder="What's new ?"/>
            <div className="row">
                <label className="col-md-3 control-label">Select a picture: </label>
                <div className='col-md-3'>
                    <input type='file' id='uploadimg' accept="image/*" onChange={(event) => {
                               event.preventDefault()
                               file = event.target.files[0]
                               addImage()
                               }} />
                </div>
                
                <div className='col-md-6' />
                    <button type='button' className='btn' id='postArtilce' onClick={() => { 
                         let text = document.getElementById('newArticle').value
                         fd.append('text', text)
                         //dispatch(addArticle(fd))
                         let time=new Date().toLocaleString()
                         dispatch(addArticle(user, text, time))
                         //addNew(user.name,document.getElementById('newArticle').value,time,img)
                         document.getElementById('newArticle').value=''
                         fd = new FormData()}}>
                         Post</button>
                    
                    <button type='button' className='btn' onClick={() => {
                         document.getElementById('newArticle').value = ''}
                         }>Clear
                    </button>

            </div>

        </div>
    )
}

const addImage = () =>{
    console.log('addImage')
    fd = new FormData()
    if(file === ''){
        return
    }
    else{
        fd.append('image', file)
        file = ''
    }
    
}

const getPicture=(img)=>{
    var $file = $("#uploadimg")
    var fileObj = $file[0]
    var windowURL = window.URL || window.webkitURL
    var dataURL;
    if(fileObj && fileObj.files && fileObj.files[0]){
        dataURL = windowURL.createObjectURL(fileObj.files[0])
    }else{
        dataURL = $file.val()
    }
    return dataURL
}


export default connect(
    (state) =>{
        return{
            user: state.user
        }
    },
    null
)(NewArticle)