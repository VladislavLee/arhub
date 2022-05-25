package com.myar.content.manager.controllers;

import com.myar.content.manager.services.LikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/likes")
@RequiredArgsConstructor
public class LikeController {

    private final LikeService likeService;

    @PostMapping("/like/{id}")
    public void like(@PathVariable("id") UUID postID) {
        likeService.likePost(postID);
    }

    @PostMapping("/unlike/{id}")
    public void unlike(@PathVariable("id") UUID postID) {
        likeService.unlikePost(postID);
    }
}
