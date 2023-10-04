package com.example.gudgement.ranking.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class TotalRankingDto {

    private List<RankingDto> rankingList;
    private RankingDto myRanking;
}
