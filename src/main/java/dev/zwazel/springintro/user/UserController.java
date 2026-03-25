package dev.zwazel.springintro.user;

import dev.zwazel.springintro.user.dto.UserDTO;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/users")
public class UserController {
    private final UserService service;


    @GetMapping("/byId/{id}")
    public ResponseEntity<UserDTO> findUser(@PathVariable("id") UUID userId){
        UserDTO userDTO = service.findUser(userId);
        return ResponseEntity.ok(userDTO);
    }

    @GetMapping("/byUsername/{username}")
    public ResponseEntity<UserDTO> findUserByUsername(@PathVariable("username") String username){
        UserDTO userDTO = service.findUserByUsername(username.toLowerCase());
        return ResponseEntity.ok(userDTO);
    }

    @GetMapping("/byEmail/{email}")
    public ResponseEntity<UserDTO> findUserByEmail(@PathVariable("email") String email){
        UserDTO userDTO = service.findUserByEmail(email.toLowerCase());
        return ResponseEntity.ok(userDTO);
    }

    /*
    @PostMapping("/checkPassword")
    public boolean isPasswordCorrect(String password, String email){
        Optional<User> userOpt = service.findUserByEmail(email);
        User user = userOpt.orElseThrow(() -> new UserNotFoundByUsername(email));
        return password.equals(user.getPassword());
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
    public ResponseEntity<UserDTO> createUser(@RequestBody UserDTO input) {
        UserDTO savedUser = service.createUser(input);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    @GetMapping("/")
    public ResponseEntity<List<UserDTO>> all() {
        List<UserDTO> users = service.all();
        return ResponseEntity.ok(users);
    }

    //Update User
    @PutMapping("/update/{id}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable("id") String userId, @RequestBody UserDTO input){
        UserDTO user = service.updateUser(userId, input);
        return ResponseEntity.ok(user);
    }

    //delete User
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") UUID userId){
        service.deleteUser(userId);
        return ResponseEntity.ok("User successfully deleted!");
    }

}
