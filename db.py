from MySQLdb import _mysql as sql

db = sql.connect(host='localhost', user='root', password='admin')

# * drop database if exists
db.query('DROP DATABASE IF EXISTS bbm;')

# * create database
db.query('CREATE DATABASE bbm CHARACTER SET utf8;')

# * drop user if exists
db.query('DROP USER IF EXISTS "user_1"@"localhost";')

# * create user with password 'Test@321'
db.query('CREATE USER "user_1"@"localhost" IDENTIFIED BY "Test@321";')

# * grant all privileges to 'user_1' for todo_app db
db.query('GRANT ALL PRIVILEGES ON bbm.* TO "user_1"@"localhost";')

db = sql.connect(host='localhost', database='bbm', user='user_1', password='Test@321')

print(db)