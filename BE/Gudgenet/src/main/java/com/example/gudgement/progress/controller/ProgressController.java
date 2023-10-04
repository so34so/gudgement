package com.example.gudgement.progress.controller;

import com.example.gudgement.progress.service.ProgressServiceImpl;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@Tag(name = "Progress", description = "진행도 기능 컨트롤러입니다.")
@RestController
@RequestMapping("/progress")
@RequiredArgsConstructor
public class ProgressController {
    private final ProgressServiceImpl progressServiceImpl;


}
