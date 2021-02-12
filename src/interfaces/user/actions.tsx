import { LoggedUserInfo } from "./models";

export const SET_USER_DATA = "SET_USER_DATA";
export const SET_TOKEN = "SET_TOKEN";

interface SetUserData {
    type: typeof SET_USER_DATA
    data:LoggedUserInfo   
}

interface SetToken {
    type:typeof SET_TOKEN
    token:string
} 

export type UserActions = SetUserData | SetToken;