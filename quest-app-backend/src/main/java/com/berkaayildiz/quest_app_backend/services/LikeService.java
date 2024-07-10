package com.berkaayildiz.quest_app_backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.berkaayildiz.quest_app_backend.entities.Like;
import com.berkaayildiz.quest_app_backend.entities.Post;
import com.berkaayildiz.quest_app_backend.entities.User;
import com.berkaayildiz.quest_app_backend.repositories.LikeRepository;
import com.berkaayildiz.quest_app_backend.requests.LikeCreateRequest;
import com.berkaayildiz.quest_app_backend.responses.LikeResponse;

@Service
public class LikeService
{
    private final LikeRepository likeRepository;

    private final UserService userService;
    private PostService postService;

    public LikeService(LikeRepository likeRepository, UserService userService) {
        this.likeRepository = likeRepository;
        this.userService = userService;
    }

    @Autowired
    @Lazy
    public void setPostService(PostService postService) {
        this.postService = postService;
    }


    /**
     * Retrieves a like by its post ID and user ID, user ID, or post ID.
     * @param postId the ID of the post to retrieve likes for (optional)
     * @param userId the ID of the user to retrieve likes for (optional)
     * @return a ResponseEntity containing a list of likes
     */
    public ResponseEntity<List<LikeResponse>> getLikes(Optional<Long> userId, Optional<Long> postId) {
        List<Like> likes;

        if (userId.isPresent() && postId.isPresent())
            likes = likeRepository.findByUserIdAndPostId(userId.get(), postId.get());
        else if (userId.isPresent())
            likes = likeRepository.findByUserId(userId.get());
        else if (postId.isPresent())
            likes = likeRepository.findByPostId(postId.get());
        else
            likes = likeRepository.findAll();

        return ResponseEntity.ok(likes.stream().map(LikeResponse::new).toList());
    }

    /**
     * Retrieves a like by its ID.
     * @param likeId the ID of the like to retrieve
     * @return the like if found, or null if not found
     */
    public Like getLike(Long likeId) {
        return likeRepository.findById(likeId).orElse(null);
    }

    /**
     * Creates a new like.
     * @param request the like to create
     * @return the created like
     */
    public Like createLike(LikeCreateRequest request) {
        User user = userService.getUser(request.getUserId()).getBody();
        Post post = postService.getPost(request.getPostId()).getBody();
        Like like = new Like(request.getId() ,post, user);

        return likeRepository.save(like);
    }

    /**
     * Deletes a like.
     * @param likeId the ID of the like to delete
     */
    public void deleteLike(Long likeId) {
        likeRepository.deleteById(likeId);
    }
}
