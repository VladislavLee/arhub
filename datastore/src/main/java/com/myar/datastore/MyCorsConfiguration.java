package com.myar.datastore;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

//@Configuration
//@EnableWebMvc
public class MyCorsConfiguration implements WebMvcConfigurer {

    @Value("${spring.web.resources.static-locations}")
    private String fileLocation;

    @Value("${spring.mvc.static-path-pattern}")
    private String pathPattern;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedMethods("GET", "POST");
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry
                .addResourceHandler(pathPattern)
                .addResourceLocations(fileLocation);
    }
}
