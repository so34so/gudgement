package com.example.gudgement.member.entity;

import com.example.gudgement.progress.entity.Progress;
import com.example.gudgement.shop.entity.Inventory;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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

    private int gender;

    private int age;

    @NotNull
    private String nickname;

    @NotNull
    private boolean emailApprove;

    @NotNull
    private boolean nicknameApprove;

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
    @OneToMany(mappedBy = "memberId", cascade = CascadeType.REMOVE)
    private List<Inventory> set_item = new ArrayList<>();

    @OneToMany(mappedBy = "memberId", cascade = CascadeType.REMOVE)
    private List<Progress> progresses = new ArrayList<>();

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
    public Member(Long id, String email, int gender, int age, String nickname, String refreshToken) {
        this.memberId = id;
        this.email = email;
        this.gender = gender;
        this.age = age;
        this.nickname = nickname;
        this.refreshToken = refreshToken;
    }

    @PrePersist
    public void prePersist() {
        this.createAt = LocalDateTime.now();
        this.role = Role.ROLE_USER;
        this.level = 1;
    }

    public void updateNickname(String nickname) {
        this.nickname = nickname;
        this.nicknameApprove = true;
    }

    public void updateRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public void updateEmail(String email) {
        this.email = email;
        this.emailApprove = true;
    }
    
    public void useTiggle(Long tiggle) {
        this.tiggle -= tiggle;
    }
}
