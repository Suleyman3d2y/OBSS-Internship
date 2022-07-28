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
    <title>Home</title>
</head>
<body>

<%
    request.getSession().setAttribute("type","public");
    if(request.getSession().getAttribute("isUserLoggedIn") == null || (Integer) request.getSession().getAttribute("isUserLoggedIn") == 0) {
       response.sendRedirect("../login.jsp");
    }
%>

<h2>Home</h2>
</body>
</html>
