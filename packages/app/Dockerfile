FROM node:alpine

CMD ["sh","-c","\
    mkdir -p /usr/src/app; \
    cp -r /app /usr/src/; \
    mkdir -p /usr/src/resources; \
    cp -r /resources /usr/src/; \
    mkdir -p /usr/src/shared; \
    cp -r /shared /usr/src/; \
    cd /usr/src/shared; \
    npm install --verbose; \
    npm run build --verbose; \
    \ 
    mkdir -p /usr/src/app/node_modules/@asw-project/shared; \
    ls -lat /usr/src/shared/*;\
    mv /usr/src/shared/dist /usr/src/app/node_modules/@asw-project/shared; \
    \
    cd /usr/src/app; \
    npm install --verbose; \
    npm run build --verbose; \
    npm run serve; \
"]
