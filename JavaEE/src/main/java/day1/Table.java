package day1;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(name = "Table", value = "/table")
public class Table extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {

        res.setContentType("text/html");
        PrintWriter out = res.getWriter();
        out.println("<h1>Create Table</h1>");
        out.println("<table cellspacing=\"2\" cellpadding=\"2\">\n" +
                "    <tr>\n" +
                "        <th><b style=\"color: aqua\">Name</b></th>\n" +
                "        <th><b style=\"color: blue\">Surname</b></th>\n" +
                "        <th><b style=\"color: coral\">Country</b></th>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "        <td>Suleyman</td>\n" +
                "        <td>Uslu</td>\n" +
                "        <td>Turkey</td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "        <td>Jack</td>\n" +
                "        <td>Solo</td>\n" +
                "        <td>Mexico</td>\n" +
                "    </tr>\n" +
                "</table>");


    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
