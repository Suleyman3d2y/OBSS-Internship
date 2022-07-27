package day2;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(name = "ImageServlet", value = "/imageServlet")
public class imageServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        PrintWriter out = response.getWriter();
        response.setContentType("text/plain");

        String image = request.getParameter("image");

        if(image.equals("charmander")) {
            out.write("You choose Charmander !");
        } else {
            out.write("You choose Pikachu !");
        }


    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        PrintWriter out = response.getWriter();
        response.setContentType("text/plain");

        String pokemon = request.getParameter("image");

        if(pokemon.equals("charmander")) {
            out.write("You choose Pharmander !");
        } else {
            out.write("You choose Pikachu !");
        }

    }
}
