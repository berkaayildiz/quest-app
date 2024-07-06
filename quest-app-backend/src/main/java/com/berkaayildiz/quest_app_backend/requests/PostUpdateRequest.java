package com.berkaayildiz.quest_app_backend.requests;

public class PostUpdateRequest {

    private String title;

    private String text;


    public PostUpdateRequest() {}

    public PostUpdateRequest(String title, String text) {
        this.title = title;
        this.text = text;
    }

    
    public String getTitle() { return title; }
    public String getText() { return text; }

    public void setTitle(String title) { this.title = title; }
    public void setText(String text) { this.text = text; }
    
}
