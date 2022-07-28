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
    <title>Login</title>
</head>
<body>
<div align="center">
    <form action=${pageContext.request.contextPath}/SessionServlet?>
        <table>
            <tr>
                <td>Username:</td>
                <td><input type="text" name="username"/></td>
            </tr>

            <tr>
                <td>Password:</td>
                <td><input type="password" name="password"/></td>
            </tr>
            <tr>
                <td colspan="2"><input type="submit" value="Log in" %> </td>
            </tr>

        </table>
    </form>
</div>
</body>
</html>
