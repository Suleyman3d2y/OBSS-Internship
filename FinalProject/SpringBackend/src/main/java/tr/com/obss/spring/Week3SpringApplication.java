package tr.com.obss.spring;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceTransactionManagerAutoConfiguration;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.security.config.annotation.web.builders.WebSecurity;

@SpringBootApplication()
@ComponentScan(basePackages = {"tr.com.obss.spring.*"})
public class Week3SpringApplication {

    public static void main(String[] args) {
        SpringApplication.run(Week3SpringApplication.class, args);
    }

}
