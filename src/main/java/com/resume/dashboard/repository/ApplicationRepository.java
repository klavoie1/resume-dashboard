package com.resume.dashboard.repository;

import com.resume.dashboard.model.entities.Application;
import org.springframework.data.repository.CrudRepository;

public interface ApplicationRepository extends CrudRepository<Application, Long> { }

