package com.ecolife.controller;

import com.ecolife.dto.ApiResponse;
import com.ecolife.dto.LoginRequest;
import com.ecolife.dto.RegisterRequest;
import com.ecolife.dto.UserDto;
import com.ecolife.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<UserDto>> register(@Valid @RequestBody RegisterRequest request) {
        try {
            UserDto userDto = authService.register(request);
            return ResponseEntity.ok(ApiResponse.success("User registered successfully!", userDto));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<String>> login(@Valid @RequestBody LoginRequest request) {
        try {
            String jwt = authService.login(request);
            return ResponseEntity.ok(ApiResponse.success("Login successful!", jwt));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Invalid credentials: " + e.getMessage()));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<String>> logout() {
        return ResponseEntity.ok(ApiResponse.success("Logged out successfully"));
    }
}
