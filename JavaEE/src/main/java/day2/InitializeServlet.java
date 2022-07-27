package day2;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(name = "InitializeServlet", value = "/InitializeServlet")
public class InitializeServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        String username = request.getParameter("username");
        String password = request.getParameter("password");
        if(getInitParameter("username").equals(username)&&getInitParameter("password").equals(password)) {
            RequestDispatcher rd = request.getRequestDispatcher("day2/InitializationPractice/success.jsp");
            rd.forward(request,response);
        }
        else {
            out.println("Wrong username or password!");
            RequestDispatcher rd = request.getRequestDispatcher("day2/InitializationPractice/failure.jsp");
            rd.forward(request,response);
        }

    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }


}
