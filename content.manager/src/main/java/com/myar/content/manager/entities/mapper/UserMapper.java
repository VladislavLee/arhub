package com.myar.content.manager.entities.mapper;

import com.myar.content.manager.entities.model.Author;
import com.myar.content.manager.entities.response.user.ShortUserResponse;
import com.myar.content.manager.entities.response.user.UserResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class UserMapper {

    private final PostMapper postMapper;

    public UserResponse convertAuthorToUserResponse(Author author){
        return UserResponse.builder()
                .id(author.getId())
                .username(author.getUsername())
                .avatarImageId(author.getAvatarImageId())
                .name(author.getName())
                .middleName(author.getMiddleName())
                .surName(author.getSurName())
                .subscribers(author.getSubscribers().stream().map(this::convertAuthorToShortUserResponse).collect(Collectors.toList()))
                .subscriptions(author.getSubscription().stream().map(this::convertAuthorToShortUserResponse).collect(Collectors.toList()))
                .publications(author.getPosts().stream().map(postMapper::convertPostToShortPostResponse).c)
                .build();
    }

    public ShortUserResponse convertAuthorToShortUserResponse(Author author){
        return ShortUserResponse.builder()
                .id(author.getId())
                .username(author.getUsername())
                .avatarImageId(author.getAvatarImageId())
                .build();
    }
}
