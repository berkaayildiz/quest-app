export type CommentFormProps = {
  userId: number;
  postId: number;
  username: string;
  refreshComments: (postId: number) => void;
};
