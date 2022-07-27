<%@ page import="java.util.ArrayList" %>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>First JSP</title>
</head>
<body>
<%
    String string = "hello world";
    int integer = 64;
    ArrayList<Integer> list = new ArrayList<>();
    for (int i = 0; i < 10; i++) {
        list.add((int) (Math.random() * 10));
    }
%>
<h1> Print String</h1>
<%=string%>
<br>
<h1> Print Integer</h1>
<%=integer%>
<br>
<h1> Print List</h1>
<%=list%>
<br>

</body>
</html>