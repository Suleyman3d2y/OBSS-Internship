package tr.com.obss.spring.entity;

import javax.persistence.*;
import java.util.Set;


@Entity
@Table(name = "books")
public class Book extends EntityBase {

    @Column(name = "name")
    private String name;

    @ManyToMany(cascade = CascadeType.MERGE,
    fetch = FetchType.EAGER)
    @JoinTable(name = "book_genres",
    joinColumns = {@JoinColumn(name = "book_id",referencedColumnName = "id")},
    inverseJoinColumns = {@JoinColumn(name = "genre_id",referencedColumnName = "id")})
    private Set<Genre> genres;

    @Column(name = "page_count")
    private int pageCount;

    @Column(name = "rating")
    private double rating;

    @Column(name = "isbn",length = 10, unique = true)
    private String isbn;

    @ManyToOne(cascade = CascadeType.MERGE,
            fetch = FetchType.EAGER)
    @JoinTable(name = "book_authors",
            joinColumns = {@JoinColumn(name = "book_id",referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "author_id",referencedColumnName = "id")} )
    private Author author;


    public double getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Genre> getGenres() {
        return genres;
    }

    public void setGenres(Set<Genre> genres) {
        this.genres = genres;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public int getPageCount() {
        return pageCount;
    }

    public void setPageCount(int pageCount) {
        this.pageCount = pageCount;
    }

    public Author getAuthor() {
        return author;
    }

    public void setAuthor(Author author) {
        this.author = author;
    }
}
