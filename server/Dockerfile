# FROM ubuntu:latest AS build

# RUN apt-get update
# RUN apt-get install openjdk-17-jdk -y
# COPY . .

# RUN ./gradlew bootJar --no-daemon

# FROM openjdk:17-jdk-slim

# EXPOSE 8080

# COPY --from=build /build/libs/server-1.jar app.jar

# ENTRYPOINT ["java", "-jar", "app.jar"]


FROM ubuntu:latest AS build

RUN apt-get update
RUN apt-get install -y openjdk-17-jdk

WORKDIR /app

# Copy only necessary files for the build
COPY build.gradle .
COPY src ./src

# Ensure Gradle Wrapper has executable permissions
RUN chmod +x ./gradlew

# Run the Gradle build
RUN ./gradlew bootJar --no-daemon

FROM openjdk:17-jdk-slim

EXPOSE 8080

WORKDIR /app

COPY --from=build /app/build/libs/server-1.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]
