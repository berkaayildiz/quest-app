package com.berkaayildiz.quest_app_backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.berkaayildiz.quest_app_backend.entities.Post;


public interface PostRepository extends JpaRepository<Post, Long> {

    List<Post> findByUserId(Long userId);

}
