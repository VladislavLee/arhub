mvn clean install -Dmaven.test.skip=true
docker build -t nikitadyadechkin/content.manager .
docker push nikitadyadechkin/content.manager:latest
