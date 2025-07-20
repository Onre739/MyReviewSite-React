# === Build frontend ===
FROM node:18 AS frontend-build
WORKDIR /app
COPY Frontend-React/MyReviewSite-Frontend/ .
RUN npm install && npm run build

# === Build Spring Boot backend ===
FROM maven:3.9.6-eclipse-temurin-21 AS backend-build
WORKDIR /app

COPY Backend-Spring/pom.xml .
COPY Backend-Spring/.mvn .mvn
COPY Backend-Spring/mvnw mvnw
COPY Backend-Spring/src ./src

# Zkopíruj FE build do Spring resources/static
COPY --from=frontend-build /app/dist/ ./src/main/resources/static/

RUN ./mvnw clean package -DskipTests

# === Final stage ===
FROM eclipse-temurin:17
WORKDIR /app
COPY --from=backend-build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
