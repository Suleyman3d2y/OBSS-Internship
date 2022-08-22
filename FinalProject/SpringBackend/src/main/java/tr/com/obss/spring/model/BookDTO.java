package tr.com.obss.spring.model;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.List;

public class BookDTO {


    @NotBlank
    @Size(max = 255, min = 1, message = "Please enter a valid name")
    private String name;

    @Size(max = 255, min = 3, message = "Please enter a valid genre")
    private List<String> genre;

    @NotBlank
    @Size(max = 255, min = 1, message = "Please enter a valid page count")
    private String pageCount;

    @NotBlank
    @Size(max = 10000, min = 1, message = "Please enter a valid rating")
    private String rating;

    @NotBlank
    @Size(max = 10, min = 10, message = "Please enter a valid isbn")
    private String isbn;

    @NotBlank
    @Size(max = 255, min = 1, message = "Please enter a valid author name")
    private String authorName;




    public BookDTO(String name, List<String> genre,String authorName, String pageCount,String rating, String isbn) {
        this.name = name;
        this.genre = genre;
        this.authorName = authorName;
        this.pageCount = pageCount;
        this.rating = rating;
        this.isbn = isbn;
    }

    public String getRating() {
        return rating;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorId) {
        this.authorName = authorId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<String> getGenre() {
        return genre;
    }

    public void setGenre(List<String> genre) {
        this.genre = genre;
    }

    public String getPageCount() {
        return pageCount;
    }

    public void setPageCount(String pageCount) {
        this.pageCount = pageCount;
    }
}
