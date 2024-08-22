#!/bin/sh
# entrypoint.sh

echo "Running migrations..."
npm run migration:up

echo "Starting the application..."
exec npm run start:dev
