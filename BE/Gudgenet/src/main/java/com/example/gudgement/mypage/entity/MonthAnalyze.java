package com.example.gudgement.mypage.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.persistence.criteria.CriteriaBuilder;

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
    private Long virtualAccountId;

    @Column
    private long bestAmount;

    @Column
    private String bestDestination;

    @Column
    private int frequencyCount;

    @Column
    private String frequencyDestination;

    @Column
    private Long frequencyAmount;

    @Column
    private Integer count;

    @Column
    private Integer ranking;

    @Column(nullable = false)
    private Long lastMonthAmount;

    @Column
    private Double lastMonthAmountRate;

    @Column(nullable = false)
    private Long thisMonthAmount;

    @Column
    private Double thisMonthAmountRate;





}
