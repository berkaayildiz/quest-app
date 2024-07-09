package com.berkaayildiz.quest_app_backend.entities;

import java.util.Date;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;


/**
 * The Comment entity represents a comment in the application.
 * It includes details such as the comment's ID, the ID of the post the comment is on,
 * the ID of the user who created the comment, and the comment's text content.
 */
@Entity
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch=FetchType.EAGER)
    @JoinColumn(name = "post_id", nullable=false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Post post;

    @ManyToOne(fetch=FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable=false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private User user;

    @Column(columnDefinition = "TEXT")
    private String text;

    @Temporal(TemporalType.TIMESTAMP)
	Date createDate;


    public Comment() {}

    public Comment(Long id, Post post, User user, String text) {
        this.id = id;
        this.post = post;
        this.user = user;
        this.text = text;
        this.createDate = new Date();
    }


    public Long getId() { return id; }
    public Post getPost() { return post; }
    public User getUser() { return user; }
    public String getText() { return text; }
    public Date getCreateDate() { return createDate; }

    public void setId(Long id) { this.id = id; }
    public void setPost(Post post) { this.post = post; }
    public void setUser(User user) { this.user = user; }
    public void setText(String text) { this.text = text; }
    public void setCreateDate(Date createDate) { this.createDate = createDate; }
}
