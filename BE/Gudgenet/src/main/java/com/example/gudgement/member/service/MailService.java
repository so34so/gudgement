package com.example.gudgement.member.service;



public interface MailService {
    String sendEmail(String toEmail, String text) throws Exception;
    String randomNumber();
    boolean duplicateEmail(String toEmail);
}
