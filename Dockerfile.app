# First install lerna
FROM node:16-alpine3.12
WORKDIR /build
# We want to install these exact versions (yarn.lock)
COPY package.json lerna.json yarn.lock /build/
RUN mkdir -p /build/packages
RUN yarn install --frozen-lockfile
COPY packages/shared /build/packages/shared
COPY packages/app /build/packages/app
RUN npx lerna bootstrap
COPY tsconfig.base.json /build/
# https://stackoverflow.com/questions/69719601/getting-error-digital-envelope-routines-reason-unsupported-code-err-oss
# ENV NODE_OPTIONS=--openssl-legacy-provider

ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL=${REACT_APP_BACKEND_URL}
RUN npx lerna run build --scope=@asw-project/{shared,app}

FROM nginx
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=0 /build/packages/app/dist /usr/share/app
