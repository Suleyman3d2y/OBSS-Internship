/* Needed to work for one time.
package tr.com.obss.spring.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.models.auth.In;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import tr.com.obss.spring.model.AuthorDTO;
import tr.com.obss.spring.model.BookDTO;
import tr.com.obss.spring.service.AuthorService;
import tr.com.obss.spring.service.BookService;

import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class LoadDataFromJson implements CommandLineRunner {


    private final AuthorService authorService;

    private final BookService bookService;

    public LoadDataFromJson(AuthorService authorService, BookService bookService) {
        this.authorService = authorService;

        this.bookService = bookService;
    }


    @Override
    public void run(String... args) throws Exception {
        ObjectMapper mapper = new ObjectMapper();

        Map<?,?> map = mapper.readValue(Paths.get("src/main/java/tr/com/obss/spring/json/book.json").toFile(),Map.class);
        HashMap<String,String> authorsMap = (HashMap<String, String>) map.get("Authors");
        HashMap<String,String> NamesMap = (HashMap<String, String>) map.get("Name");
        HashMap<String,String> pageNumMap = (HashMap<String, String>) map.get("pagesNumber");
        HashMap<String,String> isbnMap = (HashMap<String, String>) map.get("ISBN");
        HashMap<String,String> genreMap = (HashMap<String, String>) map.get("genre");
        HashMap<String,String> ratingMap = (HashMap<String, String>) map.get("Rating");

        List<String> authors = authorsMap.values().stream().distinct().toList();
        for(String value: authors){
            AuthorDTO authorDTO = new AuthorDTO();
            authorDTO.setName(value);
            authorService.save(authorDTO);
        }

        for(String key : NamesMap.keySet()) {
            BookDTO bookDTO = new BookDTO(NamesMap.get(key), genreMap.get(key),
                    authorsMap.get(key), String.valueOf(pageNumMap.get(key)),
                    String.valueOf(ratingMap.get(key)), isbnMap.get(key));
            bookService.save(bookDTO);
        }


    }
}
*/
