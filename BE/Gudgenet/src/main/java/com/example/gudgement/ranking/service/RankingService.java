package com.example.gudgement.ranking.service;

import com.example.gudgement.ranking.dto.RankingDto;
import com.example.gudgement.ranking.dto.TotalRankingDto;

import java.util.List;

public interface RankingService {

    RankingDto getMemberRank(Long memberId);

    List<RankingDto> getTop100Ranks();
    TotalRankingDto getRanks(Long memberId);
}
