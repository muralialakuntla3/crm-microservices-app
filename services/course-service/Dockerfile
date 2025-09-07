FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
COPY target/course-service-1.0.0.jar app.jar
EXPOSE 6000
ENTRYPOINT ["java","-jar","/app/app.jar"]