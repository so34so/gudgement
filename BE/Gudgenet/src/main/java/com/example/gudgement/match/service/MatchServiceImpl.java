package com.example.gudgement.match.service;

import com.example.gudgement.match.dto.MatchDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.Iterator;
import java.util.Set;

@Slf4j
@Service
@RequiredArgsConstructor
public class MatchServiceImpl implements MatchService {

    private final RedisTemplate<String, MatchDto> redisTemplate;
    private final LettuceConnectionFactory redisConnectionFactory;

    public void requestMatch(MatchDto matchDto) {
        String key = "matchQueue:" + matchDto.getLevel() + ":" + matchDto.getTiggle();

        Boolean alreadyWaiting = redisTemplate.opsForZSet().rank(key, matchDto) != null;
        if (alreadyWaiting) {
            throw new RuntimeException("이미 대기열에 있습니다");
        }


        double score = calculateScore(matchDto);
        redisTemplate.opsForZSet().add(key, matchDto, score);

        // check if a user is matched after adding the new user to the queue
        if (isMatched(matchDto.getLevel().intValue(), matchDto.getNickName())) {
            System.out.println("User " + matchDto.getNickName() + " is matched!");
            // TODO: Add your own logic after a user is matched (e.g., send a notification to the users)
        }

    }

    private double calculateScore(MatchDto matchDto) {
        // 멤버의 레벨과 대기 시간을 기반으로 점수를 계산합니다.

        // 이것은 단지 예시입니다. 실제 요구 사항에 따라 조정이 필요합니다.
        double levelWeight = 0.7;  // 필요에 따라 이 값을 조정하세요.
        double timeWeight = 1 - levelWeight;

        /* 여기서는 System.nanoTime() 함수를 사용하여 더 높은 정밀도로 현재 시간을 얻습니다 */
        /* 또한 큰 숫자에서 시간을 뺌으로써 오래된 요청일수록 점수가 높아지게 합니다 */
        long maxTime = 10000000000000L;

        return levelWeight * matchDto.getLevel() + timeWeight * (maxTime - System.nanoTime());
    }

    private boolean isMatched(int level, String username) {
        for (int i = level - 1; i <= level + 1; i++) { // 주변 레벨 탐색 범위 설정. 현재 레벨의 앞뒤로 한 단계씩.
            String key = "matchQueue:" + i;
            Long waitingUserCount = redisTemplate.opsForZSet().zCard(key);

            if (waitingUserCount >= 2) {
                Set<MatchDto> range = redisTemplate.opsForZSet().range(key, 0, 1);

                Iterator<MatchDto> iterator = range.iterator();
                MatchDto firstUser = iterator.next();
                MatchDto secondUser = iterator.next();

                deleteUsersFromQueue(new MatchDto[]{firstUser, secondUser}, key);

                return true;
            }
        }

        return false;
    }

    private void deleteUsersFromQueue(MatchDto[] users, String key) {
        for (MatchDto user : users) {
            redisTemplate.opsForZSet().remove(key, user);
        }
    }

    public void cancelMatch(MatchDto matchDto) {
        String key = "matchQueue:" + matchDto.getLevel() + ":" + matchDto.getTiggle();

        if (redisTemplate.opsForZSet().remove(key, matchDto.getNickName()) == 0) {
            throw new RuntimeException("Failed to cancel the matching request");
        }
    }

}
