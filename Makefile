# Variables
DOCKER_COMPOSE = docker-compose
SERVICE_NAME = inoscripta-news

# Default target: Build and run the containers
up: build start

# Build the Docker image
build:
	$(DOCKER_COMPOSE) build $(SERVICE_NAME)

# Start the Docker containers
start:
	$(DOCKER_COMPOSE) up -d

# Stop the Docker containers
stop:
	$(DOCKER_COMPOSE) down

# View the logs
logs:
	$(DOCKER_COMPOSE) logs -f $(SERVICE_NAME)

# Clean up all stopped containers and unused images, volumes, and networks
clean:
	$(DOCKER_COMPOSE) down --rmi all --volumes --remove-orphans

# Restart the containers
restart: stop up

# Rebuild the Docker image and restart the containers
rebuild: stop clean build start

# Open a shell inside the running container (we install packages here)
shell:
	$(DOCKER_COMPOSE) exec $(SERVICE_NAME) sh

.PHONY: up build start stop logs clean restart rebuild test shell
