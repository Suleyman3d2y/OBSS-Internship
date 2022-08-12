package tr.com.obss.spring.model;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class BookDTO {


    @NotBlank
    @Size(max = 255, min = 1, message = "Please enter a valid name")
    private String name;

    @NotBlank
    @Size(max = 255, min = 3, message = "Please enter a valid genre")
    private String genre;

    @NotBlank
    @Size(max = 255, min = 1, message = "Please enter a valid page count")
    private String pageCount;

    @NotBlank
    @Size(max = 10000, min = 1, message = "Please enter a valid page count")
    private String rating;

    @NotBlank
    @Size(max = 13, min = 13, message = "Please enter a valid page count")
    private String isbn;

    @NotBlank
    @Size(max = 255, min = 1, message = "Please enter a valid author")
    private String authorId;




    public BookDTO(String name, String genre,String authorId, String pageCount) {
        this.name = name;
        this.genre = genre;
        this.authorId = authorId;
        this.pageCount = pageCount;
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

    public String getAuthorId() {
        return authorId;
    }

    public void setAuthorId(String authorId) {
        this.authorId = authorId;
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

    public String getPageCount() {
        return pageCount;
    }

    public void setPageCount(String pageCount) {
        this.pageCount = pageCount;
    }
}
