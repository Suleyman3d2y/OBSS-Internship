package tr.com.obss.spring.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);

    @GetMapping("")
    public ResponseEntity<?> getUsers() {
        LOGGER.info("A get request has been sent.");
        return ResponseEntity.ok("A successful get request");
    }

    @PostMapping("")
    public ResponseEntity<?> createUser() {
        LOGGER.info("A get post has been sent.");
        return ResponseEntity.ok("A successful post request");
    }


}
