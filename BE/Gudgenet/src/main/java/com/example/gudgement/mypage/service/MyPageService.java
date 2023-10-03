package com.example.gudgement.mypage.service;

import com.example.gudgement.member.entity.Member;
import com.example.gudgement.mypage.dto.ChartDataDto;
import com.example.gudgement.mypage.entity.Chart;

public interface MyPageService {
    int[] getWeekOfMonth();
    int[] getWeekOfMonth(String date);
    ChartDataDto todayWeekChartData(Long id);
    ChartDataDto toDateWeekChartData(Long id, String date);
    Chart createChart(Member member, Long overconsumption, int year, int month, int week);
    boolean Overconsumption(long overAmountRate, long amount);
    void updateOverConsumption(Member member, Long monthOverConsumption);
}
