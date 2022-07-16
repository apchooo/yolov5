FROM python:3.7.9

RUN apt-get update && \
apt-get install --no-install-recommends -y libgl1 libtinfo5 && \
rm -rvf /var/lib/apt/lists/*

RUN pip install --no-cache-dir flask==2.1.3

WORKDIR /app

COPY ./requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY ./ ./

EXPOSE 5000
ENTRYPOINT ["flask", "run", "--host", "0.0.0.0"]