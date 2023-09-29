package com.example.gudgement.member.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
@Controller
public class ViewController {
    @GetMapping("/oauth/kakao")
    public String redirect() {

        return "loading";
    }
}
