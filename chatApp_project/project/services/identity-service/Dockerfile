FROM ubuntu:18.04
ENV LANG C.UTF-8
RUN apt-get update
RUN apt install -y python3 python3-pip
RUN mkdir /usr/local/identity-service
WORKDIR /usr/local/identity-service
COPY . .
RUN pip3 install -r requirements.txt

EXPOSE 5000

CMD ["flask", "run", "--host=0.0.0.0"]