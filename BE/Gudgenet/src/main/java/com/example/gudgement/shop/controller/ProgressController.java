package com.example.gudgement.shop.controller;

import com.example.gudgement.shop.dto.ProgressDto;
import com.example.gudgement.shop.service.ProgressService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/progress")
public class ProgressController {
    /*private final ProgressService progressService;

    @GetMapping("/progress/{memberId}")
    public List<ProgressDto> getMemberProgress(@PathVariable Long memberId){
        Member member = new Member();
        return ProgressService.findProgressByMember(member);
    }*/
}
