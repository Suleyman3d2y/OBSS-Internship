package tr.com.obss.spring.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import tr.com.obss.spring.model.UserDTO;
import tr.com.obss.spring.model.UserUpdateDTO;
import tr.com.obss.spring.service.UserService;

import javax.annotation.security.RolesAllowed;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;


    public UserController(UserService userService) {
        this.userService = userService;
    }


    private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);

    @GetMapping("")
    @PreAuthorize("hasRole('role_admin')")
    //@RolesAllowed("role_admin")
    //@Secured("role_admin")
    public ResponseEntity<?> getUsers() {
        LOGGER.info("A get request has been sent.");
        return ResponseEntity.ok(userService.findAll());
    }

    @GetMapping("/has-role-user")
    public ResponseEntity<?> getUsersWithUserRole() {
        return ResponseEntity.ok(userService.getUsersWithRole(List.of("role_user")));
    }


    @GetMapping("/with-dao-pagination")
    public ResponseEntity<?> getUsersWithDaoPagination(
            @RequestParam(name="pageSize", defaultValue = "5") int pageSize,
            @RequestParam(name="pageNumber", defaultValue = "0") int pageNumber) {
        return ResponseEntity.ok(userService.findAllWithDaoPagination(pageNumber,pageSize));
    }

    @GetMapping("/with-jpa-pagination")
    public ResponseEntity<?> getUsersWithJpaPagination(
            @RequestParam(name="pageSize", defaultValue = "5") int pageSize,
            @RequestParam(name="pageNumber", defaultValue = "0") int pageNumber) {
        return ResponseEntity.ok(userService.findAllWithJpaPagination(pageNumber,pageSize));
    }


    @GetMapping("/by-username")
    public ResponseEntity<?> searchUsers(@RequestParam(name="username", defaultValue = "") String username) {
        LOGGER.info("A get request has been sent.");
        return ResponseEntity.ok(userService.findByUsername(username));
    }

    @GetMapping("/all-by-username")
    public ResponseEntity<?> searchAllUsers(@RequestParam(name="username", defaultValue = "") String username) {
        LOGGER.info("A get request has been sent.");
        return ResponseEntity.ok(userService.findAllByUsername(username));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getUser(@PathVariable(name = "userId") long id) {
        return ResponseEntity.ok(userService.findById(id));
    }

    @GetMapping("/by-hql/{userId}")
    public ResponseEntity<?> getUserByHql(@PathVariable(name = "userId") long id) {
        return ResponseEntity.ok(userService.getById(id));
    }

    @GetMapping("/by-native-sql/{userId}")
    public ResponseEntity<?> getUserByNativeSql(@PathVariable(name = "userId") long id) {
        return ResponseEntity.ok(userService.getByIdNative(id));
    }

    @PutMapping("/{userId}")
    public ResponseEntity<?> updateUser(@PathVariable(name = "userId") long id, @Valid @RequestBody UserUpdateDTO userDTO) {
        return ResponseEntity.ok(userService.update(id,userDTO));
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<?> removeUser(@PathVariable(name = "userId") long id) {
        return ResponseEntity.ok(userService.remove(id));
    }


    @PostMapping("")
    public ResponseEntity<?> createUser(@Valid @RequestBody UserDTO userDTO) {
        LOGGER.info("User info: {} {}", userDTO.getUsername(), userDTO.getPassword());


        return ResponseEntity.ok(userService.save(userDTO));
    }


}
