package com.berkaayildiz.quest_app_backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.berkaayildiz.quest_app_backend.entities.Comment;


public interface CommentRepository extends JpaRepository<Comment, Long> {}
