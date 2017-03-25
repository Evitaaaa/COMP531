import Action, { updateError, resource } from '../../actions'



/*
        "name": "Evita",
        "status": "default",
        "picture": "",
        "email": "ab@ba.com",
        "phoneNum": "123-456-7890",
        "Bday": "1990-01-01",
        "zipCode": "12345",
        "password": "abc123"
        */

export const initProfile = (name) =>{
    return (dispatch) =>{
        const user = {
            name: name
        }
        const  email = resource('GET', 'email/')
        .then((response) =>{
            user.email = response.email
        })
        const zipCode = resource('GET', 'zipcode')
        .then((response) =>{
            user.zipCode = response.zipcode
        })
        const Bday = resource('GET', 'dob')
        .then((response) =>{
            user.Bday = new Date(response.dob).toLocaleDateString()
        })
        const avatar = resource('GET', 'avatars')
        .then((response) =>{
            user.picture = response.avatars[0].avatar
        })

        Promise.all([email, zipCode, Bday, avatar]).then(() => {
            dispatch({type: 'INIT_PROFILE', user: user})
        })
    }
}

export const updateProfile = (user) =>{
    return(dispatch) =>{
        const email = resource('PUT', 'email', {email: user.email})
        const zipCode = resource('PUT', 'zipcode', {zipcode: user.zipCode})
        const password = resource('PUT', 'password', {password: user.password})
        console.log(user)
        Promise.all([email, zipCode, password]).then(() => {
            dispatch(initProfile(user.name))
        })
    }
}