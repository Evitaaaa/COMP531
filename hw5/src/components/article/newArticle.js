import React from 'react'
import {connect} from 'react-redux'
import {addArticle} from './articleActions'

const NewArticle = ({dispatch}) =>{
    return(
        <div className= 'newArticle content'>
            <label id='whatIsNew'> Anything new to catch up? </label>
            <textarea className='form-control' rows='5' id='newArticle' placeholder="What's new ?"/>
            <div className="row">
                <label className="col-md-3 control-label">Select a picture: </label>
                <div className='col-md-3'>
                    <input type='file' id='uploadimg'/>
                </div>
                
                <div className='col-md-6' />
                    <button type='button' className='btn' onClick={() => { 
                         let time=new Date().toLocaleString()
                         var img=getPicture(document.getElementById('uploadimg'))
                         dispatch(addArticle({text: document.getElementById('newArticle').value}))
                         //addNew(user.name,document.getElementById('newArticle').value,time,img)
                         document.getElementById('newArticle').value=''}}>
                         Post</button>
                    
                    <button type='button' className='btn' onClick={() => {
                         document.getElementById('newArticle').value = ''}
                         }>Clear
                    </button>

            </div>

        </div>
    )
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