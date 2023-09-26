package com.example.gudgement.mypage.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Getter
@NoArgsConstructor
public class ChartDataDto {
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
            Long[] payment;

            @Builder
            public DataSet(Long[] payment) {
                this.payment = payment;
            }
        }
    }

    @Builder
    public ChartDataDto(Data data) {
        this.data = data;

    }
}
