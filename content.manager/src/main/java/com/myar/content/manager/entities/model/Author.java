package com.myar.content.manager.entities.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Author {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    private UUID id;


    private UUID avatarImageId;
    private String name;
    private String middleName;
    private String surName;
    private String username;

    @ManyToOne
    @JoinColumn(name="city_id", nullable=false)
    private City city;
    @OneToMany(mappedBy="author")
    private List<Post> posts;
    @OneToMany(mappedBy="author")
    private List<Like> likes;

    @ManyToMany(mappedBy = "subscription")
    private List<Author> subscribers;
    @ManyToMany
    private List<Author> subscription;
}
