package tr.com.obss.spring.repo;

import org.springframework.stereotype.Repository;
import tr.com.obss.spring.entity.User;


import javax.persistence.EntityManager;
import java.util.List;

@Repository
public class UserDAO {

    private final EntityManager entityManager;


    public UserDAO(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public List<User> get(int pageNumber, int pageSize) {

        var criteriaBuilder = entityManager.getCriteriaBuilder();
        var criteriaQuery = criteriaBuilder.createQuery(User.class);
        var from = criteriaQuery.from(User.class);
        var select = criteriaQuery.select(from);
        select.where(criteriaBuilder.isTrue(from.get("active")));
        var typedQuery = entityManager.createQuery(select);
        typedQuery.setFirstResult(pageNumber * pageSize);
        typedQuery.setMaxResults(pageSize);
        return typedQuery.getResultList();
    }


}
