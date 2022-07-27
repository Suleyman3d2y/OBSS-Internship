package day3.Database;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "CreateServlet", value = "/CreateServlet")
public class CreateServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        String name = request.getParameter("name");
        String number = request.getParameter("number");

        Contact contact = new Contact(name,number);

        DbConnection dbconnect = new DbConnection();
        dbconnect.createContact(contact);
        request.getRequestDispatcher("day3/DatabaseJsp/listAllUsers.jsp").forward(request,response);

    }
}
