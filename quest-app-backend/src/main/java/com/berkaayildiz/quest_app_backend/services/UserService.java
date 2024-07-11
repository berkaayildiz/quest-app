package com.berkaayildiz.quest_app_backend.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.berkaayildiz.quest_app_backend.entities.User;
import com.berkaayildiz.quest_app_backend.repositories.UserRepository;
import com.berkaayildiz.quest_app_backend.responses.UserResponse;


/**
 * UserService is a service that manages user-related operations.
 * It provides methods for CRUD operations on users.
 */
@Service
public class UserService {
    
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Retrieves a user by their ID.
     * @param userId the ID of the user to retrieve
     * @return a ResponseEntity containing the user if found, or a NOT_FOUND status if not found
     */
    public ResponseEntity<UserResponse> getUser(Long userId) {
        User user = userRepository.findById(userId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    
        return ResponseEntity.ok(new UserResponse(user));
    }

    // Needed for some internal operations
    protected ResponseEntity<User> getDirectUser(Long userId) {
        User user = userRepository.findById(userId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    
        return ResponseEntity.ok(user);
    }

    /**
     * Retrieves all users.
     * @return a list of all users
     */
    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream().map(user -> new UserResponse(user)).collect(Collectors.toList());
    }

    /**
     * Creates a new user.
     * @param user the user to create
     * @return the created user
     */
    public User createUser(User user) {
        return userRepository.save(user);
    }

    /** 
     * Updates a user.
     * @param userId the ID of the user to update
     * @param updatedUser the updated user
     * @return a ResponseEntity containing the updated user
     */
    public ResponseEntity<User> updateUser(Long userId, User updatedUser) {
        User user = userRepository.findById(userId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        user.setUsername(updatedUser.getUsername());
        user.setPassword(updatedUser.getPassword());
    
        return ResponseEntity.ok(userRepository.save(user));
    }

    /**
     * Deletes a user.
     * @param userId the ID of the user to delete
     * @return a ResponseEntity with no content
     */
    public ResponseEntity<?> deleteUser(Long userId) {
        User user = userRepository.findById(userId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    
        userRepository.delete(user);
        return ResponseEntity.noContent().build();
    }

    /**
     * Retrieves a user by their username.
     * @param username the username of the user to retrieve
     * @return the user if found, or null if not found
     */
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
