package day4.Session;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(name = "SessionServlet", value = "/SessionServlet")
public class SessionServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        out.print("bum");
       /* String username = request.getParameter("username");
        String password = request.getParameter("password");
        String type = (String) request.getSession().getAttribute("type");

        if(username.equals("obss") && password.equals("obss") && type.equals("private") ) {
            request.getSession().setAttribute("isUserLoggedIn",1);
            request.getRequestDispatcher("day4/private/dashboard.jsp").forward(request,response);
        }
        else if(username.equals("obss") && password.equals("obss") && type.equals("public")) {
            request.getSession().setAttribute("isUserLoggedIn",1);
            request.getRequestDispatcher("day4/public/home.jsp").forward(request,response);
        }

        else {
            request.getRequestDispatcher("day4/login.jsp").forward(request,response);
        }*/

    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {



    }


}
