export type CommentFormProps = {
  postId: number;
  refreshComments: (postId: number) => void;
};
