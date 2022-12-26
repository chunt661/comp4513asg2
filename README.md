# COMP 4513 Assignment 2

Chris Hunter

https://shakespea-re.onrender.com/

*The website is not mobile friendly :)*

Login with:

**User:** zpochet2@apple.com

**Pass:** mypassword

## About

shakespea.re: A Shakespeare play browser that contains basic information on most of William Shakespeare's work.

The front-end was made with React, using components from Ant Design.

The React app interacts with a custom Node.js server that handles API requests and user authentication. The API was developed with Express and utilizes the Mongoose library to retrieve data from a MongoDB database. Session-based user authentication is performed with Passport.

See below for a full list of libraries and packages used in this project.

## React Libraries

<table>
    <tr>
        <td>antd</td>
        <td>Components from Ant Design</td>
    </tr>
    <tr>
        <td>craco &amp; craco-less</td>
        <td>CRACO - Create React App Configuration Override. A configuration layer for React. (required for customizing Ant Design themes)</td>
    </tr>
    <tr>
        <td>react-router-dom</td>
        <td>Adds routing to single-page React applications.</td>
    </tr>
    <tr>
        <td>react-transition-group</td>
        <td>(version 1.2.1) Enables CSS transitions for React components.</td>
    </tr>
    <tr>
        <td>react-highlight-words</td>
        <td>A simple library that highlights words in a text.</td>
    </tr>
    <tr>
        <td>react-collapse</td>
        <td>A wrapper for creating collapsible React components.</td>
    </tr>
</table>

## Server-side Packages

<table>
    <tr>
        <td>node.js</td>
        <td>Server environment.</td>
    </tr>
    <tr>
        <td>express &amp; express-flash</td>
        <td>Handles all routing for authentication and API requests.</td>
    </tr>
    <tr>
        <td>express-session</td>
        <td>Adds session support to Express.</td>
    </tr>
    <tr>
        <td>mongoose</td>
        <td>ORM for querying MongoDB.</td>
    </tr>
    <tr>
        <td>passport &amp; passport-local</td>
        <td>For authentication.</td>
    </tr>
    <tr>
        <td>bcrypt</td>
        <td>Hashing function for passwords.</td>
    </tr>
    <tr>
        <td>ejs</td>
        <td>EJS - Embedded JavaScript Templates. Used to generate the login page.</td>
    </tr>
    <tr>
        <td>dotenv</td>
        <td>Adds property/config file support.</td>
    </tr>
</table>
