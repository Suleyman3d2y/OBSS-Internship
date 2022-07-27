package day1;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(name = "Login", value = "/login")
public class Login extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        String username = request.getParameter("username");
        String password = request.getParameter("password");


        if(username.equals("suleyman") && password.equals("123")) {
            RequestDispatcher rd = request.getRequestDispatcher("day1/LoginJsp/success.jsp");
            rd.forward(request,response);
        }
        else {
            out.print("Wrong password or username!");
            RequestDispatcher rd = request.getRequestDispatcher("day1/LoginJsp/failure.jsp");
            rd.forward(request,response);
        }

    }

}
