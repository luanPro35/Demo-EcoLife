package com.ecolife.service;

import com.ecolife.entity.Activity;
import com.ecolife.repository.ActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ActivityService {

    @Autowired
    private ActivityRepository activityRepository;

    public List<Activity> getAllActivities() {
        return activityRepository.findAll();
    }

    public Optional<Activity> getActivityById(Long id) {
        return activityRepository.findById(id);
    }

    public Activity createActivity(Activity activity) {
        return activityRepository.save(activity);
    }

    public Activity updateActivity(Long id, Activity activityDetails) {
        Activity activity = activityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Activity not found with id " + id));

        activity.setActivityType(activityDetails.getActivityType());
        activity.setDescription(activityDetails.getDescription());
        activity.setCarbonSaved(activityDetails.getCarbonSaved());
        activity.setPointsEarned(activityDetails.getPointsEarned());
        activity.setActivityDate(activityDetails.getActivityDate());
        activity.setImageUrl(activityDetails.getImageUrl());
        activity.setIsVerified(activityDetails.getIsVerified());
        // Assuming user is handled separately or not updated via this method
        // If userId needs to be updated, you'd fetch the User entity and set it.

        return activityRepository.save(activity);
    }

    public void deleteActivity(Long id) {
        Activity activity = activityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Activity not found with id " + id));
        activityRepository.delete(activity);
    }

    public List<Activity> getActivitiesByUserId(Long userId) {
        return activityRepository.findByUserId(userId);
    }
}
