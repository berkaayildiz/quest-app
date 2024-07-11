package com.berkaayildiz.quest_app_backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.berkaayildiz.quest_app_backend.entities.Comment;
import com.berkaayildiz.quest_app_backend.entities.Post;
import com.berkaayildiz.quest_app_backend.entities.User;
import com.berkaayildiz.quest_app_backend.repositories.CommentRepository;
import com.berkaayildiz.quest_app_backend.requests.CommentCreateRequest;
import com.berkaayildiz.quest_app_backend.requests.CommentUpdateRequest;
import com.berkaayildiz.quest_app_backend.responses.CommentResponse;


/**
 * CommentService is a service that manages comment-related operations.
 * It provides methods for CRUD operations on posts.
 */
@Service
public class CommentService {

    private final CommentRepository commentRepository;

    private final UserService userService;
    private final PostService postService;

    public CommentService(CommentRepository commentRepository, UserService userService, PostService postService) {
        this.commentRepository = commentRepository;
        this.userService = userService;
        this.postService = postService;
    }

    /**
     * Retrieves a comment by its post ID and user ID, user ID, or post ID.
     * @param postId the ID of the post to retrieve comments for (optional)
     * @param userId the ID of the user to retrieve comments for (optional)
     * @return a ResponseEntity containing a list of comments
     */
    public ResponseEntity<List<CommentResponse>> getComments(Optional<Long> userId, Optional<Long> postId) {
        List<Comment> comments;

        if (userId.isPresent() && postId.isPresent())
            comments = commentRepository.findByUserIdAndPostId(userId.get(), postId.get());
        else if (userId.isPresent())
            comments = commentRepository.findByUserId(userId.get());
        else if (postId.isPresent())
            comments = commentRepository.findByPostId(postId.get());
        else
            comments = commentRepository.findAll();

        return ResponseEntity.ok(comments.stream().map(CommentResponse::new).toList());
    }

    /**
     * Retrieves a comment by its ID.
     * @param commentId the ID of the comment to retrieve
     * @return a ResponseEntity containing the comment if found, or a NOT_FOUND status if not found
     */
    public ResponseEntity<Comment> getComment(Long commentId) {
        Comment comment = commentRepository.findById(commentId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Comment not found"));

        return ResponseEntity.ok(comment);
    }


    /**
     * Creates a new comment.
     * @param commentCreateRequest the comment to create
     * @return the created comment
     */
    public Comment createComment(CommentCreateRequest commentCreateRequest) {
        User user = userService.getDirectUser(commentCreateRequest.getUserId()).getBody();
        Post post = postService.getPost(commentCreateRequest.getPostId()).getBody();
        Comment newComment = new Comment(commentCreateRequest.getId(), post, user, commentCreateRequest.getText());
        return commentRepository.save(newComment);
    }

    /**
     * Updates a comment by its ID.
     * @param commentId the ID of the comment to update
     * @param request the updated comment request
     * @return the updated comment
     */
    public Comment updateOneCommentById(Long commentId, CommentUpdateRequest request) {
		Optional<Comment> comment = commentRepository.findById(commentId);
		if(comment.isPresent()) {
			Comment commentToUpdate = comment.get();
			commentToUpdate.setText(request.getText());
			return commentRepository.save(commentToUpdate);
		}else
			return null;
	}

    /**
     * Deletes a comment by its ID.
     * @param commentId the ID of the comment to delete
     */
	public void deleteOneCommentById(Long commentId) {
		commentRepository.deleteById(commentId);
	}
}
