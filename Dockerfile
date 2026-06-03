# Stage 1: Build the application using Maven and JDK 17
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app

# Copy pom.xml and download dependencies (cached layer)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source code and build the heavy JAR file
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Run the application using a lightweight JRE image
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copy the built JAR from the previous stage
COPY --from=build /app/target/expense-manager-app-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]