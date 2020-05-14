# CS-546 Final Project

## Group2
### BHOWBHOW Dog Adoption

Our application is a dog adoption website, it will help our users to find the prefect dog for them, and allow the advertisers to post the dog which hoping be adopted by a new owner.

github url: https://github.com/CS546-FINAL-PROJECT/Bhow-Bhow.git
(please enter BHOWBHOW folder to test the whole project)


## Guiding For Run
First, please `git clone` and `cd` into the project directory. 
Then with an `npm install` to get the dependencies straightened out.  
After that, can run our seed to generate the example database.
Once you have that, start it up with an `npm start` and head on over to `localhost:3000`.  Once there, please click around and explore.


## Core Features
our origin core features in project propose did not in a good construction and not resonable enough , so we do some changes to have a new Project construction. Now we have a more reasonable designed application after refactoring. 

### Core Features & using guide
- Main page
There are Five Modules on homepage
  1. A picture&content trundle to show users a brief introduction to our website.
  2. RECOMMENDED FOR YOU, show the dogs we choosed to recommend to our users for adoption, and can click "Read More" or "Continue Reading" to see each detailed dog informations.
  3. ALL DOGS AVAILABLE FOR ADOPTION NEAR YOU: Show all the dogs here(we seed have three dogs for example), and click each enter the dog-detail page to see reach information.
  Also with a gmap by static location
  4. FIND THE RIGHT DOG FOR YOU: click wnter into DOG QUIZ.
  5. OUR TEAM MEMBERS
  6. DO YOU WANT TO JOIN US?: wnter into CONTACT


- FIND A DOG/ DOG BREEDS
 Show 12 kinds of breeds for dogs, and when move the mouse on the picture can see each brief introduction

- FIND A DOG/ DOG QUIZ
 Anyone can take a dog quiz to find the most recommened kind of dog for adoption, after select the option for all questions, the result will show on below (we do four kinds of dog for example).

- (FIND A DOG/ DOG SEARCH) future works
 This module in our origin expection can allow searching by breeds, age, location. 
 The search will show all dogs when just enter into the search page, after input the key words it will enter into the search-result page.

- Dog Detail
 In the homepage we show all of our dogs in "ALL DOGS AVAILABLE FOR ADOPTION NEAR YOU" module, this is add by our seed (three dogs on seed), we can ckick into each to enter into the the related dog details to see all dog information.

- Dog Map
 This module is in the "Dog Detail" page. In address module, we can see the dog address by a real map (using gmap).

- DOG FEEDING GUID/ DOG PROBLEMS
 Show the dog problems we collected to give user a feeding guide. And can click into each "CONTINUE READING" enter into the detailed problme's page to see more.

- DOG FEEDING GUID/ DOG NUTRITION
 Show the dog nutrition releated information we collected to give user a feeding guide.

- ADMIN SYSTEM
 Allow our administrator to login, then enter into the admin system. pLease using following login account to gain access (run seed first)

 email: 124@adf.com"
 password: Adfafw12

 After enter into the ADMIN SYSTEM, there are four tablelists
 1. USER TABLE
    Can get all the users as a list here, allow to delete the user.

 2. ADVERTISER TABLE
    Can get all the advertisers as a list here, allow to delete the advertiser.

 3. DOGS TABLE
    Can get all the dogs as a list here, allow to delete the dog.

 4. (COMMENTS TABLE) future works
    Will get all the user's comments as a list here, allow to delete the comment.

- MY ACCOUNT/ LOGIN/ USER LOGIN
 Allow registered users to login

- MY ACCOUNT/ LOGIN/ ADVERTISER LOGIN
 Allow registered advertisers to login

- MY ACCOUNT/ REGISTER/ USER REGISTER
 Allow to register as user in our application
 
- MY ACCOUNT/ REGISTER/ ADVERTISER REGISTER
 Allow to register as advertiser in our application

- MY ACCOUNT/ USER CENTER
 After a user login, it can gain access to the user center to see the user's personal information.
 (future works: allow users to update their basic information)
 (future works: allow users to add their favourite dogs to their "My Favouritelist", and can do delete to this list)

- MY ACOUNT/ ADVERTISER CENTER
 After a advertiser login, it can gain access to the advertiser center to see the advertiser's personal information.
 (future works: allow advertisers to update their basic information)
 (future works: advetisers can see the dogs that they posted before, and can do operations like view, update, delte.)
 (future works: allow advertisers to add the new dog which hope can be adopted by a new owner)

- CONTACT
 Show basic contact informations for our website
 (future works: Will allow our users and advetisers to send the message, and we can check the messages in admin system.


### Origin core features
- Main page
The main page after login will show a variety of different dogs that are able to be adopted. The user will be able to see all of the different features of the website from this page, and will also be able to pick an animal based on preferences. And in the main page, users can see their recent five views.
- Map
Allows the user to see a map of their location and the nearby places that they can adopt pets at.
- Dog Quiz
Quiz that allows potential pet owners to figure out what the perfect breed for their wants and needs is. 
- View detailed information
Allow users to view the details of the dog, like picture, breed, age and location.
- Dog Search Engine
Allow users to search for the dog by breed, age and location.
- User Center
After the users log in, they can gain access to the User Center Page. This page will include users’ basic personal information and Favorites List.
- Admin System



## Styly reference
http://www.cssmoban.com/cssthemes/9087.shtml#
