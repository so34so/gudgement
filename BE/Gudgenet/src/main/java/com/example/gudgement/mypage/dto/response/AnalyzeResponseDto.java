package com.example.gudgement.mypage.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class AnalyzeResponseDto {
    private int year;
    private int month;
    private Long bestAmount;
    private String bestDestination;
    private int frequencyCount;
    private Long frequencyAmount;
    private String frequencyDestination;
    private Integer totalMember;
    private Integer ranking;
    private long lastMonthAmount;
    private Double lastMonthAmountRate;
    private long thisMonthAmount;
    private Double thisMonthAmountRate;

    @Builder
    public AnalyzeResponseDto(int year, int month, Long bestAmount, String bestDestination,
                              int frequencyCount, Long frequencyAmount, String frequencyDestination,
                              Integer totalMember, Integer ranking, long lastMonthAmount, Double lastMonthAmountRate,
                              long thisMonthAmount, Double thisMonthAmountRate) {

        this.year = year;
        this.month = month;
        this.bestAmount = bestAmount;
        this.bestDestination = bestDestination;
        this.frequencyCount = frequencyCount;
        this.frequencyAmount = frequencyAmount;
        this.frequencyDestination = frequencyDestination;
        this.totalMember = totalMember;
        this.ranking = ranking;
        this.lastMonthAmount = lastMonthAmount;
        this.lastMonthAmountRate = lastMonthAmountRate;
        this.thisMonthAmount = thisMonthAmount;
        this.thisMonthAmountRate = thisMonthAmountRate;
    }
}
