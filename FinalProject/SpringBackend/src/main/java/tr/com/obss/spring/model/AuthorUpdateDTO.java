package tr.com.obss.spring.model;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class AuthorUpdateDTO {

    @NotBlank
    @Size(max = 255, min = 3, message = "Please enter a valid password")
    private String name;

    public AuthorUpdateDTO () {}

    public AuthorUpdateDTO(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
