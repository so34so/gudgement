package com.example.gudgement.mypage.entity;

import com.example.gudgement.member.entity.Member;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Chart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private Member memberId;

    @Column(nullable = false)
    private String account;

    @Column(nullable = false)
    private int month;

    @Column(nullable = false)
    private int week;

    @Column
    private Long mon;

    @Column
    private Long tue;

    @Column
    private Long wen;

    @Column
    private Long thu;

    @Column
    private Long fri;

    @Column
    private Long sat;

    @Column
    private Long sun;

    @Builder
    public Chart(Member memberId, String account, int month, int week) {
        this.memberId = memberId;
        this.account = account;
        this.month = month;
        this.week = week;
    }

    public void setMon(Long mon) {
        this.mon = mon;
    }

    public void setTue(Long tue) {
        this.tue = tue;
    }

    public void setWen(Long wen) {
        this.wen = wen;
    }

    public void setThu(Long thu) {
        this.thu = thu;
    }

    public void setFri(Long fri) {
        this.fri = fri;
    }

    public void setSat(Long sat) {
        this.sat = sat;
    }

    public void setSun(Long sun) {
        this.sun = sun;
    }
}
