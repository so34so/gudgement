package com.example.gudgement.mypage.dto;

import lombok.Getter;

@Getter
public class ChartDataDto {
    private Data data;

    public static class Data {
        private String[] labels; // 월, 화, 수, 목, 금, 토, 일
        private DataSet dateSet; // 일별 소비 내역

        public static class DataSet {
            int[] payment;
        }
    }
}
