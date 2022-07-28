<%--
  Created by IntelliJ IDEA.
  User: Süleyman
  Date: 25.07.2022
  Time: 15:48
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Main Page</title>
</head>
<body>
<h2> If there is not a visual website can be shown with servlet or jsp -> Util. </h2>
<h1> DAY 1 </h1>
<table cellpadding="2" cellspacing="2" border="1">
    <tr>
        <th>Name</th>
        <th>Servlet</th>
        <th>JSP</th>
    </tr>
    <tr>
        <td>Hello World</td>
        <td><a href="${pageContext.request.contextPath}/helloworld">Hello world</a></td>
        <td><a href="day1/helloworld.jsp">Hello world.jsp</a></td>
    </tr>
    <tr>
        <td>Getting 1 Parameter</td>
        <td>Util</td>
        <td><a href="day1/getParameter.jsp">getParameter.jsp</a></td>
    </tr>
    <tr>
        <td>First Table</td>
        <td><a href="${pageContext.request.contextPath}/table">Table</a></td>
        <td><a href="day1/table.jsp">Table.jsp</a></td>
    </tr>
    <tr>
        <td>Login</td>
        <td>Util</td>
        <td><a href="day1/LoginJsp/login.jsp">Login Screen.jsp</a></td>
    </tr>
</table>

<h1> DAY 2 </h1>
<table cellpadding="2" cellspacing="2" border="1" >
    <tr>
        <th>Name</th>
        <th>Servlet</th>
        <th>JSP</th>
    </tr>
    <tr>
        <td> Tomcat Authorization</td>
        <td>Util</td>
        <td>Util</td>
    </tr>
    <tr>
        <td>Clicking Image</td>
        <td>Util</td>
        <td><a href="${pageContext.request.contextPath}/day2/ImagePractice/imageClick.jsp">imageClick.jsp</a></td>
    </tr>
    <tr>
        <td>Include Jsp</td>
        <td>Util</td>
        <td><a href="${pageContext.request.contextPath}/day2/IncludeJSP/main.jsp">Include.jsp</a></td>
    </tr>
    <tr>
        <td>Servlet Initialization</td>
        <td>Util</td>
        <td><a href="${pageContext.request.contextPath}/day2/InitializationPractice/Initialize.jsp">Initialize.jsp</a></td>
    </tr>
    <tr>
        <td>List to table</td>
        <td>Util</td>
        <td><a href="${pageContext.request.contextPath}/day2/TablePractice/tableInfo.jsp">Table.jsp</a></td>
    </tr>
</table>

<h1> DAY 3 </h1>
<table cellpadding="2" cellspacing="2" border="1" >
    <tr>
        <th>Name</th>
        <th>Servlet</th>
        <th>JSP</th>
    </tr>
    <tr>
        <td>Database</td>
        <td>Util</td>
        <td><a href="${pageContext.request.contextPath}/day3/DatabaseJsp/DbButtons.jsp">DbButtons.jsp</a></td>
    </tr>
    <tr>
        <td>Error Handling</td>
        <td><a href="${pageContext.request.contextPath}/ErrorServlet?code=404">ErrorServlet(404)</a></td>
        <td>Util</td>
        <td><a href="${pageContext.request.contextPath}/ErrorServlet?code=500">ErrorServlet(500)</a></td>

    </tr>
    <tr>
        <td>Error Handling 2</td>
        <td><a href="${pageContext.request.contextPath}/SecuredServlet">SecuredServlet</a></td>
        <td>Util</td>
        <td><a href="${pageContext.request.contextPath}/SecuredServlet/secured">SecuredServlet</a></td>
    </tr>
</table>

<h1> DAY 4 </h1>
<table cellpadding="2" cellspacing="2" border="1" >
    <tr>
        <th>Name</th>
        <th>Servlet</th>
        <th>JSP</th>
    </tr>
    <tr>
        <td>Cookies</td>
        <td><a href="${pageContext.request.contextPath}/setCookies">setCookiesServlet</a></td>
        <td>None</td>
    </tr>
    <tr>
        <td>Sessions</td>
        <td>Util</td>
        <td><a href="day4/private/dashboard.jsp">Dashboard</a></td>
        <td><a href="day4/public/home.jsp">Home</a></td>
    </tr>

</table>


</body>
</html>
