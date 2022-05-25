package com.myar.content.manager.entities.response.post;

import com.myar.content.manager.entities.response.user.ShortUser;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class FullPostResponse {

    private UUID id;
    private String title;
    private String description;
    private String previewImageId;
    private String markerImageId;
    private String markerVanillaMarkerId;
    private String modelId;
    private List<BigDecimal> rotation;
    private List<BigDecimal> translation;
    private List<BigDecimal> scale;

    private ShortUser author;
    private List<ShortUser> lastRated;

    private long likeCount;
    private long commentCount;
}
