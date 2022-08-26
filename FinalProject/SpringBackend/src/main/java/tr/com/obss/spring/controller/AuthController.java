package tr.com.obss.spring.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import tr.com.obss.spring.model.*;
import tr.com.obss.spring.service.EmailService;
import tr.com.obss.spring.service.UserService;
import tr.com.obss.spring.util.JwtUtil;

import javax.validation.Valid;

@RestController
public class AuthController {

    private final AuthenticationManager authenticationManager;

    private final UserService userService;

    private final JwtUtil jwtUtil;

    private final EmailService emailService;


    public AuthController(AuthenticationManager authenticationManager, UserService userService, JwtUtil jwtUtil, EmailService emailService) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.jwtUtil = jwtUtil;

        this.emailService = emailService;
    }


    @PostMapping(value = "/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthRequest authRequest) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));

        } catch (BadCredentialsException e) {
            throw new Exception("Incorrect username or password", e);
        }

        final MyUserDetails userDetails = userService.loadUserByUsername(authRequest.getUsername());
        final String jwt = jwtUtil.generateToken(userDetails);
        var role = jwtUtil.extractRole(jwt);
        var id = jwtUtil.extractId(jwt);
        var username = jwtUtil.extractUsername(jwt);
        var createDate = jwtUtil.extractCreateDate(jwt);

        return ResponseEntity.ok(new AuthResponse(jwt, role, id, username, createDate));

    }

    @PutMapping(value = "/change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest changePasswordRequest) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(changePasswordRequest.getUsername(), changePasswordRequest.getCurrentPassword()));

        } catch (BadCredentialsException e) {
            throw new Exception("Incorrect username or password", e);
        }
        var user = userService.findByUsername(changePasswordRequest.getUsername());
        UserUpdateDTO userUpdateDTO = new UserUpdateDTO(changePasswordRequest.getNewPassword());
        userService.update(user.getId(), userUpdateDTO);

        return ResponseEntity.ok("Password changed successfully.");

    }

    @PutMapping(value = "/reset-password/{token}")
    public ResponseEntity<?> resetPassword(@PathVariable(name = "token") String jwt, @Valid @RequestBody UserUpdateDTO userDTO) {
        var id = Long.parseLong(jwtUtil.extractId(jwt));
        return ResponseEntity.ok(userService.update(id, userDTO));
    }

    @PostMapping(value = "/forgot-password/{email}", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE,
            produces = {MediaType.APPLICATION_ATOM_XML_VALUE, MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> forgotPassword(@PathVariable String email) {

        try {
            final MyUserDetails userDetails = userService.loadUserByUsername(email);
            final String jwt = jwtUtil.generateToken(userDetails);

            String subject = "BOOKSELF Password Reset!";
            String from = "suleyman.uslu3d2y@gmail.com";
            String text = "To complete the password reset process, please click here:"
                    + "http://localhost:3000/reset-password?token=" + jwt;
            emailService.sendEmail(email, subject, from, text);

            return ResponseEntity.ok("Check your inbox for the reset link.");
        } catch (Exception e) {
            return ResponseEntity.ok("An error occurred please try again later.");
        }

    }

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@Valid @RequestBody UserDTO userDTO) {

        return ResponseEntity.ok(userService.save(userDTO));
    }


}
