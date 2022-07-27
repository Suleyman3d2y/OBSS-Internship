<%--
  Created by IntelliJ IDEA.
  User: Süleyman
  Date: 25.07.2022
  Time: 15:08
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Log in</title>
</head>
<body>
<h1>Login Screen</h1>
<form action=${pageContext.request.contextPath}/login method = "post" >
    <input type="text" name="username" placeholder="username"/>
    <input type="password" name="password" placeholder="password"/>
    <input type="submit"/>


</form>
</body>
</html>
