package com.example.gudgement.account.controller;

import com.example.gudgement.account.dto.VirtualAccountDto;
import com.example.gudgement.account.service.VirtualAccountService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Tag(name = "VirtualAccount", description = "가상계좌 기능 컨트롤러입니다.")
@RestController
@RequestMapping("/api/account/virtual")
@RequiredArgsConstructor
public class VirtualAccountController {

    private final VirtualAccountService virtualAccountService;

    @Operation(summary = "가상계좌 생성")
    @PostMapping
    public ResponseEntity<Map<String, Object>> create(@RequestBody VirtualAccountDto virtualAccountDto) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status;

        try {
            VirtualAccountDto created = virtualAccountService.create(virtualAccountDto);
            status = HttpStatus.OK;
            resultMap.put("message", "success");
            resultMap.put("account", created);
        } catch (Exception e) {
            e.printStackTrace();
            status = HttpStatus.BAD_REQUEST;
            resultMap.put("message", "fail");
        }

        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

    @Operation(summary = "가상계좌 목록 조회")
    @GetMapping
    public ResponseEntity<List<VirtualAccountDto>> getAll() {
        List<VirtualAccountDto> accounts = virtualAccountService.getAll();
        return new ResponseEntity<>(accounts, HttpStatus.OK);
    }

    @Operation(summary = "특정 가상계좌 조회")
    @GetMapping("/{id}")
    public ResponseEntity<VirtualAccountDto> getById(@PathVariable Long id) {
        VirtualAccountDto account = virtualAccountService.getById(id);
        return new ResponseEntity<>(account, HttpStatus.OK);
    }

    @Operation(summary = "가상계좌 삭제")
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> delete(@PathVariable Long id) {
        Map<String, String> resultMap = new HashMap<>();
        HttpStatus status;

        try {
            virtualAccountService.delete(id);
            status = HttpStatus.NO_CONTENT;
            resultMap.put("message", "success");
        } catch (Exception e) {
            e.printStackTrace();
            status = HttpStatus.BAD_REQUEST;
            resultMap.put("message", "fail");
        }

        return new ResponseEntity<>(resultMap, status);
    }

}
