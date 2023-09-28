package com.example.gudgement.match.controller;

import com.example.gudgement.match.dto.MatchDto;
import com.example.gudgement.match.service.MatchService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/match")
@RequiredArgsConstructor
public class MatchController {

    private final MatchService matchService;

    @Operation(summary = "게임 매칭 시작")
    @PostMapping("/addUser")
    public void addUserToGroup(@RequestBody MatchDto matchDto) {
        matchService.addUserToGroup(matchDto);
    }

    @Operation(summary = "게임 매칭 나가기")
    @PostMapping("/removeUser")
    public void removeUserFromGroup(@RequestBody MatchDto matchDto) {
        matchService.removeUserFromGroup(matchDto);
    }
}
