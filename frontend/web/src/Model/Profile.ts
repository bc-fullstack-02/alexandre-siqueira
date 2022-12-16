export interface Profile{
    _id: string,
    name: string,
    email: string,
    image: boolean,
    imageUrl: string,
    user: string,  
    following: [],
    followers: []
}