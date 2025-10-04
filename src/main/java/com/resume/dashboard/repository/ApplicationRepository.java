package com.resume.dashboard.repository;

import com.resume.dashboard.model.entities.Application;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApplicationRepository extends JpaRepository<Application, Long> { }

