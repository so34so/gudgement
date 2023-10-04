package com.example.gudgement.fcm.service;

import com.example.gudgement.exception.BaseErrorException;
import com.example.gudgement.exception.ErrorCode;
import com.example.gudgement.exception.FcmErrorException;
import com.example.gudgement.fcm.dto.FcmNotificationResponseDto;
import com.example.gudgement.member.entity.Member;
import com.example.gudgement.member.repository.MemberRepository;
import com.google.firebase.messaging.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class FcmServiceImpl implements FcmService{

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

    // 채널별 송신
    @Override
    public String sendNotificationToChannel(FcmNotificationResponseDto requestDto) throws FcmErrorException {
        Optional<Member> member = memberRepository.findByMemberId(requestDto.getMemberId());
        if (member.isPresent()) {
            if (member.get().getFirebaseToken() != null) {
                Notification notification = Notification.builder()
                        .setTitle(requestDto.getTitle())
                        .setBody(requestDto.getContent())
                        .build();

                Message message = Message.builder()
                        .setToken(member.get().getFirebaseToken())
                        .setNotification(notification)
                        .setAndroidConfig(AndroidConfig.builder()
                                .setTtl(3600*1000)
                                .setNotification(AndroidNotification.builder()
                                        .setIcon("https://gudgement.s3.ap-northeast-2.amazonaws.com/asset/appicon.png")
                                        .setChannelId(requestDto.getChannel())
                                        .build())
                                .build())
                        .build();

                try {
                    String response = FirebaseMessaging.getInstance().send(message);
                    return response;
                } catch (FirebaseMessagingException e) {
                    throw new FcmErrorException(ErrorCode.NOT_REGISTRATION_NICKNAME);
                }
            } else {
                throw new FcmErrorException(ErrorCode.NOT_REGISTRATION_FCM_TOKEN);
            }
        } else {
            throw new BaseErrorException(ErrorCode.NOT_EXISTS_MEMBER);
        }
    }
}
