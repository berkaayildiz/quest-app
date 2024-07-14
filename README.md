<div align="center">

<a href="https://berkaayildiz.github.io/quest-app/"><img src="https://github.com/user-attachments/assets/9979c0f7-a6c0-45d8-b4db-410ed47f3104" width="275"></a>

<h1>/quest-app</h1>
</div>
A simple web application that can be used to manage posts. A user can add a post, like other post or comment on other posts. You can access the application <a href="https://berkaayildiz.github.io/quest-app/">here</a> or by clicking the above image.

## Technologies
The project is built with following technologies:

- Vite + React (using TypeScript)
- Spring Boot (using PostgreSQL)
- shadcn/ui components
- Docker
- Render.com (for deployment)

## Local Deployment
This section covers the deployment process for both the backend and frontend parts of the Quest App.

### Backend Deployment
To deploy the backend, you need to set environment variables and run the application using Docker.

1. **Set Environment Variables**: Ensure the following environment variables are set according to your deployment environment. These are crucial for configuring the database connection and security settings.

   - `DATABASE_URL`: The JDBC URL for your PostgreSQL database (You need to create a PostgreSQL database and provide the URL here).
   - `DATABASE_USERNAME`: The username for your database.
   - `DATABASE_PASSWORD`: The password for your database.
   - `SPRING_SECURITY_USER_NAME`: The username for Spring Security.
   - `SPRING_SECURITY_USER_PASSWORD`: The password for Spring Security.
   - `QUEST_APP_APP_SECRET`: A secret key used by the application (64 characters string recommended).
   - `ALLOWED_ORIGINS`: The origins allowed to access your application, separated by commas.

#### With Docker
2. **Run Docker Image**: With the environment variables set, run the Docker image of the backend. If you haven't built a Docker image yet, you will need to create one using a Dockerfile in your backend project directory. To run the Docker image, use the following command:

   ```bash
   docker run -d -p 8080:8080 --env-file .env your_docker_image_name
   ```

Replace `your_docker_image_name` with the name of your Docker image and ensure .env contains all the necessary environment variables.

#### Without Docker (Direct Java Application Run)
2. **Run the Application**: Navigate to the root directory of your backend project and use the following command to run your Spring Boot application:

    ```bash
    ./mvnw spring-boot:run
    ```

    Or if you have a compiled .jar file:

    ```bash
    java -jar your_application.jar
    ```

Replace `your_application.jar` with the path to your compiled jar file.

3. **Access the Application**: After deploying the backend using either method, you can access the application by navigating to the URL where it is hosted. The backend should be accessible at http://localhost:8080.

## Frontend Deployment
Deploying the frontend involves installing dependencies and starting the application.

1. **Run the Application**: Navigate to the frontend directory and run the following command:

    ```bash
    npm run dev
    ```

This will download the necessary dependencies and start the frontend application. You can access the frontend at http://localhost:3000.

## Remote Deployment
This section covers the deployment process for both the backend and frontend parts of the Quest App on Render.com.

### Backend Deployment
1. **Create a New PostgreSQL Database**: Log in to your Render account and create a new PostgreSQL database. Note down the connection URL, username, and password provided by Render since you will need these for the environment variables.

2. **Create a New Web Service**: Log in to your Render account and create a new web service. Choose the "Docker" option and provide the URL of your Docker image.

3. **Add Environment Variables**: In the "Environment Variables" section, add the environment variables required by the backend application. These should be the same as the ones used for local deployment.

4. **Deploy the Service**: Click on the "Create Web Service" button to deploy the backend service. Render will automatically build and deploy the Docker image.

### Frontend Deployment

1. **Build and Deploy the Frontend**: Navigate to the frontend directory and run the following command:

    ```bash
    npm run deploy
    ```

This command will build the frontend application and deploy it to GitHub Pages since the project is configured to deploy to GitHub Pages by default. You can change the deployment target by modifying the `deploy` script in the `package.json` file.

## Purpose

The purpose of this project is to demonstrate how to build a full-stack web application using Vite + React and Spring Boot and how to deploy it. This project was assigned as a task during my internship.
