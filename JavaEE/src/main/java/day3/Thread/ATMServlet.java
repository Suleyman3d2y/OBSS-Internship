package day3.Thread;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(name = "atmServlet", value = "/atmServlet")
public class ATMServlet extends HttpServlet {
    private String message;
    int balance = 10000;

    public void init() {
        message = "Hello World!";
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        int amount = Integer.parseInt(request.getParameter("amount"));
        this.balance -= amount;
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        out.println(balance);

    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

        doGet(request,response);

    }


    public void destroy() {
    }
}