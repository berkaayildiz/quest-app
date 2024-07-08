package com.berkaayildiz.quest_app_backend.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.berkaayildiz.quest_app_backend.entities.Post;
import com.berkaayildiz.quest_app_backend.requests.PostCreateRequest;
import com.berkaayildiz.quest_app_backend.requests.PostUpdateRequest;
import com.berkaayildiz.quest_app_backend.responses.PostResponse;
import com.berkaayildiz.quest_app_backend.services.PostService;


@RestController
@RequestMapping("/posts")
public class PostController {
    
    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping("/{postId}")
    public  ResponseEntity<PostResponse> getPost(@RequestParam Long postId) {
        return postService.getPost(postId);
    }

    @GetMapping
    public List<PostResponse> getAllPosts(@RequestParam Optional<Long> userId) {
        return postService.getAllPosts(userId);
    }

    @PostMapping
    public Post createPost(@RequestBody PostCreateRequest postCreateRequest) {
        return postService.createPost(postCreateRequest);
    }

    @PutMapping("/{postId}")
    public ResponseEntity<Post> updatePost(@RequestParam Long postId, @RequestBody PostUpdateRequest postUpdateRequest) {
        return postService.updatePost(postId, postUpdateRequest);
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<?> deletePost(@RequestParam Long postId) {
        return postService.deletePost(postId);
    }
}
