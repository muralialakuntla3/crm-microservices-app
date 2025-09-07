# Node.js 20 LTS
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production \
&& addgroup -S app && adduser -S app -G app
COPY src ./src
ENV NODE_ENV=production
USER app
EXPOSE 3000
CMD ["node", "src/server.js"]