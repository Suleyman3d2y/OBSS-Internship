package day3.Database;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class DbConnection {

    String driver = "org.postgresql.Driver";

    public void loadDriver() {
        try {
            Class.forName(driver);
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }

    public Connection getConnection() {
        Connection con = null;
        try {
            con = DriverManager.getConnection("jdbc:postgresql://localhost:5432/OBSS",
                    "postgres", "16798520");
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return con;
    }

    public void createContact(Contact contact) {
        String sql = "INSERT INTO contacts(id,name,number) VALUES (DEFAULT,?,?)";
        try {
            loadDriver();
            Connection con = getConnection();
            PreparedStatement ps = con.prepareStatement(sql);
            ps.setString(1,contact.getName());
            ps.setInt(2,Integer.parseInt(contact.getNumber()));
            ps.executeUpdate();
            con.close();
            ps.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void editContact(Contact contact) {
        String sql = "UPDATE contacts SET name=?, number=? WHERE name=?";
        try {
            loadDriver();
            Connection con = getConnection();
            PreparedStatement ps = con.prepareStatement(sql);
            ps.setString(1,contact.getName());
            ps.setInt(2,Integer.parseInt(contact.getNumber()));
            ps.setString(3,contact.getName());
            ps.executeUpdate();

            con.close();
            ps.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    public void deleteContact(String name) {
        String sql = "DELETE FROM contacts WHERE name=?";
        try {
            loadDriver();
            Connection con = getConnection();
            PreparedStatement ps = con.prepareStatement(sql);
            ps.setString(1,name);
            ps.executeUpdate();
            con.close();
            ps.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public Contact searchContact(String name) {
        Contact contact = new Contact(null,null);
        PreparedStatement ps = null;
        ResultSet rs = null;
        String name2 = null;
        String number = null;
        try {
            loadDriver();
            Connection con = getConnection();
            ps = con.prepareStatement("SELECT * FROM contacts WHERE name = ?");
            ps.setString(1, name);
            rs = ps.executeQuery();

            while (rs.next()) {
                name2 = rs.getString("name");
                number = String.valueOf(rs.getInt("number"));
            }
            con.close();
            ps.close();
            rs.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }


        contact.setName(name2);
        contact.setNumber(number);

        return contact;
    }

    public List<Contact> selectAllContact() {
        List<Contact> contacts = new ArrayList<>();
        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            loadDriver();
            Connection con = getConnection();
            ps = con.prepareStatement("SELECT * FROM contacts");
            rs = ps.executeQuery();

            while (rs.next()) {
                int id = rs.getInt("id");
                String name = rs.getString("name");
                int number = rs.getInt("number");
                contacts.add(new Contact(name,String.valueOf(number)));
            }
            con.close();
            ps.close();
            rs.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }


            return contacts;
    }


}
