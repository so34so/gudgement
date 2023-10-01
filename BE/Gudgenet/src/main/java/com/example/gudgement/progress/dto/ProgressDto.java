package com.example.gudgement.progress.dto;

import com.example.gudgement.member.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ProgressDto {
    private Long id;
    private Member memberId;
    private String progressName;
    private int progressValue;

    @Builder
    public ProgressDto (Long id, Member memberId, String progressName, int progressValue){
        this.id = id;
        this.memberId = memberId;
        this.progressName = progressName;
        this.progressValue = progressValue;
    }

}
