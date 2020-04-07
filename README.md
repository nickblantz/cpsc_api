# Elm Demo API

This is a simple REST API for my Elm demo. It uses MySQL as its backend and serves JSON responses.

## Setup

1. Download the git repository
2. Run the command: `npm install express mysql body-parser --save`
3. In a MySQL database, run the following:
``` SQL
CREATE TABLE IF NOT EXISTS `user` (
  user_id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  email char(64) NOT NULL,
  password char(64) NOT NULL,
  session_id char(128),
  first_name char(64) NOT NULL,
  user_type enum('Manager', 'Investigator', 'Vendor') NOT NULL
) ENGINE=InnoDB;
```
4. In `app/config/db.config.js`, edit the connection information for your database.

## Running the server

Run the command: `node server.js`