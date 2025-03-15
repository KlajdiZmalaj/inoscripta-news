# How to use:

Write these commands in project terminal to build / stop the app (you can use Makefile or just use docker cmds).

After you run the app you will find some random news from the second source (default) but you can change and filter them from the menu on the left side

### Build and start the containers:

- `make up`

### Stop the containers:

- `make stop`

## [Online Version Vercel](https://inoscripta-news.vercel.app/).

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
     ├    ├ [JS] api.ts (news endpoints and query params)
     ├    ├ [JS] utils.ts (mappers and utils functions)
     ├
     ├  [DIR] context/News 
     ├    ┬
     ├    ├ [DIR] News 
     ├        ┬
     ├        ├ [JS] index.ts (state managment and logic)
     ├  [DIR] pages
     ├  [DIR] styles
     ├  [JS] App.ts
     ├  [JS] index.ts   
     └
</pre>

# Other info:

Some apis do not support all the filters queries (it is not bcz of the queries but it is missing on the API docs)

- Search by title works on all
- Date From/To works on all
- Categories works with NYT
- Author works with NYT fq: byline:(John)
