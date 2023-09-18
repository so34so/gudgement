package com.example.gudgement.member.db.entity;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;

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
    @Column
    private Long memberId;

    @NotNull
    @Column(length = 50)
    private String email;

    @NotNull
    @Column(length = 50)
    private String password;

    private int gender;

    private int age;

    @NotNull
    private String nickname;

    @NotNull
    private boolean approve;

    @NotNull
    @Column(columnDefinition = "bigint default 500")
    private long tiggle;

    @NotNull
    @Column(columnDefinition = "bigint default 0")
    private long exp;

    @NotNull
    @Column
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
    public Member(Long id, String email, String password, int gender, int age, String nickname) {
        this.memberId = id;
        this.email = email;
        this.password = password;
        this.gender = gender;
        this.age = age;
        this.nickname = nickname;
    }

    @PrePersist
    public void prePersist() {
        this.createAt = LocalDateTime.now();
        this.role = Role.ROLE_USER;
        this.level = 1;
    }

    public void updateNickname(String nickname) {
        this.nickname = nickname;
    }

    public void updateRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    private class PaymentHistory {
    }
    
    public void useTiggle(Long tiggle) {
        this.tiggle -= tiggle;
    }
}
