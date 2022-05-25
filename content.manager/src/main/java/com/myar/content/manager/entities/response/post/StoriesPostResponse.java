package com.myar.content.manager.entities.response.post;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class StoriesPostResponse {

    private UUID id;
    private String previewImageId;
    private String title;
}
