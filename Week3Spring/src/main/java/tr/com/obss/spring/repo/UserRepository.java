package tr.com.obss.spring.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tr.com.obss.spring.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {


}
