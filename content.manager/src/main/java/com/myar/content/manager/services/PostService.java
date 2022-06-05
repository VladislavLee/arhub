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

    public Post createPost(Post post) {
        final Author author = userContextHolder.getUser();
        final City city = author.getCity();
        post.setAuthor(author);
        post.setCity(city);
        post.setStatus(Post.Status.IN_PROGRESS);
        //
        Post savedPost = postRepository.save(post);
//        likeRepository.save(Like.builder()
//                .author(author)
//                .post(post)
//                .build());
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
        Optional.ofNullable(post.getStatus()).ifPresent(originalPost::setStatus);

        return postRepository.save(originalPost);
    }

    public void deletePost(UUID postId) {
        postRepository.deleteById(postId);
    }

    public List<Post> getRecommended(int pageNumber, int count) {
        final Author author = userContextHolder.getUser();

        return postRepository
                .findAllByCityAndStatus(author.getCity(), Post.Status.VALID, PageRequest.of(pageNumber, count, Sort.by(Sort.Direction.DESC, "created")));
    }

    public List<Post> getNearest() {
        final Author author = userContextHolder.getUser();

        return postRepository
                .findAllByCityAndStatus(author.getCity(), Post.Status.VALID);
    }

    public List<Post> getPopular() {
        List<Post> list = postRepository.findAllPostsWithLikesCountOrderByCountDesc(PageRequest.of(0, 5))
                .stream()
                .map(PostWithLikeCount::getPost)
                .collect(Collectors.toList());
        if(list.isEmpty()){
            return getRecommended(0, 5);
        } else {
            return list;
        }
    }

    public List<Post> getMyPosts() {
        final Author author = userContextHolder.getUser();
        return postRepository.findAllByAuthorOrderByStatus(author);
    }

    public List<Post> getPostsByStatus(Post.Status status) {
        return postRepository.findAllByStatus(status);
    }

    public List<Post> getMyPostList() {
        final Author author = userContextHolder.getUser();

        return postRepository.findAllByAuthorOrderByCreatedDesc(author);
    }

    public Post getById(UUID postId) {
        return postRepository.findById(postId).orElseThrow(EntityNotFoundException::new);
    }
}
