# First install lerna
FROM node:alpine
WORKDIR /build
COPY package.json lerna.json yarn.lock /build/
RUN mkdir -p /build/packages
RUN yarn install --frozen-lockfile
COPY packages/shared /build/packages/shared
COPY packages/app /build/packages/app
RUN npx lerna bootstrap
COPY tsconfig.base.json /build/
# https://stackoverflow.com/questions/33379393/docker-env-vs-run-export
ENV NODE_OPTIONS=--openssl-legacy-provider
RUN npx lerna run build --scope=@asw-project/{shared,app}

# # First build shared package
# FROM node:alpine

# WORKDIR /build/shared
# COPY ./shared /build/shared
# RUN npm install
# RUN npm run build

# # Then manually link shared to app and build
# FROM node:alpine

# WORKDIR /build/app
# COPY ./app /build/app
# ARG REACT_APP_BACKEND_SERVER
# ENV REACT_APP_BACKEND_SERVER ${REACT_APP_BACKEND_SERVER}
# RUN npm install
# RUN mkdir -p node_modules/@asw-project
# COPY --from=0 /build/shared node_modules/@asw-project/shared
# RUN npm run build

# Finally make a static host for the built files
FROM flashspys/nginx-static
COPY --from=0 /build/packages/app/dist /static

# CMD ["sh","-c","\
#     mkdir -p /usr/src/app; \
#     cp -r /app /usr/src/; \
#     mkdir -p /usr/src/resources; \
#     cp -r /resources /usr/src/; \
#     mkdir -p /usr/src/shared; \
#     cp -r /shared /usr/src/; \
#     cd /usr/src/shared; \
#     npm install --verbose; \
#     npm run build --verbose; \
#     \
#     mkdir -p /usr/src/app/node_modules/@asw-project/shared; \
#     ls -lat /usr/src/shared/*;\
#     mv /usr/src/shared/dist /usr/src/app/node_modules/@asw-project/shared; \
#     \
#     cd /usr/src/app; \
#     npm install --verbose; \
#     npm run build --verbose; \
#     npm run serve; \
# "]
