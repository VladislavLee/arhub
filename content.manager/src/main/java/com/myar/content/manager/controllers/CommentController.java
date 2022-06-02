package com.myar.content.manager.controllers;

import com.myar.content.manager.entities.mapper.CommentMapper;
import com.myar.content.manager.entities.request.comment.CreateCommentRequest;
import com.myar.content.manager.entities.response.comment.CommentResponse;
import com.myar.content.manager.services.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/comment")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;
    private final CommentMapper commentMapper;

    @PostMapping("/{id}")
    public void comment(@RequestBody CreateCommentRequest createCommentRequest, @PathVariable("id") UUID postID) {
        commentService.createComment(postID, createCommentRequest.getText());
    }

    @GetMapping("/{id}")
    public List<CommentResponse> getCommentsByPost(@PathVariable("id") UUID postID) {
        return commentService.getCommentsByPost(postID).stream()
                .map(commentMapper::convertCommentToCommentResponse)
                .collect(Collectors.toList());
    }
}
