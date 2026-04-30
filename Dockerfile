FROM node:18-alpine
WORKDIR /app
COPY app.js .
RUN mkdir /data
EXPOSE 8080
CMD ["node", "app.js"]
