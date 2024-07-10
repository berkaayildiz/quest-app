package com.berkaayildiz.quest_app_backend.responses;

import java.util.List;

import com.berkaayildiz.quest_app_backend.entities.Post;

public class PostResponse
{
    private Long id;
    private Long userId;
    private String username;
    private String title;
    private String text;
    private List<LikeResponse> likes;

    public PostResponse(Post post, List<LikeResponse> likes) {
        this.id = post.getId();
        this.userId = post.getUser().getId();
        this.username = post.getUser().getUsername();
        this.title = post.getTitle();
        this.text = post.getText();
        this.likes = likes;
    }

    public PostResponse(Long id, Long userId, String username, String title, String text) {
        this.id = id;
        this.userId = userId;
        this.username = username;
        this.title = title;
        this.text = text;
    }

    public Long getId() { return id; }
    public Long getUserId() { return userId; }
    public String getUsername() { return username; }
    public String getTitle() { return title; }
    public String getText() { return text; }
    public List<LikeResponse> getLikes() { return likes; }

    public void setId(Long id) { this.id = id; }
    public void setUserId(Long userId) { this.userId = userId; }
    public void setUsername(String username) { this.username = username; }
    public void setTitle(String title) { this.title = title; }
    public void setText(String text) { this.text = text; }
    public void setLikes(List<LikeResponse> likes) { this.likes = likes; }
}
