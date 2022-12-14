package tr.com.obss.spring.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import tr.com.obss.spring.entity.Book;
import tr.com.obss.spring.entity.Genre;
import tr.com.obss.spring.model.BookDTO;
import tr.com.obss.spring.model.BookUpdateDTO;
import tr.com.obss.spring.repo.AuthorRepository;
import tr.com.obss.spring.repo.BookRepository;
import tr.com.obss.spring.repo.GenreRepository;

import java.util.*;

@Service
public class BookService {


    private final AuthorRepository authorRepository;

    private final BookRepository bookRepository;

    private final GenreRepository genreRepository;

    public BookService(AuthorRepository authorRepository, BookRepository bookRepository, GenreRepository genreRepository) {
        this.authorRepository = authorRepository;
        this.bookRepository = bookRepository;
        this.genreRepository = genreRepository;
    }


    public Book save(BookDTO bookDTO) {
        var book = new Book();
        book.setName(bookDTO.getName());
        book.setPageCount(Integer.parseInt(bookDTO.getPageCount()));
        Set<Genre> bookGenre = new HashSet<>();
        for(String genre: bookDTO.getGenre()) {
            var varGenre = genreRepository.findByNameLikeIgnoreCase(genre);
            if(varGenre == null){
                genre = genre.replace(" ","");
                varGenre = genreRepository.findByNameLikeIgnoreCase(genre);
            }
            if(Objects.nonNull(varGenre)){
                bookGenre.add(varGenre);
            }
        }
        book.setGenres(bookGenre);
        book.setIsbn(bookDTO.getIsbn());
        book.setRating(Double.parseDouble(bookDTO.getRating()));
        var author = authorRepository.findAuthorByName(bookDTO.getAuthorName());
        if (Objects.nonNull(author)) {
            book.setAuthor(author);
        }

        return bookRepository.save(book);
    }

    public Book update(long id, BookUpdateDTO dto) {
        var book = this.findById(id);
        book.setName(dto.getName());
        book.setPageCount(Integer.parseInt(dto.getPageCount()));
        Set<Genre> bookGenre = new HashSet<>();
        for(String genre: dto.getGenre()) {
            var varGenre = genreRepository.findByNameLikeIgnoreCase(genre);
            if(Objects.nonNull(varGenre)){
                bookGenre.add(varGenre);
            }
        }
        book.setGenres(bookGenre);
        book.setRating(Double.parseDouble(dto.getRating()));
        var author = authorRepository.findAuthorByName(dto.getAuthorName());
        if (Objects.nonNull(author)) {
            book.setAuthor(author);
        }
        return bookRepository.save(book);

    }

    public Book remove(long id) {
        var book = this.findById(id);
        book.setActive(!book.isActive());
        return bookRepository.save(book);

    }

    public List<Book> findWithAuthor(String authorName) {
        var author = authorRepository.findAuthorByName(authorName);
        return bookRepository.findAllByAuthor(author);
    }

    public Page<Book> findAllWithJpaPagination(int pageNumber, int pageSize) {
        var paged = PageRequest.of(pageNumber, pageSize);
        return bookRepository.findAll(paged);
    }

    public List<Book> findTop5ByRating() {
        return bookRepository.getNewTop5Books();
    }

    public List<Book> findByName(String name) {
        return bookRepository.findByName(name);
    }

    public Book findById(long id) {
        return bookRepository.findById(id);
    }

    public Page<Book> getFavListWithPagination(long id, int pageNumber, int pageSize) {
        var paged = PageRequest.of(pageNumber,pageSize);
        return bookRepository.findByIdIsIn(bookRepository.getFavList(id),paged);
    }

    public List<Book> getFavList(long id) {
        return bookRepository.findByIdIsIn(bookRepository.getFavList(id));
    }

    public Page<Book> getReadListWithPagination(long id, int pageNumber, int pageSize) {
        var paged = PageRequest.of(pageNumber,pageSize);
        return bookRepository.findByIdIsIn(bookRepository.getReadList(id),paged);
    }

    public List<Book> getReadList(long id) {
        return bookRepository.findByIdIsIn(bookRepository.getReadList(id));
    }


}
