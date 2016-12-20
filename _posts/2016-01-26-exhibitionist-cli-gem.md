---
layout: post
title:  "Exhibitionist CLI Gem"
date:   2016-01-25
category: blog
permalink: /exhibitionist-1/
---

So I'm on the last project of the object-oriented Ruby unit of Learn-Verified, Flatiron School's remote bootcamp. Part of the assignment was to write a blog post about the gem. And since I hadn't started a blog yet to chronicle my studies -- they've been engrossing, like writing is for me, so it's usually a zero-sum game -- so I figured that'd be an easy step to save for the end. 

Cue a coupla days figuring out Jekyll and a handful of drafts, most of which are prolly not gonna see the light of day. Even [in the dark moments]({{ site.baseurl }}/computer-meal), I usually realize that this is all I wanna be doing right now. So writing gets left out. 

##**Screw That, Let's Get Started** 

So it’s good news this time: I’ve successfully written my first Ruby gem. Well … anyway, the guts of it work. And the CLI works. It’s not ready to be shipped yet, I don’t think, and I doubt it’ll wind up on RubyGems. But everything works the way it’s supposed to. Well, the main things that meet the assignment’s specifications work. There’s another feature that I just tweaked this morning that makes some bits run better but now invalidates something else I just got finalized over the weekend. 

I’m very new to writing any kind of code, but already it seems like this is just how it goes. 

Anyway, at this point I'm not even sure what the curriculum developers were expecting when they asked for a blog post about the gem. Probably a walk-through. But I've had a hell of a good time walking through the history of the thing and the functionality's all a bunch of basic stuff and you can check it out on [my github repo](https://github.com/authorbeard/exhibitionist-cli-gem). Or check out the video I'm doing in a minute. It's linked at the bottom of this page. 

###**Prelaunch: Days of Fear**

So the folks at FIS, they’re nice folks, and included a video from Avi, the founder and spirit animal, showing how he'd get himself started on projects like this. Lotta reassuring things there, like this: “I think for any developer, the most intimidating part of coding is just this blank project directory.” 

And hey, that sounds like writing. I'll try not to go overboard on this. But it's on my mind because I recently shelved the only thing I’ve ever wanted to do with my life — write novels — in part so I could focus on learning to code. 

And I chose to start learning to code because I figured it'd touch a lotta the same no-no spots as writing does.  

I bring all this up because that blank page drives a lot of what I love(d) most about writing — despite all the frustration, opportunity cost and failure it’s brought me: It’s the purest and most expansive kind of freedom I’ve ever even sniffed. Nothing on Earth touches it (sorry Ladybeard, but you knew the score when you took the damn ring). 

But it comes from this blank page. So that freedom also ... well, lemme point you at [one of my favorite Simpsons jokes](https://youtu.be/tPc6qaEQ600). 

So, okay, just like Impostor Syndrome, this is something even experienced coders feel. Great! And it turns out it’s not only okay to start at Google — it comes highly recommended. 

And, anyway, I had a good idea for what I wanted to do with my gem. Which, by the way, only had to do a couple things: 

1. Scrape a website  
2. Display it via CLI   
3. Allow a user to dig into the details beyond what’s tossed up on the menu.  

###**False Start!**

“No problem,” I says to myself I says. “I know what I wanna do.”

I watched Avi’s video, read through <a href="http://guides.rubygems.org/make-your-own-gem/"> the step-by-step guide at RubyGems</a>, didn’t understand most of what I read, but then I’m all, “Oh yeah, it’s a step-by-step guide.” 

I figure I’ll get my idea, scratch around rill quick for some CSS selectors, slap together a menu, Bob’s yer uncle. Hell, I went for a walk or two around the neighborhood, typing notes into my phone about steps to take and maybe some other features to toss up there (“ooh, they’ve tagged the artists who have bios. I’ll make those accessible! And hey, what about letting you sort by venues? Oh, and you'll be able to add it to iCal and email the listing to people, or tweet it or ... fuckit, EVERYTHING, YOU'LL BE ABLE TO DO EVERYTHING”).

This might be a good time to stop and tell you my gem was gonna be called Rockness, and it was gonna do all sorts of junk with the shows listed on OhMyRockness.com. 

I tend to do things, as they say, bassackwards. It’s … caused me some problems. 

But no mind! No mind! I had an idea, I was gonna learn the fuck out some shit. Even popped open the page and opened up Chrome’s inspector window and bang: 


<img src="{{ site.baseurl }}/assets/Rockness inspector.png">


Suuuuuper easy. Just write some shit like this: 

```ruby

doc = Nokogiri::HTML(open(“http://www.ohmyrockness.com”)).css(“.row vevent”)

```

Then it’s just a matter of setting up a quick little bit of mass-assignment, a shitload of attr_accessors (I even had them written out), bing bang boom. 

And, as a bonus, I was gonna follow Avi’s lead in the video and just start coding from the executable on down, first hardcoding things then adding functionality that would cascade on through. Thing would, as he says, "just work."" Actually, it would be better to do the executable first, get my dependencies in, then call the menu, but … shit was popping, bruh. I had three or four classes made up and had started populating them with useful methods and has-many-owned-by-one setups. 

Hell, only took me an hour or two, tops, to get something I could call from the command line. Alls I needed was to start testing the initial scrape, make sure I was getting the right-sized nodeset and … well, hang on, maybe I’ll just pop out the first one … hmmm … [several minutes pass] Well, you know what? I’ma hop into IRB and start fooling around with some shit. So I got the URL right, it’s scraping some shit, so I’ll just … GODDAMMIT. 

[repeat for a few hours, sleep fitfully, repeat for a few hours, go get some coffee]. 

Fine fine fine. FINE. I’ll ask for some help. I don’t understand the error I’m getting anyway. Which, shit, I didn’t save. Thought Slack would do that for me. 

Here’s the short version: I searched around for this error I kept getting, over and over, even as I tried out more and more specific CSS, I tried uninstalling and reinstalling gems, messing with brew install, gem pristine, just all kindsa crap. See, I couldn't find exactly the error I was getting on any Google search, in large part because ... well, I get to that. 

Eventually, I stumbled across [this tutorial](http://www.gregreda.com/2015/02/15/web-scraping-finding-the-api/). I’m thinking to myself, “OMR has to have an API that just provides the data for me, right? I’ve never worked with an API, I dunno how to find a site’s API, but I’ll figure it out. I’m here to learn.”

So I started walking through that tutorial and mapping the stuff he said to do on the NBA’s website to OMR. That’s when I came across this monstrosity: 


<img src="{{ site.baseurl }}/assets/Rockness JSON network call.png">


At first glance, it looked like exactly what I needed. Then, slowly but surely, it started dawning on me: that filename has JSON in it. I went over to the “sources” tab and realized the shows I was seeing on the “Elements” tab of inspector weren’t showing up there. But there were things that looked like methods -- or functions or whatever -- what I was seeing in the Inspector. I bet those bastards was what was grabbing the shows. So Nokogiri wasn't grabbing that. Something about when it loaded the page, then the network call, then ... 

Fuck me cross-eyed, I’ma have to learn what JSON is and how to parse it. Or, wait ... no even scraping it is its own special hassle. The site's actually building this list from a database somewheres, but it's not just slapping that into some HTML. So when Nokogiri goes into it ... well, Nokogiri must not be the best tool. I need something that can set off all the network calls and then capture the data as it comes in.  

[lotsa Googling various combinations of “JSON Ruby Nokogiri parse scrape HTML”] ...

I also, for good measure, tried to figure out if this meant as much trouble as it looked like: 

<img src="{{ site.baseurl }}/assets/Rockness header.png">

After all, the tutorial said I needed stuff from the header. That “private” up there ... I don't like the looks of that. Not even a little bit.  

As I started reading up on this and Googling various things, I started coming across articles on ethical scraping and how to avoid being blocked by a site--stuff that hadn't even occurred to me to think about. 

I says to myself I says, “Shit, am I gonna have to hack this sumbitch?”

Then I says to myself I says, “Why don’t I just scrape something else?”

As it happens, the Official Parents are coming to town in a coupla days, so I’d been thinking a lot about museums. The light bulb went off. 

But first, I had to go home and delete this entire Rockness project in disgust. 

Which maybe shoulda given me pause, but I've deleted and/or rewritten about 10 novels' worth of writing to get one completed & published novel and one that's on its fourth draft. 

Kill your darlings. And so on. 

So it took more days than I'd care to admit to reach this point. But at least, when I checked a coupla museum websites and, MoMa aside, they all worked with simple, straightforward scrapes, I knew I had an idea I could make something of. 

Bingo. 

Next up: I finally begin my project. 

###Read more about this project: 
<a href="{{ site.baseurl }}/exhibitionist-2/">Exhibitionist 2: This Time, It's Codable</a>  
<a href="{{ site.baseurl }}/exhibitionist-3">Exhibitionist 3: Where I Found The Devil</a>

###Watch some videos about this project: 
[--Part of the coding process](https://youtu.be/YSzna66G41E)  
[--The final walk-through](https://youtu.be/xLfatZOHAPE)