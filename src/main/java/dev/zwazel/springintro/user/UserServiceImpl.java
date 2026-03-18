package dev.zwazel.springintro.user;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    @Override
    public List<UserDTO> all() {
        List<User> users = userRepository.findAll();
        return users.stream().map(UserMapper::mapToUserDTO).toList();
    }

    @Transactional
    @Override
    public UserDTO createUser(UserDTO userDTO) {
        if (userDTO.getEmail() == null || userDTO.getEmail().isBlank()) {
            throw new IllegalArgumentException("Email is required");
        }

        if (userDTO.getUsername() == null || userDTO.getUsername().isBlank()) {
            throw new IllegalArgumentException("Username is required");
        }

        if (userRepository.existsByEmail(userDTO.getEmail())) {
            throw new IllegalArgumentException("Email is already in use");
        }

        if (userRepository.existsByUsername(userDTO.getUsername())) {
            throw new IllegalArgumentException("Username is already in use");
        }
        User user = UserMapper.mapToUser(userDTO);
        user.setUsername(userDTO.getUsername().toLowerCase());
        user.setEmail(userDTO.getEmail().toLowerCase());

        User savedUser = userRepository.save(user);
        return UserMapper.mapToUserDTO(savedUser);
    }

    @Override
    public UserDTO findUser(UUID id) {
        User user = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id));
        return UserMapper.mapToUserDTO(user);
    }

    @Override
    public UserDTO findUserByUsername(String username) {
        User user = userRepository.findUserByUsername(username).orElseThrow(() -> new UserNotFoundByUsername(username));
        return UserMapper.mapToUserDTO(user);
    }

    @Override
    public UserDTO findUserByEmail(String email) {
        User user = userRepository.findUserByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found with email: " + email));
        return UserMapper.mapToUserDTO(user);
    }

    /*
    @Override
    public UserProfileDTO findUserByUsername(String username) {
        User user = userRepository.findUserByUsername(username).orElseThrow(() -> new UserNotFoundByUsername(username));

        return UserProfileMapper.mapToUserProfileDTO(user);
    }
     */

    @Override
    public UserDTO updateUser(UUID id, UserDTO updatedUser) {
        User user = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id));
        user.setEmail(updatedUser.getEmail() != null
                ? updatedUser.getEmail().toLowerCase()
                : user.getEmail().toLowerCase());

        user.setPassword(updatedUser.getPassword() != null
                ? updatedUser.getPassword()
                : user.getPassword());

        user.setDisplayName(updatedUser.getDisplayName() != null
                ? updatedUser.getDisplayName()
                : user.getDisplayName());

        user.setAvatarUrl(updatedUser.getAvatarUrl() != null
                ? updatedUser.getAvatarUrl()
                : user.getAvatarUrl());

        user.setLastLoginDate(updatedUser.getLastLoginDate() != null
                ? updatedUser.getLastLoginDate()
                : user.getLastLoginDate());

        user.setUsername(updatedUser.getUsername() != null
                ? updatedUser.getUsername()
                : user.getUsername());


        User savedUser = userRepository.save(user);
        return UserMapper.mapToUserDTO(savedUser);
    }

    @Override
    public void deleteUser(UUID id) {
        User user = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id));

        userRepository.deleteById(id);
    }
}
