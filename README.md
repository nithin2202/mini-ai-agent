# Mini AI Support Agent

## Overview

Mini AI Support Agent is a backend application built using Node.js, Express.js, MySQL, Knex.js, and Google's Gemini API.

The application intelligently routes user queries between predefined FAQ responses and an LLM while implementing semantic caching to reduce redundant LLM calls and improve response times.

---

## Features

### Smart Routing

Queries are classified into:

* Rule-Based Responses (FAQ)
* LLM-Based Responses (Gemini)

Example:

* Refund Policy → FAQ Database
* Explain JWT Authentication → Gemini

---

### Semantic Caching

The system stores:

* User Query
* Query Embedding
* LLM Response

When a similar query is received, cosine similarity is used to compare embeddings.

If similarity exceeds the configured threshold:

* Cached response is returned
* Gemini API call is skipped

Benefits:

* Faster responses
* Reduced API usage
* Lower operational cost

---

### Query Analytics

Every request is logged into MySQL.

The `/rest2/api/stats` endpoint provides:

* Total Queries
* Rule-Based Queries
* LLM Queries
* Cache Hits
* Cache Hit Rate
* Average Response Time
* Estimated LLM Cost

---

## Technology Stack

### Backend

* Node.js
* Express.js

### Database

* MySQL
* Knex.js

### AI

* Google Gemini API
* Gemini Embeddings

### Frontend

* React.js
* Axios

---

## Project Structure


backend/
├── config/
src/

├── controllers/
├── services/
├── models/
├── routes/
├── utils/


Frontend/

├── components/
├── App.jsx


## API Endpoints

### Process Query

POST `/rest2/api/query`

Request:

json
{
  "query": "Explain JWT authentication"
}


Response:

json
{
  "route": "LLM",
  "cached": false,
  "answer": "JWT authentication is..."
}


### Statistics

GET `/api/stats`

Response:

json
{
  "totalQueries": 25,
  "ruleQueries": 5,
  "llmQueries": 15,
  "cacheHits": 5,
  "cacheHitRate": "20%"
}


## Database Tables

### faqs

Stores predefined FAQ responses.

### semantic_cache

Stores:

* Query
* Embedding
* Cached Response

### query_logs

Stores:

* Query
* Route Type
* Cache Hit Status
* Response Time
* Cost Metrics

## Setup

### Clone Repository


git clone https://github.com/nithin2202/mini-ai-agent


### Install Dependencies


npm install


### Configure Environment Variables

Create `.env`

env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=ai_support_agent

GEMINI_API_KEY=YOUR_API_KEY


### Create Database

CREATE DATABASE ai_support_agent;


Execute SQL scripts for:

* faqs
* semantic_cache
* query_logs

### Start Application

npm start



## Docker Support

Docker configuration files have been included in this repository:

* Dockerfile
* docker-compose.yml

The application has been configured to support containerized deployment using Docker Compose.

Due to local Docker Desktop environment limitations during development, Docker execution could not be fully validated on the development machine.

Reviewers can test the Docker setup using:

docker compose up --build


The Docker configuration is intended to start:

1. Node.js Application Container
2. MySQL Database Container

Required database initialization scripts are available in:

text
database/init.sql


If Docker is properly installed and configured on the host machine, the application should be deployable through Docker Compose.


## Future Enhancements


* WebSocket Streaming
* Cost Tracking Dashboard
* AI Intent Classification
* Docker Compose Deployment
* Cloud Deployment
* Admin Analytics Dashboard

## Author

Nithin
