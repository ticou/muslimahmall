# Stage 1: Build
FROM node:20-alpine as builder

# Définir le répertoire de travail
WORKDIR /app

# Copier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm ci --legacy-peer-deps

# Copier les sources du projet
COPY . .

# Build l'application
RUN npm run build

# Stage 2: Production
FROM nginx:alpine

# Copier la configuration nginx personnalisée si nécessaire
COPY nginx.conf /etc/nginx/nginx.conf

# Copier les fichiers buildés depuis l'étape de build
COPY --from=builder /app/dist/demo/browser /usr/share/nginx/html

# Exposer le port 90
EXPOSE 90

# Démarrer nginx
CMD ["nginx", "-g", "daemon off;"]
