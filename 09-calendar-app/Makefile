up: up-front up-back

up-front:
	docker-compose up -d --force-recreate frontend

logs:
	docker-compose logs -f

install-front:
	docker-compose run --rm frontend "npm install"

into-front:
	docker-compose exec frontend sh

up-back:
	docker-compose up backend

install-back:
	docker-compose run --rm backend "npm install"

into-back:
	docker-compose exec backend bash
