FROM openjdk:8

ARG VERSION
# 빌드 완료한 jar파일
COPY target/final-project-0.0.1-SNAPSHOT.jar /app/final-project.jar

LABEL maintainer="Park Somi <teammate@gmail.com>" \
      title="final-project" \
      version="$VERSION" \
      description="전자결재 프로그램"

ENV APP_HOME /app
EXPOSE 8080
VOLUME /app/upload

WORKDIR $APP_HOME
ENTRYPOINT ["java"]
CMD ["-jar", "final-project.jar"]
