package tr.com.obss.spring.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import tr.com.obss.spring.model.*;
import tr.com.obss.spring.service.UserService;
import tr.com.obss.spring.util.JwtUtil;

import javax.validation.Valid;
import java.util.Properties;

@RestController
public class AuthController {

    private final AuthenticationManager authenticationManager;

    private final UserService userService;

    private final JwtUtil jwtUtil;

    private final JavaMailSenderImpl javaMailSender = new JavaMailSenderImpl();




    public AuthController(AuthenticationManager authenticationManager, UserService userService, JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.jwtUtil = jwtUtil;

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

        return ResponseEntity.ok(new AuthResponse(jwt,role,id,username, createDate));

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
        userService.update(user.getId(),userUpdateDTO);

        return ResponseEntity.ok("Password changed successfully.");

    }

    @PutMapping(value = "/reset-password/{userId}")
    public ResponseEntity<?> resetPassword(@PathVariable(name = "userId") long id, @Valid @RequestBody UserUpdateDTO userDTO) {
        return ResponseEntity.ok(userService.update(id,userDTO));
    }

    @PostMapping(value = "/forgot-password/{email}",consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE,
    produces = {MediaType.APPLICATION_ATOM_XML_VALUE,MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> forgotPassword(@PathVariable String email) throws Exception {
        var user = userService.findByUsername(email);
        if(user != null) {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setTo(email);
            mailMessage.setSubject("BOOKSELF Password Reset!");
            mailMessage.setFrom("suleyman.uslu3d2y@gmail.com");
            mailMessage.setText("To complete the password reset process, please click here:"
                    +"http://localhost:3000/reset-password?id=" + user.getId());

            javaMailSender.setHost("smtp.gmail.com");
            javaMailSender.setPort(587);
            javaMailSender.setUsername("suleyman.uslu3d2y@gmail.com");
            javaMailSender.setPassword("gombcpbjjgsyoptq");
            Properties properties = javaMailSender.getJavaMailProperties();
            properties.put("mail.transport.protocol","smtp");
            properties.put("mail.smtp.auth","true");
            properties.put("mail.smtp.starttls.enable","true");
            properties.put("mail.debug","true");

            javaMailSender.send(mailMessage);
            return ResponseEntity.ok("Check your inbox for the reset link.");
        }
        else {
            return ResponseEntity.ok("There is no user with given email.");
        }

    }


}
