package dev.zwazel.springintro.user;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("/api/users")
public class UserController {
    private final UserService service;


    @GetMapping("/{id}")
    public ResponseEntity<User> findUser(@PathVariable("id") UUID userId){
        User user = service.findUser(userId);
        return ResponseEntity.ok(user);
    }

    /*
    @GetMapping("/{username}")
    public ResponseEntity<User> findUser(@PathVariable("username") String username){
        User user = service.findUserByUsername(username);
        return ResponseEntity.ok(user);
    }
     */

    /*
    @GetMapping("/{username}")
    public UserProfileDTO findUserByUsername(@PathVariable("username") String username) {
        UserProfileDTO user = service.findUserByUsername(username);
        return new UserProfileDTO(
                user.getUsername(),
                user.getDisplayName(),
                user.getAvatarUrl()
                // optionally include email if DTO has it
        );    }
    */
    @PostMapping("/register")
    public ResponseEntity<User> createUser(@RequestBody User input) {
        User savedUser = service.createUser(input);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    @GetMapping("/")
    public ResponseEntity<List<User>> all() {
        List<User> users = service.all();
        return ResponseEntity.ok(users);
    }

    //Update User
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable("id") UUID userId, @RequestBody User input){
        User user = service.updateUser(userId, input);
        return ResponseEntity.ok(user);
    }

    //delete User
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") UUID userId){
        service.deleteUser(userId);
        return ResponseEntity.ok("User successfully deleted!");
    }

}
