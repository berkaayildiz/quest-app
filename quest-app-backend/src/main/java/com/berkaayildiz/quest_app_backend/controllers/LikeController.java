package com.berkaayildiz.quest_app_backend.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.berkaayildiz.quest_app_backend.entities.Like;
import com.berkaayildiz.quest_app_backend.requests.LikeCreateRequest;
import com.berkaayildiz.quest_app_backend.responses.LikeResponse;
import com.berkaayildiz.quest_app_backend.services.LikeService;

@RestController
@RequestMapping("/likes")
public class LikeController
{
	private final LikeService likeService;

	public LikeController(LikeService likeService) {
		this.likeService = likeService;
	}
	
	@GetMapping
	public List<LikeResponse> getAllLikes(@RequestParam Optional<Long> userId, @RequestParam Optional<Long> postId) {
		return likeService.getLikes(userId, postId).getBody();
	}
	
    @GetMapping("/{likeId}")
    public Like getOneLike(@PathVariable Long likeId) {
        return likeService.getLike(likeId);
    }
    
	@PostMapping
	public Like createOneLike(@RequestBody LikeCreateRequest request) {
		return likeService.createLike(request);
	}
	
	@DeleteMapping("/{likeId}")
	public void deleteOneLike(@PathVariable Long likeId) {
		likeService.deleteLike(likeId);
	}
}
