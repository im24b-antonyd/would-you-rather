package dev.zwazel.springintro.user.dto;

import dev.zwazel.springintro.security.Role;
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
public class ProfileUserDTO {
    private String username;
    private String displayName;
    private String avatarUrl;
    private Instant createdAt;
    private Instant lastLoginDate;
}
