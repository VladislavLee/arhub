package com.myar.content.manager.entities.request.post;

import com.myar.content.manager.entities.model.Post;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Data
public class CreatePostRequest {

    private String title;
    private String description;
    private String previewImageId;
    private String markerImageId;
    private String markerVanillaMarkerId;
    private String modelId;
    private UUID cityId;
    private String latitude;
    private String longitude;
    private Post.Status status;
    private List<BigDecimal> rotation;
    private List<BigDecimal> translation;
    private List<BigDecimal> scale;
}
