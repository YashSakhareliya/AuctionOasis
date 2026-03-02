FROM node:20.18.0
LABEL "Project" = "Auctionoasis"
LABEL "Author" = "Yash Sakhareliya"

WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000

CMD ["npm", "run", "dev"]