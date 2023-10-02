package com.example.gudgement.match.service;

import com.example.gudgement.game.exception.BaseErrorException;
import com.example.gudgement.game.exception.GameErrorCode;
import com.example.gudgement.match.dto.MatchDto;
import com.example.gudgement.match.event.MatchRequestEvent;
import com.example.gudgement.member.entity.Member;
import com.example.gudgement.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.redis.core.*;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MatchServiceImpl implements MatchService {

    private final RedisTemplate<String, String> redisTemplate;
    private final ApplicationEventPublisher eventPublisher;
    private final MemberRepository memberRepository;


    public void addUserToGroup(MatchDto matchDto) {
        Optional<Member> user = memberRepository.findByNickname(matchDto.getNickName());
        if (user.get().getTiggle() < matchDto.getTiggle()){
            throw new BaseErrorException(GameErrorCode.NOT_FOUND_MYSQL);
        }
        String key = "Room:" + matchDto.getTiggle() + ":" + matchDto.getGrade();
        redisTemplate.opsForSet().add(key, matchDto.getNickName());

        eventPublisher.publishEvent(new MatchRequestEvent(this, matchDto));
    }

    public void removeUserFromGroup(MatchDto matchDto) {
        String key = "Room:" + matchDto.getTiggle() + ":" + matchDto.getGrade();
        redisTemplate.opsForSet().remove(key, matchDto.getNickName());
    }
}