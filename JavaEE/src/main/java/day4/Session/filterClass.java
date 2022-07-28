package day4.Session;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class filterClass implements Filter {

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {

        PrintWriter out = servletResponse.getWriter();
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;

        String username = servletRequest.getParameter("username");
        String password = servletRequest.getParameter("password");
        String type = (String) request.getSession().getAttribute("type");

        if(username.equals("obss") && password.equals("obss") && type.equals("private")) {
            request.getSession().setAttribute("isUserLoggedIn",1);
            filterChain.doFilter(servletRequest,servletResponse);
            request.getRequestDispatcher("day4/private/dashboard.jsp").forward(request,response);
        }
        else if(username.equals("obss") && password.equals("obss") && type.equals("public")) {
            request.getSession().setAttribute("isUserLoggedIn",1);
            filterChain.doFilter(servletRequest,servletResponse);
            request.getRequestDispatcher("day4/public/home.jsp").forward(request,response);
        }
        else {
            out.println("Wrong Username or Password");
            response.sendError(403);
        }

    }

}
