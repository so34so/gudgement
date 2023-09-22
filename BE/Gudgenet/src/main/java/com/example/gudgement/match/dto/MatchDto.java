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
    private String nickName;
    private String roleUser;
    private Long tiggle;
    private Long timestamp;

    @Builder
    public MatchDto(Long memberId, String nickName, String roleUser, Long tiggle, Long timestamp){
        this.memberId = memberId;
        this.nickName = nickName;
        this.roleUser = roleUser;
        this.tiggle = tiggle;
        this.timestamp = timestamp;
    }

}
