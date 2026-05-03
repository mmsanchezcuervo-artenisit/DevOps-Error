FROM node:18-alpine
WORKDIR /app
COPY app.js metrics.js ./
EXPOSE 8000
CMD ["node", "app.js"]

