package com.example.gudgement.shop.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class Progress {

    @Id
    @GeneratedValue
    @Column(name="progress_id")
    private long id;

    /*@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="member_id")
    private Member memberId;
    */

    private String progressName;

    private int progressValue;

    private int progressCategory;

    @Builder
    public Progress(long id, /*Member memberId,*/String progressName, int progressValue, int progressCategory){
        this.id = id;
        /*this.memberId = memberId;*/
        this.progressName = progressName;
        this.progressValue = progressValue;
        this.progressCategory = progressCategory;

    }
}
