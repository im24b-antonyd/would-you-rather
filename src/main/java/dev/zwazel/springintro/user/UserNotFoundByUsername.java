package dev.zwazel.springintro.user;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class UserNotFoundByUsername extends RuntimeException {
    public UserNotFoundByUsername(String username) {
        super("Couldn't find User named " + username);
    }
}
