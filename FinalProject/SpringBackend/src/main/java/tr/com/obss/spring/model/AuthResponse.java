package tr.com.obss.spring.model;

public class AuthResponse {

    private final String jwt;

    private final String role;

    private final String id;

    public AuthResponse(String jwt, String role, String id) {
        this.jwt = jwt;
        this.role = role;
        this.id = id;
    }

    public String getRole() {
        return role;
    }

    public String getId() {
        return id;
    }

    public String getJwt() {
        return jwt;
    }
}
