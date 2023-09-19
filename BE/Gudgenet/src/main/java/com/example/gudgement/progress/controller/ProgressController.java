package com.example.gudgement.progress.controller;

import com.example.gudgement.progress.service.ProgressService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
@Tag(name = "Progress", description = "진행도 기능 컨트롤러입니다.")
@RestController
@RequestMapping("/progress")
@RequiredArgsConstructor
public class ProgressController {
    private final ProgressService progressService;


}
