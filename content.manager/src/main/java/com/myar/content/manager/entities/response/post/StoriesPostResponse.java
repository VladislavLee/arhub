package com.myar.content.manager.entities.response.post;

import com.myar.content.manager.entities.model.Post;
import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class StoriesPostResponse {

    private UUID id;
    private String previewImageId;
    private String markerImageId;
    private String markerVanillaMarkerId;
    private String modelId;
    private Post.Status status;
    private String title;
    private long createdTime;
}
