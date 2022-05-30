package com.myar.content.manager.controllers;

import com.myar.content.manager.entities.request.comment.CreateCommentRequest;
import com.myar.content.manager.entities.request.post.CreatePostRequest;
import com.myar.content.manager.services.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/comment")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/{id}")
    public void comment(@RequestBody CreateCommentRequest createCommentRequest, @PathVariable("id") UUID postID){
        commentService.createComment(postID, createCommentRequest.getText());
    }
}
