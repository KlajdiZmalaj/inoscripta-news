# How to use:

Write these commands in project terminal to build / stop the app (you can use Makefile or just use docker cmds)

### Build and start the containers:

- `make up`

### Stop the containers:

- `make stop`

# Tools used:

- Docker + docker-compose + Makefile
- React.js (CRA)
- SCSS for styling
- Context API `useNewsContext`
- react-router-dom , moment , react-datepicker

# APIS used:

##### I was able to add only those 3 (others are not public, but if we can find the endpoint + API_KEY we can integrate easily on api.js)

- `api.nytimes.com`

- `content.guardianapis.com`

- `newsapi.org`

# Folder structure:

<pre style='color:white;background:black'>
 ┬  
 ├ [DIR] src  
     ┬  
     ├  [DIR] assets 
     ├  [DIR] components
     ├  [DIR] config 
     ├    ┬
     ├    ├ [JS] api.js (news endpoints and query params)
     ├    ├ [JS] utils.js (mappers and utils functions)
     ├
     ├  [DIR] context/News 
     ├    ┬
     ├    ├ [DIR] News 
     ├        ┬
     ├        ├ [JS] index.js (state managment and logic)
     ├  [DIR] pages
     ├  [DIR] styles
     ├  [JS] App.js
     ├  [JS] index.js   
     └
</pre>
