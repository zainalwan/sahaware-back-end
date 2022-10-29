CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255)
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR (255) 
);

CREATE TABLE articles (
  id SERIAL PRIMARY KEY,
  title VARCHAR (255),
  content TEXT,
  category_id INT REFERENCES categories (id)
);
