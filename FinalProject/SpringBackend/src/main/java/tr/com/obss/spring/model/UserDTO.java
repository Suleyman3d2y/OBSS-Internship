package tr.com.obss.spring.model;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class UserDTO {

    @NotBlank
    @Size(max = 255, min = 3, message = "Please enter a valid username")
    @Email
    private String username;

    @NotBlank
    @Size(max = 255, min = 3, message = "Please enter a valid password")
    private String password;

    @NotBlank
    private String role;


    public UserDTO(String username, String password, String role) {
        this.username = username;
        this.password = password;
        this.role = role;
    }


    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }



    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
