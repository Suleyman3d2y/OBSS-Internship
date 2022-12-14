package tr.com.obss.spring.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import tr.com.obss.spring.model.UserDTO;
import tr.com.obss.spring.model.UserUpdateDTO;
import tr.com.obss.spring.service.UserService;

import javax.validation.Valid;
import java.util.List;



@RestController
@RequestMapping("/users")
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class UserController {

    private final UserService userService;


    public UserController(UserService userService) {
        this.userService = userService;
    }


    private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);

    @GetMapping("/")
    public ResponseEntity<?> getUsersWithJpaPagination(
            @RequestParam(name = "pageSize", defaultValue = "10") int pageSize,
            @RequestParam(name = "pageNumber", defaultValue = "0") int pageNumber) {
        return ResponseEntity.ok(userService.findAllWithJpaPagination(pageNumber, pageSize));
    }

    @GetMapping("/by-username")
    public ResponseEntity<?> searchUsers(@RequestParam(name = "username", defaultValue = "") String username) {

        return ResponseEntity.ok(userService.findByUsername(username));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getUser(@PathVariable(name = "userId") long id) {

        return ResponseEntity.ok(userService.findById(id));
    }


    @PutMapping("/{userId}")
    public ResponseEntity<?> updateUser(@PathVariable(name = "userId") long id, @Valid @RequestBody UserUpdateDTO userDTO) {
        return ResponseEntity.ok(userService.update(id, userDTO));
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<?> removeUser(@PathVariable(name = "userId") long id) {
        return ResponseEntity.ok(userService.remove(id));
    }

    @PostMapping("")
    public ResponseEntity<?> createUser(@Valid @RequestBody UserDTO userDTO) {

        return ResponseEntity.ok(userService.save(userDTO));
    }


    @GetMapping("/all-by-username")
    public ResponseEntity<?> searchAllUsers(@RequestParam(name = "username", defaultValue = "") String username) {
        LOGGER.info("A get request has been sent.");
        return ResponseEntity.ok(userService.findAllByUsername(username));
    }

    @GetMapping("/has-role-user/{role}")
    public ResponseEntity<?> getUsersWithUserRole(@PathVariable(name="role") String role) {
        return ResponseEntity.ok(userService.getUsersWithRole(List.of(role)));
    }


}
