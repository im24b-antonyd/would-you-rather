package dev.zwazel.springintro.user;

import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserService {
    List<User> all();

    @Transactional
    User createUser(User input);

    User findUser(UUID id);

    User findUserByUsername(String username);

    //UserProfileDTO findUserByUsername(String username);

    User updateUser(UUID id, User updatedUser);

    void deleteUser(UUID id);
}
