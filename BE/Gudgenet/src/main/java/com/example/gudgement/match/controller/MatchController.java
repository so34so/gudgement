package com.example.gudgement.match.controller;

import com.example.gudgement.match.dto.MatchDto;
import com.example.gudgement.match.service.MatchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/matching")
@RequiredArgsConstructor
public class MatchController {

    private final MatchService matchService;

    @PostMapping("/addUser")
    public void addUserToGroup(@RequestBody MatchDto matchDto) {
        matchService.addUserToGroup(matchDto);
    }

    @PostMapping("/removeUser")
    public void removeUserFromGroup(@RequestBody MatchDto matchDto) {
        matchService.removeUserFromGroup(matchDto);
    }
}
