import Action, { updateError, resource } from '../../actions'




export const initProfile = (name) =>{
    console.log('initProfile()')
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
            console.log(user.picture )
        })

        Promise.all([email, zipCode, Bday, avatar]).then(() => {
            dispatch({type: 'INIT_PROFILE', user: user})
        })
    }
}

export const updateProfile = (user) =>{
    console.log(user)
    return(dispatch) =>{
        let picture
        const avatar = resource('GET', 'avatars')
            .then((response) =>{
                picture = response.avatars[0].avatar
                console.log(avatar)
                console.log(picture)
            })

        
        const email = resource('PUT', 'email', {email: user.email})
        const zipCode = resource('PUT', 'zipcode', {zipcode: user.zipCode})
        const password = resource('PUT', 'password', {password: user.password})
        Promise.all([picture,  email, zipCode, password]).then(() => {
            dispatch(initProfile(user.name))
        })
    }
}