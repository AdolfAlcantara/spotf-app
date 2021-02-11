export interface ExternalUrls {
    spotify: string;
}

export interface Followers {
    href?: any;
    total: number;
}

export interface Image {
    height?: any;
    url: string;
    width?: any;
}

export interface UserInfo {
    display_name: string;
    external_urls: ExternalUrls;
    followers: Followers;
    href: string;
    id: string;
    images: Image[];
    type: string;
    uri: string;
}

export interface LoggedUserInfo{
    display_name:string;
    url_image:string;
}

