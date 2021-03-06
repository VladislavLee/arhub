package com.myar.content.manager.entities.mapper;

import com.myar.content.manager.entities.model.Author;
import com.myar.content.manager.entities.model.Post;
import com.myar.content.manager.entities.request.post.CreatePostRequest;
import com.myar.content.manager.entities.response.post.FullPostResponse;
import com.myar.content.manager.entities.response.post.ShortPostResponse;
import com.myar.content.manager.entities.response.post.StoriesPostResponse;
import com.myar.content.manager.entities.response.user.ShortUserResponse;
import com.myar.content.manager.services.LikeService;
import com.myar.content.manager.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.ZoneId;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class PostMapper {

    private final UserService userService;
    private final LikeService likeService;

    public Post convertCreatePostRequestToPost(CreatePostRequest createPostRequest) {
        return Post.builder()
                .title(createPostRequest.getTitle())
                .description(createPostRequest.getDescription())
                .previewImageId(createPostRequest.getPreviewImageId())
                .markerImageId(createPostRequest.getMarkerImageId())
                .markerVanillaMarkerId(createPostRequest.getMarkerVanillaMarkerId())
                .modelId(createPostRequest.getModelId())
                .rotation(createPostRequest.getRotation())
                .translation(createPostRequest.getTranslation())
                .scale(createPostRequest.getScale())
                .latitude(createPostRequest.getLatitude())
                .longitude(createPostRequest.getLongitude())
                .status(createPostRequest.getStatus())
                .build();
    }

    public ShortPostResponse convertPostToShortPostResponse(Post post) {
        return ShortPostResponse.builder()
                .id(post.getId())
                .previewImageId(post.getPreviewImageId())
                .markerImageId(post.getMarkerImageId())
                .markerVanillaMarkerId(post.getMarkerVanillaMarkerId())
                .modelId(post.getModelId())
                .title(post.getTitle())
                .author(authorToShortUser(post.getAuthor()))
                .lastRated(userService.getLastRatedUsersByPost(post)
                        .stream()
                        .map(this::authorToShortUser)
                        .collect(Collectors.toList()))
                .likeCount(likeService.getLikeCountByPost(post))
                .commentCount(post.getComments().size())
                .latitude(post.getLatitude())
                .longitude(post.getLongitude())
                .createdTime(post.getCreated().atZone(ZoneId.systemDefault()).toInstant().toEpochMilli())
                .status(post.getStatus())
                .build();
    }

    public FullPostResponse convertPostToFullPostResponse(Post post) {
        return FullPostResponse.builder()
                .id(post.getId())
                .previewImageId(post.getPreviewImageId())
                .markerImageId(post.getMarkerImageId())
                .markerVanillaMarkerId(post.getMarkerVanillaMarkerId())
                .modelId(post.getModelId())
                .title(post.getTitle())
                .description(post.getDescription())
                .rotation(post.getRotation())
                .scale(post.getScale())
                .translation(post.getTranslation())
                .author(authorToShortUser(post.getAuthor()))
                .lastRated(userService.getLastRatedUsersByPost(post)
                        .stream()
                        .map(this::authorToShortUser)
                        .collect(Collectors.toList()))
                .likeCount(likeService.getLikeCountByPost(post))
                .commentCount(post.getComments().size())
                .latitude(post.getLatitude())
                .longitude(post.getLongitude())
                .createdTime(post.getCreated().atZone(ZoneId.systemDefault()).toInstant().toEpochMilli())
                .build();
    }

    public StoriesPostResponse convertPostToStoriesPostResponse(Post post) {
        return StoriesPostResponse.builder()
                .id(post.getId())
                .previewImageId(post.getPreviewImageId())
                .markerImageId(post.getMarkerImageId())
                .markerVanillaMarkerId(post.getMarkerVanillaMarkerId())
                .modelId(post.getModelId())
                .title(post.getTitle())
                .createdTime(post.getCreated().atZone(ZoneId.systemDefault()).toInstant().toEpochMilli())
                .build();
    }

    private ShortUserResponse authorToShortUser(Author author) {
        return ShortUserResponse.builder()
                .id(author.getId())
                .username(author.getUsername())
                .avatarImageId(author.getAvatarImageId())
                .build();
    }
}
