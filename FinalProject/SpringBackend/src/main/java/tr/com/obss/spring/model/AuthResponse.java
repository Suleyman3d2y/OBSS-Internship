package tr.com.obss.spring.model;

public class AuthResponse {

    private final String jwt;

    private final String role;

    private final String id;

    private final String username;

    private final String createDate;

    public AuthResponse(String jwt, String role, String id, String username, String createDate) {
        this.jwt = jwt;
        this.role = role;
        this.id = id;
        this.username = username;
        this.createDate = createDate;
    }

    public String getCreateDate() {
        return createDate;
    }

    public String getUsername() {
        return username;
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
