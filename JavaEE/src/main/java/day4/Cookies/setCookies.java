package day4.Cookies;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(name = "setCookies", value = "/setCookies")
public class setCookies extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        Cookie cookie1 = new Cookie("1","cookie1");
        //cookie1.setPath(request.getContextPath()+"/setCookies");
        response.addCookie(cookie1);


        Cookie cookie2 = new Cookie("2","cookie2");
        //cookie2.setPath(request.getContextPath()+"/setCookies");
        response.addCookie(cookie2);

        response.sendRedirect("http://localhost:8081/JavaEE_war_exploded/getCookies");


    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
