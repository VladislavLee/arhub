package com.myar.content.manager.entities.mapper;

import com.myar.content.manager.entities.model.Comment;
import com.myar.content.manager.entities.response.comment.CommentResponse;
import org.springframework.stereotype.Component;

@Component
public class CommentMapper {

    public CommentResponse convertCommentToCommentResponse(Comment comment){
        return CommentResponse.builder()
                .authorAvatarImageId(comment.getAuthor().getAvatarImageId())
                .text(comment.getText())
                .build();
    }
}
