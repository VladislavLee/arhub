package com.myar.content.manager.entities.response.post;

import com.myar.content.manager.entities.model.Post;
import com.myar.content.manager.entities.response.user.ShortUserResponse;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
@Builder
public class ShortPostResponse {

    private UUID id;
    private String previewImageId;
    private String markerImageId;
    private String markerVanillaMarkerId;
    private String modelId;
    private String title;

    private Post.Status status;
    private ShortUserResponse author;
    private List<ShortUserResponse> lastRated;

    private long createdTime;
    private long likeCount;
    private long commentCount;

    private String latitude;
    private String longitude;

}
