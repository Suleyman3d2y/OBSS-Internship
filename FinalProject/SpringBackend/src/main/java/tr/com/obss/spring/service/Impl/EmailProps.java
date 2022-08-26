package tr.com.obss.spring.service.Impl;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "spring.mail.properties")
public class EmailProps {

    private String mailProtocol;
    private boolean mailSmtpAuth;
    private boolean mailSmtpStarttlsEnable;
    private boolean mailDebug;
    private String mailHost;
    private int mailPort;
    private String mailUsername;
    private String mailPassword;

    public String getMailProtocol() {
        return mailProtocol;
    }

    public void setMailProtocol(String mailProtocol) {
        this.mailProtocol = mailProtocol;
    }

    public boolean isMailSmtpAuth() {
        return mailSmtpAuth;
    }

    public void setMailSmtpAuth(boolean mailSmtpAuth) {
        this.mailSmtpAuth = mailSmtpAuth;
    }

    public boolean isMailSmtpStarttlsEnable() {
        return mailSmtpStarttlsEnable;
    }

    public void setMailSmtpStarttlsEnable(boolean mailSmtpStarttlsEnable) {
        this.mailSmtpStarttlsEnable = mailSmtpStarttlsEnable;
    }

    public boolean isMailDebug() {
        return mailDebug;
    }

    public void setMailDebug(boolean mailDebug) {
        this.mailDebug = mailDebug;
    }

    public String getMailHost() {
        return mailHost;
    }

    public void setMailHost(String mailHost) {
        this.mailHost = mailHost;
    }

    public int getMailPort() {
        return mailPort;
    }

    public void setMailPort(int mailPort) {
        this.mailPort = mailPort;
    }

    public String getMailUsername() {
        return mailUsername;
    }

    public void setMailUsername(String mailUsername) {
        this.mailUsername = mailUsername;
    }

    public String getMailPassword() {
        return mailPassword;
    }

    public void setMailPassword(String mailPassword) {
        this.mailPassword = mailPassword;
    }
}
