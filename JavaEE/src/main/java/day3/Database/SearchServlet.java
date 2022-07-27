package day3.Database;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "SearchServlet", value = "/SearchServlet")
public class SearchServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        String number;
        String name;

        DbConnection dbConnect = new DbConnection();
        Contact contact = dbConnect.searchContact(request.getParameter("name"));
        name = contact.getName();
        number = contact.getNumber();


        request.setAttribute("name",name);
        request.setAttribute("number",number);
        request.getRequestDispatcher("day3/DatabaseJsp/editContact.jsp").forward(request,response);



    }
}
