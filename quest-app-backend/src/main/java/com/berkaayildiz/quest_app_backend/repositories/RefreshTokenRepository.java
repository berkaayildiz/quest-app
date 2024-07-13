package com.berkaayildiz.quest_app_backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.berkaayildiz.quest_app_backend.entities.RefreshToken;

public interface  RefreshTokenRepository extends JpaRepository<RefreshToken, Long>
{
    RefreshToken findByUserId(Long userId);
}
