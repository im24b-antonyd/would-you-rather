package dev.zwazel.springintro.user;

import dev.zwazel.springintro.user.dto.ProfileUserDTO;
import dev.zwazel.springintro.user.dto.UserDTO;
import org.springframework.stereotype.Component;


@Component
public class UserMapper {
    public static UserDTO mapToUserDTO(User user) {
        return new UserDTO(
                user.getId(),
                user.getEmail(),
                user.getRealUsername(),
                user.getDisplayName(),
                user.getAvatarUrl(),
                user.getRememberMe(),
                user.getCreatedAt(),
                user.getLastLoginDate(),
                user.getPassword(),
                user.getRole()
        );
    }

    public static User mapToUser(UserDTO userDTO) {
        return new User(
                userDTO.getId(),
                userDTO.getEmail(),
                userDTO.getUsername(),
                userDTO.getDisplayName(),
                userDTO.getAvatarUrl(),
                userDTO.getRememberMe(),
                userDTO.getCreatedAt(),
                userDTO.getLastLoginDate(),
                userDTO.getPassword(),
                userDTO.getRole()
        );
    }

    public static ProfileUserDTO toResponse(User user) {
        ProfileUserDTO dto = new ProfileUserDTO();
        dto.setUsername(user.getRealUsername());
        dto.setDisplayName(user.getDisplayName());
        dto.setAvatarUrl(user.getAvatarUrl());
        dto.setCreatedAt(user.getCreatedAt());
        dto.setLastLoginDate(user.getLastLoginDate());
        return dto;
    }
}
