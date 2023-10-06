package com.example.gudgement.mypage.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ChartResponseDto {
    private int year;
    private int month;
    private int week;
    private Data data;

    @Getter
    public static class Data {
        private String type;
        private String[] labels; // 월, 화, 수, 목, 금, 토, 일
        private DataSet dateSet; // 일별 소비 내역

        @Builder
        public Data(String type, String[] labels, DataSet dateSet) {
            this.type = type;
            this.labels = labels;
            this.dateSet = dateSet;
        }

        @Getter
        public static class DataSet {
            Long[] amount;
            boolean[] color;

            @Builder
            public DataSet(Long[] amount, boolean[] color) {
                this.amount = amount;
                this.color = color;
            }
        }
    }

    @Builder
    public ChartResponseDto(Data data, int year, int month, int week) {
        this.year = year;
        this.data = data;
        this.month = month;
        this.week = week;
    }
}
