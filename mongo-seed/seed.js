
db.createUser({
  user: 'asw-project-user',
  pwd: 'toor',
  roles: [
    {
      role: 'readWrite',
      db: 'asw-project',
    },
  ],
});

