# שלב 1 - Build
FROM node:16 AS build

# קביעת תיקיית העבודה בקונטיינר
WORKDIR /app

# העתקת קבצי package.json ו- package-lock.json
COPY package*.json ./

# התקנת התלויות
RUN npm install

# העתקת שאר הקבצים (כולל src)
COPY . .

# הרצת build (אם יש צורך)
RUN npm run build

# שלב 2 - Production
FROM nginx:alpine

# העתקת build לאיזור ה-Nginx
COPY --from=build /app/build /usr/share/nginx/html

# חשיפת פורט 80
EXPOSE 80
