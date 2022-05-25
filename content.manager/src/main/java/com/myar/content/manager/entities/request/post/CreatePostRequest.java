package com.myar.content.manager.entities.request.post;

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
    private List<BigDecimal> rotation;
    private List<BigDecimal> translation;
    private List<BigDecimal> scale;
}
