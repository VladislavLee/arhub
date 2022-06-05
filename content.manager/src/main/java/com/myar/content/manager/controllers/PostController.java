package com.myar.content.manager.controllers;

import com.myar.content.manager.entities.mapper.PostMapper;
import com.myar.content.manager.entities.model.Post;
import com.myar.content.manager.entities.request.post.CoordinatesPostRequest;
import com.myar.content.manager.entities.request.post.CreatePostRequest;
import com.myar.content.manager.entities.response.post.FullPostResponse;
import com.myar.content.manager.entities.response.post.ShortPostResponse;
import com.myar.content.manager.entities.response.post.StoriesPostResponse;
import com.myar.content.manager.services.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/posts")
public class PostController {

    private final PostService postService;
    private final PostMapper postMapper;

    @PostMapping
    public UUID createPost(@RequestBody CreatePostRequest createPostRequest) {
        final Post post = postMapper.convertCreatePostRequestToPost(createPostRequest);
        return postService.createPost(post).getId();
    }

    @GetMapping("/recommended")
    public List<ShortPostResponse> getRecommendedPosts(@RequestParam("page") int pageNumber, @RequestParam("count") int count) {
        return postService.getRecommended(pageNumber, count).stream()
                .map(postMapper::convertPostToShortPostResponse)
                .collect(Collectors.toList());
    }

    @GetMapping("/popular")
    public List<StoriesPostResponse> getPopularPosts() {
        return postService.getPopular().stream()
                .map(postMapper::convertPostToStoriesPostResponse)
                .collect(Collectors.toList());
    }

    @GetMapping("/my")
    public List<StoriesPostResponse> getMyPosts() {
        return postService.getMyPosts().stream()
                .map(postMapper::convertPostToStoriesPostResponse)
                .collect(Collectors.toList());
    }

    @GetMapping("/status/{status}")
    public List<ShortPostResponse> getAllPostsWithStatus(@RequestParam("status") Post.Status status) {
        return postService.getPostsByStatus(status).stream()
                .map(postMapper::convertPostToShortPostResponse)
                .collect(Collectors.toList());
    }

    @GetMapping("/near")
    public List<ShortPostResponse> getNearest() {
        return postService.getNearest().stream()
                .map(postMapper::convertPostToShortPostResponse)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public FullPostResponse getFullPost(@PathVariable("id") UUID postID) {
        return postMapper.convertPostToFullPostResponse(postService.getById(postID));
    }

    @PatchMapping("/{id}")
    public void updatePost(@RequestBody CreatePostRequest createPostRequest, @PathVariable("id") UUID postID) {
        final Post post = postMapper.convertCreatePostRequestToPost(createPostRequest);
        postService.updatePost(post, postID);
    }


    @DeleteMapping("/{id}")
    public void deletePost(@PathVariable("id") UUID postID) {
        postService.deletePost(postID);
    }

}
