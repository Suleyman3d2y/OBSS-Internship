package day3.Path;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(name = "SecuredServlet", value = "/SecuredServlet/*")
public class SecuredServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        String requestUrl = String.valueOf(request.getRequestURL());

        if(requestUrl.contains("secured")) {
            response.sendError(HttpServletResponse.SC_FORBIDDEN);
        }
        else {
            request.getRequestDispatcher("day3/PathJsp/succes.jsp").forward(request,response);
        }

    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
