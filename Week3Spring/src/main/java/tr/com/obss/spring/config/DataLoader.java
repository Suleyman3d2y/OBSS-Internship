package tr.com.obss.spring.config;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import tr.com.obss.spring.entity.Role;
import tr.com.obss.spring.repo.RoleRepository;

@Component
public class DataLoader implements ApplicationRunner {


    public static final String ROLE_USER = "ROLE_USER";
    public static final String ROLE_ADMIN = "ROLE_ADMIN";

    private final RoleRepository roleRepository;

    public DataLoader(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        var userRoleExist = roleRepository.existsByName(ROLE_USER);
        if(!userRoleExist){
            var userRole = new Role();
            userRole.setName(ROLE_USER);
            roleRepository.save(userRole);
        }

        var adminRoleExist = roleRepository.existsByName(ROLE_ADMIN);
        if(!adminRoleExist){
            var adminRole = new Role();
            adminRole.setName(ROLE_ADMIN);
            roleRepository.save(adminRole);
        }


    }
}
