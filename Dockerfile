FROM openjdk:8

ARG VERSION
# 빌드 완료한 jar파일 zz
COPY backend/final-project/target/final-project-0.0.1-SNAPSHOT.jar /app/final-project.jar

LABEL maintainer="yebin<teammate@naver.com>" \
      title="final-project" \
      version="$VERSION" \
      description="그룹웨어 서비스"

ENV APP_HOME /app
EXPOSE 8080
VOLUME /app/upload

WORKDIR $APP_HOME
ENTRYPOINT ["java"]
CMD ["-jar", "final-project.jar"]
