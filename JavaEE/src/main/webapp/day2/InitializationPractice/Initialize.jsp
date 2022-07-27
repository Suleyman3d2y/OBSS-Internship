<%--
  Created by IntelliJ IDEA.
  User: Süleyman
  Date: 26.07.2022
  Time: 16:45
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Initialize Parameters</title>
</head>
<body>
<form action="${pageContext.request.contextPath}/InitializeServlet">
    <table>
        <tr><td>Username: </td><td><input type="text" name="username"></td></tr>
        <tr><td>Password: </td><td><input type="password" name="password"></td></tr>

        <tr><td></td><td><input type="submit"></td></tr>
    </table>
</form>
</body>
</html>
