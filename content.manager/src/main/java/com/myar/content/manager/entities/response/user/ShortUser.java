package com.myar.content.manager.entities.response.user;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class ShortUser {

    private UUID id;
    private String username;
    private UUID avatarImageId;
}
