FROM maven:3.8-openjdk-17 AS build
COPY . .
RUN mvc clean package -DskipTests

FROM eclipse-temurin:17-jdk-jammy
COPY --from=build /target/server-0.0.1-SNAPSHOT.jar server.jar
EXPOSE 8080
ENTRYPOINT [ "java", "-jar", "server.jar" ]








# FROM ubuntu:latest AS build

# RUN apt-get update
# RUN apt-get install openjdk-17-jdk -y
# COPY . .

# RUN chmod +x ./gradlew

# RUN ./gradlew bootJar --no-daemon

# FROM openjdk:17-jdk-slim

# EXPOSE 8080

# COPY --from=build /build/libs/server-1.jar app.jar

# ENTRYPOINT ["java", "-jar", "app.jar"]


# FROM ubuntu:latest AS build

# RUN apt-get update
# RUN apt-get install -y openjdk-17-jdk
# COPY . .

# WORKDIR /server

# # Ensure Gradle Wrapper has executable permissions
# RUN chmod +x ./gradlew

# # Run the Gradle build
# RUN ./gradlew bootJar --no-daemon

# FROM openjdk:17-jdk-slim

# EXPOSE 8080

# WORKDIR /app

# COPY --from=build /app/build/libs/server-1.jar app.jar

# ENTRYPOINT ["java", "-jar", "app.jar"]
