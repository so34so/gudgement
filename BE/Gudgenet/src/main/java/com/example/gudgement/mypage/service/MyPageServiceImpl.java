package com.example.gudgement.mypage.service;

import com.example.gudgement.account.entity.TransactionHistory;
import com.example.gudgement.account.entity.VirtualAccount;
import com.example.gudgement.account.repository.TransactionHistoryRepository;
import com.example.gudgement.account.repository.VirtualAccountRepository;
import com.example.gudgement.member.entity.Member;
import com.example.gudgement.member.exception.BaseErrorException;
import com.example.gudgement.member.exception.ErrorCode;
import com.example.gudgement.member.repository.MemberRepository;
import com.example.gudgement.mypage.dto.ChartDataDto;
import com.example.gudgement.mypage.entity.Chart;
import com.example.gudgement.mypage.exception.AccountException;
import com.example.gudgement.mypage.repository.ChartRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.TemporalAdjusters;
import java.time.temporal.WeekFields;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class MyPageServiceImpl implements MyPageService{

    private final ChartRepository chartRepository;
    private final MemberRepository memberRepository;
    private final VirtualAccountRepository virtualAccountRepository;
    private final TransactionHistoryRepository transactionHistoryRepository;

    // 현재 년도, 월, 일, 주차
    @Override
    public int[] getWeekOfMonth() {
        LocalDate loc = LocalDate.now();
        int year = loc.getYear();
        int month = loc.getMonthValue();
        int day = loc.getDayOfMonth();

        int[] dayData = {year, month, day, getWeekOfMonth(loc), loc.getDayOfWeek().getValue()};
        log.info("=======================차트 가져올 Date 정보================================");
        log.info("year : {}", dayData[0]);
        log.info("month : {}", dayData[1]);
        log.info("day : {}", dayData[2]);
        log.info("N주차 : {}", dayData[3]);
        log.info("7일 중 N일 : {}", dayData[4]);
        return dayData;
    }

    // 특정 날짜 년도, 월, 일, 주차, 일요일 까지 남은 일 수
    @Override
    public int[] getWeekOfMonth(String date) {
        String[] dates = date.split("-");
        int year = Integer.parseInt(dates[0]);
        int month = Integer.parseInt(dates[1]);
        int day = Integer.parseInt(dates[2]);
        LocalDate loc = LocalDate.of(year,month,day);

        int[] dayData = {year, month, day, getWeekOfMonth(loc), loc.getDayOfWeek().getValue()};
        log.info("=======================차트 가져올 Date 정보================================");
        log.info("year : {}", dayData[0]);
        log.info("month : {}", dayData[1]);
        log.info("day : {}", dayData[2]);
        log.info("N주차 : {}", dayData[3]);
        log.info("7일 중 N일 : {}", dayData[4]);

        return dayData;
    }

    // 오늘 기준 이번주 차트
    @Override
    public ChartDataDto todayWeekChartData(Long id) {
        int[] dayData = getWeekOfMonth();
        LocalDateTime endDate = LocalDateTime.of(dayData[0], dayData[1], dayData[2],23,59,59);
        LocalDateTime startDate = endDate.minusDays(endDate.getDayOfWeek().getValue()).plusSeconds(1);

        Member member = memberRepository.findByMemberId(id).orElseThrow(() -> {
            throw new BaseErrorException(ErrorCode.NOT_FOUND_MEMBER);
        });

        Optional<Chart> chart = chartRepository.findByMemberIdAndYearAndMonthAndWeek(member, dayData[0], dayData[1], dayData[3]);
        Chart chartData;
        // 차트가 없을 때
        if (chart.isEmpty()) {
            chartData = createChart(member, member.getMonthOverconsumption(), dayData[0], dayData[1], dayData[3]);

            log.info("차트의 주차 / " + "Year : " + chartData.getYear() + "Month : " + chartData.getMonth() + "/ Week : " + chartData.getWeek());

            VirtualAccount account = virtualAccountRepository.findById(chartData.getAccountId()).orElseThrow(() -> {
                throw new AccountException(ErrorCode.NOT_FOUND_ACCOUNT);
            });

            // 기간 동안의 소비 내역
            List<TransactionHistory> histories = transactionHistoryRepository.
                    findByVirtualAccountIdAndTransactionDateBetweenAndType(account, startDate, endDate, 1);

            try {
            // 일주일 소비 내역
            for (int i = 0; i < histories.size(); i++) {
                LocalDateTime history = histories.get(i).getTransactionDate();
                long amount = histories.get(i).getAmount();
                switch (history.getDayOfWeek().getValue()) {
                    case 7:
                        chartData.setSun(amount);
                        break;
                    case 6:
                        chartData.setSat(amount);
                        break;
                    case 5:
                        chartData.setFri(amount);
                        break;
                    case 4:
                        chartData.setThu(amount);
                        break;
                    case 3:
                        chartData.setWen(amount);
                        break;
                    case 2:
                        chartData.setTue(amount);
                        break;
                    case 1:
                        chartData.setMon(amount);
                        break;
                    }
                }
            } catch (AccountException e) {
                log.error(e.getMessage());
                throw new AccountException(ErrorCode.AMOUNT_NOT_NUMBER);
            }
        // 차트가 이미 있다면
        } else {
            chartData = chart.get();

            log.info("차트의 주차 / " + "Year : " + chartData.getYear() + "Month : " + chartData.getMonth() + "/ Week : " + chartData.getWeek());

            if (chartData.getMonthOverconsumption() == null) {
                chartData.updateOverconsumption(member.getMonthOverconsumption());
                chartRepository.saveAndFlush(chartData);
            }

            VirtualAccount account = virtualAccountRepository.findById(chartData.getAccountId()).orElseThrow(() -> {
                throw new AccountException(ErrorCode.NOT_FOUND_ACCOUNT);
            });

            List<TransactionHistory> histories = transactionHistoryRepository.
                    findByVirtualAccountIdAndTransactionDateBetweenAndType(account, endDate.minusDays(1).plusSeconds(1), endDate, 1);

            try {
                long amount = 0;
                for (int i = 0; i < histories.size(); i++) {
                    amount += histories.get(i).getAmount();
                }

                // 당일 날만 갱신
                switch (dayData[4]) {
                    case 7:
                        chartData.updateSun(amount);
                        break;
                    case 6:
                        chartData.updateSat(amount);
                        break;
                    case 5:
                        chartData.updateFri(amount);
                        break;
                    case 4:
                        chartData.updateThu(amount);
                        break;
                    case 3:
                        chartData.updateWen(amount);
                        break;
                    case 2:
                        chartData.updateTue(amount);
                        break;
                    case 1:
                        chartData.updateMon(amount);
                        break;
                    }

                } catch (AccountException e) {
                log.error(e.getMessage());
                throw new AccountException(ErrorCode.AMOUNT_NOT_NUMBER);
            }
        }

        long overAmountRate;
        if (chartData.getMonthOverconsumption() != null) {
            overAmountRate = member.getMonthOverconsumption() / 7;
        } else {
            overAmountRate = Long.MAX_VALUE;
        }

        return ChartDataDto.builder()
                .data(ChartDataDto.Data.builder()
                        .type("bar")
                        .labels(new String[] {
                                startDate.getDayOfMonth() + " 월", startDate.plusDays(1).getDayOfMonth() + " 화",
                                startDate.plusDays(2).getDayOfMonth() + " 수", startDate.plusDays(3).getDayOfMonth() + " 목",
                                startDate.plusDays(4).getDayOfMonth() + " 금", startDate.plusDays(5).getDayOfMonth() + " 토",
                                startDate.plusDays(6).getDayOfMonth() + " 일"
                        })
                        .dateSet(ChartDataDto.Data.DataSet.builder()
                                .amount(new Long[] {
                                        chartData.getMon(), chartData.getTue(), chartData.getWen(),
                                        chartData.getThu(), chartData.getFri(), chartData.getSat(), chartData.getSun()})
                                .color(new boolean[] {
                                        Overconsumption(overAmountRate, chartData.getMon()), Overconsumption(overAmountRate, chartData.getTue()),
                                        Overconsumption(overAmountRate, chartData.getWen()), Overconsumption(overAmountRate, chartData.getThu()),
                                        Overconsumption(overAmountRate, chartData.getFri()), Overconsumption(overAmountRate, chartData.getSat()),
                                        Overconsumption(overAmountRate, chartData.getSun())
                                })
                                .build())
                        .build())
                .year(dayData[0])
                .month(dayData[1])
                .week(dayData[3])
                .build();
    }

    // 특정일 기준 주차 차트 가져오기
    public ChartDataDto toDateWeekChartData(Long id, String date) {
        int[] dayData = getWeekOfMonth(date);
        int nowMonth = LocalDate.now().getMonthValue();
        LocalDateTime endDate = LocalDateTime.of(dayData[0], dayData[1], dayData[2],23,59,59).minusDays(7 - dayData[4]);
        LocalDateTime startDate = endDate.minusDays(endDate.getDayOfWeek().getValue()).plusSeconds(1);

        Member member = memberRepository.findByMemberId(id).orElseThrow(() -> {
            throw new BaseErrorException(ErrorCode.NOT_FOUND_MEMBER);
        });

        Optional<Chart> chart = chartRepository.findByMemberIdAndYearAndMonthAndWeek(member, dayData[0], dayData[1], dayData[3]);
        Chart chartData;
        // 차트가 없을 때
        if (chart.isEmpty()) {
            // 이번 달이면 이번 달 목표 금액으로
            if (nowMonth == dayData[1]){
                chartData = createChart(member, member.getMonthOverconsumption(), dayData[0], dayData[1], dayData[3]);
            } else {
                chartData = createChart(member, null, dayData[0], dayData[1], dayData[3]);
            }

            log.info("차트의 주차 / " + "Month : " + chartData.getMonth() + "/ Week : " + chartData.getWeek());

            VirtualAccount account = virtualAccountRepository.findById(chartData.getAccountId()).orElseThrow(() -> {
                throw new AccountException(ErrorCode.NOT_FOUND_ACCOUNT);
            });

            // 기간 동안의 소비 내역
            List<TransactionHistory> histories = transactionHistoryRepository.
                    findByVirtualAccountIdAndTransactionDateBetweenAndType(account, startDate, endDate, 1);

            try {
                // 일주일 소비 내역
                for (int i = 0; i < histories.size(); i++) {
                    LocalDateTime history = histories.get(i).getTransactionDate();
                    long amount = histories.get(i).getAmount();
                    switch (history.getDayOfWeek().getValue()) {
                        case 7:
                            chartData.setSun(amount);
                            break;
                        case 6:
                            chartData.setSat(amount);
                            break;
                        case 5:
                            chartData.setFri(amount);
                            break;
                        case 4:
                            chartData.setThu(amount);
                            break;
                        case 3:
                            chartData.setWen(amount);
                            break;
                        case 2:
                            chartData.setTue(amount);
                            break;
                        case 1:
                            chartData.setMon(amount);
                            break;
                    }
                }
            } catch (AccountException e) {
                log.error(e.getMessage());
                throw new AccountException(ErrorCode.AMOUNT_NOT_NUMBER);
            }
        // 차트가 이미 있다면
        } else {
            chartData = chart.get();

            log.info("차트의 주차 / " + "Month : " + chartData.getMonth() + "/ Week : " + chartData.getWeek());

            VirtualAccount account = virtualAccountRepository.findById(chartData.getAccountId()).orElseThrow(() -> {
                throw new AccountException(ErrorCode.NOT_FOUND_ACCOUNT);
            });

            // 오늘이 포함된 경우만 갱신시켜야함
            LocalDateTime now = LocalDateTime.now();
            LocalDateTime today = LocalDateTime.of(now.getYear(), now.getMonthValue(), now.getDayOfMonth(), 0, 0, 0);

            List<TransactionHistory> histories = transactionHistoryRepository.
                    findByVirtualAccountIdAndTransactionDateBetweenAndType(account, today, now, 1);
            try {
                long amount = 0;
                for (int i = 0; i < histories.size(); i++) {
                    amount += histories.get(i).getAmount();
                }
                // 당일 날만 갱신
                switch (now.getDayOfWeek().getValue()) {
                    case 7:
                        chartData.updateSun(amount);
                        break;
                    case 6:
                        chartData.updateSat(amount);
                        break;
                    case 5:
                        chartData.updateFri(amount);
                        break;
                    case 4:
                        chartData.updateThu(amount);
                        break;
                    case 3:
                        chartData.updateWen(amount);
                        break;
                    case 2:
                        chartData.updateTue(amount);
                        break;
                    case 1:
                        chartData.updateMon(amount);
                        break;
                }
            } catch (AccountException e) {
                log.error(e.getMessage());
                throw new AccountException(ErrorCode.AMOUNT_NOT_NUMBER);
            }
        }

        long overAmountRate;
        if (chartData.getMonthOverconsumption() != null) {
            overAmountRate = member.getMonthOverconsumption() / 7;
        } else {
            overAmountRate = Long.MAX_VALUE;
        }

        return ChartDataDto.builder()
                .data(ChartDataDto.Data.builder()
                        .type("bar")
                        .labels(new String[] {
                                startDate.getDayOfMonth() + " 월", startDate.plusDays(1).getDayOfMonth() + " 화",
                                startDate.plusDays(2).getDayOfMonth() + " 수", startDate.plusDays(3).getDayOfMonth() + " 목",
                                startDate.plusDays(4).getDayOfMonth() + " 금", startDate.plusDays(5).getDayOfMonth() + " 토",
                                startDate.plusDays(6).getDayOfMonth() + " 일"
                        })
                        .dateSet(ChartDataDto.Data.DataSet.builder()
                                .amount(new Long[] {
                                        chartData.getMon(), chartData.getTue(), chartData.getWen(),
                                        chartData.getThu(), chartData.getFri(), chartData.getSat(), chartData.getSun()})
                                .color(new boolean[] {
                                        Overconsumption(overAmountRate, chartData.getMon()), Overconsumption(overAmountRate, chartData.getTue()),
                                        Overconsumption(overAmountRate, chartData.getWen()), Overconsumption(overAmountRate, chartData.getThu()),
                                        Overconsumption(overAmountRate, chartData.getFri()), Overconsumption(overAmountRate, chartData.getSat()),
                                        Overconsumption(overAmountRate, chartData.getSun())
                                })
                                .build())
                        .build())
                .year(dayData[0])
                .month(dayData[1])
                .week(dayData[3])
                .build();
    }

    @Override
    public Chart createChart(Member member, Long overconsumption,int year, int month, int week) {
        Chart chart = Chart.builder()
                .memberId(member)
                .monthOverconsumption(overconsumption)
                .accountId(member.getVirtualAccountId())
                .year(year)
                .month(month)
                .week(week)
                .build();

        chartRepository.saveAndFlush(chart);

        return chart;
    }

    @Override
    public boolean Overconsumption(long overAmountRate, long amount) {
        if (amount <= overAmountRate) return true;
        return false;
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
}
