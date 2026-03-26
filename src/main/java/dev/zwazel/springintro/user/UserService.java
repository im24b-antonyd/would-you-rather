package dev.zwazel.springintro.user;

import dev.zwazel.springintro.user.dto.ProfileUserDTO;
import dev.zwazel.springintro.user.dto.UserDTO;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

public interface UserService {
    List<UserDTO> all();

    @Transactional
    UserDTO createUser(UserDTO input);

    UserDTO findUser(UUID id);

    UserDTO findUserByUsername(String username);

    ProfileUserDTO getProfileUser(String username);

    List<ProfileUserDTO> getAllProfileUsers();

    UserDTO findUserByEmail(String email);

    //UserProfileDTO findUserByUsername(String username);
    UserDTO updateUser(String id, UserDTO updatedUser);

    void deleteUser(UUID id);
}
