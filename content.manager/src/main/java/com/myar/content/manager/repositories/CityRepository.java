package com.myar.content.manager.repositories;

import com.myar.content.manager.entities.model.City;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CityRepository extends CrudRepository<City, UUID> {

    List<City> findAll();
}
