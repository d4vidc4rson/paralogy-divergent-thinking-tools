FROM node:22-slim

WORKDIR /app/mcp-server
COPY mcp-server/package.json mcp-server/package-lock.json ./
RUN npm ci

WORKDIR /app
COPY . .
RUN cd mcp-server && npm run build && npm prune --omit=dev

WORKDIR /app/mcp-server
ENV TRANSPORT=http
CMD ["node", "dist/index.js"]
