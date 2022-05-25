package com.myar.content.manager.controllers;

import io.swagger.models.auth.In;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class TestController {

    @Data
    @RequiredArgsConstructor
    public static class Res{
        private final String val;
    }

    @Data
    public static class Req{
        private final Integer val;
    }

    @GetMapping("/resp")
    public Res rspGet(){
        return new Res("12");
    }

    @GetMapping("/respon")
    public Req rspGet2(){
        return new RestTemplate().getForEntity("http://localhost:8080/resp", Req.class).getBody();
    }
}
