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
    private String progressContent;
    private int progressValue;

    @Builder
    public ProgressDto (Long id, Member memberId, String progressName, String progressContent, int progressValue){
        this.id = id;
        this.memberId = memberId;
        this.progressName = progressName;
        this.progressContent = progressContent;
        this.progressValue = progressValue;
    }

}
