package tr.com.obss.spring.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import tr.com.obss.spring.entity.Genre;
import tr.com.obss.spring.entity.Role;
import tr.com.obss.spring.model.AuthorDTO;
import tr.com.obss.spring.model.BookDTO;
import tr.com.obss.spring.repo.BookRepository;
import tr.com.obss.spring.repo.GenreRepository;
import tr.com.obss.spring.repo.RoleRepository;
import tr.com.obss.spring.service.AuthorService;
import tr.com.obss.spring.service.BookService;

import java.io.IOException;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class DataLoader implements ApplicationRunner {

    public static final String ROLE_USER = "ROLE_USER";
    public static final String ROLE_ADMIN = "ROLE_ADMIN";

    public static final String[] genres = {"Art", "Biography", "Business", "Chick Lit", "Children's", "Christian", "Classics",
            "Comics", "Contemporary", "Cookbooks", "Crime", "Ebooks", "Fantasy", "Fiction",
            "Gay and Lesbian", "Graphic Novels", "Historical Fiction", "History", "Horror",
            "Humor and Comedy", "Manga", "Memoir", "Music", "Mystery", "Nonfiction", "Paranormal",
            "Philosophy", "Poetry", "Psychology", "Religion", "Romance", "Science", "Science Fiction",
            "Self Help", "Suspense", "Spirituality", "Sports", "Thriller", "Travel", "Young Adult"};

    private final RoleRepository roleRepository;

    private final GenreRepository genreRepository;

    private final BookService bookService;

    private final AuthorService authorService;

    private final BookRepository bookRepository;

    public DataLoader(RoleRepository roleRepository, GenreRepository genreRepository, BookService bookService, AuthorService authorService, BookRepository bookRepository) throws IOException {
        this.roleRepository = roleRepository;
        this.genreRepository = genreRepository;

        this.bookService = bookService;
        this.authorService = authorService;
        this.bookRepository = bookRepository;
    }

    private final ObjectMapper mapper = new ObjectMapper();
    final Map<?, ?> map = mapper.readValue(Paths.get("src/main/java/tr/com/obss/spring/json/books.json").toFile(), Map.class);
    final HashMap<String, String> authorsMap = (HashMap<String, String>) map.get("Authors");
    final HashMap<String, String> NamesMap = (HashMap<String, String>) map.get("Name");
    final HashMap<String, String> pageNumMap = (HashMap<String, String>) map.get("pagesNumber");
    final HashMap<String, String> isbnMap = (HashMap<String, String>) map.get("ISBN");
    final HashMap<String, List<String>> genreMap = (HashMap<String, List<String>>) map.get("genre");
    final HashMap<String, String> ratingMap = (HashMap<String, String>) map.get("Rating");

    final List<String> authors = authorsMap.values().stream().distinct().toList();

    @Override
    public void run(ApplicationArguments args) {
        var userRoleExist = roleRepository.existsByName(ROLE_USER);
        if (!userRoleExist) {
            var userRole = new Role();
            userRole.setName(ROLE_USER);
            roleRepository.save(userRole);
        }

        var adminRoleExist = roleRepository.existsByName(ROLE_ADMIN);
        if (!adminRoleExist) {
            var adminRole = new Role();
            adminRole.setName(ROLE_ADMIN);
            roleRepository.save(adminRole);
        }

        for (String name : genres) {
            var genreExist = genreRepository.existsByName(name);
            if (!genreExist) {
                var genre = new Genre();
                genre.setName(name);
                genreRepository.save(genre);
            }
        }

        var bookCount = bookRepository.count();
        if (bookCount < 1) {
            for (String value : authors) {
                AuthorDTO authorDTO = new AuthorDTO();
                authorDTO.setName(value);
                authorService.save(authorDTO);
            }

            for (String key : NamesMap.keySet()) {
                BookDTO bookDTO = new BookDTO(NamesMap.get(key), genreMap.get(key),
                        authorsMap.get(key), String.valueOf(pageNumMap.get(key)),
                        String.valueOf(ratingMap.get(key)), isbnMap.get(key));
                bookService.save(bookDTO);
            }

        }


    }
}
