package com.myar.content.manager.entities.response.user;

import com.myar.content.manager.entities.response.post.ShortPostResponse;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
@Builder
public class UserResponse {

    private UUID id;
    private String username;
    private UUID avatarImageId;
    private String name;
    private String middleName;
    private String surName;

    private List<ShortUserResponse> subscribers;
    private List<ShortUserResponse> subscriptions;
    private List<ShortPostResponse> publications;
}
