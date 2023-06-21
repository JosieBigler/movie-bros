A website to allow a group of views to rate movies they've watched and track a number of metrics. 

Requirements: 

1. We will have a need to persist data.
2. We will need users and Auth.
3. As a personal interest I'd like to use containers.
4. Could we get away with doing this with Google as our Identity Provider?
5. React on the frontend would be a nice little resume flair.


## My thoughts on the general cloud architecture. 

We're going to need at least 4 discreet components. 
1. Frontend. 
  - I think this can be done cheaply with an Azure Storage account. No need for a CDN at this time. 

2. BAckend 
  - It would be cheaper to do this in an Azure Function/AWS Lambda, but I want to see how an Azure Container App ranks up in terms of cost.

3. Data 
  - I'm pretty waffly here in terms of opinion.  Using an Azure Storage table would likely be the cheapest. We're probably only going to need 1 table?

4. Auth
  - I could spin up an Identity Server. Or I can use Google as the Identity Provider. 
  - If I use Google as the IDP That's one less cloud component I have to pay for. I'd need to maintain a table of registered users and relevant information about them.
  - What's the benefit of Identity Server / Duende? I'd get experinece setting up a jwt server and validating against it in the API. Can Duende use an Azure Table for it's User information?
  - Lets plan on Google for now. 

So the plan is set.
Azure Storage account for the "static" website built in React. 
An API backend using Azure Container Apps, because theoretically it can scale to 0 containers.
Lets use Azure Storage Table for our data backend. We'll need like 2 tables?
Google as our IDP.



## Vague milestones 

1. Create a working API that talks to a very simple React website. 
2. Setup CI/CD to deploy both and ensure the same functionality. 
3. Create auth and secure the API behind Google.
4. ??? Build out the API and website with features.


## Website features 

1. A user can add a new movie for the group to rate. 
2. Once the person who added the movie Allows voting other users can vote. 
3. Scores are released to all people at the same time. 




# Random Uh-Oh Thoughts 

So, We might need more than a few tables, if we ever want to Add new users to rate.  Currently our data model assumes only the same 4 users will ever rate on movies.

How do we setup a data model to allow users to vote or not vote on movies? Something like we'd have a RatingEvent. Which has a Movie and a Date. Maybe some other data about the Movie. 

We would then have a Rating table which would be the Id of the RatingEvent, a UserId, and a rating. 