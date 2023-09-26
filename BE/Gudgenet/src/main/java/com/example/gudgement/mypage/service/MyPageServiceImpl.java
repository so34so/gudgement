package com.example.gudgement.mypage.service;

import com.example.gudgement.member.entity.Member;
import com.example.gudgement.member.exception.BaseErrorException;
import com.example.gudgement.member.exception.ErrorCode;
import com.example.gudgement.member.repository.MemberRepository;
import com.example.gudgement.mypage.dto.ChartDataDto;
import com.example.gudgement.mypage.entity.Chart;
import com.example.gudgement.mypage.repository.ChartRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.time.temporal.WeekFields;
import java.util.Locale;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class MyPageServiceImpl implements MyPageService{

    private final ChartRepository chartRepository;
    private final MemberRepository memberRepository;

    // 현재 년도, 월, 일, 주차
    @Override
    public int[] getWeekOfMonth() {
        LocalDate loc = LocalDate.now();
        int year = loc.getYear();
        int month = loc.getMonthValue();
        int day = loc.getDayOfMonth();

        int[] dayData = {year, month, day, getWeekOfMonth(loc), loc.getDayOfWeek().getValue()};
        log.info("year : {}", dayData[0]);
        log.info("month : {}", dayData[1]);
        log.info("day : {}", dayData[2]);
        log.info("N주차 : {}", dayData[3]);
        log.info("7일 중 N일 : {}", dayData[4]);
        return dayData;
    }

    // 특정 날짜 년도, 월, 일, 주차
    @Override
    public int[] getWeekOfMonth(String date) {
        String[] dates = date.split("-");
        int year = Integer.parseInt(dates[0]);
        int month = Integer.parseInt(dates[1]);
        int day = Integer.parseInt(dates[2]);
        LocalDate loc = LocalDate.of(year,month,day);

        int[] dayData = {year, month, day, getWeekOfMonth(loc), loc.getDayOfWeek().getValue()};

        log.info("year : {}", dayData[0]);
        log.info("month : {}", dayData[1]);
        log.info("day : {}", dayData[2]);
        log.info("N주차 : {}", dayData[3]);
        log.info("7일 중 N일 : {}", dayData[4]);

        return dayData;
    }

    @Override
    public ChartDataDto todayWeekChartData(Long id) {
        int[] dayData;
        dayData = getWeekOfMonth();

        Member member = memberRepository.findByMemberId(id).orElseThrow(() -> {
            throw new BaseErrorException(ErrorCode.NOT_FOUND_MEMBER);
        });

        Optional<Chart> chart = chartRepository.findByMemberIdAndMonthAndWeek(member, dayData[1], dayData[3]);
        Chart chartData;
        if (chart.isEmpty()) {
            chartData = createChart(member, dayData[1], dayData[3]);

        } else {
            chartData = chart.get();
        }

        switch (dayData[4]) {
            case 7:
                chartData.setSun(7L);
            case 6:
                chartData.setSat(6L);
            case 5:
                chartData.setFri(5L);
            case 4:
                chartData.setThu(4L);
            case 3:
                chartData.setWen(3L);
            case 2:
                chartData.setTue(2L);
            case 1:
                chartData.setMon(1L);
        }
        return null;
    }

    @Override
    public Chart createChart(Member member, int month, int week) {
        Chart chart = Chart.builder()
                .memberId(member)
                .account("member.getAccount")
                .month(month)
                .week(week)
                .build();

        chartRepository.saveAndFlush(chart);

        return chart;
    }

    public int getWeekOfMonth(LocalDate localDate) {
        // WeekFields 객체 생성
        WeekFields weekFields = WeekFields.of(Locale.getDefault());

        // 이번 달의 첫 번째 주 시작일 계산
        LocalDate firstWeekStartDate = localDate.with(TemporalAdjusters.firstDayOfMonth())
                .with(weekFields.getFirstDayOfWeek());

        // 현재 날짜가 속한 주차 계산
        return localDate.get(weekFields.weekOfMonth()) -
                firstWeekStartDate.get(weekFields.weekOfMonth()) + 2;
    }

//    public Long getDayPayment(Member member) {
//
//    }
}
