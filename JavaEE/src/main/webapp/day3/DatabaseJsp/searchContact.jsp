<%--
  Created by IntelliJ IDEA.
  User: Süleyman
  Date: 27.07.2022
  Time: 12:15
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Search Contact</title>
</head>
<body>
    <h2>Search Contact</h2>
    <form action="${pageContext.request.contextPath}/SearchServlet" method="post">
        <table>
            <tr><td>Name: </td><td><input type="text" name="name"></td></tr>
            <tr><td></td><td><input type="submit" name="Search Contact"></td></tr>
        </table>
    </form>
</body>
</html>
