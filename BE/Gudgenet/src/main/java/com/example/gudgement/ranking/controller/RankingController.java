package com.example.gudgement.ranking.controller;

import com.example.gudgement.ranking.dto.TotalRankingDto;
import com.example.gudgement.ranking.service.RankingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Ranking", description = "랭킹 컨트롤러입니다.")
@RestController
@RequestMapping("/api/ranking")
@RequiredArgsConstructor
public class RankingController {

    private final RankingService rankingService;

    @GetMapping("/{id}")
    @Operation(summary = "유저id 요청시 exp 상위 100명의 랭킹과 자신의 랭킹 반환")
    public ResponseEntity<TotalRankingDto> getTotalranking(@PathVariable Long id) {
        return ResponseEntity.ok(rankingService.getRanks(id));
    }
}
