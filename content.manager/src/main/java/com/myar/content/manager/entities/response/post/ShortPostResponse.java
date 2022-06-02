package com.myar.content.manager.entities.response.post;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.myar.content.manager.entities.response.DecimalSerializer;
import com.myar.content.manager.entities.response.user.ShortUser;
import lombok.Builder;
import lombok.Data;

import java.io.IOException;
import java.math.BigDecimal;
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

    private String latitude;
    private String longitude;

}
