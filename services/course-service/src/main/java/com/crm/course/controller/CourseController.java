package com.crm.course.controller;
this.service = service;
}


@GetMapping("/public")
public ResponseEntity<List<Course>> publicList() {
return ResponseEntity.ok(service.list());
}


@PostMapping
public ResponseEntity<Course> create(@RequestBody Course course, Authentication auth) {
// set instructorId to authenticated user
String userId = (auth != null) ? (String) auth.getPrincipal() : null;
if (course.getInstructorId() == null) course.setInstructorId(userId);
Course created = service.create(course);
return ResponseEntity.created(URI.create("/api/v1/courses/" + created.getId())).body(created);
}


@GetMapping
public ResponseEntity<List<Course>> list() {
return ResponseEntity.ok(service.list());
}


@GetMapping("/{id}")
public ResponseEntity<Course> get(@PathVariable Long id) {
return service.get(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
}


@PatchMapping("/{id}")
public ResponseEntity<Course> patch(@PathVariable Long id, @RequestBody Course patch, Authentication auth) {
// allow only instructor or admin
String userId = (auth != null) ? (String) auth.getPrincipal() : null;
// check ownership
var existing = service.get(id);
if (existing.isEmpty()) return ResponseEntity.notFound().build();
Course c = existing.get();
String role = auth != null && auth.getAuthorities() != null && auth.getAuthorities().stream().findFirst().isPresent()
? auth.getAuthorities().stream().findFirst().get().getAuthority() : null;
boolean isAdmin = role != null && role.equalsIgnoreCase("ROLE_ADMIN");
if (!isAdmin && (c.getInstructorId() == null || !c.getInstructorId().equals(userId))) {
return ResponseEntity.status(403).build();
}
Course updated = service.update(id, patch);
return ResponseEntity.ok(updated);
}


@DeleteMapping("/{id}")
public ResponseEntity<?> delete(@PathVariable Long id, Authentication auth) {
// only admin
String role = auth != null && auth.getAuthorities() != null && auth.getAuthorities().stream().findFirst().isPresent()
? auth.getAuthorities().stream().findFirst().get().getAuthority() : null;
if (role == null || !role.equalsIgnoreCase("ROLE_ADMIN")) {
return ResponseEntity.status(403).build();
}
boolean removed = service.delete(id);
if (!removed) return ResponseEntity.notFound().build();
return ResponseEntity.ok().build();
}
}