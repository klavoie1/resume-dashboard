package com.resume.dashboard.service;

import com.resume.dashboard.model.entities.Application;
import java.util.List;
import java.util.Optional;

public interface ApplicationService {

    Application save(Application application);

    List<Application> findAll();

    Optional<Application> findById(Long id);

    Application updateApplication(Application application, Long id);

    void deleteApplicationById(Long id);

}
