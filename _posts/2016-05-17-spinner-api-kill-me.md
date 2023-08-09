---
layout: post
title: "Spinner + JS + API = Kill Me"
date: 2016-05-17
category: blog
featured_image: '/assets/spinner default.png'
# permalink: /spinner-killme/
tech: Ruby, Rails, Angular, Angular-Devise, OAuth, Paperclip, SQL, JSON, REST API
project: spinner
---

Well, that's an exaggeration, but man oh man ... I did not enjoy trying to assimilate JavaScript after spending so much time on Ruby. Every time I've had to look into something else, in fact -- all the way back to the CSS and Regexp sections, back when I started at Flatiron School--it's been a relief to get back to RoR. Even if most of my time was spent writing and handling AJAX requests, JQ listeners, JS rendering, and forgetting, again and again and again, what that A stands for in AJAX.  

## Useful Links
+ [See Spinner on Github](https://github.com/authorbeard/spinner-rails-assessment)
+ [Watch me try to figure out some shit that's not working.](https://www.youtube.com/watch?v=eeq39gKBfFE)
+ [Watch the walkthru](https://youtu.be/VnySsh4vFOw)

The big news, from my perspective: I finally figured out how to incorporate the Discogs API. I only use one endpoint at present, but it's the part I like the most. It's the part I still, despite a great deal of fatigue at present, want to build on and play around with.

I'm inclined, at this point in every assessment, to do postgame analysis, but I'll try to push that down to the bottom this time around. I will note, though, that shortly before the time to prepare an assessment rolled around again, some things suddenly started to snap into place. My grasp on the point of a JS object is still a little tenuous, but it's improving.

I'll get into more of this later--after all, one of the main requirements this time around was to come up with a JSON Model Object. We also needed to build API endpoints and render pages without refresh and ... well, I'll get into that.

But what clicked for me, like it did when digging deep into ActiveRecord class methods [for the last iteration of Spinner](http://authorbeard.github.io/spinner-rails/), was that patterns repeat for good reason. With SQL & ActiveRecord, I've had to return to this again and again--column names functioning as attr_accessors, tables acting like classes, things like that.

Probably the biggest of these moments came during the Rails unit. Not as soon into it as I'd like, in fact, but it always takes me a minute to orient myself. It helps to see lots and lots of variations; eventually, if I pay attention, I can internalize the sense of how changes here affect performance there. This is more or less how I wound up getting a good grasp on return value, which drove me batshit for the first few weeks in the program. Now I both debug more effectively and need to do so far less frequently.

But anyway, the click happened when, rather than just remembering what CRUD meant and that it mapped to 7 RESTful routes, I started to get why. Suddenly, having a Controller#new and Controller#create happened to push to the top of my brain at the same time as SQL .new and .create were hanging out there and I remembered writing a ton of Ruby #initialize and #create methods and finally, after three months of thinking it was stupid to do that on a Ruby class, it all clicked into place.

I linger on it now because it got me out of trouble during the later stages of this project, when I realized I didn't actually have much of any implementation of the requirements. And the big one staring me in the face was the matter of getting JSON strings all the way from the Discogs API into my own database in an orderly manner.

What bailed me out was a decision, I dunno how long ago, to structure my Albums table to reflect how the CSV version of my personal Discogs collection--which is what I seeded the database with--was structured.

Part of me thinks I should be embarrassed that I just now realized that was also how they were gonna structure the JSON responses to API requests. But I had other things to focus on back then, aside from all of this other stuff that I was about to start learning soon.

Anyway, I'm meandering. Probably way too happy about what's still not even a half-built knockoff of Discogs itself. But lemme have this one, buddy.

And I think I should just focus on actually describing the damned thing. When I was a writer, I never wanted to write a book about writing books. Now that I'm tryna become a developer, why'm I tryna blog about *writing* an app, instead of about the goddamned app?

## Specs and Implementation

#### The spec: Must render one show page and one index page via jQuery and an Active Model Serialization JSON Backend.

I kept going back to this one again and again. Because of the complex dance of ambition, ability, resources and use-cases (imagine a barn dance for a community of amputee hippos and epileptic heifers), my main show page is actually an index page.

See, at present, a User is mostly just a named subset of the entire Albums table. And I can't imagine wanting to have to go through several layers of other crap before you interact with your collection--that's the entire point of this app, to track and enable interactions with music. Besides, were this to go into production, I wouldn't have to imagine that--it would come up or it wouldn't, and now I'd know how to make changes.

Anyway, at present, there's only one collection concept being used: the old-fashioned kind, where you have some physical objects sitting around.

So when you first go to the app, you see a mini-index:
<img class="alignnone size-full wp-image-123" src="https://hamwater.files.wordpress.com/2016/05/spinner-homepageno-login-small.png" alt="Spinner homepage(no login) small.png" width="1342" height="344" />

This is a random sampling of the albums currently in the database. Any attempt to interact with this sends you to a login page, whence, if you're successful, you're redirected to something like this:

<img class="alignnone size-full wp-image-126" src="https://hamwater.files.wordpress.com/2016/05/spinner-user-show-html.png" alt="Spinner user show (HTML)" width="358" height="1028" />

I had to shrink that down on account of I haven't gotten around to styling these properly. But already, there are several options for inserting JQuery and ActiveModelSerialization.

I mean, there are buttons all over the place here. I did those first. But I'ma talk about them later.

Anyway, it probably woulda made more sense to render an individual album show page first. What I was thinking was that, if I'm gonna write some JQuery to render an individual album, I'm gonna want to be able to call that bit of code on arrays of albums at some point, so why not just knock 'em both out first? [note: I realized after finishing this that I hadn't gone and refactored this so that I *could* re-use the album display builder. So some the code snippets now live in more logical places and make more sense.]

So here's how I implemented that.

First, you click a link up on the navbar I copied and ~~mangled~~ customized:

<img class="alignnone size-full wp-image-142" src="https://hamwater.files.wordpress.com/2016/05/spinner-user-show-link1.png" alt="Spinner user show link.png" width="920" height="108" />

I have a listener attached to that link:

```javascript
$(&"a.user-show").click(getUserAlbums)
```

That calls this function:

```javascript
function getUserAlbums(obj){
  event.preventDefault()
  var target = obj["currentTarget"]
  var path = target["pathname"]
  $.get(path + ".json", buildUserShow)
}
```

Now the second line there is something I picked up along the way. I could always just hardcode the AJAX Get route, but the html there is generated by the ActionView link_to tag. I'd like to just rely on ActionView to get it right, then generate the link as I go. Sure, there's a good chance that I'll wind up making changes there at some point, then that will start breaking things further on. But at least now the debugging will be easier.

Incidentally, this is how the navbar builds that link:

```ruby
  if current_user 
    <%= link_to 'Take me to my albums', user_path(current_user), {class: 'user-show', 'data-uid': '#{current_user.id}'}%>
  <% end %>
```

Incidentally, this allows me to use Devise's current_user function. Just saw a StackOverflow question that referred to it as "infamous," which is surprising to me. I got tons of stuff that that makes a lot easier--and I don't have to think so much about security this way--so I like it. In fact it shows up all over my navbar, which we'll get to later.

Hokay, so my gut tells me that appending ".json" to the path shouldn't be totally necessary and is probably bush-league newbie code, but it works. I think what I'd probably do as an alternative is to define an API endpoint and just point to that. But what I'd rather keep on doing here is using the same show action from the Users controller. I've already had to add a bunch of other actions and routes, and this lets me make sure I'm dealing with the same kinds of objects in the right kinds of ways in the same place.

Which this is how that looks:

```ruby
def show
  respond_to do |format|
    format.html { render :show, :locals=>{user_albums: current_user.albums}}
    format.json { render json: current_user }
  end
end
```

So hang on now; I'm rendering a user, not albums? Why yes I am. This is where my ActiveModelSerializers came in. And lemme tell you, my stack level went deep. So deep, it put my server to sleep.

Here's the problem I had: I want to get a User's Albums, true, but only part of the information I want is contained on the UserAlbums table.

What's more, I also want each album's artist name, and that's kept on still another table.

Now I don't understand exactly why I can't simply  have my UserAlbums serializer pluck the spin count & last spun and then call on the album it joins for each row and have *that* return an id, a title, and then look into its own artist table and then .....

Hmmmm, maybe that does make sense, now that I look at it. I kind of think a computer should be able to work out all of these associations much more cleanly than a (sleep-deprived) human, but that's beside the point. Now that I think about it a little more, maybe I needed to name my UserAlbumSerializer something different. But then I wouldn't get ...

Know what? Screw it. I finally realized, waaaay later in this than I'd like, that since ActiveModel serializers don't have to have a 1:1 relationship to models, I can do something like this:

```ruby
class UserSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :user_albums
  has_many :albums
end
```

See, I was thinking I had to obey the has_many :through relationship and write my serializer that way. But nope. I think that what's going on here is that, since I declared the has_many relationship on my model, I can access it here in a way analogous to how I would anywhere else--that is, I don't have to keep repeating that :through part. I'd Google this to find out for sure, but I'm kind of sick of this project right now and I still gotta record a video walk-thru. For the record, I *am* gonna keep operating under this assumption until I figure out how to do this better (I came across a GitHub issue discussion involving just the issue I was having and they mentioned some other gems that, I correctly guessed, I wouldn't have time to go about learning about right now).

I still had to keep my stack level in check, so my UserAlbums serializer just returns the info I want: the number of spins and the last time the album was spun.

Then I keep things pretty simple with my AlbumSerializer:

```ruby
class AlbumSerializer < ActiveModel::Serializer
  attributes :id, :title
  has_one :artist, serializer: ArtistAlbumSerializer, only: [:id, :name]
  has_many :songs, serializer: AlbumSongSerializer, only: [:id, :title]
end
```

That ArtistAlbumSerializer crap? An artifact of me thinking, "Hey, I'ma need all these serializers named and related in just this way andOMGLETSJUSTRAILSGALLOFTHEMRIGHTNOWYEEEAAAAHHHH!!!"

Another thing I do from time to time. At one point, I'm not kidding you, this app was gonna have like 8 controllers. I did rails g for all of them sumbitches before I'd written a single goddamned view.

Anyway, this worked really well at first, when I was just serializing things from my own database, which I can keep control of.

Problem is, by this point, I've already integrated a Discogs search feature that lets you select which of the results to import, and successfully persists that. But the first couple of times I did all of that successfully, I didn't go back and delete the records before I moved on to handling Artist creation and association. So I got some records in the database that are breaking my JQuery view rendering.

I'ma fix that right here in a second. But here's the code that handles the JSON returned by the Users controller:

```javascript
function buildUserShow(arr){
  var albums = arr.user.albums
  var spinInfo = arr.user.user_albums
  var page = $('div.page-content').html("
<h1>PLAY SOME DAMN RECORDS</h1>
")
  if (arr.user.name !== undefined){
    var greeting = page.text()
    greeting += ', ' + arr.user.name
    page.html("
<h1>" + greeting + "</h1>
")
  }

  var content = ''
  var url = 'http://localhost:3000/'
  $.each(albums, function(i, alb){
    content += "<h1><a href='" + url + "albums/" + alb.id + "'"+ alb.title + "</a></h1>"
    content += "<img src='<%= asset_path("Album_half.jpg") %>' />"
    content += "
<h2>by " + alb.artist['name'] + '</h2>'
    content += '<h3><a href='' + url + 'albums/' + alb.id + '/import_songs'>Get this album's tracks</h3>'
    content += albumSpinDisplay(spinInfo[i])
  })
page.append(content)

}
```

Whew, that's ugly as hell. It's still a pain~~ful~~staking process just getting this shit to work, so I haven't refactored this. Seriously, I had to reload and rerun this thing about 1500 times for every damn line of code.

But that's boring shit. What I decided to just go ahead and do was recreate the entire page you see on the HTML load, if you navigate directly. Let's not bother with why. The only change is that it appends a user's username, if they have one, to the greeting/command at the top of the page.

Because of all the serialization headaches I detailed above, I don't have all of the data for each album nested together. So that's not right. But what I *do *have is two sets of data indexed in exactly the same way. [NOTE: Now I'm not sure this is true; It worked well enough at some point that I moved on, but I'll need to revisit this]. I can grab the index from one, plug it into the other, and get the relevant spin info.

So much for the first two variables set up there. The rest is really straightforward. Most of the data is in the albums array, so I mostly call on attribute methods there and wrap it in the HTML I need. We'd already covered how to incorporate erb into these files in the curriculum. But my brain maintains several entertainment districts into which it lures very useful bits of knowledge, hoping at least to send them to bed so late that they stagger into work at unpredictable times. It does this, my brain, because its entire raison d'etre is to inflict upon me unpleasantness, of whatever variety and intensity, whenever it possibly can.

Anyway, I mentioned that the artist.name bit is now not working properly. I have two choices here:

+ delete the offending records and hope that the others created as I was testing the rest of my search/import feature now populate correctly, so they won't break this.
+ Stick in an if/then right here so the damn thing keeps working.

Obviously, I'm going to do #2. Eventually, what I'd do is use helpers all over the place here and let them do that, plus some more ActiveRecord filters, user redirects and whatnot to keep my database tidy. There's an albums helper that's largely composed of if/else statements used to display the ugly-ass table that you get when you click on "show me everything." It looks just like the homepage I pasted in earlier, but it loads even more slowly and just goes on and on.

But the shit works.

[***begrudgingly writes some more javascript**]*

Okay, here it is:

```javascript

if (alb.artist !== null){
  content += '
&amp;lt;h2&amp;gt;by ' + alb.artist['name'] + '&amp;lt;/h2&amp;gt;
'
  }else{
    content += '
    &amp;lt;h2&amp;gt;&amp;lt;a href='/albums/' + alb.id + '/edit'&amp;gt;Add an Artist&amp;lt;/a&amp;gt;&amp;lt;/h2&amp;gt;
    '
}

```

I normally woulda used "undefined" in that if statement, but at present, I guess it's coming from my database as "null."

And what I really need to do is one or some combination of these.

1. Add an ActiveRecord validation to my Album model.
2. Set a default value that'll be readable here.
3. Prompt the user to add an artist at some point, since adding an album without an artist is gonna mess up *my* database.

But I really don't think that's gonna be a big issue at this point. There's only one place you can create an album without setting an artist, and what I have here now successfully redirects to the albums edit page, so Bob's yer uncle.
#### The specs:
#### Must use your Rails api to create a resource and render the response without a page refresh.
#### The rails API must reveal at least one :has-many relationship in the JSON that is then rendered to the page.
#### Must have at least one link that loads, or updates a resource without reloading the page.
I don't mind telling you, from where I'm sitting, it looks like I'd already done much of this with the stuff I spoke of before, but I wasn't quite comfy with it. The first one might be a bit of a problem. I deal with it later. First lemme discuss the first coupla things I got working here. I have a function to attach all my listeners. I sampled it before, but here's the whole thing:

```javascript

$(document).on('page:update', function(){
// debugger;
  attachListeners()
})
function attachListeners(){
  $('button.spin-it').click(albumSpinner)
  $('a.user-show').click(getUserAlbums)
  $('#discogs-search').submit(searchDiscogs)
  $('button#import-album').click(importAlbum)
}

```

Ok, so coupla things: I tried using $(document).ready initially, but then I had a problem: My event listeners went inactive whenever I called on any one of them. So some Googling around and I found out that's a pretty easy problem to fix. "page:update" is a thing. In fact, it's just the thing.

Next thing: albumSpinner. From the very beginning, I've known I'd need to use JavaScript somehow to do this. It needs to increment the column in the database, then return the new value along with the timestamp created during that update. Last time around, I'd discovered the ActiveRecord "increment" function, so that's no problem. All I really had to do was point my listener at that route.

Oh, and it has to work the same way regardless of what page you're on. This part still isn't up to par--from the library page ("show me everything"), it does correctly hit the endpoint and successfully update the database. But once I dug into the business of constructing the user#show page (and updating just the spin stuff, even after rendering with JSON instead of HTML), I lost some of that stuff and haven't put it back yet.

I'ma have to go ahead and ask you to be ok with that fact for now.

Anyway, here's the code that's called when you click the "spin it!" button:

```javascript

function albumSpinner(data){

  var id = parseInt($(this).attr('data'))
  var selector = 'div[data-albid='' + id + '']'

  $.post('/albums/' + id + '/spin', function(data){
    var spinOpts = albumSpinDisplay(data)
    $(selector).html(spinOpts)
 })
}

function albumSpinDisplay(data){

  if (data.user_album !== undefined){
   var album = data.user_album
   }else{
     var album = data
 }

 var id = album.album_id
 var spinOptions = ''
 spinOptions += '&amp;lt;h2&amp;gt;Spin count: ' + album.spins + '&amp;lt;/h2&amp;gt;'
 spinOptions += '&amp;lt;h3&amp;gt;Last Spun: ' + Date().split(' ').slice(0,4).join(' ') + '&amp;lt;/h3&amp;gt;'
 spinOptions += '&amp;lt;button class='spin-it' id='album-' + id + '' data='' + id + ''&amp;gt;Spin it!&amp;lt;/button&amp;gt;'
 return spinOptions

}

```

No matter where you call this, it correctly hits an endpoint on the AlbumsController:

```ruby

 def spin
   current_user.spin_it(@album)
   @album=UserAlbum.where(user_id: current_user.id).find_by(album_id: (@album.id))
   render json: @album
 end

```

Pretty simple stuff, though @album needs a little explanation: I have a before_action filter on the controller that handles the business of instantiating an album. Whenever the button gets clicked, it grabs the id from a data attribute I set on each album div upon generation of the HTML.

I also store that div in the selector variable for later.

Okay, so then I have that one little bit that figures out where the data came from. To be honest with you, I forgot about that part. That's there because, if you look up in the controller action, I'm actually not doing anything to albums themselves. They dunno how many spins they got. Well, they do--I wrote a method for that--but I they shouldn't be handling that here. In fact, users spin albums (first line of the action), but all I really need is a number and a datetime. That's on the UserAlbums table. So ActiveModel serializes this based on the underlying model name. Albums don't know shit, but my JQuery needs to know how to dig down and grab that info. Hence calling either data.user_album or data.album as the case may be.

I can't remember now if I ever do use that album check. It's entirely possible that I did that early on, when I had to, to get things working properly, then I built out the rest of the stuff, got enough of it right that I don't need this check, and so on.

Anyway, the problem here is that all of this is written based on the HTML version of the page. But now that the link to a user's collection always renders JSON, it's not that useful. That's because, when I was building the Users #show business, I forgot to add the div and stash the id there. I've since fixed that. Trust me on this. Or don't. app/assets/javascripts/users.js has it, if you wanna check the repo (link's up top).
#### The spec: Must translate the JSON responses into Javascript Model Objects. The Model Objects must have at least one method on the prototype. Formatters work really well for this.
This relates to the spec mentioned above, about loading or updating a resource without reloading the page.

Now, I had all kinds of trouble with my albums form initially. I wanted one form for both creating and editing albums, and I wanted to nest in artist and song attributes, so you could just build up an album and either select an existing artist & song, type in new ones, or do some mixture. Long story short, I spent a half-day doing dumb shit because I'd built the form at some point and hadn't kept updating it as I made it into a partial and made render calls in my views and so on.

But I also forgot that when you're setting up collection_check_box, the symbol at the front of the line needs to be a method you can call on the original object or else it's all gonna go to shit.

Oh, and I also had some old instance variables littered about that got in the way of Rails doing its business of figuring out what yer doing with the form.

In short: forms can eat ... eh, forget it.

I started this phase by cleaning up some stuff, deleting tons of CSS files, slapping on the default Bootstrap navbar, then hassling with this form business. And, in fact, I prolly shoulda skipped the nesting in that form, since that had caused one of the problems, but I wanted to know *why* it wasn't working. Or, more accurately, I wanted to know the exact shape of my dumbassery.

The stubbornness didn't stop there. Or, depending how you wanna spin it, I decided I was sick of not figuring out this Discogs stuff and wanted to try my recently-established chops with Faraday. I'd managed to structure one request successfully using Faraday & Postman. It's how I've been blowing off steam as the JavaScript lessons make me hate JavaScript more and more, by farting around with this app.

At the end of that process, with almost everything else working just fine, and with some detours into building a new show page (this one's at users/collection.html.erb and the navbar now appends dynamically because I am the King of All Computers), I realized I hadn't come up with a single JSON Model Object, let alone anything for it to do.

I punished myself by writing two, one of which builds the other (and eventually a few more). I'd figured I'd handle most of everything else, then this would build album cards that could be displayed in some kind of interesting tiled fashion--or, at least, in something better than the list of shit I got up there now.

Problem was, I was exhausted and sick of this.

Turns out, though, that since I had the database set up ok, Writing the object business was pretty straightforward. After all, Discogs tells you how the info's coming back, I knew how I wanted to persist it, I just had to call the right route and then slap some HTML on the relevant bits of the response.

It was gonna be easy.

And it actually was. Time-consuming and a bit irritating, yes, but actually not that hard.

End of sto--OH SCREW YOU GUYSE LOOK AT ALL MY DISCOGS SHIT:

Problem is, I'm using Devise here, and incorporating OAuth via the omniauth gem. Had to do that last time around. Struggled with Discogs for quite awhile, read [this wrapper](https://github.com/buntine/discogs) a couple times over, read [source code,](https://rubygems.org/gems/omniauth-discogs/versions/0.0.2) got all kinds of errors. Read [this stuff](https://www.discogs.com/developers/#page:authentication) over and over.

I started thinking, last time around, that I needed to hive off the Discogs stuff into its own section of the app. I decided to just do that this time, since I wanted to incorporate at least one API endpoint. To do that, I'd have to let the user authorize my app. So I stuck all of this stuff into my Discogs controller. Which looks like this:

```ruby

class DiscogsController < ApplicationController

 def start_req
 discogs=DiscogsService.new
 auth_hash=discogs.get_req_token
 token=discogs.auth_hash['oauth_token']

redirect_to('https://discogs.com/oauth/authorize?oauth_token=#{token}')
 end

def callback

  auth_string = response.request.env['REQUEST_URI']

 discogs=DiscogsService.new
 discogs.exchange_token(auth_string)
 current_user.discogs=discogs.user_hash ###&amp;lt;--makes each attr accessible as .whatever
 current_user.save!
 redirect_to user_path(current_user)

end

def search
 discogs=DiscogsService.new
 results=discogs.search(params['discogs_search'], current_user.oauth_token, current_user.oauth_token_secret)
 render json: results
 end

end

```

The next problem I had, aside from not knowing how to get the Discogs wrapper I linked to above working, was that Discogs uses OAuth 1.0 authentication. That involves a lotta steps and a lotta info about how to structure the queries that's either missing altogether or very hard to find. I still don't know if it's because I'm just so inexperienced with OAuth that I gotta have it all spelled out or not. For example, I couldn't remember how to generate a nonce and it took me a minute to realize that, on [APIdock pages that don't actually include code examples](http://apidock.com/rails/ActionController/HttpAuthentication/Digest/nonce), I can actually look up top to see which module/gem is being called and figure it out from there.

I also didn't realize that the reason you get a token *and* a secret at several steps along the way is that you have to append *that* secret to *your* secret as the signature string. I'm almost certain we *did* cover this in our OAuth lessons, but it takes me a few reads and a lotta reps to get comfortable with things. First pass, I'm tryna lay down a conceptual understanding--and if, as usually happens, there's a gem that handles all that stuff for you, I latch on to that and figure I can at least get something working.

Dunno why I feel like I gotta apologize to you. I'm actually enjoying the hell out of this. But even if each step brings me closer to the [(apparently fictional)](https://www.google.com/search?q=developer+imposter+syndrome&rlz=1C5CHFA_enUS681US681&oq=developer+imposter&aqs=chrome.0.0j69i57j0l2.3695j0j7&sourceid=chrome&ie=UTF-8) threshold of mastery, it's never far enough.

But goddamn if I'm not enjoying this.

Anyway, screw that. This is way too long already. Here's what I did: I created a new model, DiscogsService, that handles all of my Discogs interaction for me. So you can click a link to authorize with Discogs, then the service handles everything for you.

This is where I learned about ActiveRecord's Store function:

```ruby

store :discogs, accessors: [:oauth_token, :oauth_token_secret], coder: JSON

```

That was at the end of the nightmare of figuring out how to word my Discogs authorization Faraday calls just right. But it was a simple matter of adding one more column to my Users table:

```ruby

class AddDiscogsToUser &lt; ActiveRecord::Migration
  def change
    add_column :users, :discogs, :text
  end
end

```

And then, at the end of the OAuth dance, storing that with the user. You can't sign up or log in to Spinner with your Discogs credentials, unfortunately, but that's mostly because I was too worn out to figure out how to duct tape this to Devise.

But once you do this, it's stored on your account and used to sign API calls to Discogs.

Now that I have a controller for all of this, I can set up JQuery Ajax requests that hit this controller and send the data it needs and handle the data it returns.

For example, now there's a working Search box (the site search that shows up in the navbar is ornamental right now because meh.)

It looks like this: <img class="alignnone size-full wp-image-323" src="https://hamwater.files.wordpress.com/2016/05/spinner-discogs-nav.png" alt="Spinner discogs nav.png" width="2154" height="378" />

That's the navbar that gets appended to the default navbar if (and only if) you're on the users/:id/collection page. So that, incidentally, is how I learned that current_request is a thing and a little bit about how to pass the parameters in correctly.

Those check boxes, they send in additional params that, in the DiscogsService object, structure the Faraday call:

```ruby

def search(search_params, token, secret)

url = @discogs_info[:main_url] + 'database/search'

query=Faraday.get(url) do |req|
  req.params=search_params
  req.params['page'] = 1
  req.params['per_page']=5
  req['Authorization']='OAuth oauth_consumer_key=#{@discogs_info[:d_key]}',
    'oauth_token=#{token}',
    'oauth_signature=#{@discogs_info[:d_secret]}&amp;#{secret}',
    'oauth_signature_method=PLAINTEXT',
    'oauth_timestamp=#{Time.now.to_i.to_s}',
    'oauth_nonce=#{ActionController::HttpAuthentication::Digest.nonce(Time.now)}'
  end

  results=query.body
end

```

I can just pass in "search params" now because of how the checkboxes are structured. They create a hash that gets slapped on to the end of the query in just the way Discogs wants it:

<img class="alignnone size-full wp-image-329" src="https://hamwater.files.wordpress.com/2016/05/spinner-discogs-search-box.png" alt="Spinner Discogs search box.png" width="1392" height="364" />

Here's how the params look:

```ruby
{"discogs_search"=>{"q"=>"Whut", "format"=>"album"}, "controller"=>"discogs", "action"=>"search"}
```

t present, if you search by Artist name, everything's gonna go crazy. I did this at the end and figured I'd stick to my usual routine: Just build out the Albums part to prove the concept.

So, ok. You click the button there and it triggers the JQuery event listener here:

```javascript

function searchDiscogs(event){
  var formattedResults
  var query = $(this).serialize() 

  var search = $.post('/discogs/search', query, function(data){
    var rawResults=data.results
    formattedResults=buildResults(rawResults)
  })

search.done(function(){
  $.each(formattedResults, function(i, result){
  $('.search-results').append(result)
  })
  })

  event.preventDefault()
}

```

You might have noticed some pagination options in the snippet from the DiscogsService listed above. That's because who can be bothered with the approximately 67 billion results Discogs sends back by default? So now we're dealing with just five.

The next thing that happens is all the raw info is passed into a builder function, buildResults:

```javascript

function buildResults(array){
  var results=[]

  $.each(array, function(i, res){
  //THIS PASSES EACH OBJECT IN THE RESULTS ARRAY TO THE BUILDER
    var result = new ResultBuilder(res)
    var html = result.buildTitle()

    html += result.setImage()
    html += result.buildLink()
    html += result.importThis()
    results.push(html)
  })
  return results
}

```

This does two things, really:

+ creates a ResultBuilder object
+ assembles all the HTML to be appended.

I wrote the collection page with an empty div at the top where I hang all of this stuff.

Okay, so the ResultBuilder is what figures out what kinds of objects we're getting in and then generates the appropriate objects. At present, it only creates Album objects. Here's how:

```javascript

function ResultBuilder(resultObj){

  if (resultObj.type === 'master' || resultObj.type === 'release'){
    this.type='album'
    var artistTitle=resultObj.title.split(' - ')
    this.album = new Album(artistTitle, resultObj.catno, resultObj.id, resultObj.resource_url, resultObj.year)
    this.cover = resultObj.thumb
  }else if(resultObj.type==='artist'){
    this.type='artist'
    this.artist=new Artists(resultObj.name)
    }
}

function Album(artistTitle, catno, rel_id, url, year){
  this.title=artistTitle[1]
  this.group=artistTitle[0]
  this.catalog_no=catno
  this.rel_id=rel_id
  this.alb_url=url
  this.rel_date=year
}

```

So I'm saving an Album object inside the ResultsBuilder object. That's because it was an easy way for me to stash a stringified representation of the Album in the HTML:

```javascript

ResultBuilder.prototype.importThis=function(){
  return "<button type='submit' id='import-album' data-alb=''" + JSON.stringify(this.album) + ">Import this one</button>"
}

```

That's because what's the point of returning search results if you can't go and select which release you wanna add to your collection? So there's a button, and that "data-alb='" + JSON.stringify(this.album)" business is where this string gets stored.

So then this all gets appended to the hidden div for search results. It's not perfect right now, because I'm not displaying much data. But you click that button, and magic happens:

```javascript

function importAlbum(data){
  var alb = $(this).attr('data-alb')
  $.post('albums', {album: alb}, 'json').success(function(data){
    var alb=data.album
  $('div.messages').html("<h3><a href='/albums/'" + alb.id + ">Imported" + alb.title + '</a></h3>')
  })
}

```

That posts to my Albums controller's #create action. There's a debugger there, like in a lotta places, because I get lost. Also, after I'd called this shit done, I realized a problem with my data that could cause some (actually minor) problems because of something weird about how Discogs is set up. If you want details, watch the coding session video. It's the second link at the top. It's an official humdinger.

At any rate, this was the last mile problem. I had to monkey with the controller method to make sure everything got populated correctly. So now it's kind of a behemoth:

```ruby

def create

  respond_to do |format|
    format.json {
        alb_params=JSON.parse(params['album'])
        album=Album.find_by(title: alb_params['title'])
      if album
        album.update(alb_params)
      else
        album=Album.create(alb_params)
        album.artist=Artist.find_or_create_by(name: album.group)
      end

      album.artist=Artist.find_or_create_by(name: album.group)
      current_user.albums &lt;&lt; album
      album.save
      @album=album
      render json: @album
    }

end

```

I haven't totally resolved every issue I can see with how this might affect my database and some other features. But this does successfully search to find out whether I need to update an album that's already there or create a new one altogether. And since Discogs sends along artist info, I might as well go ahead and find_or_create those.

At the end, you see a page that looks like it would if you followed /albums/:id.

And that, boyos, is that.

I already want to do some more with this. For one thing, I have a method that uses the mechanize gem to seek out the specific release of the album you have (that second German pressing, with the different track order, or the 4 Men With Beards reissue of "Maggot Brain" that doesn't have the bonus tracks like the Spotify version does) and scrapes song titles from that. Now that I can build a signed Discogs query with a snap of the fingers (or a cut/paste), I can grab that stuff much more easily.

But ... meh. I'm beat. I gotta finish up this next unit and get to work.

## Postgame show
This is where I'd like to wax whatever about what I learned, how I worked, where I improved and where I still need to get better. But I'm tired. And this is crazy long.

If you read this far, make my day (no, seriously, you'd make my day) by posting anything at all in the comments.

 

 

 
