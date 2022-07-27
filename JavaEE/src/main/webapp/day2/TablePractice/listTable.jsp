<%@ page import="java.util.ArrayList" %><%--
  Created by IntelliJ IDEA.
  User: Süleyman
  Date: 26.07.2022
  Time: 10:58
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<div align="center">
<body>
<% ArrayList<String[]> nameList = (ArrayList<String[]>) request.getAttribute("nameList"); %>
<table border="1" cellpadding="2" cellspacing="2">
    <tr><th>Name</th><th>Surname</th></tr>
    <tr><td><%= nameList.get(0) %></td> <td><%= nameList.get(1) %></td></tr>
    <tr><td><%= nameList.get(2) %></td> <td><%= nameList.get(3) %></td></tr>
    <tr><td><%= nameList.get(4) %></td> <td><%= nameList.get(5) %></td></tr>
</table>


</body>
</div>
</html>
