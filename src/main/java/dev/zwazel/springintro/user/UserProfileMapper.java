package dev.zwazel.springintro.user;

public class UserProfileMapper {

    public static UserProfileDTO mapToUserProfileDTO(User user) {
        return new UserProfileDTO(
                user.getUsername(),
                user.getAvatarUrl(),
                user.getDisplayName()
        );
    }

    /*
    public static User mapToUser(UserProfileDTO userProfileDTO) {
        return new User(
                userProfileDTO.getUsername(),
                userProfileDTO.getDisplayName(),
                userProfileDTO.getAvatarUrl()
        );
    }

     */
}
