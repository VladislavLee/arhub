package com.myar.content.manager.entities.response.comment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class CommentResponse {

    private UUID authorAvatarImageId;
    private String text;
}
