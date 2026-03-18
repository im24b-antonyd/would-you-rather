package dev.zwazel.springintro.user;

import dev.zwazel.springintro.security.Role;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private UUID id;
    private String email;
    private String username;
    private String displayName;
    private String avatarUrl;
    private Boolean rememberMe;
    private Instant createdAt = Instant.now();
    private Instant lastLoginDate = Instant.now();
    private String password;
    private Role role = Role.USER; //default;
}
