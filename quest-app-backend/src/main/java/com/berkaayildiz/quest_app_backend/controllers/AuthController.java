package com.berkaayildiz.quest_app_backend.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.berkaayildiz.quest_app_backend.entities.User;
import com.berkaayildiz.quest_app_backend.requests.UserRequest;
import com.berkaayildiz.quest_app_backend.security.JwtTokenProvider;
import com.berkaayildiz.quest_app_backend.services.UserService;

@RestController
@RequestMapping("/auth")
public class AuthController
{
	private final AuthenticationManager authenticationManager;
	private final UserService userService;
	private final JwtTokenProvider jwtTokenProvider;
	private final PasswordEncoder passwordEncoder;

	
    public AuthController(AuthenticationManager authenticationManager, UserService userService, PasswordEncoder passwordEncoder, JwtTokenProvider jwtTokenProvider) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    
	@PostMapping("/login")
	public String login(@RequestBody UserRequest loginRequest) {
		UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword());
		Authentication auth = authenticationManager.authenticate(authToken);
		SecurityContextHolder.getContext().setAuthentication(auth);
		String jwtToken = jwtTokenProvider.generateJwtToken(auth);
		return "Bearer " + jwtToken;
	}
	
	@PostMapping("/register")
	public ResponseEntity<String> register(@RequestBody UserRequest registerRequest) {
		if(userService.getUserByUsername(registerRequest.getUsername()) != null) {
			return new ResponseEntity<>("Username is already in use.", HttpStatus.BAD_REQUEST);
		}
		
		User user = new User();
		user.setUsername(registerRequest.getUsername());
		user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
		userService.createUser(user);

		return new ResponseEntity<>("User successfully registered.", HttpStatus.CREATED);
	}
}
