package com.example.gudgement.mypage.service;

import com.example.gudgement.member.entity.Member;
import com.example.gudgement.mypage.dto.response.ChartResponseDto;
import com.example.gudgement.mypage.entity.Chart;

public interface ChartService {
    ChartResponseDto todayWeekChartData(Long id);
    ChartResponseDto toDateWeekChartData(Long id, String date);
    Chart createChart(Member member, Long overconsumption, int year, int month, int week);
    void updateOverConsumption(Member member, Long monthOverConsumption);
}
