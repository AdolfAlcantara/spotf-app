import { SET_TOKEN, SET_USER_DATA, UserActions } from "../interfaces/user/actions";
import { LoggedUserInfo } from "../interfaces/user/models";

export const SetUserInfo = (data:LoggedUserInfo):UserActions=>({
    type:SET_USER_DATA,
    data
})

export const SetToken = (token:string):UserActions =>({
    type:SET_TOKEN,
    token
})