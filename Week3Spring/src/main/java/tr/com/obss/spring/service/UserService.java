package tr.com.obss.spring.service;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;
import tr.com.obss.spring.cache.UserCache;
import tr.com.obss.spring.entity.User;
import tr.com.obss.spring.model.UserDTO;
import tr.com.obss.spring.repo.UserRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    // private final ApplicationContext context;

    // private final UserCache userCache;

    private final UserRepository userRepository;

    public UserService(ApplicationContext context, @Qualifier("userCacheSingleton") UserCache userCache, UserRepository userRepository) {
        // this.context = context;
        // this.userCache = userCache;
        this.userRepository = userRepository;
    }

    public User save(UserDTO userDTO) {
        var user = new User();
        user.setUsername(userDTO.getUsername());
        user.setPassword(userDTO.getPassword());

        /*var userCachePrototype = context.getBean(UserCachePrototype.class);

        userCachePrototype.users.put(userDTO.getUsername(), userDTO);
        userCache.put(userDTO);

        var map = new HashMap<String, Object>();
        map.put("singleton", userCache.getMap());
        map.put("prototype", userCachePrototype.users);
        return map;*/
        return userRepository.save(user);
    }

}
