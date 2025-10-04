package com.resume.dashboard.controller;

import com.resume.dashboard.model.entities.Application;
import com.resume.dashboard.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @PostMapping("/applications")
    public Application createApplication(@RequestBody Application application) {
        return applicationService.save(application);
    }

    @GetMapping("/applications")
    public List<Application> getAllApplications() {
        return applicationService.findAll();
    }

    @PutMapping("/applications/{id}")
    public Application updateApplication(@RequestBody Application application, @PathVariable("id") Long id) {
        return applicationService.updateApplication(application, id);
    }

    @DeleteMapping("/applications/{id}")
    public String deleteApplication(@PathVariable("id") Long id) {
        applicationService.deleteApplicationById(id);
        return "Application has been deleted";
    }
}
