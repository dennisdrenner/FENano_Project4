
# Performance Optimization Project 


## Purpose 

This project was completed for my Udacity.com Frontend Design Nanodegree. The exercise taught me to optimize any site so that it loads quickly as possible and runs at 60fps or faster. I made full use of Chrome developer tools to identify and fix performance issues (everything from non-optimized images, to poorly written JavaScript to render-blocking CSS).   Also made use of the build system Gulp for automated image optimization and code minimization. 


## How to Use 

Run application by navigating to 'dist' folder and dragging index.html into a web browser.  The dist folder contains files which have been optimized by gulp. You can also run the app by navigating to the 'app' folder and dragging the index.html file into a browser, though the files in 'app' have not been optimized. 


## Notes on the Steps Taken to Optimize the Site 

Optimizations in views/js/main.js and style.css

(1) In the updatePositions() function, I created the variable scrollPosition and set it equal to document.body.scrollTop;

previously document.body.scrollTop was in the for loop, triggering layout with every pass through the loop (versus one time now)

(2) I set the attribute 'will-change: transform;' in the .mover class (which styles the pizzas that move around while scrolling).  This forced the pizzas onto separate layers so the entire screen wasn't continually being repainted with scrolling

(3) In main.js, changed all instances of document.querySelector to document.getElementById and getElementsByClassName for improved speed.

(4) Changed for loop syntax in changePizzaSizes so that end value is only calculated once (vs. at every pass through the loop).  Did same in updatePositions function

(5) In function changePizzaSizes, created a variable (var container = document.getElementsByClassName("randomPizzaContainer"))  so that the DOM did not need to be accessed at every pass through the loop 

(6) Moved pizzasDiv variable creation outside of the for loop in changePizzaSizes for greater efficiency.

(7) Moved creation of phase var outside of for loop in updatePositions function

(8) Declared phase and elem and movingPizzas variables outside of for loops

(9) Set backface-visibility to hidden for .mover class 

(10) In function changePizzaSizes, moved var dx and newwidth out of the for loop to avoid calling layout with every pass 

(11) In changePizzaSizes created the var container to avoid multiple DOM calls in the for loop 

(12) In the anonymous function associated with the event listener 

document.addEventListener('DOMContentLoaded', function() {

I added code to calculate number of pizzas to generate based on height of the user's screen. This saved the creation of unecessary pizza elements (was originally set to 200, on my screen only 64 were needed)


## Collaboration

Not sought. 



