package tr.com.obss.spring.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import tr.com.obss.spring.entity.Book;
import tr.com.obss.spring.model.BookDTO;
import tr.com.obss.spring.model.BookUpdateDTO;
import tr.com.obss.spring.repo.AuthorRepository;
import tr.com.obss.spring.repo.BookRepository;

import java.util.List;
import java.util.Objects;

@Service
public class BookService {


    private final AuthorRepository authorRepository;

    private final BookRepository bookRepository;

    public BookService(AuthorRepository authorRepository, BookRepository bookRepository) {
        this.authorRepository = authorRepository;
        this.bookRepository = bookRepository;
    }


    public Book save(BookDTO bookDTO) {
        var book = new Book();
        book.setName(bookDTO.getName());
        book.setGenre(bookDTO.getGenre());
        book.setPageCount(Integer.parseInt(bookDTO.getPageCount()));
        book.setIsbn(Long.parseLong(bookDTO.getIsbn()));
        book.setRating(Integer.parseInt(bookDTO.getRating()));
        var author = authorRepository.findAuthorById(Integer.parseInt(bookDTO.getAuthorId()));
        if (Objects.nonNull(author)) {
            book.setAuthor(author);
        }

        return bookRepository.save(book);
    }

    public Book update(long id, BookUpdateDTO dto) {
        var book = this.findById(id);
        book.setName(dto.getName());
        book.setGenre(dto.getGenre());
        book.setPageCount(Integer.parseInt(dto.getPageCount()));
        book.setRating(Integer.parseInt(dto.getRating()));
        book.setAuthor(authorRepository.findAuthorById(Long.parseLong(dto.getAuthorId())));
        return bookRepository.save(book);

    }

    public Book remove(long id) {
        var book = this.findById(id);
        book.setActive(!book.isActive());
        return bookRepository.save(book);

    }

    public List<Book> findAll() {
        return bookRepository.findAllByActive(true);
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

    public List<Book> findPreferredBooks(int rating, int pageCount, List<String> genre) {
        return bookRepository.findByGenreIsInAndPageCountLessThanEqualAndRatingGreaterThanEqualAndActive(genre, pageCount, rating, true);
    }

    public Page<Book> getFavListWithPagination(long id, int pageNumber, int pageSize) {
        var paged = PageRequest.of(pageNumber,pageSize);
        return bookRepository.findByIdIsIn(bookRepository.getFavList(id),paged);
    }

    public Page<Book> getReadListWithPagination(long id, int pageNumber, int pageSize) {
        var paged = PageRequest.of(pageNumber,pageSize);
        return bookRepository.findByIdIsIn(bookRepository.getReadList(id),paged);
    }


}
