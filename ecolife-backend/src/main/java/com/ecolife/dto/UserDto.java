package com.ecolife.dto;

import com.ecolife.entity.Role;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
public class UserDto {
    private Long id;
    private String username;
    private String email;
    private Set<String> roles;
    private Integer points;

    public UserDto(Long id, String username, String email, Set<Role> roles, Integer points) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.roles = roles.stream().map(role -> role.getName().name()).collect(Collectors.toSet());
        this.points = points;
    }
}
