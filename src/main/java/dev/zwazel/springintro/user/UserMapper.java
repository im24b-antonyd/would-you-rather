package dev.zwazel.springintro.user;

import dev.zwazel.springintro.user.dto.UserDTO;

public class UserMapper {
    public static UserDTO mapToUserDTO(User user) {
        return new UserDTO(
                user.getId(),
                user.getEmail(),
                user.getUsername(),
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

}
