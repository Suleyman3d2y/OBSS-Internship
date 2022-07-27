package day3.Path;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(name = "PathServlet", value = "/pathServlet/*")
public class PathServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        out.println("<h2>"+ "requestURL: " + request.getRequestURL() + "<h2>");
        out.println("<h2>"+ "ServletPath: " + request.getServletPath() + "<h2>");
        out.println("<h2>"+ "ContextPath: " + request.getContextPath() + "<h2>");
        out.println("<h2>"+ "PathInfo: " + request.getPathInfo() + "<h2>");
        out.println("<h2>"+ "PathTranslated: " + request.getPathTranslated() + "<h2>");


    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }
}
