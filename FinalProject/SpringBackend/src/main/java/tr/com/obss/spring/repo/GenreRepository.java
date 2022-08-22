package tr.com.obss.spring.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import tr.com.obss.spring.entity.Genre;

public interface GenreRepository extends JpaRepository<Genre, Long> {

    Boolean existsByName(String name);

    @Query(value = "SELECT * FROM genre WHERE genre.name ILIKE :name",nativeQuery = true)
    Genre findByNameLikeIgnoreCase(String name);


}
