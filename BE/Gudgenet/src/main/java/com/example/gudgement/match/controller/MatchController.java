package com.example.gudgement.match.controller;

import com.example.gudgement.match.dto.MatchDto;
import com.example.gudgement.match.service.MatchService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/match")
@RequiredArgsConstructor
public class MatchController {

    private final MatchService matchService;

    @Operation(summary = "게임 매칭 시작")
    @MessageMapping("/addUser")
    public void addUserToGroup(MatchDto matchDto) {
        matchService.addUserToGroup(matchDto);
    }

    @Operation(summary = "게임 매칭 나가기")
    @MessageMapping("/removeUser")
    public void removeUserFromGroup(MatchDto matchDto) {
        matchService.removeUserFromGroup(matchDto);
    }

    @Operation(summary = "게임 매칭 시작")
    @PostMapping("/addUser")
    public void addUserToGrouptest(@RequestBody MatchDto matchDto) {
        matchService.addUserToGroup(matchDto);
    }

    @Operation(summary = "게임 매칭 나가기")
    @PostMapping("/removeUser")
    public void removeUserFromGrouptest(@RequestBody MatchDto matchDto) {
        matchService.removeUserFromGroup(matchDto);
    }
}
