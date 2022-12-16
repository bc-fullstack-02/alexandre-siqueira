import { Profile } from "./Profile";

export interface Post {
    _id: string,
    title: string,
    description: string,
    profile: Profile,
    image: boolean,
    imageUrl: string,
    likedByPost: boolean    
}