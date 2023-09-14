package com.example.gudgement.progress.entity;

import com.example.gudgement.member.db.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class Progress {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "progress_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name="member_id")
    private Member memberId;

    private String progressName;

    private String progressContent;

    private int progressValue;

    @Builder
    public Progress(Member memberId, String progressName, String progressContent, int progressValue){
        this.memberId = memberId;
        this.progressName = progressName;
        this.progressContent = progressContent;
        this.progressValue = progressValue;
    }
}
