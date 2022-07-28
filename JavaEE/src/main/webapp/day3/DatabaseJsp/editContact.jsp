<%--
  Created by IntelliJ IDEA.
  User: Süleyman
  Date: 27.07.2022
  Time: 12:47
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>EditContact</title>
</head>
<body>
<%
    String name = (String) request.getParameter("name");
    String number = (String) request.getParameter("number");
    if(number == null) {
        number = (String) request.getAttribute("number");
    }
    if(number == null || name == null) {
        name = "";
        number = "";
    }
%>
<div align="center">
    <jsp:include page="searchContact.jsp"/>
</div>
    <h2>Edit Contact</h2>
    <form action="${pageContext.request.contextPath}/EditServlet" method="post">
        <table>
            <tr><td>Name: </td><td><input type="text" name="name" value=<%=name%>></td></tr>
            <tr><td>Phone Number: </td><td><input type="text" name="number" value=<%=number%>></td></tr>
            <tr><td></td><td><input type="submit" value="Update" name="Edit Contact">
            </td></tr> <tr><td></td><td><input type="submit" value="Delete"  formaction=${pageContext.request.contextPath}/DeleteServlet></td></tr>
        </table>
    </form>
    <jsp:include page="listAllUsers.jsp"/>

</body>
</html>
