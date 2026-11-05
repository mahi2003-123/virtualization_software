# Multi-stage Dockerfile for Spring Boot 3 + Java 21 Backend

# Stage 1: Build stage
FROM maven:3.9.9-eclipse-temurin-21-alpine AS builder
WORKDIR /app

# Cache dependencies
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source code and build production jar
COPY src ./src
RUN mvn clean package -DskipTests -B

# Stage 2: Minimal runtime image
FROM eclipse-temurin:21-jre-alpine
LABEL maintainer="Enterprise Full Stack Team"
WORKDIR /app

# Run as a dedicated non-root user for security
RUN addgroup -S springgroup && adduser -S springuser -G springgroup

# Copy compiled JAR from build stage
COPY --from=builder /app/target/*.jar app.jar
RUN chown -R springuser:springgroup /app

USER springuser:springgroup

EXPOSE 8080

# Health check configuration using actuator endpoint
HEALTHCHECK --interval=15s --timeout=5s --start-period=30s --retries=3 \
  CMD wget -q -O - http://localhost:8080/actuator/health | grep UP || exit 1

# Optimized JVM flags for containerized environment
ENTRYPOINT ["java", "-XX:+UseContainerSupport", "-XX:MaxRAMPercentage=75.0", "-Djava.security.egd=file:/dev/./urandom", "-jar", "app.jar"]
