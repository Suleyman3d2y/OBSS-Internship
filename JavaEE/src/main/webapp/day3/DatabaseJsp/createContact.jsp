<%--
  Created by IntelliJ IDEA.
  User: Süleyman
  Date: 27.07.2022
  Time: 12:13
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Create Contact</title>
</head>
<body>
<div align="center">
    <h2>Create Contact</h2>
    <form action="${pageContext.request.contextPath}/CreateServlet" method="post">
        <table>
            <tr><td>Name: </td><td><input type="text" name="name"></td></tr>
            <tr><td>Phone Number: </td><td><input type="text" name="number"></td></tr>
            <tr><td></td><td><input type="submit" name="Create Contact"></td></tr>
        </table>
    </form>
</div>
</body>
</html>
