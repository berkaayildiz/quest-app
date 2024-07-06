package com.berkaayildiz.quest_app_backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.berkaayildiz.quest_app_backend.entities.User;


public interface UserRepository extends JpaRepository<User, Long> {}
