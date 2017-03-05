import React from 'react'

const Headline = (props) =>{
    return(
        <div className='headline'>
            <img src='images/evita.jpg'
                alt='image' className='img-responsive center-block profileImage'/>
            <label className='displayName'> <b>Evita</b> </label>
            <div id='status' className='status'> I'm hungry</div>
                <input id='newStatus' type='text' className="form-control" placeholder='New Status' aria-describedby="pencil-addOn" />
            <div>
            <button type='button' className='btn' onClick={() => 
                {updateStatus()
                document.getElementById('newStatus').value = ''
                }}>Update Status</button>
            </div>
        </div>
    )
}

const updateStatus = () =>{
    let newStatus = document.getElementById('newStatus')
    let status = document.getElementById('status')
    if(newStatus.value != '' ){
        status.innerHTML = newStatus.value;
        
    }
}

export default Headline