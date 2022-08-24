package tr.com.obss.spring;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication()
@ComponentScan(basePackages = {"tr.com.obss.spring.*"})
public class Week3SpringApplication {

    public static void main(String[] args) {
        SpringApplication.run(Week3SpringApplication.class, args);
    }

}
