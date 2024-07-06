package com.berkaayildiz.quest_app_backend.requests;


/**
 * PostCreateRequest is a request object used to create a new post.
 * It contains the title, text, and user ID of the post to create.
 */
public class PostCreateRequest {

    private Long id;

    private String title;

    private String text;

    private Long userId;


    public PostCreateRequest() {}

    public PostCreateRequest(Long id, String title, String text, Long userId) {
        this.id = id;
        this.title = title;
        this.text = text;
        this.userId = userId;
    }


    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getText() { return text; }
    public Long getUserId() { return userId; }

    public void setId(Long id) { this.id = id; }
    public void setTitle(String title) { this.title = title; }
    public void setText(String text) { this.text = text; }
    public void setUserId(Long userId) { this.userId = userId; }
}
