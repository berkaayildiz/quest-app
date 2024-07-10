import { LikeType } from "../LikeType";

export type PostProps = {
    id: number;
    userId: number;
    username: string;
    title: string;
    text: string;
    likes: LikeType[];
};
