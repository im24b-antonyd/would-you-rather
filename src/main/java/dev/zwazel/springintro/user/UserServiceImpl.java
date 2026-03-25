package dev.zwazel.springintro.user;

import dev.zwazel.springintro.exceptions.ResourceNotFoundException;
import dev.zwazel.springintro.user.dto.UserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

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
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        return UserMapper.mapToUserDTO(user);
    }

    @Override
    public UserDTO findUserByUsername(String username) {
        User user = userRepository.findUserByUsername(username).orElseThrow(() -> new ResourceNotFoundException("User not found with username: " + username));
        return UserMapper.mapToUserDTO(user);
    }

    @Override
    public UserDTO findUserByEmail(String email) {
        User user = userRepository.findUserByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
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
    public UserDTO updateUser(String id, UserDTO updatedUser) {
        UUID uId = UUID.fromString(id);
        User user = userRepository.findById(uId).orElseThrow(() -> new ResourceNotFoundException(id));
        user.setEmail(updatedUser.getEmail() != null
                ? updatedUser.getEmail().toLowerCase()
                : user.getEmail().toLowerCase());

        if (updatedUser.getPassword() != null && !updatedUser.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
        }

        user.setDisplayName(updatedUser.getDisplayName() != null
                ? updatedUser.getDisplayName()
                : user.getDisplayName());

        user.setAvatarUrl(updatedUser.getAvatarUrl() != null
                ? updatedUser.getAvatarUrl()
                : user.getAvatarUrl());

        user.setLastLoginDate(updatedUser.getLastLoginDate() != null
                ? Instant.now()
                : user.getLastLoginDate());

        user.setUsername(updatedUser.getUsername() != null
                ? updatedUser.getUsername().toLowerCase()
                : user.getUsername().toLowerCase());


        User savedUser = userRepository.save(user);
        return UserMapper.mapToUserDTO(savedUser);
    }

    @Override
    public void deleteUser(UUID id) {
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));

        userRepository.delete(user);
    }
}
