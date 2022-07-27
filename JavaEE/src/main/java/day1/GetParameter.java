package day1;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(name = "GetParameter", value = "/getparameter")
public class GetParameter extends HttpServlet {
    private String message;

    public void init() {
        message = "Hello World!";
    }

    public void doGet(HttpServletRequest req, HttpServletResponse res) throws IOException {

        handleRequest(req,res);

    }

    public void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException {
        handleRequest(req,res);

    }

    public void destroy() {
    }

    public void handleRequest(HttpServletRequest req, HttpServletResponse res) throws IOException {

        PrintWriter out = res.getWriter();
        res.setContentType("text/plain");

        String name = "myparam";
        String nameValue = req.getParameter(name);

        out.write(name);
        out.write(" = ");
        out.write(nameValue);

    }

}