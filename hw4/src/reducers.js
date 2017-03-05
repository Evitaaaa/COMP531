
const initialProfile = require('./components/data/profile.json')
const initialArticles = require('./components/data/articles.json')
const initialFollowers = require('./components/data/followers.json')

const Reducer = (state = {
    location: initialProfile.location,
    regErrMsg: initialProfile.regErrMsg,
    logErrMsg: initialProfile.location,
    updateMsg: initialProfile.updateMsg,
    user: initialProfile.user,
    articles: initialArticles.articles,
    articleDis: initialArticles.articles,
    followers: initialFollowers.followers,
    nextFollowerId:3
   
}, action) => {
    switch(action.type){
        case 'TO_MAIN_PAGE':{
            return{
                ...state,
                location: 'mainPage'
            }
        }
        case 'TO_PROFILE_PAGE':{
            return{
                ...state,
                location :'profilePage'
            }
        }
        case 'TO_LANDING_PAGE':{
            
            return{
                ...state,
                location:'landingPage'
            }
        }
        case 'REGISTER_MSG':{
            if(action.errMsg === ''){
                return{
                    ...state,
                    regErrMsg:''
                }
            }
            else{
                return{
                    ...state,
                    regErrMsg: action.regErrMsg
                }
            }
        }
        case 'REMOVE_USER' :{
            return{
                ...state,
                followers: state.followers.filter((follower) => follower.id != action.id)
            }
        }
        case 'ADD_FOLLOWERS': {
            if(action.myName == ''){
                return{
                    ...state
                }
            }
            else{
                return{
                    ...state,
                    followers:[
                        ...state.followers,
                        {
                            id: state.nextFollowerId,
                            picture:"images/3.jpg",
                            name: action.myName,
                            status: "I'm new, I'm shy."
                        }
                    ],
                nextFollowerId: state.nextFollowerId + 1
                }
            }
        }

        case 'NEW_ARTICLE':{
            //console.log(action)
            return{
                ...state,
                articles:[
                    
                    {
                        author: action.user,
                        text: action.newArticle,
                        timestamp: action.time,
                        picture: action.img
                    },
                    ...state.articles
                    
                ],
                articleDis:[
                    
                    {
                        author: action.user,
                        text: action.newArticle,
                        timestamp: action.time,
                        picture: action.img
                    } ,
                    ...state.articleDis
                ]

            }
        }

        case 'SEARCH':{
            return{
                ...state,
                articleDis : state.articles.filter((article) => {
                    if(article.author.indexOf(action.keywords) == -1 && article.text.indexOf(action.keywords) == -1) {
                        return false;
                    }
                    return true;
                })

            }
        }
        
        case 'UPDATE_MSG':{
            return{

            }
        }

        case 'UPDATE_PROFILE':{
            return{
                ...state,
                user:{
                    ...state.user,
                    name: action.newProfile.name,
                    email: action.newProfile.email,
                    phoneNum: action.newProfile.phoneNum,
                    Bday: action.newProfile.Bday,
                    zipCode: action.newProfile.zipCode,
                    password: action.newProfile.password,
                }
            }
        }


    }
    return state;
}

export default Reducer