package tr.com.obss.spring.entity;


import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "user_account")
public class User extends EntityBase {

    @Column(name = "username", length = 255, unique = true)
    private String username;

    @Column(name = "password", length = 255)
    private String password;

    @ManyToMany(cascade = CascadeType.MERGE,
                fetch = FetchType.EAGER)
    @JoinTable(name = "users_roles",
    joinColumns = {@JoinColumn(name = "user_id",referencedColumnName = "id")},
    inverseJoinColumns = {@JoinColumn(name = "role_id",referencedColumnName = "id")} )
    @JsonManagedReference
    private Set<Role> roles;

    @ManyToMany(cascade = CascadeType.MERGE,
            fetch = FetchType.EAGER)
    @JoinTable(name = "read_list",
            joinColumns = {@JoinColumn(name = "user_id",referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "book_id",referencedColumnName = "id")} )
    @JsonManagedReference
    private Set<Book> read_list;

    @ManyToMany(cascade = CascadeType.MERGE,
            fetch = FetchType.EAGER)
    @JoinTable(name = "fav_list",
            joinColumns = {@JoinColumn(name = "user_id",referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "book_id",referencedColumnName = "id")} )
    @JsonManagedReference
    private Set<Book> fav_list;

    public Set<Book> getRead_list() {
        return read_list;
    }

    public void setRead_list(Set<Book> read_list) {
        this.read_list = read_list;
    }

    public Set<Book> getFav_list() {
        return fav_list;
    }

    public void setFav_list(Set<Book> fav_list) {
        this.fav_list = fav_list;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
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
