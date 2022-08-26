package tr.com.obss.spring.repo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tr.com.obss.spring.entity.Author;
import tr.com.obss.spring.entity.Book;


import java.util.List;


@Repository
public interface BookRepository extends JpaRepository<Book, Long> {


    Book findById(long id);

    List<Book> findAllByActive(boolean active);

    List<Book> findAllByAuthor(Author author);

    @Query(value = "SELECT * FROM books INNER JOIN book_authors ba ON id = book_id ORDER BY rating DESC,create_date DESC LIMIT 5", nativeQuery = true)
    List<Book> getNewTop5Books();

    List<Book> findByName(String name);

    @Query(value = "SELECT book_id FROM fav_list WHERE user_id = :id", nativeQuery = true)
    List<Long> getFavList(long id);

    @Query(value = "SELECT book_id FROM read_list WHERE user_id = :id", nativeQuery = true)
    List<Long> getReadList(long id);

    List<Book> findByIdIsIn(List<Long> bookIds);

    Page<Book> findByIdIsIn(List<Long> id, Pageable pageable);

}
