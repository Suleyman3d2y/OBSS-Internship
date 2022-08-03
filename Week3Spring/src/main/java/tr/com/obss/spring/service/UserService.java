package tr.com.obss.spring.service;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.ApplicationContext;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import tr.com.obss.spring.cache.UserCache;
import tr.com.obss.spring.entity.User;
import tr.com.obss.spring.model.MyUserDetails;
import tr.com.obss.spring.model.UserDTO;
import tr.com.obss.spring.model.UserUpdateDTO;
import tr.com.obss.spring.repo.RoleRepository;
import tr.com.obss.spring.repo.UserDAO;
import tr.com.obss.spring.repo.UserRepository;

import java.util.List;
import java.util.Set;

@Service
public class UserService implements UserDetailsService {

    // private final ApplicationContext context;

    // private final UserCache userCache;

    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    private final PasswordEncoder passwordEncoder;

    private final UserDAO userDAO;

    public UserService(ApplicationContext context, @Qualifier("userCacheSingleton") UserCache userCache, UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder, UserDAO userDAO) {
        // this.context = context;
        // this.userCache = userCache;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.userDAO = userDAO;
    }

    public User save(UserDTO userDTO) {
        var user = new User();
        user.setUsername(userDTO.getUsername());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        var userRoleOpt = roleRepository.findByName("ROLE_USER");
        userRoleOpt.ifPresent((userRole) -> {
            user.setRoles((Set.of(userRoleOpt.get())));
        });


        /*var userCachePrototype = context.getBean(UserCachePrototype.class);

        userCachePrototype.users.put(userDTO.getUsername(), userDTO);
        userCache.put(userDTO);

        var map = new HashMap<String, Object>();
        map.put("singleton", userCache.getMap());
        map.put("prototype", userCachePrototype.users);
        return map;*/
        return userRepository.save(user);
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public List<User> getUsersWithRole(List<String> roles) {
        return userRepository.findByRoles_NameIn(roles);
    }

    public Page<User> findAllWithJpaPagination(int pageNumber, int pageSize) {
        var paged = PageRequest.of(pageNumber,pageSize);
        return userRepository.findAll(paged);
    }


    public List<User> findAllWithDaoPagination(int pageNumber, int pageSize) {
        return userDAO.get(pageNumber, pageSize);
    }

    public User findById(long id) {
        var userOpt = userRepository.findById(id);
        return userOpt.orElseThrow(() -> {
            throw new IllegalArgumentException("User not found");
        });
    }

    public User getById(long id) {
        var userOpt = userRepository.getById(id);
        return userOpt.orElseThrow(() -> {
            throw new IllegalArgumentException("User not found");
        });
    }

    public User getByIdNative(long id) {
        var userOpt = userRepository.getByIdNative(id);
        return userOpt.orElseThrow(() -> {
            throw new IllegalArgumentException("User not found");
        });
    }

    public User update(long id, UserUpdateDTO dto) {
        var user = this.findById(id);
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        return userRepository.save(user);

    }

    public User remove(long id) {
        var user = this.findById(id);
        user.setActive(!user.isActive());
        return userRepository.save(user);

    }

    public User findByUsername(String username) {
        var userOpt = userRepository.findByUsername(username);
        return userOpt.orElseThrow(() -> {
            throw new IllegalArgumentException("User not found");
        });
    }

    public List<User> findAllByUsername(String username) {
        var users = userRepository.findByUsernameStartsWithAndActiveTrueOrderByCreateDateDesc(username);
        return users;
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        var user = this.findByUsername(username);
        return new MyUserDetails(user);
    }
}
