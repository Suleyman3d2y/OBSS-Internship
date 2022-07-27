<%--
  Created by IntelliJ IDEA.
  User: Süleyman
  Date: 26.07.2022
  Time: 11:03
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Table Info</title>
</head>
<body>
<form action="${pageContext.request.contextPath}/tableServlet" method="get">
<table>
    <tr><td>Name1: </td><td><input type="text" name="name1"></td></tr>
    <tr><td>Surname1: </td><td><input type="text" name="name2"></td></tr>
    <tr><td>Name2: </td><td><input type="text" name="name3"></td></tr>
    <tr><td>Surname2: </td><td><input type="text" name="name4"></td></tr>
    <tr><td>Name3: </td><td><input type="text" name="name5"></td></tr>
    <tr><td>Surname3: </td><td><input type="text" name="name6"></td></tr>
    <tr><td></td><td><input type="submit" name="register"></td></tr>
</table>
</form>
</body>
</html>
