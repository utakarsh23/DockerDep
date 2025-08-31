FROM node:18-bullseye

RUN apt-get update && apt-get install -y python3 python3-pip supervisor && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY e-back ./e-back
WORKDIR /app/e-back
RUN npm install

WORKDIR /app
COPY p-back ./p-back
RUN pip3 install -r p-back/requirements.txt

COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Expose ports
EXPOSE 3000

CMD ["/usr/bin/supervisord"]