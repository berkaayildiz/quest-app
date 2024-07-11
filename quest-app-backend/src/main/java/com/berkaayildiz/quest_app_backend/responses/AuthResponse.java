package com.berkaayildiz.quest_app_backend.responses;

public class AuthResponse
{
    private String message;
    Long userId;

    
    public AuthResponse() { }

    public AuthResponse(String message, Long userId) {
        this.message = message;
        this.userId = userId;
    }


    public String getMessage() { return message; }
    public Long getUserId() { return userId; }

    public void setMessage(String message) { this.message = message; }
    public void setUserId(Long userId) { this.userId = userId; }
}
