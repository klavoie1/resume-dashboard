package com.resume.dashboard.service;

import com.resume.dashboard.model.entities.Application;
import com.resume.dashboard.repository.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class ApplicationServiceImpl implements ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Override
    public Application save(Application application) {
        System.out.println("Application saved");
        return applicationRepository.save(application);
    }

    @Override
    public List<Application> findAll() {
        return applicationRepository.findAll();
    }

    @Override
    public Optional<Application> findById(Long id) {
        System.out.println("Find Application with id: " + id);
        return applicationRepository.findById(id);
    }

    @Override
    public Application updateApplication(Application application, Long id) {
        Application existing = applicationRepository.findById(id)
                .orElseThrow(() -> new jakarta.persistence.EntityNotFoundException("Application not found: " + id));

        if (Objects.nonNull(application.getJobTitle())) {
            existing.setJobTitle(application.getJobTitle());
        }
        if (Objects.nonNull(application.getCompany())) {
            existing.setCompany(application.getCompany());
        }
        if (Objects.nonNull(application.getStatus())) {
            existing.setStatus(application.getStatus());
        }
        if (Objects.nonNull(application.getSubmissionDate())) {
            existing.setSubmissionDate(application.getSubmissionDate());
        }
        if (Objects.nonNull(application.getProgress())) {
            existing.setProgress(application.getProgress());
        }

        return applicationRepository.save(existing);
    }

    @Override
    public void deleteApplicationById(Long id) {
        System.out.println("Delete Application with id: " + id);
        applicationRepository.deleteById(id);
    }

}
