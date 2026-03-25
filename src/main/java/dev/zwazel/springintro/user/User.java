package dev.zwazel.springintro.user;

import dev.zwazel.springintro.security.Role;
import jakarta.persistence.*;
import lombok.*;
import org.jspecify.annotations.NullMarked;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Instant;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

/**
 * User entity that represents an application user and implements Spring Security's UserDetails interface.
 *
 * <p>This class bridges the gap between your database and Spring Security:
 * <ul>
 *   <li>As a JPA entity, it's persisted in the database under the "users" table</li>
 *   <li>As a UserDetails, it provides Spring Security with user authentication details (username, password, authorities)</li>
 * </ul>
 *
 * <p>Key Security Feature: The password is stored hashed (via PasswordEncoder) and should never be compared as plain text.
 *
 * @see UserDetails Spring Security's user contract
 * @see Role User's role and authorities
 */
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Setter
@Getter
@Table(name = "users")
public class User implements UserDetails {

    /** Unique identifier generated as UUID */
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    /** Unique email - used as username for authentication */
    @Column(unique = true)
    private String email;

    @Column(unique = true)
    private String username;

    private String displayName;

    private String avatarUrl;

    private Boolean rememberMe;

    private Instant createdAt = Instant.now();

    private Instant lastLoginDate = Instant.now();


    /** Hashed password - never store plain text passwords! */
    private String password;

    /** User's role which determines their authorities/permissions */
    @Enumerated(EnumType.STRING)
    @Column(name="role", nullable = true)
    private Role role = Role.USER; //default;

    /*
    public User(String username, String displayName, String avatarUrl) {
        this.username = username;
        this.displayName = displayName;
        this.avatarUrl = avatarUrl;
    }


    public User(UUID id, String username, String email, String password, String displayName, String avatarUrl) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.displayName = displayName;
        this.avatarUrl = avatarUrl;
    }
     */


    @PrePersist
    public void prePersist() {
        Instant now = Instant.now();
        if (displayName == null){
            displayName = username;
        }
        if (createdAt == null)
            createdAt = now;
        if (role == null) {
            role = Role.USER; // set default if null
        }
        if(avatarUrl == null) {
            avatarUrl = "/uploads/avatar/default-avatar.jpg";
        }
        if (rememberMe == null) {
            rememberMe = false;
        }
    }

    /**
     * Maps the user's role to a collection of granted authorities.
     *
     * <p>Spring Security uses this to determine what actions a user can perform.
     * For example: an ADMIN role might have READ, WRITE, and DELETE privileges.
     *
     * @return Collection of authorities derived from the user's role
     */
    @Override
    @NullMarked
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(
                new SimpleGrantedAuthority("ROLE_" + role.name())
        );
    }

    @Override
    public boolean isAccountNonExpired() {
        return UserDetails.super.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return UserDetails.super.isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return UserDetails.super.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return UserDetails.super.isEnabled();
    }
    /**
     * Returns the username used for authentication (in this case, the email).
     *
     * <p>Spring Security calls this to get the principal identifier during authentication.
     *
     * @return the user's email as username
     */

    /*
    public String saveAvatar(MultipartFile file) throws IOException {
        String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path path = Paths.get("uploads/avatar/" + filename);
        Files.copy(file.getInputStream(), path);

        return "/uploads/avatar/" + filename;
    }
     */
}
