import { SET_TOKEN, SET_USER_DATA, UserActions } from "../interfaces/user/actions"
import { UserState } from "../interfaces/user/models"

const userReducer:UserState={
    token:'',
    userInfo:{
        display_name:'',
        url_image:'',
        userId:''
    }
}

const UserReducer = (state=userReducer,action:UserActions):UserState =>{
    switch (action.type) {
        case SET_USER_DATA:
            return {
                token:state.token,
                userInfo:action.data
            }
        case SET_TOKEN:
            return{
                token:action.token,
                userInfo:state.userInfo
            }
        default:
            return state;
    }
}

export default UserReducer;