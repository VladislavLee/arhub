package com.myar.content.manager.entities.response.post;

import com.myar.content.manager.entities.response.user.ShortUser;
import lombok.Builder;
import lombok.Data;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

@Data
@Builder
public class ShortPostResponse {

    private UUID id;
    private String previewImageId;
    private String title;

    private ShortUser author;
    private List<ShortUser> lastRated;

    private Long cratedTime;
    private long likeCount;
    private long commentCount;
}
