# === Build frontend ===
FROM node:22 AS frontend-build
WORKDIR /app
COPY Frontend-React/MyReviewSite-Frontend/ .
RUN npm install && npm run build

# === Build Spring Boot backend ===
FROM maven:3.9.6-eclipse-temurin-21 AS backend-build
WORKDIR /app

COPY Backend-Spring/ ./

RUN mvn clean package -DskipTests


# === Final stage ===
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=backend-build /app/target/*.jar app.jar

# Zkopíruj soubor databáze do obrazu
COPY MyReviewSiteDB.db ./
# Umožni zápis/čtení (v případě potřeby, např. SQLite)
RUN chmod a+rw MyReviewSiteDB.db

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar", "--spring.profiles.active=prod"]
