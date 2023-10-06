package com.example.gudgement.match.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.io.Serializable;

@Getter
@ToString
@NoArgsConstructor
public class MatchDto implements Serializable {

    private String nickName;
    private String grade;
    private Long tiggle;


    @Builder
    public MatchDto(Long memberId, String nickName, String grade, Long tiggle, Long timestamp){

        this.nickName = nickName;
        this.grade = grade;
        this.tiggle = tiggle;

    }

}
