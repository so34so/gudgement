package com.example.gudgement.member.service;

import com.example.gudgement.member.exception.BaseErrorException;
import com.example.gudgement.member.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Random;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class MailServiceImpl implements MailService{

    private final JavaMailSender emailSender;

    public String sendEmail(String toEmail, String text) {
        System.out.println("보내는 대상 : " + toEmail);
        System.out.println("보내는 내용 : " + text);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setFrom("GudgeMent-GM-Dogeza-Penguin");
        message.setSubject("Gudgement 이메일 인증 요청입니다.");
        message.setText(text);

        try {
            emailSender.send(message);
        } catch (RuntimeException e) {
            log.debug("MailService.sendEmail exception occur toEmail: {}, " +
                    "title: {}, text: {}", toEmail, text);
            throw new BaseErrorException(ErrorCode.UNABLE_TO_SEND_EMAIL);
        }

        return text;
    }

    public String randomNumber() {
        Random r = new Random();
        int checkNum = r.nextInt(888888)+111111;
        System.out.println("인증번호 : " + checkNum);
        return String.valueOf(checkNum);
    }
}
