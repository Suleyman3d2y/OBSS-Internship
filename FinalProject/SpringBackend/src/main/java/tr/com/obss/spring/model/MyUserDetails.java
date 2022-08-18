package tr.com.obss.spring.model;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.util.CollectionUtils;
import tr.com.obss.spring.entity.User;

import java.util.Collection;
import java.util.Collections;
import java.util.Objects;

public class MyUserDetails implements UserDetails {

    private final User user;

    public MyUserDetails(User user) {
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if(Objects.nonNull(user) && !CollectionUtils.isEmpty(user.getRoles())) {
            return user.getRoles().stream().map(t -> new SimpleGrantedAuthority(t.getName())).toList();

        }
        return Collections.emptyList();
    }


    public String getId() {
        return String.valueOf(user.getId());
    }

    public String getRole() {
        if(user.getRoles().size() > 1) {
            return "ADMIN";
        }
        else {
            return "USER";
        }
    }


    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return user.isActive();
    }

    @Override
    public boolean isAccountNonLocked() {
        return user.isActive();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return user.isActive();
    }

    @Override
    public boolean isEnabled() {
        return user.isActive();
    }
}
