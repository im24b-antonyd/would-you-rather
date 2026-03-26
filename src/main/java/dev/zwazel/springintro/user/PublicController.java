package dev.zwazel.springintro.user;

import dev.zwazel.springintro.user.dto.ProfileUserDTO;
import dev.zwazel.springintro.user.dto.UserDTO;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/public")
public class PublicController {

    private final UserService service;

    @GetMapping("/user/{username}")
    public ResponseEntity<ProfileUserDTO> getProfileUser(@PathVariable("username") String username){
        ProfileUserDTO profileUserDTO = service.getProfileUser(username.toLowerCase());
        return ResponseEntity.ok(profileUserDTO);
    }

    @GetMapping("/users")
    public ResponseEntity<List<ProfileUserDTO>> getPublicUsers(){
        List<ProfileUserDTO> users = service.getAllProfileUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/")
    public ResponseEntity<List<UserDTO>> all() {
        List<UserDTO> users = service.all();
        return ResponseEntity.ok(users);
    }
}
