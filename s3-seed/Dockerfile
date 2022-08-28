from minio/mc

COPY biblioteca.jpg /biblioteca.jpg

CMD ["alias set minio http://localhost:9001 minio minio123; \
mb library-images; \
cp /biblioteca.jpg library-images; "]