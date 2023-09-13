package com.example.gudgement.member.db.entity;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDateTime;

/*
*  사용자 (멤버) 관리 Entity 입니다.
* */

@Entity
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @NotNull
    @Column(length = 50)
    private String email;

    @NotNull
    @Column(length = 50)
    private String password;

    @NotNull
    @Column(length = 20)
    private String name;

    private int gender;

    private int age;

    @NotNull
    private String nickname;

    @NotNull
    @Column(columnDefinition = "bigint default 500")
    private long tiggle;

    @NotNull
    @Column(columnDefinition = "bigint default 0")
    private long exp;

    @NotNull
    @Column(columnDefinition = "integer default 1")
    private int level;

    @NotNull
    @Column(columnDefinition = "integer default 0")
    private int pedometer;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Role role;

    private LocalDateTime createAt;

    private String refreshToken;

    // 연결 관계
//    @OneToMany(mappedBy = "memberId", cascade = CascadeType.REMOVE)
//    private List<Item> set_item = new ArrayList<Item>();

//    @OneToMany(mappedBy = "memberId", cascade = CascadeType.REMOVE)
//    private List<Progress> progressList = new ArrayList<>();

    // 미구현
//     @OneToOne(mappedBy = "memberId", cascade = CascadeType.REMOVE)
//    private GameRoom roomId;
//
//    @OneToMany(mappedBy = "memberId", cascade = CascadeType.REMOVE)
//    private List<PaymentHistory> paymentHistoryList = new ArrayList<>();
//
//    @OneToMany(mappedBy = "account", cascade = CascadeType.REMOVE)
//    private List<Account> accounts = new ArrayList<>();

    @Builder
    public Member(String email, String password, String name, int gender, int age, String nickname) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.gender = gender;
        this.age = age;
        this.nickname = nickname;
        this.role = Role.ROLE_USER;
        this.createAt = LocalDateTime.now();
    }

    public void nameUpdate(String nickname) {
        this.nickname = nickname;
    }

    public void updateRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    private class PaymentHistory {
    }
}
