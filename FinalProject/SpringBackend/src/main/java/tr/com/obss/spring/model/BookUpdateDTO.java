package tr.com.obss.spring.model;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.List;


public class BookUpdateDTO {


    @NotBlank
    @Size(max = 255, min = 1, message = "Please enter a valid name")
    private String name;

    private List<String> genre;

    @NotBlank
    @Size(max = 10000, min = 1, message = "Please enter a valid page count")
    private String pageCount;

    @NotBlank
    @Size(max = 10000, min = 1, message = "Please enter a valid rating")
    private String rating;

    @NotBlank
    @Size(max = 10000, min = 1, message = "Please enter a valid author name")
    private String authorName;

    public BookUpdateDTO(String name, List<String> genre, String pageCount,String rating, String authorName) {
        this.name = name;
        this.genre = genre;
        this.pageCount = pageCount;
        this.rating = rating;
        this.authorName = authorName;
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

    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorId) {
        authorName = authorName;
    }

}
