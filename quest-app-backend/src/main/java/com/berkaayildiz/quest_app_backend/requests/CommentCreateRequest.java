package com.berkaayildiz.quest_app_backend.requests;

public class CommentCreateRequest
{
    private Long id;
    private Long userId;
    private Long postId;
    private String text;


    public CommentCreateRequest(Long id, Long userId, Long postId, String text) {
        this.id = id;
        this.userId = userId;
        this.postId = postId;
        this.text = text;
    }

    public Long getId() { return id; }
    public Long getUserId() { return userId; }
    public Long getPostId() { return postId; }
    public String getText() { return text; }

    public void setId(Long id) { this.id = id; }
    public void setUserId(Long userId) { this.userId = userId; }
    public void setPostId(Long postId) { this.postId = postId; }
    public void setText(String text) { this.text = text; }
}
