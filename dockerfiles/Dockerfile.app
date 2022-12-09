ARG TAG=18
ARG VITE_REPO=https://github.com/vitejs/vite.git
ARG VITE_DIR=vite

FROM node:$TAG

ENV VITE_REPO=$VITE_REPO
ENV VITE_DIR=$VITE_DIR

WORKDIR /train-app

# Install packages
RUN \
    # set shell behavior
    set -eux; \
    apk update \
    # Packages to install
    apk add --no-cache \
        git \
        python3 \
        make \
        g++ \
    && \
    # Clean out directories that don't need to be part of the image
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* \
    && \
    yarn install


COPY app/ .
