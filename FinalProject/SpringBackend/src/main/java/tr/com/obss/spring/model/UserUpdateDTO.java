package tr.com.obss.spring.model;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class UserUpdateDTO {


    @NotBlank
    @Size(max = 255, min = 3, message = "Please enter a valid password")
    private String password;


    public UserUpdateDTO(){}

    public UserUpdateDTO(String password) {

        this.password = password;
    }



    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
