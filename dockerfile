# Use a Node 16 base image.  
#FROM node:18-alpine
FROM node:16.20.1-alpine3.18

# Set the env for "production"
ENV Node_Env production

# Set the working directory to /app inside container.  
WORKDIR /app

# Copy json files.
#COPY package*.json ./
COPY . .

# --- Build App ---
# Install required dependencies to run our app.
#RUN npm install
RUN npm ci
# Now build the app.
RUN npm run build

# Here, exposed the prot on which app is going to run.
EXPOSE 3000

# Start the app
CMD [ "npx", "serve", "build" ]