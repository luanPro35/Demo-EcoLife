package com.ecolife.security;

import com.ecolife.service.UserDetailsServiceImpl;
import com.ecolife.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final UserDetailsServiceImpl userDetailsService;
    private final JwtUtil jwtUtil;
    
    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);
    
    // Whitelist các endpoint không cần authentication
    private static final List<String> PUBLIC_ENDPOINTS = Arrays.asList(
        "/api/auth/login",
        "/api/auth/register",
        "/api/auth/refresh",
        "/api/public/",
        "/swagger-ui/",
        "/v3/api-docs",
        "/actuator/health"
    );

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        
        final String requestPath = request.getRequestURI();
        final String method = request.getMethod();
        
        // Skip JWT validation cho public endpoints
        if (isPublicEndpoint(requestPath)) {
            filterChain.doFilter(request, response);
            return;
        }
        
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String email;

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            logger.warn("Missing or invalid Authorization header for {} {}", method, requestPath);
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            response.getWriter().write("{\"error\":\"Missing or invalid Authorization header\"}");
            return;
        }

        jwt = authHeader.substring(7);
        try {
            email = jwtUtil.extractUsername(jwt);
            
            if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                logger.debug("Processing JWT for user: {} on {} {}", email, method, requestPath);
                
                UserDetails userDetails = this.userDetailsService.loadUserByUsername(email);
                
                if (jwtUtil.validateToken(jwt, userDetails)) {
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails, null, userDetails.getAuthorities());
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                    
                    logger.debug("Successfully authenticated user: {} for {} {}", email, method, requestPath);
                } else {
                    logger.warn("Invalid JWT token for user: {} on {} {}", email, method, requestPath);
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    response.setContentType("application/json");
                    response.getWriter().write("{\"error\":\"Invalid token\"}");
                    return;
                }
            }
        } catch (io.jsonwebtoken.ExpiredJwtException e) {
            logger.warn("JWT token has expired for {} {}: {}", method, requestPath, e.getMessage());
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            response.getWriter().write("{\"error\":\"Token has expired\",\"timestamp\":\"" + System.currentTimeMillis() + "\"}");
            return;
        } catch (io.jsonwebtoken.JwtException e) {
            logger.error("Invalid JWT token for {} {}: {}", method, requestPath, e.getMessage());
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            response.getWriter().write("{\"error\":\"Invalid token\",\"details\":\"" + e.getMessage() + "\"}");
            return;
        } catch (Exception e) {
            logger.error("Authentication error for {} {}: {}", method, requestPath, e.getMessage(), e);
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.setContentType("application/json");
            response.getWriter().write("{\"error\":\"Authentication error\",\"timestamp\":\"" + System.currentTimeMillis() + "\"}");
            return;
        }

        filterChain.doFilter(request, response);
    }
    
    private boolean isPublicEndpoint(String requestPath) {
        return PUBLIC_ENDPOINTS.stream()
            .anyMatch(publicPath -> requestPath.startsWith(publicPath) || requestPath.contains(publicPath));
    }
}
