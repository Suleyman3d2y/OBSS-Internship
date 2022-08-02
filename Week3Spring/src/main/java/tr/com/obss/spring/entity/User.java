package tr.com.obss.spring.entity;


import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "user_account")
public class User extends EntityBase {

    @Column(name = "username", length = 255, unique = true)
    private String username;

    @Column(name = "password", length = 255)
    private String password;


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
