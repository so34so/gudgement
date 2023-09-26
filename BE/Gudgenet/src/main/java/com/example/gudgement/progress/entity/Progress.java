package com.example.gudgement.progress.entity;

import com.example.gudgement.member.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class Progress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "progress_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name="member_id")
    private Member member;

    private String progressName;

    private int progressValue;

    @Builder
    public Progress(Member member, String progressName, int progressValue){
        this.member = member;
        this.progressName = progressName;
        this.progressValue = progressValue;
    }
}
