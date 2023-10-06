package com.example.gudgement.mypage.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class AnalyzeRequestDto {
    private int year;
    private int month;
    private Long virtualAccountId;
}
