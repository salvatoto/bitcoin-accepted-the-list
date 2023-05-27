#!/bin/sh

# Generate Prisma Client code
npx prisma generate

# Build the project
next build

#