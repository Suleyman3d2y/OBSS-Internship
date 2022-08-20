package tr.com.obss.spring.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tr.com.obss.spring.entity.Author;



@Repository
public interface AuthorRepository extends JpaRepository<Author, Long> {


    Author findAuthorByName(String name);

    Author findAuthorById(long id);




}
