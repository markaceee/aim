package aim.server.service;

import java.util.Date;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import aim.server.mapper.UserMapper;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailService {
    @Value("${spring.mail.username}")
    private String fromEmail;

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private TemplateEngine templateEngine;

    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

    public Boolean sendMail(String email, String password) {
        try {
            String token = RandomStringUtils.randomAlphanumeric(60);

            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
            mimeMessageHelper.setFrom(fromEmail);
            mimeMessageHelper.setTo(email);
            mimeMessageHelper.setSubject("Email Verification");

            Context context = new Context();

            context.setVariable("token", token);

            String emailContent = templateEngine.process("email_template", context);

            mimeMessageHelper.setText(emailContent, true);

            javaMailSender.send(mimeMessage);

            saveUserToDB(email, password, token);

            return true;
        } catch (Exception e) {
            System.out.println(e);
        }

        return false;
    }

    public void saveUserToDB(String email, String password, String token) {
        userMapper.saveNonVerifiedUser(email, passwordEncoder.encode(password), token,
                new Date(System.currentTimeMillis() + 6000000));
        // 10 minutes 600000
    }
}