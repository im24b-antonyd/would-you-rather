package dev.zwazel.springintro.user;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{
    private final UserRepository userRepository;

    @Override
    public List<User> all() {
        return userRepository.findAll();
    }

    @Transactional
    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User findUser(UUID id) {
        return userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id));
    }

    @Override
    public User findUserByUsername(String username) {
        return userRepository.findUserByUsername(username).orElseThrow(() -> new UsernameNotFoundException(username));
    }

    /*
    @Override
    public UserProfileDTO findUserByUsername(String username) {
        User user = userRepository.findUserByUsername(username).orElseThrow(() -> new UserNotFoundByUsername(username));

        return UserProfileMapper.mapToUserProfileDTO(user);
    }
     */

    @Override
    public User updateUser(UUID id, User updatedUser) {
        User user = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id));
        user.setEmail(updatedUser.getEmail());
        user.setUsername(updatedUser.getUsername());
        user.setPassword(updatedUser.getPassword());
        user.setDisplayName(updatedUser.getDisplayName());
        user.setAvatarUrl(updatedUser.getAvatarUrl());

        return userRepository.save(user);
    }

    @Override
    public void deleteUser(UUID id) {
        User user = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id));

        userRepository.deleteById(id);
    }
}
