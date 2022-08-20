package tr.com.obss.spring.entity;

import javax.persistence.*;


@Entity
@Table(name = "books")
public class Book extends EntityBase {

    @Column(name = "name", length = 255)
    private String name;

    @Column(name = "genre",length = 255)
    private String genre;

    @Column(name = "page_count",length = 255)
    private int pageCount;

    @Column(name = "rating",length = 255)
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

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
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
