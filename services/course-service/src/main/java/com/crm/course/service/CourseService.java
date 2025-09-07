package com.crm.course.service;


import com.crm.course.model.Course;
import com.crm.course.repository.CourseRepository;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;


@Service
public class CourseService {


private final CourseRepository repo;


public CourseService(CourseRepository repo) {
this.repo = repo;
}


public Course create(Course course) {
return repo.save(course);
}


public Optional<Course> get(Long id) {
return repo.findById(id);
}


public List<Course> list() {
return repo.findAll();
}


public List<Course> listByInstructor(String instructorId) {
return repo.findByInstructorId(instructorId);
}


public Course update(Long id, Course patch) {
return repo.findById(id).map(existing -> {
if (patch.getTitle() != null) existing.setTitle(patch.getTitle());
if (patch.getDescription() != null) existing.setDescription(patch.getDescription());
if (patch.getPrice() != null) existing.setPrice(patch.getPrice());
existing.setUpdatedAt(java.time.LocalDateTime.now());
return repo.save(existing);
}).orElse(null);
}


public boolean delete(Long id) {
return repo.findById(id).map(r -> {
repo.delete(r);
return true;
}).orElse(false);
}
}