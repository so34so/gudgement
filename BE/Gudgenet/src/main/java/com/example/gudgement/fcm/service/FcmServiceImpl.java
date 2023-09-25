package com.example.gudgement.fcm.service;

import com.example.gudgement.fcm.dto.FcmNotificationRequestDto;
import com.example.gudgement.fcm.exception.FcmErrorException;
import com.example.gudgement.member.entity.Member;
import com.example.gudgement.member.exception.BaseErrorException;
import com.example.gudgement.member.exception.ErrorCode;
import com.example.gudgement.member.repository.MemberRepository;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class FcmServiceImpl implements FcmService{

    private final FirebaseMessaging firebaseMessaging;
    private final MemberRepository memberRepository;

    @Override
    @Transactional
    public void setAccessToken(Long memberId, String firebaseToken) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> {
            throw new BaseErrorException(ErrorCode.NOT_FOUND_MEMBER);
        });

        member.setFirebaseToken(firebaseToken);
        memberRepository.save(member);
    }

    @Override
    public String sendNotificationDetail(FcmNotificationRequestDto requestDto) throws FcmErrorException {
        Optional<Member> member = memberRepository.findByMemberId(requestDto.getMemberId());
        if (member.isPresent()) {
            if (member.get().getFirebaseToken() != null) {
                Notification notification = Notification.builder()
                        .build();

                Message message = Message.builder()
                        .setToken(member.get().getFirebaseToken())
                        .setNotification(notification)
                        .build();

                try {
                    firebaseMessaging.send(message);
                    return "성공!";
                } catch (FirebaseMessagingException e) {
                    log.error(e.getMessage(), e.getCause());
                    return "송신 실패!";
                }
            } else {
                new BaseErrorException(ErrorCode.NOT_EXIST_TOKEN);
                return "유저에게 토큰이 없음";
            }
        } else {
            new BaseErrorException(ErrorCode.NOT_EXISTS_MEMBER);
            return "유저가 존재하지 않음";
        }
    }
}
