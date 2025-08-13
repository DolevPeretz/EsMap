FROM node:20-alpine

WORKDIR /app

# התקנת תלויות לפי package.json (תעדכן/תיצור lock מתאים)
COPY package*.json ./
RUN npm install

# קוד
COPY . .

# build סטטי עם BASE של ה-API
ARG REACT_APP_API_BASE=http://localhost:5001
ENV REACT_APP_API_BASE=$REACT_APP_API_BASE
RUN npm run build

# שרת סטטי
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
