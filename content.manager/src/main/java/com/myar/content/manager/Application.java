package com.myar.content.manager;

import com.myar.content.manager.entities.model.Author;
import com.myar.content.manager.entities.model.City;
import com.myar.content.manager.entities.model.Post;
import com.myar.content.manager.repositories.AuthorRepository;
import com.myar.content.manager.repositories.CityRepository;
import com.myar.content.manager.repositories.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@EnableWebMvc
@EnableJpaAuditing
@SpringBootApplication
public class Application {

    @Autowired
    private PostRepository postRepository;
    @Autowired
    private CityRepository cityRepository;
    @Autowired
    private AuthorRepository authorRepository;


    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @EventListener(classes = ContextRefreshedEvent.class)
    public void handleMultipleEvents() {
        List<City> cities = cityRepository.findAll();
        if (cities.size() == 0) {
            City city = cityRepository.save(City.builder()
                    .title("Moscow")
                    .build());
            System.out.println(city.getId());
            Author author = authorRepository.save(Author.builder()
                    .city(city)
                    .username("user1")
                    .build());
        } else {
            System.out.println(cities.get(0).getId());
        }
    }

}
