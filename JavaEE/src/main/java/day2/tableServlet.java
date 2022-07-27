package day2;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

@WebServlet(name = "TableServlet", value = "/tableServlet")
public class tableServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        ArrayList<String> nameList = new ArrayList<String>();


        String name1 = request.getParameter("name1");
        nameList.add(name1);
        String name2 = request.getParameter("name2");
        nameList.add(name2);
        String name3 = request.getParameter("name3");
        nameList.add(name3);
        String name4 = request.getParameter("name4");
        nameList.add(name4);
        String name5 = request.getParameter("name5");
        nameList.add(name5);
        String name6 = request.getParameter("name6");
        nameList.add(name6);



        request.setAttribute("nameList",nameList);
        request.getRequestDispatcher("day2/TablePractice/listTable.jsp").forward(request,response);




    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
