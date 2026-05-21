# --- ÉTAPE 1: L'atelier de construction ---
# On utilise une image Node.js complète pour construire l'application
FROM node:20 AS build

# On définit le répertoire de travail dans le conteneur
WORKDIR /app

# On copie les fichiers de dépendances et on installe TOUTES les dépendances (y compris devDependencies)
COPY package.json package-lock.json ./
RUN npm install

# On copie le reste du code de l'application
COPY . .

# On lance le build de production
RUN npm run build


# --- ÉTAPE 2: L'image finale de production ---
# On repart d'une image très légère, car on n'a plus besoin des outils de build
FROM node:20-slim

WORKDIR /app

# On ne copie que les dépendances nécessaires pour la production
COPY package.json package-lock.json ./
RUN npm install --production

# On copie les fichiers statiques construits à l'étape précédente
COPY --from=build /app/dist ./dist

# On expose le port sur lequel notre serveur va tourner
EXPOSE 5173

# La commande pour démarrer le serveur de production
CMD ["npm", "start"]
