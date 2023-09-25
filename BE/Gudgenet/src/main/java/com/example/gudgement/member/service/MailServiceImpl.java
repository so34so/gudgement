package com.example.gudgement.member.service;

import com.example.gudgement.member.exception.BaseErrorException;
import com.example.gudgement.member.exception.ErrorCode;
import com.example.gudgement.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Calendar;
import java.util.Date;
import java.util.Random;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class MailServiceImpl implements MailService{

    private final JavaMailSender emailSender;
    private final MemberRepository memberRepository;

    public String sendEmail(String toEmail, String text) {
        if (duplicateEmail(toEmail)) {
            throw new BaseErrorException(ErrorCode.DUPLICATION_EMAIL);
        }

        System.out.println("보내는 대상 : " + toEmail);
        System.out.println("보내는 내용 : " + text);

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        calendar.add(Calendar.MINUTE, 10);
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setFrom("Dogeza_Penguin@Gudgement.net");
        message.setSubject("Gudgement 이메일 인증 요청입니다.");
        message.setText(
                "안녕하세요. Gudgement GM 도게자 펭귄입니다." +
                "\n\n" +
                "인증번호는 " + text + " 입니다." +
                "\n\n" +
                "해당 인증번호를 인증번호 확인란에 기입하여 주시기바랍니다." +
                "\n\n" +
                calendar.getTime() + " 까지 인증하셔야합니다.");

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

    @Override
    public boolean duplicateEmail(String toEmail) {
        return memberRepository.existsByEmail(toEmail);
    }
}
