---
layout: post
title:  "Spinner for Rails"
date:   2016-04-21
category: blog
featured_image: '/assets/spinner library page.jpg'
source: https://github.com/authorbeard/spinner-rails-assessment
tech: Ruby, Rails 4, Devise, OAuth 1.0, ActiveRecord, Mechanize
permalink: /spinner-rails/
---
Trust me, what you needed but did not know you needed is you needed a Rails version of Spinner, the app that lets you see how you interact with your music across genres and services. 

HAHAHAHAHAHAHAHA No it doesn’t. I mean, that was the original idea, and I still wanna fart around until I get to that point, but for the moment, it’s an app that lets you create a record collection and track how you use it. In fact, it only lets you track what you listen to and when you listened last. 

But that’s not the point at the moment. The point at the moment is to do a project incorporating what I’ve learned about Ruby on Rails thus far. And looking back at my last post [link], I guess I’m happy enough with it — 40 days ago, I knew dick all about Rails. Now I got a whole thing. So: 

!["Suckit, Trebek"](https://media.giphy.com/media/TbSPeUWjSY2ys/giphy.gif)

<h2><strong>First Step: Data Structuring</strong></h2>

This is a little misleading, because it seems like data structure just never stops being a step. But since I’d known for awhile that I was gonna port Spinner over to Rails from Sinatra, I didn’t have to spend quite as much time beforehand planning out my tables and how they relate. 

I did reduce the complexity a bit. In the Sinatra version, there’s a table, Spins, that logs which user listened to which album at which time. The idea there was to generate data. Initially, I was thinking of fitness trackers and such — I’d be interested in seeing data on how music fits into my days, my seasons, whatever.

But also, since I’ve always been thinking of Discogs integration here, it’d be a way to drive recommendations, much like their wantlist can be configured to send you a regular digest of listings for those albums, which … man, lemme tell you, it’s hard not to spend (additional) tons of money on records knowing that somewhere out there somebody has albums like … know what? I’m not gonna link there. It doesn’t matter what shit I like. 

Anyway, I’ve been working on staying more on task over the past few weeks. Not that I’m easily distracted; quite the opposite: I find something new, get interested, and want to spend all day burrowing down into it. And there’s just … god, still so much to learn and/or remember. 

What it meant for this app, though, was that I decided to ditch the Spins table, which allowed me to ditch the join table (fan_spins, I think I called it) that connected spins to albums. Instead, I just used another join table, user_albums (had been fan_albums, but I’m already so used to using “user” that I used that for most uses in this use case). 

Remember that Jay-Z song where he apparently had a stroke and just kept saying “cake” over and over again and nobody questioned it? 

Uhhhh … Oh yeah. So this: There’s a join table, user_albums, that adds a column for spins and one more for last_spun, because it’s easy to track that and could be interesting going forward. 

Great! Data’s all set up, now—oh godddammit ….

<h2><strong>Second step: Ahhhhhh, so THAT’S what Devise is doing (pt. 1)</strong></h2> 

So I’ve been using Devise for a minute on account of it was in the curriculum for a number of labs. And man oh man, it’s a humdinger of a thing. I hope that, if I play my cards right, I never gotta write another SessionsController ever again. 

But there’s still a learning curve. I was dealing with a new Rails app, generated from the command line, with boilerplate setup. In the labs, they’ve installed gems and such for us, and I don’t always go check those out to see what’s the haps with those.

One of the things that I hadn’t quite twigged was that the migrations that Devise sets up when you rails g USER need an already-created Users table to work on. Seriously, I missed this somehow. 

Knew that prewritten migrations, for as much tediousity they might save me, would come back to bite my dumb ass one of these days. 

So there’s a top tip: you add Devise to your model, you don’t generate your model as a Devise model. If you look at the migration it generates, it seems like an easy fix. It has this method in it 

[Snippet] (Devise self.up)

Along with a corresponding self.down. Well, no problem, I’ll just add a change method on top of those, have that one create the User table, and there you go. 

Welp, nope. 

Honestly, I still don’t get why I couldn’t combine the two things — creating and then adding Devise — though I never really thought this was best practices. Thought I was boxing clever. But nope. 

Still easy enough to fix: I just skipped the rails g migration and did touch db/migrations/01_create_users or something like that. 

<h2><strong>Step 3: I want to Copy/Paste all night. </strong></h2> 

Actually, I kept thinking I was gonna do tons of copy/paste and just refactor using FormBuilder tags, but it didn’t quite play out that way. I set up my tables like this, I made sure to drop a few modules from Devise, then things got pretty simple for awhile. 

The trick is remembering how many places you gotta make changes, and I’m still getting into the habit of routing from the outside in. I always notice something over here that I wanna mess with, then that leads to something else, then something else, and next thing you know, I got 15 open tabs just in SublimeText, and at least 3 different Chrome windows, each with a handful of tabs open. 

In this case, I did manage to get my routes more or less laid down right from the bat. I had to add things here and there, but I got the order right. Took me awhile to figure out how much the order in config/routes.rb matters, but if yer learning this, like I’m learning this, it’s a good idea to keep an eye on this. Until or unless I’m told to do it differently, from now on, it’s: 

root
devise_for (if I’m using devise)
resources Users 
resources Whatevs

I did set up nested resources for Albums eventually (like with the Sinatra version, I didn’t build out all of the Artist and Song features; the routes, controllers and views exist, but that’s about it for now), and I had to write a couple additional album routes for the one feature my app introduces that neither the Discogs mobile app nor the site include, but that was it. 

So that’s my two cents, as one beginner to another: when tryna debug “no route” errors that you don’t think should be there, pay attention to this. Rake them routes, keep ‘em somewhere (I use a textedit document and copy/paste from terminal, but do you), pay attention. 

One more comment on learning: I keep seeing patterns that explain stuff that seemed nonsensical a couple months before. (“Why would I want a create method and an initialize method, when create is just initialize + save? Why not just save on initialize?” “What fresh hell is this config/routes shit? Now the controllers have methods instead of routes, but they’re called actions?” “How in the name of Mr. Boombastic am I gonna make Ruby read this column title? I gotta write a damn attr_accessor for every entry?”). In this case, setting up my routes file and paying attention to the order there, rather than just thinking, “well, Rails will match it, as long as my files and actions share names the right way,” it matches up with ordering my CRUD Controller actions to make sure that new/create precede the dynamic routes. 

I dunno, maybe this just makes sense to errbody else out the box, but it took me a minute, so get off my back. 

<h2><strong>DataFun</strong></h2> 

Really, this wound up being the most interesting part of the app to me. Also maybe the most frustrating, though implementing Discogs Oauth, I think, took that belt. It certainly swallowed tons of time. 

Here’s the deal: The interesting stuff I could do with this app all comes down to people interacting with their music (and, eventually, each other—by commenting and trading and who knows what else). At present, this yields two useful types of data: 

Albums that have been collected by people 
Albums that have been listened to by people. 

I was immediately thinking of doing all of this: 
Ranking each of the albums, songs and artists by their number of fans. 
Ranking all of them by the number of listens (I call ‘em “spins” because branding). 
Ranking them by popularity, which is some combination of the two. 
Showing you who’s listened to any particular album/song/artist recently. 
Showing you what people have been listening to recently overall. 

As per usual, I didn’t get around to all of this because I realized, after awhile, that my time was better spent meeting all the rest of the requirements for the assessment and moving on. But I’m putting a pin in it. Obviously, I like this project, since I went back to the well. And I’m learning that shit just takes longer than I think it will, at least right now, so I’ma let it simmer. I need to have something I do on my own, outside of my assignments; I don’t have the time or energy now—it all goes into studying—but I will someday. 

But this is how it shook out: I want to have a bunch of model methods that can reach into the database and pull out data for me. Which puts me right back in OO Ruby, where I’m very comfortable, but it adds SQL (in this case SQLite), which makes it trickier. 

I wound up spending several hours in the Rails console trying to get these methods to return nice data that was easy to parse and display in my views. Much of that was spent trying to figure out the magic SQLesque syntax to avoid, say, having 67 database queries in order to return an array of Album objects sorted by the number of fans each album has. 

Which, well … the perils of going it alone here. I never got to that point. 

There’s a couple of reasons why: 

One, I wanted to preserve the usage of “fans,” even if I realized this time that it was ill-advised to buck convention and use Fan instead of User. Convention’s a useful thing. The conventions came from somewhere, and convention has persisted because it has some value, so I shouldn’t be straying from it without a good reason. (Oh, and for the record, I’m speaking strictly within the scope of trying to write a Rails app. My feelings on convention in other contexts are considerably more mixed, but also utterly, totally irrelevant here). And, really, I didn’t have a good enough reason to call ‘em “fans” here. 

I did have a good reason to keep using “fan” in some places, though. A couple reasons, actually: 

It makes good real-life sense to use the kinds of terms people actually do when it comes to music. 
I’ll probably be adding roles to users later on and I’d like to have something in place to build on. (“Collector” is probably not going to be too useful; why would you be using this app if you’re not a collector? But “Admin,” “Buyer,” “Seller” and so on would all come into play. Also people in the database as Artists could also use it to—DJs come to mind, not least b/c Discogs was launched to track/trade electronic music initially; maybe some of their releases are in the database, but they’re also using the database to find records from elsewhere).

That’s enough for now. Anyway, it shows up in the Album model, which is still the real heart of this app. 

[snippet] [album associations]

But this created all sorts of trouble with my model methods. First, just reminding myself that SQL needs to be looking for things like “user_id” and “user.id” and “Users” and so on. 

Second, since fans are tied to individual instances of albums, my Artist class methods for popularity never really got off the ground. Actually, that was a function of how I figured where my time was best spent. 

But I wound up with this: 

[snippet][album model methods]

Which, as you can see, actually calls another model, which is doing this: 

[snippet][UserAlbum methods]

I settled for this. Wish I could flex about it, but nah. I just settled. This is why I spent so much time on these methods: when I see a model class method that reaches through an association, like three tables deep, and returns usable data with one or two queries, it’s just beautiful. I haven’t gotten there yet. I want to go to there. 

One of my problems here was with the nature of the data returned and what I want to do with it: I want to look only at those albums that actually have fans rather than loading every record (less of a deal with 145 album records as now, but Discogs has a couple million, so …). Then I need to count up how many fans each album has. Well, the only place I have that information is the user_albums table, so really all I need to do is count up every row on the table that has a given album’s ID. 

Or wait, no, what I need to do is first pluck all the album_ids from the User_albums table, then count up how many times each of those occurs. 

But wait, I went ahead and reseeded my database a couple times (took me a minute to get everything set up in a usable way) so that I could get some differentiation here. It’s not perfect, but it works:

[snippet][seeds]

So I go ahead and keep my admin account that I used for initial testing, but then FactoryGirl creates 10 new users, then I add 50 of the records created up top from my CSV file to each user’s albums. Great. Except that, when I forgot to select distinct records, my first coupla queries to the User_albums table returned hundreds of records. 

At some point in all of this, I realized that, while I’d been testing my add-album feature (the one that creates a line in the User_albums title to associate a User with a particular Album), I’d added the same record to my dummy admin account like a dozen times. And I’d known I would need some validations, but hadn’t gotten around to it yet. So I went ahead and added that, but the one that’s there now is a stub: 

[snippet][useralbum validation]

It’s a stub because this is supposed to reflect real-life stuff and make it a bit simpler and in real life, you can have multiple copies of the same record. Maybe you picked up a copy that was in so-so shape because it was cheap and you really wanted it right now and didn’t want to go hunting up a pristine copy. Maybe you’ve had it for years but it just got reissued and you want the reissue, too, because [it was remastered; your copy’s worn down; the album artwork is cooler; it includes bonus tracks; you’re an inveterate completionist; you fetishize your vinyl; some combination thereof]. Who knows? Point is, it’s a really common situation that, at present, I don’t provide for. So that’ll need to be fixed before this thing is production-ready. 

But back to the business of counting up album_ids on the User_albums table in a meaningful way. The method I got there now just returns a list of album IDs. If I wanna do anything useful with that info, I’m gonna need to mess with it some more. Probably better to do that in a different method. I might wanna use that array of IDs somewhere else, in a different way, after all. 

So, okay: I can use those IDs to find & assemble album objects. I initially wanted to use the “with_fans” method in the rankings methods somehow, but it seemed to make more sense to deal with the counting and sorting on the model that actually contains that data itself. Sort_by returns an array of key-value pairs and reverse converts this into a nested array that’s actually really easy to deal with in the Album model. 

That’s where we go next: the Album model uses the first number in each nested array, which is an album_id from the user_albums table, to find a record and generate an album object. 

And just like that, I have something that’s easy for my views to start dealing with. 

Things probably aren’t optimal yet—it’s still being called from my view, not my controller—but at least all the logic is in my models. 

I stopped there, since it yielded one of the features I want. I think I’ve laid the groundwork now to be able to go and pluck other information (like the number of spins, the last spun, then something that combines fans, spins and maybe even last spun into some sort of super-index) and do interesting things with it. I’ve forgotten the CSS to display this nicely, as you’ll see (but only if you fork, clone, install and so on, because I’m not super-proud of how it looks right now), but the groundwork is laid down. 

<h2><strong>DataFun, Cont’d.</strong></h2>  

A couple more things on the models. Since I got rid of the Spins table, I realized I wouldn’t have any information on when users interacted with their collections. I figured I need to at least know what’s been spinning recently, so I added a column for that on the UserAlbums table. Then I needed a way to populate and update that, which is what the before_update callback is doing here: 

[snippet][user-albums before_update]

This one also was tricky, because incrementing a column on a SQL database is apparently imp—oh hang on, there’s an “increment” method? Goddamn right, let’s use that. 

Since that was new to me, I needed to see it working for a minute before I figured out that I should be using “before_update.”

And while I’m at it, it should be Users who spin albums, not Albums or UserAlbums spinning themselves. So I did this over on the User model: 

[snippet][User spin_it]

I called it “spin_it” for readability: that’s what the user’s going to see, that’s what’s going to be going on behind the scenes. 

I had to chain “.save” on the end of it, though, even though running “increment” seemed, in the console, to be updating the UserAlbum record. 

This, like everything with these model methods, is probably one of those things that I just need a lot more experience to get used to. I’m annoyed that I’m not as fluent in it as I’d like, but honestly, I think it’s just a matter of getting more familiar. I’m doing tons and tons of reps when I come up with these methods, so that’s helping. And I dunno whether that’s the absolute optimal use of my time, but it’s making the workings of the database a little clearer to me and making the documentation easier to read. Being able to find and extract the information I need is valuable, too, as much as I’d like to already have it in my head. 

Some day, grasshopper. 

<h2><strong>OAuth, Where Art Thou?</strong></h2> 

This was more or less the last thing I really wrestled with, so I’ll wrap up here. 

The short version is this: I couldn’t get Discogs’s Oauth strategy to work with Devise. I just dunno how it’s done. 

I spent a lot of time reading [link][this Discogs wrapper code] and [link][this implementation] and, once we covered Oauth in the curriculum, I thought I could make it work. But I just couldn’t. 

The first problem I had was that that wrapper, which is the one Discogs lists on its API page, isn’t the same thing as a gem with an Oauth strategy. There is an ‘omniauth-discogs’ gem, but I couldn’t get that to work properly with Devise, either by itself (the same way, say, I’d use the ‘omniauth-facebook’ gem) or in conjunction with the wrapper. 

I knew going into it that trying to shoehorn this wrapper into the Devise Oauth shuffle was probably not going to work, since the wrapper’s entire thing is that it does the Oauth stuff. You generate an object which is an instance of the Discogs::Wrapper gem, and ask that thing for all the stuff you want from Discogs. Then that thing goes and authenticates and authorizes and finds the stuff and returns it back to you in the form of a Hashie object. Which I don’t know what that is, but as far as I can tell, it’s something I can figure out how to work with very easily. 

As far as I can tell right now, this is because Discogs doesn’t provide for authentication as a separate service like FB, Google, or [link][any of these services with their own oauth strategies]. It seems like Oauth through Discogs only really exists so that you can access the data. Which makes total sense, but complicated things here. 

To reiterate, though: I’m just kind of stabbing at it. I don’t know if any of the above is true. I think it’s much more likely that I don’t understand any of this stuff well enough yet to rig up the Discogs Oauth to play nice with my Devise implementation. 

And it kind of raises another question that’s been hanging around me forever: Why would I want to duplicate the Discogs database, but only on a much, much smaller scale? 

I don’t have a good answer for you. I know I’m doing this as an exercise, and I have to have a database to use, so I need to understand how that’s set up, and it was easier to set this up now rather than wait until I understood how to interact with the API, which I’m still waiting on. 

I do have an answer, even if I don’t know if it’s good: Spinner generates data that Discogs doesn’t have. I don’t think there’s a place on their database to put this info, so I’d need to make a provision for it here. 

Fortunately, these are things I’d only have to answer if I was taking this into production or trying to get investors or something. Which … not yet. 

Final note: I think I could work around this using scoping or namespacing somehow, so that if someone wants to use their Discogs credentials, they go through routes that don’t touch Devise until they’ve finished authenticating through Discogs, then generate a Devise-friendly entry on the User table. So I’d need at least one other controller for that, maybe a few other ones. 

Which i’m not entirely sure what I mean by the above paragraph, but I can see a way it could work. 

As it stands, I threw in the towel, used the standard Facebook Oauth implementation, and Bob’s yer uncle. 

So there you have it. Standard video walk-thru will be down below. 


<h2><a href="https://youtu.be/rGOfb_ajrrM">Video Walkthrough</a></h2>
