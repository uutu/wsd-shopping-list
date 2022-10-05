# Project 1: Shared shopping list

This document outlines the first course project: **a shared shopping list web application**.

The application follows a three-tier architecture (client, server, database) and is built following a layered architecture with four layers.

## A brief description of the application

The main page (accessed locally at http://localhost:7777 while the container is running) contains some information about the contents of the database (number of shopping lists and created shopping list items). Shopping lists can be accessed through a link.

The page for shopping lists displays all the active shopping lists of the application. Active lists can also be deactivated and hidden from view. Adding new lists through a form uses a POST/Redirect/GET -pattern.

Individual shopping lists can be accessed through links created for each shopping list. Each list displays a sorted set of results, and new items can be added to an existing shopping list or marked as collected (denoted by ~~strikethrough~~). Adding new items to existing lists is done using a form and a POST/Redirect/GET -pattern is used.

Shopping list items are sorted in alphabetic order followed by collected items in alphabetic order.

### Views

Views are stored in a separate folder and a layout is used to serve views in a HTML -template.

The main page, shopping lists and list items all have their own .eta files.

### Controllers

The application utilises controllers for shopping lists and list items. The controllers' purpose is to serve as a mediator between a user and the shopping list application, handle rendering files, control services for database queries, and handle rerouting tasks.

### Services

The services for shopping lists and list items handle database queries and function as a layer between the database and the controllers.

### Database

The database.js file executes database queries. The database utilises a connection pool for performance with a preset limit for 3 concurrent connections.

## Deployed application location for testing

The deployed application can be found at: [https://shopping-lists-galore.herokuapp.com/]

## Guidelines for running the application locally

The project can be launched locally using `docker-compose up` which takes care of dependencies and the database schema.