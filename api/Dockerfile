# Multi-stage Dockerfile for Laravel API (build + production)

# Stage 1: dependencies + composer install
FROM composer:2.6 as vendor
WORKDIR /app

# Copy composer files
COPY composer.json composer.lock ./

# Install PHP dependencies into vendor (will copy into final image)
RUN composer install --no-dev --no-interaction --prefer-dist --no-scripts --no-progress

# Stage 2: application image
FROM php:8.1-fpm-alpine

# Install system dependencies
RUN apk add --no-cache \
    bash \
    git \
    libzip-dev \
    oniguruma-dev \
    zip \
    unzip \
    icu-dev \
    curl \
    supervisor \
    nginx

# PHP extensions
RUN docker-php-ext-install pdo pdo_mysql mbstring zip exif pcntl intl

# Install composer (already present in vendor stage, but keep composer in final for artisan commands)
COPY --from=composer:2.6 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Copy application files
COPY . /var/www/html

# Copy vendor from composer stage (not ideal for platform-specific deps but works for most cases)
COPY --from=vendor /app/vendor /var/www/html/vendor

# Set permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache || true

# Expose port 9000 for php-fpm
EXPOSE 9000

# Start php-fpm (the container will be paired with nginx in docker-compose)
CMD ["php-fpm"]
