# Dymo LW450 Frontend  
A simple web frontend to print address labels on a Dymo LabelWriter 450, created with Node.js.

![](screenshot.png)

It's tweaked to print nicely on Dymo 99012 (36 x 89 mm) shipping labels, fitting up to 6 rows.

![](photograph.png)

## Requirements
- A Dymo LabelWriter 450 printer, obviously
- An IPP print server with the LW450 configured
- Node.js installed or the ability to use Docker  

## Install and run
- Copy the config-example.json file to config.json
- Make necessary changes in the config.json file
- Run `npm install` to install all necessary packages
- Run `npm start` to fire up the server
- Visit http://localhost:3000 to use the frontend

## Using Docker
- Copy the config-example.json file to config.json
- Make necessary changes in the config.json file
- Run `docker build -t dymo-lw450-frontend .` to build the container image
- Run `docker run -dp 8080:3000 dymo-lw450-frontend` to start a container
- Visit http://localhost:8080 to use the frontend

## Further remarks
- The Printer URL might be configurable with an environment variable in the future
- Design: html5up.net | @ajlkn, CCA 3.0 license (https://html5up.net/license)
- Companion repo with IPP server in a Docker container: https://github.com/dschuuls/balena-dymo-lw450-backend
