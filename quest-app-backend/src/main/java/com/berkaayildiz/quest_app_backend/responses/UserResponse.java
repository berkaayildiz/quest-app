package com.berkaayildiz.quest_app_backend.responses;

import com.berkaayildiz.quest_app_backend.entities.User;

public class UserResponse
{
    private Long id;
    private String username;
    
    public UserResponse(Long id, String username) {
        this.id = id;
        this.username = username;
    }

    public UserResponse(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
    }

    public Long getId() { return id; }
    public String getUsername() { return username; }

    public void setId(Long id) { this.id = id; }
    public void setUsername(String username) { this.username = username; }
}
