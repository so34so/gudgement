package com.example.gudgement.mypage.service;

import com.example.gudgement.mypage.dto.request.AnalyzeRequestDto;
import com.example.gudgement.mypage.dto.response.AnalyzeResponseDto;

public interface AnalyzeService {
    void createMonthAnalyze(AnalyzeRequestDto analyzeRequestDto);
    AnalyzeResponseDto getMonthAnalyze(Long virtualAccountId, int year, int month, Long monthOverconsumption);
}
