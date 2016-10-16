---
layout: post
title: "Spinner for Sinatra"
date: 2016-03-10
category: blog
featured_image: '/assets/spinner default.png'
permalink: /spinner-sinatra/
tech: Ruby, Rails, Sinatra, Mechanize, Nokogiri
---

Let’s talk about [Spinner](https://github.com/authorbeard/spinner-sinatra-assessment), a Sinatra app I created for a Flatiron School Learn-Verified assessment. 

What is it?

Elevator Pitch: Spinner tracks how you interact with the music you love and the music you like—and can tell the difference. 

Current Deliverable: Spinner’s a simple Sinatra app with CRUD features, user authentication, and some very limited integration with Discogs that lets users create, edit and delete albums—and track when they listen to them. 

It’s album-centric and vinyl-focused, for two reasons: 

1. So am I. 
2. It didn’t seem worth my time to build out all the other things I had ideas for—I’m not bringing this to market, after all. The point of the assessments, it was explained to me, is to meet the technical specs, get it working, and move on. I did my CLI gem like that, but it felt like settling. I’d thought this time would be a chance to try out some of the new shit I’ve learned. And of course it was, but I’m still anxious to do something really cool. Crawl before walk situation, though. But not to worry—I’d already come up with a couple things I liked during the brainstorming phase and they’re included. Didn’t add any significant time for me to incorporate those. Refactoring them so they don’t look so crufty would have done, though, so they’re still there. 

<h3><strong>The Process</strong></h3>

I’m not going to belabor this the way I did with my last one. Suffice it to say I spent more time than I probably should have on ideas/planning. I came up with a couple that I liked from the get-go and a few more that I discarded because they sounded too goddamned boring (fuck a CMS, man). 

To be clear, the ill-advised part was the time I spent trying to come up with unique features and chasing down all sorts of other interesting but non-core functions. It’s ill-advised because what I need to do, first and foremost, is come up with working code. There will be opportunities for the creative stuff later. Like, for instance, when I actually can create those things. 

That said, it’s mighty pleasant to think up these ideas, to ask myself, as combatively as possible, “yeah, but why the hell would anybody want THAT” and come up with answers. But a day of that was more than enough. Though, for the record, it wasn't a full day of that. I followed a couple of ideas to the point of sketching out my database relations and some routes before figuring they weren't going to be roth it right now.  

The best prolly won’t ever like the good very much. But I gotta redirect its hostility. 


<h3><strong>Process, pt. II: MyListenPalKeeperKit</strong></h3>

So I decided to commit to Spinner. For one thing, I already had a good enough name for it. In this case, good enough really was good enough. 

But seriously, folks. It seemed like a good balance between applying stuff I’d already learned and creating something I wish existed. It took some effort, but I even avoided spending hours Googling around for ideas on how to incorporate Shazaam’s technology. 

But no bother; what I want is the spin tracker. I want it time-stamped, too. That’s because actually I saw this thing as more akin to MyFitnessPal or RunKeeper than to iTunes or Discogs, despite appearances. 

That's because I'm very happy with my vinyl collection, and music does something important for me, so I'm curious about how I interact with it. I’d even like to gather data on that and set it next to other data I keep and can get and see if anything interesting comes out of it. I know people have studied BPM as it relates to workouts, for example. There's probably more out there. But I want personalized data, because music has such an immediate link with emotions and those affect other things, like sleep patterns, work productivity-probably even spending decisions. And they're very personal. Probably not that unique, but I don't care. 

Anyway things like this have provided, for at least 15 years now, the most meaningful connections I have with technology. 

I obviously haven't gotten to that point yet, but at least now I have a way to track spins in a way that could be indexed to other things (through timestamps). 

One more bit about why I chose this project and focused on it this way: I think iTunes is still set up the way I had it 10 years ago, with a lot of dynamic playlists grouping tracks by my listening habits. There’s the most popular ones, the ones I rated at a certain level but have only listened to a handful of times, ones I haven’t listened to at all (at least, not through iTunes since I imported them) and … I think that covers it. I set it up that way to solve the same problem I have with my eating habits or workout routines, which I also track (now): I can’t be trusted to remember stuff that, if I could remember it, would make my life a lot better. 

To be more specific, I need music like, to quote Horace Greely, Martin need Gina. It’s a nutrient. And I don’t let in a song that doesn’t offer me at least some semblance of that nutritive value. But I do forget things sometimes. This matters to me because there’s a lotta good deep cuts that I still need to hear once in awhile even if they aren’t my go-tos. There are songs I love only because they scratched a certain itch at a very specific time. There are songs I love [but only suit my mood once in awhile](https://www.youtube.com/watch?v=sTaZlwIiEhc). Those aren’t the ones that [I’m always gonna be in the mood to listen to](https://youtu.be/ekSh0lDCAEc?t=1m21s) 

Oh, music. That’s not what this blog post is supposed to be about. 

It’s just what made this project so goddamned much fun. 

<h3><strong>The Process, pt II: Mr. API Goes To the Dustbin</strong></h3>

The next stage involved whittling down all the things I’d like from this app to something befitting my skillset, which, eventually, left me with basically one join table. Which … oof. But oh well. As Elton John once told Paris Hilton, “The attraction of knowledge would be small if one did not have to overcome so much shame on the way.”

And speaking of attraction and shame … eh, I’ll save that for my therapist. 

What I mean, though, is that one of my first thoughts was that I should be able to get the info I needed from Discogs pretty easily. And I was right. I thought about scraping immediately, but then thought, “well, this seems like a good time to learn how to use an API.”

I was wrong about that. I probably wasted too much time thinking about how to structure my data. I say “probably” because, honestly, I still don't know how to judge that. But “almost certainly” is more accurate. In fact, now that I’m shipping the damn thing without any artist- or song-based functionality, I’m sure of it. But then again, I could build out all that stuff pretty easily and the data, I think, would stay pretty neat and tidy even if people started using this. So maybe not. 

I dunno. 

But I knew a couple things: 

1. The database is crucial here
2. It’s kind of a pain in the ass to monkey with after it’s set up
3. I want to use actual, real-life data and have the ability to use all of it at some point

So I spent some time reading the documentation on Discogs’s API.  

And it’s pretty good, as far as I can tell. But I’m missing a few critical pieces of knowledge; the penny’s gonna drop someday fairly soon and I’ll shake my head at this, but for now, it was beyond me. And I figured I’d already spent enough time on planning as it was. So no API for now. 

That left me with two things: 

1. Familiarity with scraping
2. The CSV version of my Discogs collection, which I'd downloaded to use in seeding my database. 

Well, and a third thing: 

3. HOLY SHIT DUDE YOU SPENT TWO DAYS JUST DECIDING HOW TO SEED THE DAMN THING?!?

<h3><strong>The Process, pt III: Time, Well … Spent</strong></h3>

No, I actually didn't. Felt like it, so I kind of freaked out when I realized how much time I’d spent noodling around with that CSV file. Then I calmed down a bit. 

Here’s why: 

First, I hadn’t parsed CSV with Ruby before—at least not when I actually needed to wind up with something usable.

Second, there was tons of useful information in that CSV file already; I could use some of it to help me get or build other useful information I might want in the future. It could mimic the real-life behavior I wanted to track.  

Third, though I was thinking about how to seed my database with good data, this wasn’t just about the seeding. It was about setting up my tables and relations in such a way that building out the MVC would be pretty straightforward. 

I only had to make one extra migration (forgot to add a password_digest column to my Fans [that is, Users] table) and writing the controllers and views only got a little complicated when I was figuring out how to label form inputs and then correctly update and persist my records. 

I won’t go through every step I went through before settling on this structure, but lemme describe some of what I had to spend time thinking through and sketching before I reached a simpler, more workable solution: 

1. Fans could have as many connections as they liked, and each could be either vinyl, digital or streaming (easy enough to add more types later). Spins would be tracked across all of these and used to make suggestions (especially stuff like "Hey, you got records, you stream this thing all the time, wanna buy it on vinyl? Here are some copies for sale!") 
2. Fans have many albums, songs & artists through collections. Each of those three has many fans. Only albums and songs can belong to anybody, but rather than belongs_to relationships, I want has_many so that each album (even each song, eventually) can link up every artist involved.  
—this idea came to me awhile ago, but I was reminded of it recently when [“I’m Coming Out”](https://www.youtube.com/watch?v=zbYcte4ZEgQ) came on at a bar and I realized that, though the drum fills at the beginning of the track comprise one of my favorite bits of recorded music in the known universe, I didn’t know who played them. So I spent the rest of the track and maybe the next couple Googling around and learning all about Tony Thompson [LINK]. I love this kind of shit. I loved [the Muscle Shoals documentary](http://www.imdb.com/title/tt2492916/), [the one on the Wrecking Crew](http://www.wreckingcrewfilm.com/), and every [interview](http://www.vice.com/video/steve-albini) or [technical lecture](https://www.youtube.com/watch?v=FvLuP4Kya8U) Steve Albini ever gave, whether grumpy or [hilarious](http://consequenceofsound.net/2015/09/steve-albini-i-detest-club-culture-as-deeply-as-i-detest-anything-on-earth/")-though really, with him, what's the difference? (and wow, does the author in the last article really have an axe to grind. Then again, it's CoS. That's all they got.) And I know and love a lot of Steve’s music (and [one of my top five favorite albums](https://youtu.be/nz6Tmcs1HaU?t=1m22s) was produced by his bassist and its sound owes a lot to Steve).  
—anyway, point being, I want this app some day to represent all of these connections and make them both visible and accessible, so they’re going to have to be related in the database. 
3. Artists belong to nothing and nobody.  
4. Spins belong to every album regardless of user (and by extension, every artist and song involved there).
5. Spins aren’t always complete album spins. But for simplicity’s sake, I’ll keep the tracking close to how I listen to albums, which means either one side or the whole thing (what about double albums? What about box sets, if I binge on an artist? What about—oh screw it, one spin is one row in the table and there aren’t any partials). 
6. Anyone can see who gets all teh spinz (never wound up writing that bit), but you gotta create an account and log in to actually spin something. 
7. Oh, and there needs to be a library of albums from which you can select to add something to your collection. 
8. Oh yeah, and you gotta be able to add albums to the library. That should be open to anyone—want to pull in as much data as possible. Network Effects, bruh. 
9. .... 

So yeah, this is the kind of stuff that got really pared down, but it took me a minute to sort out which of these things describe the database and which describe the associations. Seriously, when I sat down to start writing the models, I found myself with nearly a dozen of them, each with about six or seven has_many and/or has_many, through statements. 

That’s prolly why I forgot “has_secure_password” in my Fan model and :password_digest in the migration. Oh well. 

<h3><strong>Functionality I: A Joke About the Database, if Databases Weren’t Humor-Proof</strong>/</h3>

I kid, I kid. Nothing’s humor-proof. Just ask [redacted]. 

Hey, wanna know something? The two pieces of code I’m most pleased with here might be the least important, long-term. But they're the ones I'm most interested in. They were originally one piece of code, which was the byproduct of me messing around with the idea, Discogs, the CSV version of my collection and IRB. But I made 'em to do something for me that I couldn't be bothered to do myself, so I like 'em. In fact, I'ma talk a lot about 'em.

The first is from app/db/seeds.rb:

```ruby

  require 'csv'


  @lib=CSV.read("test/authorbeard.csv", {headers: true, header_converters: :symbol})


  binding.pry
    @lib.each {|r|
      album=Album.find_or_create_by(title: r[:title])
      album.artist=Artist.find_or_create_by(name: r[:artist])
      album.rel_date=r[:released].to_i
      album.rel_id=r[:release_id].to_i
      album.search_q="#{r[:artist]} #{r[:release_id]}"
      album.save
    }

```

What’s happening here: 

1. Ruby grabs the CSV file, reads it, converts every entry in the first row into a symbol. I didn't get for awhile that "standard library" doesn't mean I don't gotta declare it. Every day is a new batch of fails.  
2. It then makes a hash out of every subsequent row. Which I get a kick out of “makes a hash of” not just being a much more civil way of saying “fucks up.” Like, for example, “I made a hash of the instruction to ‘write a blog post describing your app and the process of creating it.’”
3. Each cell in subsequent rows becomes a value, with the key being whatever’s in row 1 of that column. 
4. Now I have an array of hashes, each key of which could become useful later, so might wind up with its own column in the migration (hint: this wound up not being the case, but it is why I spent so much time on these seeds; they were magnificently useful in setting up my associations). I’m storing that in an instance variable because, when I was playing around and working all of this out, it was useful to do that, and I copied and pasted and just never got around to changing it. Meh. 
5. So let’s iterate through that shit and populate some other shit. This is pretty self-explanatory: each row in my CSV corresponds to an album in my Discogs collection. So it’ll be a row in the albums table in my database. And that’s gonna be joined to a bunch of other shit, and the app’s going to use Discogs as an authoritative source for the info, so let’s go ahead and populate as much as I can from this right here. 
6. I used “find_or_create_by” just because, while fooling around in tux to test out my tables after I migrated them, I created some albums and it would annoy me to have duplicates. That said, one of the joys/frustrations about record collecting is that albums can have multiple different releases, each sometimes different from the others. For now, though, I’m just going to have one per title. That’s why I don’t use the catalog number for find_or_create right now, but you could—or, more usefully if you’re like me (and god help you if you are), the release_id. In fact, that's one of the first changes I'd make if I refactore or if I used this code to build an import method. 
7. Okay, so the first line of my iteration creates an Album object. Crucial. Fan objects will be created later and associated after that. So let’s set up some Artist and Song objects, yes?
8. As it turns out, no. I mean, for Artists, yes, but Song objects come later. So I'll settle for find_or_create_by, using the artist's name. 
9. But songs are stored, in Discogs, on each individual release’s page. I’m not gonna enter them shits one by one. And there’s no other single, good, authoritative resource for finding each individual release’s tracks and associating them the right way. This matters to me, because albums can have different versions with different tracks. Or it matters to me, because I want this all neat and tidy. 
10. Anyway, let’s cut to the chase: this app is supposed to reflect my album collection and how I interact with it, so I want to get this right. So albums can be created without any songs. And since the CSV table has the specific identifier, beyond the catalog number (that’s something that whichever label handled that particular release came up with to meet their own needs, which aren't necessarily ours). That ties this row directly to a unique entry in Discogs' database, with its own site, I already got something useful for grabbing the tracks later. So I’ll store that release id for now. 
11. Discogs urls, though, follow a kind of wonky pattern that’s not going to be super-simple to build, and here’s where it was useful to spend time with the CSV table I downloaded. One of the first records listed when I opened in Numbers has the title “Intitials B.B.” The pattern for the URL isn’t crazy to recreate, at first: (artist name slug)-(album slug)-/releases/(release id). But that first bit, the slug of the artist name and album title, is gonna be aproblem. For one thing, I have to build it from two separate fields (album.group or album.artist.name & album.title). For another, I gotta capitalize the whole thing, as far as I can tell. A pain, but not at all insurmountable (in fact I messed with regexp and a previous slug-building method I’d made and it was no problem). But that “B.B.”? The periods don’t show up in the actual URL. So how might it handle other punctuation or special characters? And do I really wanna comb through for examples and then figure how to make sure my regexp is selecting special characters if an album, say, has a title like “@$$ Rocket?” No. No I don’t. 
12. Then there's "album.search_q=". This is something easy to build right here and very useful later. That concerns the other part of this early code, and it probably wasn’t much faster/more efficient than all the slug stuff I mentioned above. What I wanted was a way to go to the correct page for a specific release, grab just the song titles (for now), then associate them. And I know how to find exactly that information, but I want to make the program do this for me. I don’t want the user to have to go visit another site, then get than information and enter it in. I mean, they can, but I don’t want them to have to. And I don’t wanna do it either. I want to … I dunno, automate it somehow. Bury it under the hood and forget about it. Make it work for me like an appliance would, or like a special little machine, a robot of sorts, a--
13. OHMYGOD YOU GUYS I WANT TO MECHANIZE IT AND THERE’S A GEM CALLED MECHANIZE! This is what "album.search_q=" is doing: it’s storing something that I’ll give to Mechanize at some point, so it can find and scrape off song titles, then hand them to another method somewhere to associate them. 

<h3><strong>Functionality II: Seriously, Dude, What Does It Do?</strong></h3>

I already told you that. And anyway, thinking through the data and how I wanted to use it made all the rest pretty simple to set up. If there was a breakthrough, it was when I realized: 

1. A fan is just a collection of albums with a name attached. I’m not going to build out the multiple collection types/multiple collections thing, so I can drop that table. 
2. An album is the link between artists and songs. It's really a join table. Especially given all the data Discogs packages with each album, it’s the link to fans. Artists and songs will get their fans through that. You like an album? You’re a fan of that artist and all of the songs therein. 
3. Spins are separate things and a source of useful data. So long as they're linked to both fands and albums, I can get tons of other data through that association. So let’s make that a separate table. It just has to get a user_id, an album id, a time stamp, and Bob's yer uncle. I can write something later that knows what to do with that info. 

Really, there were three main modules, and the difficulty came from getting their associations straight. I settled on this structure for the music side: Artists have_many of everything, all of them through albums. Albums belong to artists and have many songs. Songs don’t belong directly to Artists, then: They’re at the bottom of the totem pole and get everything through albums. Actually, they don’t get much. I didn’t even set up spins for them, but mainly that’s because, by the time I started building everything, I just couldn’t be bothered. I’d already dropped all the features involving this. 

So, okay: I went ahead and used a join table, fan_albums, to mediate between fans and albums. I also let fans and albums join through Spins, though I’m less than totally confident that that’s the best way to do this. My thinking goes like this: fans and albums need to be able to exist independently, and a fan has to be able to have an album without spinning it—or even spin it withough having it. The Spin object should be created and then persisted only when a user spins the albums and not before. That’s kind of the whole point of the spin counter: knowing what you got and what you listen to. 

Why? Read on. 

<h3><strong>Functionality III: The Rest of It</strong></h3>

Well, that was an unnecessary cliffhanger. I wanted to use the spins, eventually, to lead to different types of suggestions. “Hey, you haven’t listened to this in awhile.” “Hey, you love this dude. Have you heard this thing he played on?” “You know, you’ve been streaming the crap outta this album. Maybe you’d to have a copy on glorious vinyl. Here’s some that are for sale.” “Hey, you like this kind of music. So do these people. Know what? They’re also selling some albums you like but don’t have. Say hey!”

That kind of stuff. 

As it happens, by this point, I was ready to just get on with it, and that’s what I did. The rest is pretty much boilerplate Sinatra CRUD app. If you don’t have an account or you’re not logged in, you can do these things: 

1. See everything that’s been added to this database so far and browse through it a little. 
2. See some details on a specific album.
3. Add an album to the library. Free riders welcome!
4. Get an album’s tracks from Discogs. Free riders welcome!

Here’s what you have to be logged in to do: 

1. Build a collection.
2. Edit an album.
3. Spin an album. 
4. Delete an album. 

But that’s not all of it. You also don’t see certain buttons unless you’re logged in. In index.rb, for example, there’s this: 

```erb
  <% unless logged_in %>
    <button type="submit" name="login"><a href="/login">Log me in</a></button>
    <button type="submit" name="login"><a href="/signup">Sign me up!</a></button>

```

For the main layout, there’s just one, at the very end: 

```erb
  <button name="new"><a href="/albums/new">New Album</a></button>
  <button name="all"><a href="/all-albums">All albums</a></button>
  <button name="home"><a href="/home">Take me home</a></button>
  <% if logged_in %>
    <button type="submit" name="logout"><a href="/logout">Log me out</a></button>
  <% end %>

```

For the library page, which has a pretty straightforward route (get ‘/all-albums’), it’ll let you add a record and tell you if you already have it. If, that is, you’re logged in. 

Here’s the code: 

```erb
<td><% if @fan && @fan.albums.include?(a) %>
            <h3>Got it!</he>
    <% else %>
            <button><a href="/albums/<%=a.id%>/add">Add</a></button>
    <% end%></td>

```
Here’s the screenshot:

<img src="{{ site.baseurl }}/assets/spinner library page.jpg">

If yer not logged in and you try to add it, it routes you to the login page. 

Oh, and back on the library page, you'll see a link over on the far right. This changes based on the album's status. 

```erb
      <td><button>
            <% if a.alb_url %>
              <a href="http://www.discogs.com/<%=a.alb_url%>">See on Discogs.com</a>
            <% else %>
              <a href="http://www.discogs.com/search/?q=<%=a.title%>+<%=a.rel_id%>">See on Discogs.com</a>
            <% end %>
          </button></td>

```

Not a big deal, actually, but I like it as a placeholder until each album's alb_url column gets populated. That happens later; I don’t even know what it is because, as mentioned elsewhere, Discogs’s method looks like trouble. I’d rather have Mechanize ferret out & follow it for me. Anyway, the user’ll have an easy enough time from here.  

Going over to albums/show.erb, there are some other things: 

If you’re logged in, you get to see all the spins info, as below: 

```erb
<% if logged_in %>
  <% if @album.spins.empty? %>
    <button><a href="/albums/<%=@album.id%>/spin">Spin it!</a></button>
  <% else %>
    <table layout="fixed" width=50%>
      <tr align="left">
        <th><h4>spin count</h4></th>
        <th>Last Spun: </th>
      </tr>
      <tr>
        <td><%=@album.spins.count%></td>
        <td><%=@album.spins.last.created_at.localtime.strftime("%e %b %Y")%></td>
      </tr>
    </table>
  <%end%>

```

You can also spin it there. I was going to add this to the all-albums page, but I didn’t see much of a point, at least not without some more stuff I don’t know, like javascript. Incidentally, that’s why adding an album from that page reloads the whole damn page, because I don’t know the javascript or whatever I’d use. 

What you can do, though—and this is what I like the most out of all of this, so far—is automatically populate all the album’s tracks. 

<h3><strong>Functionality, Part Last: The Fruit that Ate Itself</strong></h3>

Which brings me back to the first bits of working code I even put together. This was a holdover from the original brainstorming and sketching I did, before I started committing to a data structure and setting up my models and migrations and whatnot. Here it is: 

```ruby
  def get_tracks
  1.      agent=Mechanize.new
  2.      search=agent.get("http://www.discogs.com").form(id: "site_search")
  3.      search.q=self.search_q
  4.      results=agent.submit(search)
  5.      self.alb_url=results.css("div.card a")[0]["href"]
  6.      alb_pg=agent.get(self.alb_url)
  7.      t_names=alb_pg.css("tr.track").css("span.tracklist_track_title").collect{|t| t.text}
  8.      t_names.each {|t| self.songs << Song.find_or_create_by(title: t)}
  9.      self.save 
  end

```

(I added numbers there so I can talk about the lines; it doesn't look like this in the code. There's actually a limit to how dumb I am.)

Originally, I had this in a concerns folder and was going to use ActiveSupport. Mainly because that had just come up in another project and I thought it was cool. Made me feel like a real champ to dig into the documentation and learn for myself how to set that up. Wish I’d seen/noticed something like that before and figured it out. Woulda saved me a couple hours on an earlier project, at the end of the object-oriented Ruby module. 

But anyway, I only really need this here. And I’m pretty sure I don’t need all of it. But I had it already in my notes from fooling around with scraping the page and seeding my database. Turns out all I had to do was stick this code in the right place and call it from the right one. Well, as mentioned, I just had to stick it in the album.rb model, then call it from my controller. Here’s the controller route: 

```ruby
  get '/get-tracks/:id' do
    @album=Album.find(params[:id])
    @album.get_tracks
    redirect "albums/#{@album.id}"
  end

```

The third line there, “@album.get_tracks”, handles the call. 

So here’s how the get_tracks method works, just to prove to my assessors at FIS that I know what I’m talking about. Sort of. Right now. In this case. 

Come to think of it, making my reasoning for choosing this or that pattern mainly just underlines how little I know and undersand. 

But thank god nobody reads blogs. 

Anyway, I like the get_tracks method, regardless of whether I should. Lemme talk about it: 

1. First, I call Mechanize to set up my agent, who’ll do and get things for me. Like an agent. 
2. That local variable, search, is interesting, because of the type of object Mechanize returns. In the documentation, lines 1-4 here are broken up into more steps. If I coulda, I would have chained almost all of this stuff together, but I had some problems with that that didn’t seem worth spending more time figuring out. Anyway, I was able to chain #form and pass in the CSS tag I wanted. 
3. Line 3 is why I put the “search_q” column into my Albums table and built it during my seeding method. This searches for the album title (all albums have to have a title to be created) and release ID into Discogs.com’s search box. The way Mechanize does this is pretty interesting. The object returned in line 2, called “search” here, turns HTML form fields into attributes of a Mechanize object. You can then set those by using the field’s name just like you’d set the value of an attribute on any other object. 
4. Then #submit, handed to your agent, submits that object (including the values you just passed into it). 
5. I’d have chained the scraping to it right here, but I kept getting errors and doing it step-by-step was working, so I went with that. So what I do is get the specific URL for that version of that album by scraping the results of the site search. This is useful. I initially forgot to save album objects here, though, so the handful that I’ve tried that out on don’t have anything in their alb_url fields. I didn’t do this because, down on line 8, I’m creating Song objects, which also, incidentally, saves their association with the album. When I was tweaking the code from my notes, I didn’t think through this. I verified that the songs were being persisted, including their association with the album, and called it a day. Whoops. 
6. Anyway, I need the agent to follow that link, so I do that in line 6 and then scrape after (see above for why this isn’t all chained together)
7. From there, it’s very simple: I scrape the track titles from the page. I had to grab the actual text after I got everything that matched that CSS class to make sure that a) I got an array of strings instead of one long string; b)I only got one of each title. I don’t remember what caused it to work differently, for each point, before. I just remember both kept happening and this fixed it. 
8. Anyway, it wraps up with creating the song objects, which I do while associating them to the album object in question here, which saves them and the association. I added the self.save line while writing this, so it works for some of the albums in the database, but not all. 

And there you have it. The only tough part was structuring the database tables and associations. And that was only tough because I got ambitious and wanted a setup that would be relatively easy to add on to later. Which, I dunno, I might actually wind up doing, once I learn how APIs work. 

Oh, and there’s no styling here, because right now I’m all about the back end. That also complicates decision-making. It's the same thing with code.    

CODE JOKES!

Anyway, video walkthrough below. It'll be below. Now it’s time for Rails. 

[Watch the Video Walkthru](https://youtu.be/Mc-2crfooAM)









