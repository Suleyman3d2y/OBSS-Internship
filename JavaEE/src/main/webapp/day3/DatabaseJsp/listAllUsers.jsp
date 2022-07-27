
<%@ page import="java.util.List" %>
<%@ page import="day3.Database.DbConnection" %>
<%@ page import="day3.Database.Contact" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %><%--
  Created by IntelliJ IDEA.
  User: Süleyman
  Date: 27.07.2022
  Time: 14:20
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>List All Contacts</title>
</head>
<%
    DbConnection dbConnect = new DbConnection();
    List<Contact> contacs =  dbConnect.selectAllContact();
    request.setAttribute("contacts",contacs);
%>
<body>
<table cellspacing="2" cellpadding="2" border="1">
    <thead>
    <tr>
        <th>Name</th>
        <th>Number</th>
    </tr>
    </thead>
    <tbody>
    <c:forEach items ="${contacts}" var = "contact">

    <tr>
        <td><c:out value="${contact.name}"/></td>
        <td><c:out value="${contact.number}"/></td>
        <td><a href="${pageContext.request.contextPath}/day3/DatabaseJsp/editContact.jsp?name=${contact.name}&number=${contact.number}">Edit</a></td>
    </tr>
        </c:forEach>

    </tbody>
</table>
</body>
</html>
