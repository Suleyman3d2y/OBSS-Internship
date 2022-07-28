<%--
  Created by IntelliJ IDEA.
  User: Süleyman
  Date: 28.07.2022
  Time: 11:38
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Dashboard</title>
</head>
<body>

<%
    request.getSession().setAttribute("type","private");
    if(request.getSession().getAttribute("isUserLoggedIn") == null || (Integer) request.getSession().getAttribute("isUserLoggedIn") == 0) {
       request.getRequestDispatcher("../login.jsp").forward(request,response);
    }
%>


<h2>Dashboard</h2>
</body>
</html>
