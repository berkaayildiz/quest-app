import { LikeType } from "./LikeType";

export type PostType = {
    id: number;
    userId: number;
    username: string;
    title: string;
    text: string;
    likes: LikeType[];
};
