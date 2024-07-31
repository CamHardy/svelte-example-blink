# Solana Blink Donation Example

This project allows users to donate SOL to MiladyBuilder via a web interface. It includes two main endpoints: `GET` and `POST`, which handle donation actions.

## Overview

This project provides a simple way for users to donate SOL to MiladyBuilder using the Solana blockchain. It handles both the creation of donation actions and the proceessing of transactions.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Build the project for Vercel:
```bash
npm run build
```

## Usage

To use this project, make GET and POST requests to the respective endpoints.

### API Endpoints

#### GET

Description: Returns a JSON payload containing donation action details.

Endpoint: `/api/donate`

Method: GET

Response:
```json
{
    "icon": "icon_url",
    "title": "Donate to MiladyBuilder",
    "description": "Support MiladyBuilder by donating SOL.",
    "label": "Donate",
    "links": {
        "actions": [
            {
                "label": "Donate 0.1 SOL",
                "href": "http://yourdomain.com/api/donate?amount=0.1"
            }
        ]
    }
}
```

#### POST

Description: Processes a donation transaction on the Solana blockchain.

Endpoint: `/api/donate`

Method: POST

Body:
```json
{
    "account": "public_key"
}
```

Response:
```json
{
    "fields": {
        "transaction": "SerializedTransaction",
        "message": "Message"
    }
}
