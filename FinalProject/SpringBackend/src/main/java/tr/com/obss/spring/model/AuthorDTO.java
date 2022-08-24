package tr.com.obss.spring.model;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class AuthorDTO {


    @NotBlank
    @Size(max = 255, min = 3, message = "Please enter a valid name")
    private String name;

    public AuthorDTO() {}


    public AuthorDTO(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
