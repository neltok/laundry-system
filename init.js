db.createUser({
  user: 'admin',
  pwd: 'mysecretpass',
  roles: [{ role: 'root', db: 'admin' }]
});