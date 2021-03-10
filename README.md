# Weekend Warriors Official Website

Created with Next.js w/Redux for frontend and Strapi for backend with MongoDB as Database

Next.js: https://nextjs.org

Strapi: https://strapi.io/documentation/v3.x/getting-started/quick-start.html

React: https://reactjs.org

## Running Locally

To run the website locally, you must first download Node.js which can be found here <https://nodejs.org/en/>

Once the recommended verison is installed. Download or clone this git repository to then use to load up the website.

Use either the command prompt (Windows) or Terminal (Mac) to navigate to the folder. For information about how to use the command line, look online for more help. Once you arrive at the folder, run these commands in both the frontend and backend folders.

`npm install && npm run dev`

or

`yarn install && yarn dev`

Once these commands are ran, navigate to the url [localhost:3000](http://localhost:3000/index) to then view the website, if you would like to make changes to the backend data or code, change the `development` value in `frontend/config.js` to true. To view the backend dashboard, navigate to [localhost:1337/admin](http://localhost:1337/admin)

To close the website, close the command prompt.

If any more questions, talk to Kevin.

## Extra information

The `config.js` file inside the `/frontend` folder will not be tracked by git therefore can not be commited. This is since this file is solely for the developer's ease. If for some reason you want to change this, use:

`git update-index --no-assume-unchanged config.js`

to change it back use

`git update-index --assume-unchanged config.js`

License: MIT

Author: Kevin Tayah
