package tr.com.obss.spring.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tr.com.obss.spring.cache.UserCachePrototype;
import tr.com.obss.spring.cache.UserCacheSingleton;
import tr.com.obss.spring.model.UserDTO;
import tr.com.obss.spring.service.UserService;

import javax.validation.Valid;
import java.util.HashMap;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }


    private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);

    @GetMapping("")
    public ResponseEntity<?> getUsers() {
        LOGGER.info("A get request has been sent.");
        return ResponseEntity.ok("A successful get request");
    }

    @PostMapping("")
    public ResponseEntity<?> createUser(@Valid @RequestBody UserDTO userDTO) {
        LOGGER.info("User info: {} {}", userDTO.getUsername(), userDTO.getPassword());


        return ResponseEntity.ok(userService.save(userDTO));
    }


}
