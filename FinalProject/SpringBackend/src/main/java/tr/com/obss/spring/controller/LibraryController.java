package tr.com.obss.spring.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import tr.com.obss.spring.model.AuthorDTO;
import tr.com.obss.spring.model.AuthorUpdateDTO;
import tr.com.obss.spring.model.BookDTO;
import tr.com.obss.spring.model.BookUpdateDTO;
import tr.com.obss.spring.service.AuthorService;
import tr.com.obss.spring.service.BookService;
import tr.com.obss.spring.service.UserService;
import javax.validation.Valid;
import java.util.List;


@RestController
@RequestMapping("/library")
public class LibraryController {

    private final AuthorService authorService;

    private final BookService bookService;

    private final UserService userService;

    private static final Logger LOGGER = LoggerFactory.getLogger(LibraryController.class);

    public LibraryController(AuthorService authorService, BookService bookService, UserService userService) {
        this.authorService = authorService;
        this.bookService = bookService;
        this.userService = userService;
    }

    @GetMapping("/author-books/{authorName}")
    public ResponseEntity<?> getAuthorBooks(@PathVariable(name = "authorName") String authorName) {
        return ResponseEntity.ok(bookService.findWithAuthor(authorName));
    }

    @GetMapping("/books")
    public ResponseEntity<?> getBooksWithJpaPagination(
            @RequestParam(name = "pageSize", defaultValue = "10") int pageSize,
            @RequestParam(name = "pageNumber", defaultValue = "0") int pageNumber) {
        return ResponseEntity.ok(bookService.findAllWithJpaPagination(pageNumber, pageSize));
    }

    @GetMapping("/books/top5")
    public ResponseEntity<?> getTop5Books() {
        return ResponseEntity.ok(bookService.findTop5ByRating());
    }


    @GetMapping("/authors")
    public ResponseEntity<?> getAuthorsWithJpaPagination(
            @RequestParam(name = "pageSize", defaultValue = "10") int pageSize,
            @RequestParam(name = "pageNumber", defaultValue = "0") int pageNumber) {
        return ResponseEntity.ok(authorService.findAllWithJpaPagination(pageNumber, pageSize));
    }

    @GetMapping("/books/{name}")
    public ResponseEntity<?> getBooksByName(@PathVariable(name = "name") String name)  {

        return ResponseEntity.ok(bookService.findByName(name));
    }

    @GetMapping("/books/{rating}/{pageCount}/{genre}")
    public ResponseEntity<?> getPreferredBooks(@PathVariable(name = "rating") int rating,
                                               @PathVariable(name = "pageCount") int pageCount,
                                               @PathVariable(name = "genre") List<String> genre)  {

        return ResponseEntity.ok(bookService.findPreferredBooks(rating, pageCount, genre));
    }

    @GetMapping("/readlist/{userId}")
    public ResponseEntity<?> getReadList(@PathVariable(name = "userId") long id,
            @RequestParam(name = "pageSize", defaultValue = "10") int pageSize,
            @RequestParam(name = "pageNumber", defaultValue = "0") int pageNumber)  {

        return ResponseEntity.ok(bookService.getReadListWithPagination(id,pageNumber,pageSize));
    }

    @GetMapping("/favlist/{userId}")
    public ResponseEntity<?> getFavList(@PathVariable(name = "userId") long id,
                                         @RequestParam(name = "pageSize", defaultValue = "10") int pageSize,
                                         @RequestParam(name = "pageNumber", defaultValue = "0") int pageNumber)  {

        return ResponseEntity.ok(bookService.getFavListWithPagination(id,pageNumber,pageSize));
    }

    @PostMapping("/user/addreadlist/{userId}/{bookId}")
    public ResponseEntity<?> addToReadList(@PathVariable(name = "userId") long userId,
                                          @PathVariable(name = "bookId") long bookId) {

        return ResponseEntity.ok(userService.addToReadList(userService.findById(userId),
                                                         bookService.findById(bookId)));
    }

    @DeleteMapping("/user/removereadlist/{userId}/{bookId}")
    public ResponseEntity<?> removeFromReadList(@PathVariable(name = "userId") long userId,
                                           @PathVariable(name = "bookId") long bookId) {

        return ResponseEntity.ok(userService.removeFromReadList(userService.findById(userId),
                bookService.findById(bookId)));
    }

    @PostMapping("/user/addfavlist/{userId}/{bookId}")
    public ResponseEntity<?> addToFavList(@PathVariable(name = "userId") long userId,
                                          @PathVariable(name = "bookId") long bookId) {

        return ResponseEntity.ok(userService.addToFavList(userService.findById(userId),
                bookService.findById(bookId)));
    }

    @DeleteMapping("/user/removefavlist/{userId}/{bookId}")
    public ResponseEntity<?> removeFromFavList(@PathVariable(name = "userId") long userId,
                                                @PathVariable(name = "bookId") long bookId) {

        return ResponseEntity.ok(userService.removeFromFavList(userService.findById(userId),
                bookService.findById(bookId)));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/book/add")
    public ResponseEntity<?> createBook(@Valid @RequestBody BookDTO bookDTO) {
        LOGGER.info("Book info: {} {} {} {} {} ", bookDTO.getName(),bookDTO.getGenre(),bookDTO.getGenre()
        ,bookDTO.getPageCount(),bookDTO.getAuthorName());

        return ResponseEntity.ok(bookService.save(bookDTO));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/book/update/{bookId}")
    public ResponseEntity<?> updateBook(@PathVariable(name = "bookId") long id
            ,@Valid @RequestBody BookUpdateDTO bookUpdateDTO) {
        return ResponseEntity.ok(bookService.update(id, bookUpdateDTO));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/book/remove/{bookId}")
    public ResponseEntity<?> removeBook(@PathVariable(name = "bookId") long id) {
        return ResponseEntity.ok(bookService.remove(id));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/author/add")
    public ResponseEntity<?> createAuthor(@Valid @RequestBody AuthorDTO authorDTO) {
        LOGGER.info("Author info: {}", authorDTO.getName());

        return ResponseEntity.ok(authorService.save(authorDTO));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/author/update/{authorId}")
    public ResponseEntity<?> updateAuthor(@PathVariable(name = "authorId") long id
            ,@Valid @RequestBody AuthorUpdateDTO authorUpdateDTO) {
        return ResponseEntity.ok(authorService.update(id, authorUpdateDTO));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/author/remove/{authorId}")
    public ResponseEntity<?> removeAuthor(@PathVariable(name = "authorId") long id) {
        return ResponseEntity.ok(authorService.remove(id));
    }



}
