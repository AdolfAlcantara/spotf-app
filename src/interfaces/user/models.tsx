export interface LoggedUserInfo{
    display_name:string;
    url_image:string;
    userId:string;
}

export interface UserState{
    userInfo:LoggedUserInfo
    token:string
}