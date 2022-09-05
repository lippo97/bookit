from minio/mc

ARG MINIO_URL
ENV MINIO_URL=${MINIO_URL}
COPY biblioteca.jpg /biblioteca.jpg

CMD ["alias set minio ${MINIO_URL} minio minio123; \
mb library-images; \
cp /biblioteca.jpg library-images; "]