package tr.com.obss.spring;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceTransactionManagerAutoConfiguration;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {HibernateJpaAutoConfiguration.class, DataSourceAutoConfiguration.class,
        DataSourceTransactionManagerAutoConfiguration.class, SecurityAutoConfiguration.class})
public class Week3SpringApplication {
    /*con = DriverManager.getConnection("jdbc:postgresql://localhost:5432/OBSS",
                "postgres", "16798520");*/

    public static void main(String[] args) {
        SpringApplication.run(Week3SpringApplication.class, args);
    }



}
