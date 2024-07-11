package com.berkaayildiz.quest_app_backend.services;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.berkaayildiz.quest_app_backend.repositories.UserRepository;
import com.berkaayildiz.quest_app_backend.security.JwtUserDetails;


@Service
public class UserDetailsServiceImpl implements UserDetailsService
{
    private final UserRepository userRepository;

    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        try { return JwtUserDetails.create(userRepository.findByUsername(username)); }
        catch (Exception e) { throw new UsernameNotFoundException("User not found with username: " + username); }
    }

    public UserDetails loadUserById(Long id) {
        try { return JwtUserDetails.create(userRepository.findById(id).get()); }
        catch (Exception e) { throw new UsernameNotFoundException("User not found with id: " + id); }
    }
}
