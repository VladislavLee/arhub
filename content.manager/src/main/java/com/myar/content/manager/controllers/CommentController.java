package com.myar.content.manager.controllers;

import com.myar.content.manager.entities.request.post.CreatePostRequest;
import com.myar.content.manager.services.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/comment")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping
    public void comment(@RequestBody CreatePostRequest createPostRequest){

    }
}
