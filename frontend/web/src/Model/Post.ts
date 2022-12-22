import { Profile } from "./Profile";

export interface Post {
    _id: string;
    title: string;
    description: string;
    profile: {
        name: string;
    };
    comments: [];
    likes: string[];
    image: boolean;
    imageUrl: string
}