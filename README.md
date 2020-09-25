# MedSwap App: The Back-End
https://medswap.herokuapp.com

## Description
MedSwap is an app we built for build week for Lambda School which helps users switch from more pharmaceutical treatment
to natural treatment, specifically, finding medical cannabis strains to help treat their symptoms. In the app, one can submit a list of symptoms they are having and receive back a recommended Cannabis strain (from the Data Science database) 
that would be good for helping with those symptoms.  Then they can choose to save that strain to their
page by clicking a button (using a post request to the back-end to save the cannabis info to this backend database).

Thus, my part of the project, the backend, consisted in making a RESTful API and database with a table where users can be saved (via registering a user - also can login) and edited and deleted, and also a table for saving (POST), getting (GET) and deleting (DELETE) strains of cannabis, with a corresponding user_id foreign key that identifies which user is saving the cannabis strains.  (On the get request, only the strains of the user logged in (with token) will be returned - so the user can just see his or her strains, not the whole table of strains for all users).

## Installation
Npm packages used in this project, that would need to be installed are:
For dependencies:
    * bcryptjs - for hashing passwords
    * cors - for security on who accesses the database
    * dotenv - for working with different environments
    * express - for making server
    * helmet - for security
    * jsonwebtoken - for using tokens for login
    * knex - for making the database
    * knex-cleaner - for cleaning seeds
    * pg - postgres for production environment
    * sqlite3 - for the database in development environment

And devDependencies:
    * cross-env - for different environments
    * jest - for running tests
    * nodemon - for automatically updating server on changes
    * supertest - for testing the API 

## Usage
See description above of how this backend is used in an app

## Credits
Just was myself, Gregory Wilson, doing this backend


