Hosting only the Laravel API (php-fpm + nginx)

Files added:
- Dockerfile (in `api/`) — builds php-fpm app image
- docker/nginx.conf — nginx config to serve Laravel `public` and proxy PHP to php-fpm
- docker/docker-compose.yml — launches `api` (php-fpm) and `web` (nginx). DB is external.

Quick start (from repo root `d:/Projekty/moje/aureon`):

1. Copy your `.env` into `api/.env` (or set env vars in the shell). Ensure DB_* envs point to your hosted DB.

2. Generate or set APP_KEY in the `.env` (if not present):
   - On your host: `php artisan key:generate --show` and copy the value to `.env` as APP_KEY.

3. Build and run (from `api/docker`):

```bash
cd api/docker
# Ensure env vars available in shell or in api/.env
docker compose up --build -d
```

4. Visit the API via nginx (default): http://localhost:8080

Notes and tips:
- The container mounts the code from the host into `/var/www/html`, so changes to code are reflected immediately.
- If you prefer containers without bind mounts, remove the `volumes` lines; then build will bake code into the image.
- Since DB is external, make sure the host allows connections from the docker host and credentials are correct.
- To run migrations after containers are up:

```bash
# run artisan inside the api container
docker compose exec api php artisan migrate --force
```

- Logs: `docker compose logs -f web` or `docker compose logs -f api`.

Security:
- Use a vault or CI to inject production env vars; do not commit `.env` with production secrets.
- Prefer TLS termination (put nginx behind a reverse proxy with TLS or add certs to nginx).

If you want I can:
- Add a small healthcheck for the API service
- Add Makefile helpers for common tasks (build, migrate, logs)
- Include php extensions or swap to an official PHP-FPM image with required extensions preinstalled
