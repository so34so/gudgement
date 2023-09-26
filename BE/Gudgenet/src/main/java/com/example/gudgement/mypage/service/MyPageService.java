package com.example.gudgement.mypage.service;

import com.example.gudgement.member.entity.Member;
import com.example.gudgement.mypage.dto.ChartDataDto;
import com.example.gudgement.mypage.entity.Chart;

public interface MyPageService {
    int[] getWeekOfMonth();
    int[] getWeekOfMonth(String date);
    ChartDataDto todayWeekChartData(Long id);
    Chart createChart(Member member, int month, int week);
}
