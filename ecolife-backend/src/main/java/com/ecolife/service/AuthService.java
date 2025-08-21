package com.ecolife.service;

import com.ecolife.dto.LoginRequest;
import com.ecolife.dto.RegisterRequest;
import com.ecolife.dto.UserDto;
import com.ecolife.entity.User;
import com.ecolife.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;

    public UserDto register(RegisterRequest request) {
        User user = userService.registerNewUser(request.getUsername(), request.getEmail(), request.getPassword());
        return new UserDto(user.getId(), user.getUsername(), user.getEmail(), user.getRoles(), user.getPoints());
    }

    public String login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return jwtUtil.generateToken(userDetails.getUsername());
    }
}
