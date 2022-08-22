package tr.com.obss.spring.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name="authors")
public class Author extends EntityBase {


    @Column(name = "name", unique = true)
    private String name;


    @OneToMany(mappedBy = "author")
    @JsonBackReference
    private Set<Book> books;


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Book> getBooks() {
        return books;
    }

    public void setBooks(Set<Book> books) {
        this.books = books;
    }
}
