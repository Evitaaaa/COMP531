
const initialProfile = require('./components/data/profile.json')
//const initialArticles = require('./components/data/articles.json')
//const initialFollowers = require('./components/data/followers.json')

const Reducer = (state = {
    location: 'landingPage',
    regMsg: "",
    logErrMsg: "",
    uptProfileMsg: "",
    newArticleMsg: "",
    addFollowingMsg: "",
    user: [],
    articles: [],
    articleDis: [],
    followings: []
   
}, action) => {
    switch(action.type){
        case 'TO_MAIN_PAGE':{
            return{
                ...state,
                location: 'mainPage'
            }
        }
        case 'INIT_USER':{
            return{
                ...state,
                user: action.user
            }
        }
        case 'LOG_IN':{
            console.log(action.username)
            return{
                
                ...state,
                user:{
                    ...state.user,
                    name: action.username,
                },
                location: 'mainPage'
            }
            
        }
        case 'LOG_IN_MSG':{
            return{
                ...state,
                logErrMsg: action.logErrMsg
            }
        }
        case 'LOG_OUT':{
            console.log('tolandingpage')
            return{
                ...state,
                location:'landingPage',
                user:[],
                regMsg: "",
                logErrMsg: "",
                uptProfileMsg: "",
                newArticleMsg: ""
            }
        }

        case 'REGISTER':{
            return state
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
            if(action.regMsg === ''){
                return{
                    state
                }
            }
            else{
                return{
                    ...state,
                    regMsg : action.regMsg
                }
            }
        }
        case 'FOLLOW_USER': {
            return {
                ...state,
                followings:[
                    ...state.followings,
                    action.following
                ]
            }
        }

        case 'ADD_FOLLOWING_MSG':{
            console.log(action.addFollowingMsg)
            return{
                ...state,
                addFollowingMsg : action.addFollowingMsg
            }
        }
        case 'REMOVE_USER' :{
            return{
                ...state,
                followings: state.followings.filter((follower) => follower.id != action.id)
            }
        }
        /*
        case 'UPDATE_FOLLOWER': {
            return {...state, followings: action.followers}
        }
*/
        case 'NEW_ARTICLE_MSG':{
            return{
                ...state,
                newArticleMsg: aciton.newArticleMsg
            }
        }

        case 'ADD_ARTICLE':{
            return {
                ...state,
                articles: [
                    {
                        author:'',
                        text: action.text,
                        timestamp:'',
                        picture:''
                    },
                    ...state.articles
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
        
        case 'UPDATE_PROFILE_MSG':{
            return{
                ...state,
                uptProfileMsg: action.uptProfileMsg
            }
        }

        case 'INIT_PROFILE': {
            console.log(action.user)
            return{
                ...state,
                user:{
                    ...state.user,
                    name: action.user.name,
                    picture: action.user.picture,
                    email: action.user.email,
                    Bday: action.user.Bday,
                    zipCode: action.user.zipCode,
                    password: action.user.password
                }
            }
        }

        case 'UPDATE_STATUS':{
            return{
                ...state,
                user:{
                    ...state.user,
                    name: action.name,
                    status: action.status
                }

            }
        }

        case 'UPDATE_ARTICLES': {
            return {
                ...state,
                articles: action.articles,
                articleDis: action.articles
            }
        }

        case 'ADD_NEW_ARTICLE': {
            console.log(action.newArticle)
            return{
                ...state,
                articles:[
                    action.newArticle,
                    ...state.articles
                ],
                articleDis:[
                    action.newArticle,
                    ...state.articleDis

                ]
            }
        }

        case 'CLEARALL':{
            return{
                ...state,
                articles:[],
                followings:[]
            }
        }
        case 'CLEAR_ARTICLE':{
            return{
                ...state,
                articles:[],
            }
        }


    }
    return state
}

export default Reducer