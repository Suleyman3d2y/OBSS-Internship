<%--
  Created by IntelliJ IDEA.
  User: Süleyman
  Date: 26.07.2022
  Time: 15:51
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>ImageClick</title>
</head>
<body>
<form method="post">
    <a href="${pageContext.request.contextPath}/imageServlet?image=pikachu"><img src = "images/pikachu.png" alt="" style="width:100px;height:100px;"></a>
    <a href="${pageContext.request.contextPath}/imageServlet?image=charmander"><img src = "images/charmander.png" alt="" style="width:100px;height:100px;"></a>
</form>
</body>
</html>
