build-up-local:
	docker-compose --env-file .env.local up --build

up-local:
	docker-compose --env-file .env.local up