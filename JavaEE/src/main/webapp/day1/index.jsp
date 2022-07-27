<%--
  Created by IntelliJ IDEA.
  User: Süleyman
  Date: 25.07.2022
  Time: 15:48
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
  <title>Home Page</title>
</head>
<body>
<table cellpadding="2" cellspacing="2" >
  <tr>
    <th>Servlet</th>
    <th>JSP</th>
  </tr>
  <tr>
    <td><a href="${pageContext.request.contextPath}/helloworld">Hello world</a></td>
    <td><a href="helloworld.jsp">Hello world.jsp</a></td>
  </tr>
  <tr>
    <td>None</td>
    <td><a href="getParameter.jsp">getParameter.jsp</a></td>
  </tr>
  <tr>
    <td><a href="${pageContext.request.contextPath}/table">Table</a></td>
    <td><a href="table.jsp">Table.jsp</a></td>
  </tr>
  <tr>
    <td>None</td>
    <td><a href="LoginJsp/login.jsp">Login Screen.jsp</a></td>
  </tr>
  </table>
</body>
</html>
