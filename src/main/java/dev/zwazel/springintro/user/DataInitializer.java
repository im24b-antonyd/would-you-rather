package dev.zwazel.springintro.user;

import dev.zwazel.springintro.security.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    @Override
    public void run(String... args) {
        System.out.println("🚀 DataInitializer is running...");
        if (userRepository.count() == 0) {
            User user1 = User.builder()
                    .email("test@example.com")
                    .username("testuser")
                    .password(passwordEncoder.encode("Password123!"))
                    .role(Role.USER)
                    .build();

            User admin = User.builder()
                    .email("admin@example.com")
                    .username("admin")
                    .password(passwordEncoder.encode("Admin123!"))
                    .role(Role.ADMIN)
                    .build();

            userRepository.saveAll(List.of(user1, admin));
        }
    }
}
