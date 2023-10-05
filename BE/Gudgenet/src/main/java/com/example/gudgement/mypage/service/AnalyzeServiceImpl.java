package com.example.gudgement.mypage.service;

import com.example.gudgement.exception.BaseErrorException;
import com.example.gudgement.exception.ErrorCode;
import com.example.gudgement.member.entity.Member;
import com.example.gudgement.member.repository.MemberRepository;
import com.example.gudgement.mypage.dto.request.AnalyzeRequestDto;
import com.example.gudgement.mypage.dto.response.AnalyzeResponseDto;
import com.example.gudgement.mypage.entity.Chart;
import com.example.gudgement.mypage.entity.MonthAnalyze;
import com.example.gudgement.mypage.repository.ChartRepository;
import com.example.gudgement.mypage.repository.MonthAnalyzeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class AnalyzeServiceImpl implements AnalyzeService{
    private final ChartRepository chartRepository;
    private final MonthAnalyzeRepository monthAnalyzeRepository;
    private final ChartService chartService;
    private final MemberRepository memberRepository;

    @Override
    @Transactional
    public void createMonthAnalyze(AnalyzeRequestDto analyzeRequestDto) {
        Long virtualAccountId = analyzeRequestDto.getVirtualAccountId();
        int year = analyzeRequestDto.getYear();
        int month = analyzeRequestDto.getMonth();
        LocalDate nowDate = LocalDate.now();
        Optional<MonthAnalyze> monthAnalyze = monthAnalyzeRepository.findByYearAndMonthAndVirtualAccountId(year, month, virtualAccountId);

        if (monthAnalyze.isPresent() && (year != nowDate.getYear() || month != nowDate.getMonth().getValue())) {
            log.info("변화 불가능한 데이터, 이전 기록 반환합니다.");
            return;
        }
        log.info("새로 분석합니다...");

        int dayInMonth = getDaysInMonth(year, month);
        int weekInMonth = getWeekInMonth(dayInMonth, year, month);

        Member member = memberRepository.findByVirtualAccountId(virtualAccountId).orElseThrow(() -> {
            throw new BaseErrorException(ErrorCode.NOT_CONNECT_ACCOUNT);
        });

        Chart[] charts = new Chart[weekInMonth];
        int[] days = dayData(dayInMonth, weekInMonth, year, month);
        for (int i = 1; i < weekInMonth+1; i++) {
            Optional<Chart> chart = chartRepository.findByAccountIdAndYearAndMonthAndWeek(virtualAccountId, year, month, i);
            if (chart.isEmpty()) {
                LocalDate localDate = LocalDate.of(year, month, days[i-1]);
                chartService.toDateWeekChartData(member.getMemberId(), String.valueOf(localDate));
            }
        }

        List<Chart> chartList = chartRepository.findALLByAccountIdAndYearAndMonth(virtualAccountId, year, month);

        // 목표 금액 찾아 오기
        Long monthOverconsumption = -1L;
        if (nowDate.getMonth().getValue() == month) {
            monthOverconsumption = member.getMonthOverconsumption();
        } else if (nowDate.getMonth().getValue() > month) {
            for (int i = 0; i < chartList.size(); i++) {
                if (chartList.get(i).getMonthOverconsumption() != null) {
                    monthOverconsumption = chartList.get(i).getMonthOverconsumption();
                }
            }
        } else if (nowDate.getMonth().getValue() < month){
            throw new BaseErrorException(ErrorCode.IMPOSSIBLE_CREATE_DATA);
        }

        System.out.println(monthOverconsumption);

        String result = flaskPostRequest(virtualAccountId, year, month, monthOverconsumption);
        if (result.equals("NOT_EXIST")) {
            throw new BaseErrorException(ErrorCode.NOT_EXIST_TRANSACTION);
        } else if (!result.equals("Success")) {
            throw new BaseErrorException(ErrorCode.FAIL_REQUEST);
        }
    }

    @Override
    public AnalyzeResponseDto getMonthAnalyze(Long virtualAccountId, int year, int month) {
        MonthAnalyze createdAnalyze = monthAnalyzeRepository
                .findByYearAndMonthAndVirtualAccountId(year, month, virtualAccountId).orElseThrow(() -> {
                    throw new BaseErrorException(ErrorCode.NOT_FOUND_ANALYZE);
                });

        return AnalyzeResponseDto.builder()
                .year(createdAnalyze.getYear())
                .month(createdAnalyze.getMonth())
                .bestAmount(createdAnalyze.getBestAmount())
                .bestDestination(createdAnalyze.getBestDestination())
                .frequencyCount(createdAnalyze.getFrequencyCount())
                .frequencyAmount(createdAnalyze.getFrequencyAmount())
                .frequencyDestination(createdAnalyze.getFrequencyDestination())
                .totalMember(createdAnalyze.getCount())
                .ranking(createdAnalyze.getRanking())
                .lastMonthAmount(createdAnalyze.getLastMonthAmount())
                .lastMonthAmountRate(createdAnalyze.getLastMonthAmountRate())
                .thisMonthAmount(createdAnalyze.getThisMonthAmount())
                .thisMonthAmountRate(createdAnalyze.getThisMonthAmountRate())
                .build();
    }

    public int getDaysInMonth(int year, int month) {
        YearMonth yearMonth = YearMonth.of(year, month); // 연도와 월 설정
        int daysInMonth = yearMonth.lengthOfMonth(); // 해당 월의 일수 계산
        return daysInMonth;
    }

    public int getWeekInMonth(int daysInMonth, int year, int month) {
        LocalDate localDate = LocalDate.of(year, month, 1);
        int week = 1;
        int day =  localDate.plusDays((7 - localDate.getDayOfWeek().getValue())+1).getDayOfMonth();

        while (day < daysInMonth) {
            day += 7;
            week += 1;
        }

        return week;
    }

    public int[] dayData(int dayInMonth, int week, int year, int month) {
        LocalDate localDate = LocalDate.of(year, month, 1);
        int day1 = localDate.plusDays((7 - localDate.getDayOfWeek().getValue())+1).getDayOfMonth();

        int[] dayData = new int[week];
        int weekend = 1;
        dayData[0] = 1;

        while (day1 < dayInMonth) {
            dayData[weekend] = day1;
            day1 += 7;
            weekend += 1;
        }

        if (dayData[week-1] == 0) {
            dayData[week-1] = day1;
        }

        return dayData;
    }

    public String flaskPostRequest(Long virtualAccountId, int year, int month, Long monthOverconsumption) {
        WebClient webClient = WebClient.create("http://j9d106.p.ssafy.io:5000");

        return webClient.post()
                .uri(uriBuilder -> uriBuilder
                        .path("/{year}/{month}/{virtualAccountId}/{monthOverconsumption}")
                        .build(year, month, virtualAccountId, String.valueOf(monthOverconsumption)))
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }
}
