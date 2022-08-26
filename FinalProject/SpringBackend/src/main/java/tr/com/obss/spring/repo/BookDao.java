package tr.com.obss.spring.repo;

import org.springframework.stereotype.Repository;
import tr.com.obss.spring.entity.Book;
import tr.com.obss.spring.entity.Genre;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.*;
import java.util.*;

@Repository
public class BookDao {

    @PersistenceContext
    private EntityManager entityManager;


    private final GenreRepository genreRepository;

    public BookDao(GenreRepository genreRepository) {
        this.genreRepository = genreRepository;
    }

    public List<Book> getPreferredBooks(String name, Integer pageCount, Double rating, String isbn, String authorName, List<String> genres) {

        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Book> criteriaQuery = criteriaBuilder.createQuery(Book.class);
        Root<Book> book = criteriaQuery.from(Book.class);
        List<Predicate> predicates = new ArrayList<>();
        if(name != null && !name.equals("") && !name.isBlank()){
            predicates.add(criteriaBuilder.like(criteriaBuilder.lower(book.get("name")),"%"+name.toLowerCase()+"%"));
        }
        if(pageCount != null) {
            predicates.add(criteriaBuilder.lessThanOrEqualTo(book.get("pageCount"),pageCount));
        }
        if(rating != null){
            predicates.add(criteriaBuilder.greaterThanOrEqualTo(book.get("rating"),rating));
        }
        if(isbn != null && !isbn.equals("")){
            predicates.add(criteriaBuilder.equal(book.get("isbn"),isbn));
        }
        if(authorName != null && !authorName.equals("") && !authorName.isBlank()){
            predicates.add(criteriaBuilder.like(criteriaBuilder.lower(book.join("author").get("name")),"%"+authorName+"%"));
        }
        if(genres != null && genres.size() >= 1){
            List<Genre> genreList = new ArrayList<>();
            for(String genre: genres){
                var varGenre = genreRepository.findByNameLikeIgnoreCase(genre);
                genreList.add(varGenre);
            }
            Expression<String> genreExpression = book.join("genres");
            predicates.add(genreExpression.in(genreList));
        }
        criteriaQuery.where(predicates.toArray(new Predicate[0]));

        TypedQuery<Book> query = entityManager.createQuery(criteriaQuery);

        return query.getResultList();
    }
}
