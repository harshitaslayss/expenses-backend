FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY pom.xml
RUN mvn dependency:go-offline

COPY src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

COPY --from=build expense-manager-app-0.0.1-SNAPSHOT.jar .
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "expense-manager-app-0.0.1-SNAPSHOT.jar"]
