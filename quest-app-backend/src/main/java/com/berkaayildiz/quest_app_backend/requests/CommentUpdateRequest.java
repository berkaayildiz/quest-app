package com.berkaayildiz.quest_app_backend.requests;

public class CommentUpdateRequest
{
    private String text;
    
    public CommentUpdateRequest(String text) {
        this.text = text;
    }

    public String getText() { return text; }

    public void setText(String text) { this.text = text; }
}
