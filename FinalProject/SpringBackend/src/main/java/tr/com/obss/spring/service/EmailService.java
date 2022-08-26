package tr.com.obss.spring.service;

import org.springframework.core.env.Environment;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;

import java.util.Properties;

@Service
public class EmailService {

    private final JavaMailSenderImpl javaMailSender = new JavaMailSenderImpl();

    private final Environment environment;

    public EmailService(Environment environment) {
        this.environment = environment;
    }

    public void sendEmail(String email, String subject, String from, String text) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(email);
        mailMessage.setSubject(subject);
        mailMessage.setFrom(from);
        mailMessage.setText(text);

        javaMailSender.setHost("smtp.gmail.com");
        javaMailSender.setPort(587);
        javaMailSender.setUsername("suleyman.uslu3d2y@gmail.com");
        javaMailSender.setPassword("gombcpbjjgsyoptq");

        Properties properties = javaMailSender.getJavaMailProperties();
        properties.put("mail.transport.protocol",environment.getProperty("spring.mail.properties.mail.transport.protocol"));
        properties.put("mail.smtp.auth",environment.getProperty("spring.mail.properties.mail.smtp.auth"));
        properties.put("mail.smtp.starttls.enable",environment.getProperty("spring.mail.properties.mail.smtp.starttls.enable"));
        properties.put("mail.debug",environment.getProperty("spring.mail.properties.mail.debug"));

        javaMailSender.send(mailMessage);
    }


}
