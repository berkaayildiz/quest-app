package com.berkaayildiz.quest_app_backend.requests;


public class RefreshRequest
{
    private Long userId;
    private String refreshToken;


    public RefreshRequest(Long userId, String refreshToken) {
        this.userId = userId;
        this.refreshToken = refreshToken;
    }


    public Long getUserId() { return userId; }
    public String getRefreshToken() { return refreshToken; }

    public void setUserId(Long userId) { this.userId = userId; }
    public void setRefreshToken(String refreshToken) { this.refreshToken = refreshToken; }
    
}
