package tr.com.obss.spring.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;
import tr.com.obss.spring.service.Impl.EmailProps;

import java.util.Properties;

@Service
public class EmailService {

    private final JavaMailSenderImpl javaMailSender = new JavaMailSenderImpl();

    private final EmailProps emailProps;


    public EmailService(EmailProps emailProps) {
        this.emailProps = emailProps;
    }

    public void sendEmail(String email, String subject, String from, String text) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(email);
        mailMessage.setSubject(subject);
        mailMessage.setFrom(from);
        mailMessage.setText(text);

        javaMailSender.setHost(emailProps.getMailHost());
        javaMailSender.setPort(emailProps.getMailPort());
        javaMailSender.setUsername(emailProps.getMailUsername());
        javaMailSender.setPassword(emailProps.getMailPassword());

        Properties properties = javaMailSender.getJavaMailProperties();
        properties.put("mail.transport.protocol",emailProps.getMailProtocol());
        properties.put("mail.smtp.auth",emailProps.isMailSmtpAuth());
        properties.put("mail.smtp.starttls.enable",emailProps.isMailSmtpStarttlsEnable());
        properties.put("mail.debug",emailProps.isMailDebug());

        javaMailSender.send(mailMessage);
    }


}
