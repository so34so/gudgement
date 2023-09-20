package com.example.gudgement.match.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@NoArgsConstructor
public class MatchDto implements Serializable {
    private Long memberId;
    private Long level;
    private Long timestamp;

    @Builder
    public MatchDto(Long memberId, Long level, Long timestamp){
        this.memberId = memberId;
        this.level = level;
        this.timestamp = timestamp;
    }
}
