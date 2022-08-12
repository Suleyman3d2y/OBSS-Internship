package tr.com.obss.spring.cache;

import tr.com.obss.spring.model.UserDTO;

import java.util.Map;

public interface UserCache {


    void put(UserDTO user);

    Map<String,UserDTO> getMap();


}
