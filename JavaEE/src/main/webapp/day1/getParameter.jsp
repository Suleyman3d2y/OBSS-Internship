<%--
  Created by IntelliJ IDEA.
  User: Süleyman
  Date: 25.07.2022
  Time: 14:36
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Get Parameter</title>
</head>
<body>
<h1><%= "Get Parameter" %></h1>
    <form action="${pageContext.request.contextPath}/getparameter" method="post">
            Parameter:<input type="text" name="myparam">
                      <input type="submit"/>
    </form>

</body>
</html>
