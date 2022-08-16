package tr.com.obss.spring.cache;

import java.util.Map;
import tr.com.obss.spring.model.UserDTO;

public interface UserCache {


    void put(UserDTO user);

    Map<String,UserDTO> getMap();


}
