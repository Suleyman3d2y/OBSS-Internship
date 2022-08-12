package tr.com.obss.spring.repo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tr.com.obss.spring.entity.Book;
import tr.com.obss.spring.entity.User;

import java.util.List;
import java.util.Optional;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    List<User> findByUsernameStartsWithAndActiveTrueOrderByCreateDateDesc(String username);

    List<User> findByRoles_NameIn(List<String> roles);

    @Query("SELECT u FROM User u WHERE u.id = :id")
    Optional<User> getById(long id);

    @Query(value = "SELECT * FROM user_account WHERE id = :id",nativeQuery = true)
    Optional<User> getByIdNative(long id);


}
