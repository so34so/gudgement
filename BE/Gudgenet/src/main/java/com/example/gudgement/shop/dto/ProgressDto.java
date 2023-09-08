package com.example.gudgement.shop.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProgressDto {
    private long id;
    /*private member memberId;*/

    private String progressName;

    private int progressValue;

    private int progressCategory;

    @Builder
    public ProgressDto(long id, /*Member memberId,*/ String progressName, int progressValue, int progressCategory){
        this.id = id;
        /*this.memberId = memberId;*/
        this.progressName = progressName;
        this.progressValue = progressValue;
        this.progressCategory = progressCategory;
    }

}
