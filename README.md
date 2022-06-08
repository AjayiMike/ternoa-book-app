This is a Web App for documenting Books you've read. Books are Public. other people can see the books you've read and may want to read it too after reading your summerized description of the book


## Stack
- Next.js for both client and server
- Mongodb for data storage
- IPFS for files(Book covers) storage
- web3-react for wallet connection


## What User can do on this Web App
- user can connect wallet
- connected user can create a book
- connected user can update or delete books added by them
- connected or not connected, a user can see all the Books added by others (but cannot update or delete them)


## Note
The book covers are uploaded to Ipfs and public IPFS gateway is used to get them on the page, so The images might take some time to load for the first time


## Live site
[https://ternoa-book-app.vercel.app/](https://ternoa-book-app.vercel.app/)


## To run locally
- Clone the repository
- run `npm install` to install dependency
- create .env file and copy the content of .env.example into it
- your .env file should have a `db_connection_string` field, get a mongodb connection string and asign to it
- start the development server by running `npm run dev`
