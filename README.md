# React Movies App (Full Stack 2 Assignment)

Please enjoy this fun and easy to use React app which fetches movies from TMDB and displays them in an easy to navigate and explore UI.

Since the labs provided a good base for this web app, I will list the latest features included in this version after the labs were completed.

## New Features

### 1. Add to Must Watch Button
Click the Add to must watch button at the bottom of the movie card and see the orange icon appear on top of the movies you have added to you 

### 2. Must Watch Movies Page
Visit the new **Must Watch Movies** page to see all the movies you've added to your Must Watch list! Each movie you mark as "Must Watch" will appear here automatically.

If you change your mind or have already watched a movie, simply click the delete icon next to that movie on the Must Watch page to remove it from your list. The page updates instantly, so your Must Watch list always stays current.

### 3. Popular Movies Page
Check out the new popular movies page which fetchs the most popular movies from TMDB

### 4. Movie Details Page UI Cleanup
Say goodbye to the clumsy looking old ui on the movie details page. the new cleaned up ui is much tidier and displays the movie images much much nicer than before

### 5. Trending Movies Page
Check out the new trending Movies Page. There is a time window selector componant at the top of the trending movies page which you can choose to see the trending movies for the week or trending movies for the day

### 6. Time Window Selector Component
The new **Time Window Selector** component on the Trending Movies page lets you choose between viewing trending movies for the "day" or the "week". When you select a different time window, the page automatically refreshes the list of trending movies by dynamically updating the API call—no need to reload the page manually! This makes it easy to explore what's trending right now or over the past week with a single click.

### 7. Pagination with Functional Page Arrows
The page arrows at the top of each movie list (which were previously just for show) are now fully functional! You can now use the arrows at both the top and the new, stylish bar at the bottom of each page to navigate forward or backward through up to 20 pages of movies. Click the arrows to instantly load more movies—no page reload needed. Enjoy smooth and easy browsing as you explore a much larger selection of movies!

### 8. TV Shows Section - Complete TV Show Pages
The app now includes a comprehensive TV Shows section with four dedicated pages:

- **Upcoming TV Shows** - Browse TV shows that are currently airing or coming soon
- **Popular TV Shows** - Discover the most popular TV shows on TMDB
- **Trending TV Shows** - See what TV shows are trending with the same time window selector (day/week) as the movies
- **Top Rated TV Shows** - Explore the highest-rated TV shows

Each TV Show page includes all of the extensive features that were implemented on the movie pages


## Incomplete Features

### Dark/Light Theme Switch
I attempted to implement a dark/light theme toggle by adapting the example from the Material UI documentation. However, I wasn't able to get it fully working yet, so the feature is currently incomplete.


### Favourite/MustWatch TV pages and functionality 
I attempted to add favourite/mustwatch functionality for TV shows, similar to what I have for movies. The pages mostly work, and TV shows can sometimes be favourited or added to must watch, but after doing this, the movies favourites page breaks. I suspect this is because I copied the movie pages and adapted them for TV shows, but I must have missed something in the process, causing the logic for movies and TV shows to get mixed up.

### Attempted Category Dropdown Menu

I tried several times to change the main navigation menu into a simple dropdown with categories (e.g., "Movies", "TV Shows", etc.), but found the Material UI documentation confusing and overly complex for this use case. There are many advanced menu options, but I just wanted a basic dropdown menu for navigation.


