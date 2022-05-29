package com.myar.content.manager.services;

import com.myar.content.manager.entities.model.*;
import com.myar.content.manager.repositories.CityRepository;
import com.myar.content.manager.repositories.LikeRepository;
import com.myar.content.manager.repositories.PostRepository;
import com.myar.content.manager.repositories.AuthorRepository;
import com.myar.content.manager.security.UserContextHolder;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final AuthorRepository authorRepository;
    private final UserContextHolder userContextHolder;
    private final CityRepository cityRepository;

    private final LikeRepository likeRepository;

    public Post createPost(Post post, UUID cityId) {
        final Author author = authorRepository.findById(userContextHolder.getUserId()).orElseThrow(EntityNotFoundException::new);
        final City city = cityRepository.findById(cityId).orElseThrow(EntityNotFoundException::new);
        post.setAuthor(author);
        post.setCity(city);
        //
        Post savedPost = postRepository.save(post);
        likeRepository.save(Like.builder()
                .author(author)
                .post(post)
                .build());
        //

        return savedPost;
    }

    public Post updatePost(Post post, UUID postId) {
        final Post originalPost = postRepository.findById(postId).orElseThrow(EntityNotFoundException::new);
        Optional.ofNullable(post.getTitle()).ifPresent(originalPost::setTitle);
        Optional.ofNullable(post.getPreviewImageId()).ifPresent(originalPost::setPreviewImageId);
        Optional.ofNullable(post.getPreviewImageId()).ifPresent(originalPost::setPreviewImageId);
        Optional.ofNullable(post.getMarkerImageId()).ifPresent(originalPost::setMarkerImageId);
        Optional.ofNullable(post.getModelId()).ifPresent(originalPost::setModelId);
        Optional.ofNullable(post.getRotation()).ifPresent(originalPost::setRotation);
        Optional.ofNullable(post.getScale()).ifPresent(originalPost::setScale);
        Optional.ofNullable(post.getTranslation()).ifPresent(originalPost::setTranslation);
        Optional.ofNullable(post.getLatitude()).ifPresent(originalPost::setLatitude);
        Optional.ofNullable(post.getLongitude()).ifPresent(originalPost::setLongitude);

        return postRepository.save(originalPost);
    }

    public void deletePost(UUID postId) {
        postRepository.deleteById(postId);
    }

    public List<Post> getRecommended(int pageNumber, int count) {
        final Author author = authorRepository
                .findById(userContextHolder.getUserId()).orElseThrow(EntityNotFoundException::new);

        return postRepository
                .findAllByCity(author.getCity(), PageRequest.of(pageNumber, count, Sort.by(Sort.Direction.DESC, "created")));
    }

    public List<Post> getPopular() {
        return postRepository.findAllPostsWithLikesCountOrderByCountDesc(PageRequest.of(0, 5))
                .stream()
                .map(PostWithLikeCount::getPost)
                .collect(Collectors.toList());
    }

    public Post getById(UUID postId) {
        return postRepository.findById(postId).orElseThrow(EntityNotFoundException::new);
    }
}
