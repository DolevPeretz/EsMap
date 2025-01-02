# שלב 1 - Build
FROM node:16 AS build

# קביעת תיקיית העבודה בקונטיינר
WORKDIR /app

# העתקת קבצי package.json ו- package-lock.json
COPY server/package*.json ./

# התקנת התלויות
RUN npm install

# העתקת שאר הקבצים
COPY server/ .

# הרצת השרת
CMD ["node", "server.js"]

# חשיפת הפורט (לפי הצורך)
EXPOSE 3000
