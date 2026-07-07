# zketch backend container image 

# --- Stage 1 : Build Stage ---

FROM node:22.13.0-alpine AS builder
WORKDIR /zketch 
COPY apps/backend/package.json .
RUN npm install --only=production
COPY ./apps/backend   .
RUN npx prisma generate
RUN npm run build



# --- Stage 2: Production Stage ---
FROM node:22.13.0-alpine 
COPY --from=builder /zketch/node_modules ./node_modules
COPY --from=builder /zketch/dist ./dist
COPY --from=builder /zketch/package.json ./

EXPOSE 5000
CMD [ "npm","run","start" ]






