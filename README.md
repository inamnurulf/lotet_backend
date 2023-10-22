# LOTET - Backend

## Members

1. Ega Rizky Setiawan (21/479314/TK/52861)
2. Partahi Bonaruli Sitorus (21/482615/TK/53324)
3. Nathan Praja Kusuma (21/473742/TK/52225)
4. In’am Nurul Fuady (21/479707/TK/52919)
5. Yasmine ‘Arfa Zahira (21/478786/TK/52758)

## API Documentation
Here is a link to the full documentation of Lotet-API

**https://documenter.getpostman.com/view/27791195/2s9YJZ45DQ**

## Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node Package Manager)

## Getting Started

1. Clone this repository to your local machine:

```shell
   git clone https://github.com/inamnurulf/lotet_backend.git
```

2. Install project dependencies:

```shell
    npm install
```

3. Create a .env file by copying the provided .env.example:

```shell
    cp .env.example .env
```

4. Modify the values in the .env file to match your configuration needs.
   or you can use (you need to generate your email google app password if want to use your own email):

```shell
DATABASE_URL='mongodb+srv://lotet:lotetmania123@lotet.nfdcwcy.mongodb.net/?retryWrites=true&w=majority'
SALTROUNDS = 10
JWT_SECRET=sajdbkjsadbjksabkdhgvasyigdia7ushbdjkasbdiu

MAIL_USERNAME=bantublestcheon@gmail.com
MAIL_PASSWORD=wmleldlndhdhwaou
```

## Running the Development Server

To start the development server, run the following command:

```shell
    npm run dev
```

The server will start at http://localhost:3000 by default.
