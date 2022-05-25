package com.myar.content.manager.entities.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostWithLikeCount {

    private Post post;
    private Long likeCount;
}
