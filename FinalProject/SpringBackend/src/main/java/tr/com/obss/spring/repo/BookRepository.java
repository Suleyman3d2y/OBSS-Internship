package tr.com.obss.spring.repo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tr.com.obss.spring.entity.Author;
import tr.com.obss.spring.entity.Book;
import java.util.List;


@Repository
public interface BookRepository extends JpaRepository<Book, Long> {



    Book findById(long id);

    List<Book> findAllByActive(boolean active);

    Page<Book> findAllByAuthor(Author author,Pageable pageable);

    @Query(value = "SELECT distinct b.id " +
            "FROM books b INNER JOIN book_genres bg on b.id = bg.book_id " +
            "INNER JOIN genre g on bg.genre_id = g.id " +
            "INNER JOIN book_authors ba on b.id = ba.book_id " +
            "INNER JOIN authors a on ba.author_id = a.id " +
            "WHERE b.name ILIKE %:name% and " +
            "b.page_count < :pageCount and " +
            "b.rating > :rating and " +
            "b.isbn ILIKE %:isbn% and " +
            "a.name ILIKE  %:authorName% and " +
            "b.active = :active and " +
            "g.name in :genres ",nativeQuery = true )
    List<Long> findAllByNameLikeAndPageCountLessThanEqualAndRatingGreaterThanEqualAndIsbnLikeAndAuthorAndActiveAndGenresIn(
            @Param("name") String name, @Param("pageCount") int pageCount,
            @Param("rating") double rating,@Param("isbn") String isbn,
            @Param("authorName") String authorName, @Param("active") boolean active, @Param("genres") List<String> genres
    );

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
