package com.myar.content.manager.entities.request.user;

import lombok.Data;

import java.util.UUID;

@Data
public class CreateUserRequest {

    private UUID cityId;
    private String username;
}
