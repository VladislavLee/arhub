package com.myar.content.manager.repositories;

import com.myar.content.manager.entities.model.Author;
import com.myar.content.manager.entities.model.City;
import com.myar.content.manager.entities.model.Post;
import com.myar.content.manager.entities.model.PostWithLikeCount;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PostRepository extends CrudRepository<Post, UUID> {

    List<Post> findAllByCity(City city, Pageable pageable);

    List<Post> findAllByCity(City city);

    List<Post> findAllByAuthorOrderByCreatedDesc(Author author);

    @Query(
            value = "select new com.myar.content.manager.entities.model.PostWithLikeCount(p, count(l.id) as likeCount) from Post p join p.likes l group by p order by likeCount desc",
            countQuery = "select count(p) from Post p"
    )
    Page<PostWithLikeCount> findAllPostsWithLikesCountOrderByCountDesc(Pageable pageable);
}
