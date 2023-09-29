package com.example.gudgement.member.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
@Controller
public class ViewController {
    @GetMapping("/")
    public String redirect() {

        return "loading";
    }
}
