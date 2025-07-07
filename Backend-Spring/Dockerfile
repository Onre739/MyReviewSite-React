# 1. Build stage
FROM maven:3.9.6-eclipse-temurin-21 AS builder

WORKDIR /build

# Zkopíruj POM a zdrojáky
COPY pom.xml .
COPY src ./src

# Buildni aplikaci
RUN mvn clean package -DskipTests

# 2. Run stage
FROM eclipse-temurin:21-jre

WORKDIR /app

# Přetáhni jen hotový .jar z předchozího buildu
COPY --from=builder /build/target/MyReviewSite-*.jar app.jar
COPY MyReviewSiteDB.db ./

RUN chmod a+rw MyReviewSiteDB.db

CMD ["java", "-jar", "app.jar", "--spring.profiles.active=prod"]
