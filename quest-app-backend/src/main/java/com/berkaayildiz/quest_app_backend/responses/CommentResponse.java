package com.berkaayildiz.quest_app_backend.responses;

import java.util.Date;

import com.berkaayildiz.quest_app_backend.entities.Comment;

public class CommentResponse
{
    private Long id;
    private Long userId;
    private String username;
    private String text;
    private Date createDate;

    
    public CommentResponse(Long id, Long userId, String username, String text, Date createDate) {
        this.id = id;
        this.userId = userId;
        this.username = username;
        this.text = text;
        this.createDate = createDate;
    }

    public CommentResponse(Comment comment) {
        this.id = comment.getId();
        this.userId = comment.getUser().getId();
        this.username = comment.getUser().getUsername();
        this.text = comment.getText();
        this.createDate = comment.getCreateDate();
    }


    public Long getId() { return id; }
    public Long getUserId() { return userId; }
    public String getUsername() { return username; }
    public String getText() { return text; }
    public Date getCreateDate() { return createDate; }

    public void setId(Long id) { this.id = id; }
    public void setUserId(Long userId) { this.userId = userId; }
    public void setUsername(String username) { this.username = username; }
    public void setText(String text) { this.text = text; }
    public void setCreateDate(Date createDate) { this.createDate = createDate; }
}
