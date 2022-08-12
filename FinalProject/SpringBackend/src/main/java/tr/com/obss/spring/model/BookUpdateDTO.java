package tr.com.obss.spring.model;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class BookUpdateDTO {


    @NotBlank
    @Size(max = 255, min = 1, message = "Please enter a valid name")
    private String name;

    @NotBlank
    @Size(max = 10000, min = 1, message = "Please enter a valid page count")
    private String genre;

    @NotBlank
    @Size(max = 10000, min = 1, message = "Please enter a valid page count")
    private String pageCount;

    @NotBlank
    @Size(max = 10000, min = 1, message = "Please enter a valid page count")
    private String rating;

    @NotBlank
    @Size(max = 10000, min = 1, message = "Please enter a valid page count")
    private String AuthorId;

    public BookUpdateDTO(String name, String genre, String pageCount,String rating, String authorId) {
        this.name = name;
        this.genre = genre;
        this.pageCount = pageCount;
        this.rating = rating;
        AuthorId = authorId;
    }

    public String getRating() {
        return rating;
    }

    public void setRating(String rating) {
        this.rating = rating;
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

    public String getAuthorId() {
        return AuthorId;
    }

    public void setAuthorId(String authorId) {
        AuthorId = authorId;
    }

}