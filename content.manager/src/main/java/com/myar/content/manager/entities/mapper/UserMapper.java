package com.myar.content.manager.entities.mapper;

import com.myar.content.manager.entities.model.Author;
import com.myar.content.manager.entities.request.user.CreateUserRequest;
import com.myar.content.manager.entities.response.user.ShortUserResponse;
import com.myar.content.manager.entities.response.user.UserResponse;
import com.myar.content.manager.repositories.CityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class UserMapper {

    private final PostMapper postMapper;
    private final CityRepository cityRepository;

    public Author convertCreateUserRequestToAuthor(CreateUserRequest createUserRequest){
        return Author.builder()
                .city(cityRepository.findById(createUserRequest.getCityId()).orElse(cityRepository.findAll().get(0)))
                .username(createUserRequest.getUsername())
                .name(createUserRequest.getName())
                .middleName(createUserRequest.getMiddleName())
                .surName(createUserRequest.getSurName())
                .build();
    }

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
                .publications(author.getPosts().stream().map(postMapper::convertPostToShortPostResponse).collect(Collectors.toList()))
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
