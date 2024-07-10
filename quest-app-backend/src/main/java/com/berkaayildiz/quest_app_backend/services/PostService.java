package com.berkaayildiz.quest_app_backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.berkaayildiz.quest_app_backend.entities.Post;
import com.berkaayildiz.quest_app_backend.entities.User;
import com.berkaayildiz.quest_app_backend.repositories.PostRepository;
import com.berkaayildiz.quest_app_backend.requests.PostCreateRequest;
import com.berkaayildiz.quest_app_backend.requests.PostUpdateRequest;
import com.berkaayildiz.quest_app_backend.responses.LikeResponse;
import com.berkaayildiz.quest_app_backend.responses.PostResponse;


/**
 * PostService is a service that manages post-related operations.
 * It provides methods for CRUD operations on posts.
 */
@Service
public class PostService {

    private final PostRepository postRepository;

    private final UserService userService;
    private LikeService likeService;

    public PostService(PostRepository postRepository, UserService userService) {
        this.postRepository = postRepository;
        this.userService = userService;
    }

    @Autowired
    @Lazy
	public void setLikeService(LikeService likeService) {
		this.likeService = likeService;
	}


    public ResponseEntity<Post> getPost(Long postId) {
		return postRepository.findById(postId)
        .map(ResponseEntity::ok)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Post not found"));
	}

    /**
     * Retrieves a post by its ID.
     * @param postId the ID of the post to retrieve
     * @return a ResponseEntity containing the post response
     */
    public ResponseEntity<PostResponse> getOnePost(Long postId) {
        Post post = postRepository.findById(postId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Post not found"));

        List<LikeResponse> likes = likeService.getLikes(Optional.empty(), Optional.of(post.getId())).getBody();
        return ResponseEntity.ok(new PostResponse(post, likes));
    }

    /**
     * Retrieves all posts. If a user ID is provided, retrieves all posts for that user.
     * @param userId the ID of the user to retrieve posts for
     * @return a list of all posts
     */
    public List<PostResponse> getAllPosts(Optional<Long> userId) {
        List<Post> posts;

        if (userId.isPresent())
            posts = postRepository.findByUserId(userId.get());
        else
            posts = postRepository.findAll();
        
        return posts.stream().map(
            (post) -> {
                List<LikeResponse> likes = likeService.getLikes(Optional.empty(), Optional.of(post.getId())).getBody();
                return new PostResponse(post, likes);
            }
        ).toList();
    }

    /**
     * Creates a new post.
     * @param newPost the post to create
     * @return the created post
     */
    public Post createPost(PostCreateRequest postCreateRequest) {
        User user = userService.getUser(postCreateRequest.getUserId()).getBody();

        Post newPost = new Post();
        newPost.setId(postCreateRequest.getId());
        newPost.setTitle(postCreateRequest.getTitle());
        newPost.setText(postCreateRequest.getText());
        newPost.setUser(user);

        return postRepository.save(newPost);
    }

    /**
     * Updates a post.
     * @param postId the ID of the post to update
     * @param updatedPost the updated post
     * @return a ResponseEntity containing the updated post
     */
    public ResponseEntity<Post> updatePost(Long postId, PostUpdateRequest postUpdateRequest) {
        Post post = postRepository.findById(postId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Post not found"));

        post.setTitle(postUpdateRequest.getTitle());
        post.setText(postUpdateRequest.getText());

        return ResponseEntity.ok(postRepository.save(post));
    }

    /**
     * Deletes a post.
     * @param postId the ID of the post to delete
     * @return a ResponseEntity with no content
     */
    public ResponseEntity<?> deletePost(Long postId) {
        Post post = postRepository.findById(postId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Post not found"));

        postRepository.delete(post);
        return ResponseEntity.noContent().build();
    }
}
