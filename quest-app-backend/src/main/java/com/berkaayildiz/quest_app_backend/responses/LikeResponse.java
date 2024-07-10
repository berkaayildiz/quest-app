package com.berkaayildiz.quest_app_backend.responses;

import com.berkaayildiz.quest_app_backend.entities.Like;


public class LikeResponse
{
    private Long id;
    private Long userId;
    private Long postId;

    public LikeResponse(Long id, Long userId, Long postId) {
        this.id = id;
        this.userId = userId;
        this.postId = postId;
    }

    public LikeResponse(Like like) {
        this.id = like.getId();
        this.userId = like.getUser().getId();
        this.postId = like.getPost().getId();
    }

    public Long getId() { return id; }
    public Long getUserId() { return userId; }
    public Long getPostId() { return postId; }

    public void setId(Long id) { this.id = id; }
    public void setUserId(Long userId) { this.userId = userId; }
    public void setPostId(Long postId) { this.postId = postId; }
}
