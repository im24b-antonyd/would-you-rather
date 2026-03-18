package dev.zwazel.springintro.user;

import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserService {
    List<UserDTO> all();

    @Transactional
    UserDTO createUser(UserDTO input);

    UserDTO findUser(UUID id);

    UserDTO findUserByUsername(String username);

    UserDTO findUserByEmail(String email);

    //UserProfileDTO findUserByUsername(String username);
    UserDTO updateUser(UUID id, UserDTO updatedUser);

    void deleteUser(UUID id);
}
