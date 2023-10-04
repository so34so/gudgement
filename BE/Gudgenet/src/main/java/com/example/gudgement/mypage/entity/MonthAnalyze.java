package com.example.gudgement.mypage.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor
public class MonthAnalyze {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long analyzeId;

    @Column(nullable = false)
    private int year;

    @Column(nullable = false)
    private int month;

    @Column(nullable = false)
    private Long memberId;

    @Column(nullable = false)
    private Long virtualAccountId;

    @Column(nullable = false)
    private long bestAmount;

    @Column(nullable = false)
    private String bestDestination;

    @Column(nullable = false)
    private int frequencyCount;

    @Column(nullable = false)
    private String frequencyDestination;

    @Column(nullable = false)
    private long frequencyAmount;

    @Column
    private Integer count;

    @Column
    private Double ranking;

    @Column(nullable = false)
    private Long lastMonthAmount;

    @Column
    private Double lastMonthAmountRate;

    @Column(nullable = false)
    private Long thisMonthAmount;

    @Column
    private Double thisMonthAmountRate;





}
