---
title:  "Exhibitionist CLI Gem 2: This Time, It’s Codable"
date:   2016-01-26
category: blog
permalink: /exhibitionist-2/
---

I started this one the way I started the last one: With a lotta notes and a few walks. But before this shit started to run away with me, I needed to have a good idea of what I was gonna do. And while I’d grabbed the relevant URLs and some CSS that looked like it was gonna work (ish). I’d already confirmed that the Brooklyn Museum and the Guggenheim had easily scrapeable sites, though the Guggenheim had a ton of detail that looked like it would be trouble (boy howdy, was it ever). 

But fuckit, I was ready to go. What I needed, though, was to _not_ just plow into this and realize, two days later, I had to reorganize everything. Sometimes it helps, you know, to put pen to paper -- sometimes just using unlined paper helps. Because our brains, like the rest of all of us, are horrible and stupid. But no matter; I can't draw worth a dog's balls and have terrible handwriting, so sitting down to sketch this out, out of sheer unfamiliarity, let me get more or less exactly how this worked in the final version down pat. And I never had to refer to it again. I'll see your Quiver and Evernote, and raise you one collection of developmentally-disabled heiroglyphs: 

<img src="{{ site.baseurl }}/assets/Exhibitionist sketches pic.JPG">

<h4>Famous First Words</h4>

This is going to be really simple. It only needs to do this: 

<ul>
  <li>Get a list of exhibitions from art museum websites</li>
  <li>Show the user the list she wants to see</li>
  <li>Prompt the user to pick an exhibition to get more info</li>
  <li>Retrieve that info and display it on the screen.</li>
</ul>

Really, the only tricky part is gonna be handling all the different CSS. I mean, each museum structures its pages differently, and then the CSS on each exhibition’s individual page is different still. 

But whatever, dude. I only need the text. 

<h4><strong>Psych-up/Inventory</strong></h4>

I don’t go in for inspiration too much. I don’t trust it -- it comes and goes, but there’s always work to do. If you rely on inspiration to get anything done, then either you run on crappier stuff than I do or you just don’t get much done. 

It’s entirely possible that I’m totally wrong about that. But thinking that way's what got me to stick my ass in the chair and get some things done that were important to me to get done. And when inspiration came sucking around, I had a workflow in place to capture that bastard unitl I was ready to milk it.  

In this case, though, it helped, here and there, to remind myself that I've learned a couple things. Lotta shit that'd be useful here. Partial list:  

1. RubyGems.org has a great step-by-step guide to creating a gem. 
2. You can use Bundler to set up the file structure, but you can also follow step-by-step guides.   
3. Those other tabs in Inspector, on Chrome? I can use a coupla them. Kind of. At least I know what to look for.  
4. Oh, and that video from Avi? That told me that I need to change permissions on a file when I want it to be executable. I had had no clue what CHMOD did.  
5. Look out for JSON. It requires different handling.  
6. There’s parsers and stuff out there to get JSON stuff and turn it into the kind of nodeset that’s actually really easy to iterate over, make hashes from, chop up, display and otherwise just screw around with.  
7. I know how classes work. Finally.  
8. I know how to set up a has-many-owned-by-one class structure and get all the objects playing right the first time through. I learned this the hard way from the Music Controller lessons that introduced us to object orientation, then learned it again, then learned it yet again for the Music Library final project, which just sent me into an emotional tailspin because of dumb shit like looking at code and thinking, “Nah man, I’m good, I know how to do that shit” and missing an assignment operator when I need a comparison operator. I’m not kidding you, man, I think I spent a full day, maybe more, rewriting shit in each of my first two projects just because of this.  
9. I know how to trace my code step-by-step and make sure I’m handing off objects where I need objects and handing out attributes where I need attributes  
10. I know how to keep an eye out for return values -- especially for how they can lead me, once I get things working, into cleaner code.  
11. I know even someone like Avi recommends walking through a blank project by just hard-coding how each step should look, then going back and adding in functionality as you figure it out.  
12. I know it’s better to do it that way than to locate the heart of my project -- what I think is gonna be the tricky part -- get that down, then move on to the stuff I think is increasingly peripheral. (Seriously, what happens there is I start thinking, “well, I know that works, so it must be somewhere else.”)  

Not so bad, actually. Some of those things, like how classes work, looked impossible just a few weeks back. 

Goddamn, that made me feel good, thinking about that shit. Then thinking about the project I still hadn't built anything for, that made me feel bad. So that's how I knew I was ready to get to work. 

So no problem. Let’s get started. I just need to ... let’s see, let’s get my executable working so I don’t have to touch -- wait a second ...

See, part of my problem was thinking I needed to clear a half day, maybe more, to read tutorials and watch videos before I could get started. 

But I’ll be goddamned if it didn’t take me a couple dozen tries just to figure out how to get this to work: 

```
#!/usr/bin/env ruby
require_relative '../lib/exhibitionist
ExhibitionistCli.new
```

The only part there that I got right and knew how to do correctly right off the bat was the shebang. 

I can’t begin to explain why it took so long to figure this all out, but here’s what that code's doing: 

1. Loading all my dependencies.  
2. Starting the program. 

That’s it! 

Here’s the entirety of “exhibitionist.rb”:

```
module Exhibitionist

  require 'nokogiri'
  require 'open-uri'
  require 'pry'

  require_relative './exhibitionist/version.rb'
  require_relative "./exhibitionist/scraper"
  require_relative "./exhibitionist/museum"
  require_relative "./exhibitionist/exhibit"
  require_relative "./exhibitionist/cli.rb"
  
  
end
```

Even that took awhile to figure out -- so long, in fact, I wanted to just give up and go get a beer or seven. As slow as I’m going in this, at least I reliably fight that urge. At worst, I call it a day, sleep fitfully, have a dream or nightmare about code (it’s not always easy to tell the difference) then I figure it out at some point tomorrow. Most of the time, just going for a walk and taking a notebook sorts me out. I tend to hang on to notes I take, but I dunno why. The writing them down is usually all I need from them.  

At some point, I'll only have to do this for legit difficult challenges. At present, a lotta stupid shit devours my days. 

Anyway, I dunno why I didn't get this already, but I had to figure out all over again that you have to, apparently, list every damn file you want to load. Why can’t you just require the whole damn directory? Maybe you can, I dunno, but once I figured this out, it was faster to type in all the filenames than sort through a bunch of junky StackOverflow answers that were gonna have me creating new classes and functions and shit. Fuckit. I gotta get this going. 

Next few steps were easy. In fact, I actually did them first: 

1. Create CLI class, Museum class, Exhibit class
2. Add the attr_accessors I knew I was gonna need. Add ‘em to both Museum and Exhibit, though I’m not sure both of them need all of them. 
3. Don’t start thinking about the whizz-bang stuff I wanna do to dress this up later (I mean, just returning, museum-by-museum, lists of exhibitions is no fun)
4. Start writing out the menu and the case statements, initialize methods, save methods, a coupla display methods. 

So once I got the executable working and added tons of notes to all of my classes about what to do next and so on, I started with a pretty easy menu, which went something like this: 

```
def menu
puts “Hi, what museum do you wanna look at?”
puts “1. Brooklyn Museum”
puts “2. Guggenheim Museum”
puts “3. The Met”
puts “Or enter q at any time to quit.”
  input = gets.strip.downcase
  case input 
    when “1”
...
end
```

I ran into a problem right there. It’d recur for me. The user can enter either a number or a letter and both can be valid. It’s going to come in as a string, but I already know I’ma wanna take that input and use it to pull some info from an array at some point. And I’m gonna want the menu to automatically expand as I add more museums. And, you know, I might as well tell you right now, later on I’ma want the user to be able to return to the museum’s list, go all the way up to the top menu (oh yeah, I need to call that top_menu now ... should I do a Menu class? ... I dunno, I’ll think about that later), or quit. Oh, and something other than an exit has to happen if they enter something invalid. Easiest thing in the world to account for is people doing dumb shit with your shit. In this case, I'll just make sure they don't break anything instead of, like on my first day of learning Ruby, spending most of it finding new ways to abuse them for it. 

Some day I'm gonna write the dickiest apps in the world. 

So hmmmm ....

Know what? I’ma leave that for now. I’ma get that menu working, then code what happens when you choose Brooklyn Museum and so on all the way to the museum descriptions. 

Wait, no, I’ma have a little fun. So I’ma write this: 

```

def farewell
    system("clear")
    puts "\n\n\n\nFine. Go watch TV or get drunk, you philistine.\n\n\n\n\n"
    sleep 1
  end
```

And you know what? Might as well write a method that handles people doing dumb shit (and/or mistakenly entering an invalid key), then just call that. Oh, and I'm putting stuff in the menu as a kind of to-do list. I want input for that stuff to be valid and do something, but not to end the program. So this: 

```
def under_construction
    puts "\n\nWelp, this ain't actually built yet. Art takes time."
    puts "But if yer in a hurry for some art, type 'now'"
    now = gets.strip.downcase
      if now == "now"
        %x`open -a Safari http://www.dogsplayingpoker.org/gallery/coolidge/img/a_friend_in_need.jpg`
        sleep 1
        top_menu
      elsif now == 'q'
        farewell
      else
        puts "Okay, check back later."
        sleep 1
        top_menu
      end
  end
```

Heh heh. Dogs playing poker. That won’t work if you don’t have Safari on yer machine, but I don’t wanna spend any more time than the 20-30 mins it took to figure out how to make sure Ruby sent the right command (something I shoulda known already? Add it to the pile. I still gotta look up terminal commands for moving and copying files and shit. But let’s keep that between us.). 

<h4><strong>Functionality: Scraper</strong></h4>
Okay, so I want the Museum class and the Exhibit class to work just with hashes. Maybe some arrays, too, but mostly just hashes. So I’ll have all the work of putting those hashes together done in one place. I’m calling it -- hang on to yer wigs & keys -- the Scraper class. 

Problem is, the only way I know how to do this, really, is to call #css and pass that a selector -- I can’t figure out how to pass in the additional stuff that some sites need called after #css (like #text or #first or even how to go to an "a href" and grab both the URL _and_ the text and store them in different places -- or not at all for one of them, depending on how a site's CSS works. First time through, this is no big deal. I just set up everything I need to get stuff from Brooklyn and make sure I’m getting a hash to work with. So I do something like this: 

```
def self.scrape_bk(url, css)
    Nokogiri::HTML(open("https://www.brooklynmuseum.org/exhibitions")).css(.exhibitions .col-md-6, .exhibitions .col-md-4")
  end
```

Now, a word about that CSS.  If you look at this page: 

<img src="{{ site.baseurl }}/assets/bklyn museum exhibits.png">

What’s going on is there are actually three different types of listings, even though there’s just the two headings (Current and Long-Term). So that’s gonna be a problem. So what I did first was decide to skip the long-term installations. Then ... oh that’s right, I remember seeing you can feed multiple things into the #css method. Turns out that’s really easy.

Somewhere around this point, I got sick of having to wait for Nokogiri to go scrape the website, so I copied the source HTML into a local directory. So, until I was ready to submit this project, I'd just be scraping from that file. I figured this would also avoid any chance of getting me blocked as a bot -- which I couldn't gauge, but the time savings along were worth it. So that was happening, too. Just ... you know, FYI. Lookame!

Anyway, I realize rill quick that I don’t want to have to work on the nodeset again outside of this method, if I can help it, so I’ll just go ahead and work through it with this method. I’ll add something along the lines of this: 

```
nodeset.collect{|ex| 
      {
        :url => ex.at("a")["href"],
        :title => ex.css("h2").text,
        :date => ex.css("h4").text.gsub(/\n( +)?/, "")
      }}

```

My first run through, I had extra steps, method variables, class variables, all kinds of crap. I was still working under the assumption that I’d need one scraper for each museum I added, the user would type in the name of a museum, then the CLI's #top_menu would select the right scrape/parse combo method. Lotta that was just so I could use pry and step through everything when, inevitably, it started breaking. 

Anyway, I figured wrapping everything into the one method method would be okay. I'd just tweak it later so I could feed in whatever -- even exhibition details or other museums' info. 

I’ll spare you the tension: that didn’t work out. Had to attach different stuff to the end of the scraper. 

But anyway, on to cases. 

<h4><strong>Functionality: Museum</strong></h4>
So here’s the thinking: the Museum class will create museums, then museums will create exhibitions and tell you about them. 

That part was actually really easy. I had to revise the methods a few times as I solved other problems, but it basically worked with these methods right from the jump: 

<ul>
  <li>initialize</li>
  <li>build</li>
  <li>build_exhibits</li>
  <li>display_exhibits</li>
  <li>self.all</li>
  <li>self.save</li>
</ul>

And frankly, each iteration just simplified things. First time through, I handed, like, three things to the initialize method. I also had that method building the exhibits, which meant hard-coding additional CSS into the #build_exhibits method. But by and large, I liked how this was. I didn’t have to do tons of stuff afterward. 

<h4><strong>Functionality: Exhibit</strong></h4>

Far and away the easiest of all of them. Not least because there's only one way into this class: via the Museum. My gem lives in an old-timey world with super-powerful gatekeepers. So there wasn't much that could break them. And when I was screwing something up somewhere else, I'd get error messages telling me exactly which flavor of stupid I was being. 

Anyway, since I had Scraper getting everything from the websites and Museum setting all the symbols, all I really needed Exhibit to do was set up its own attributes from the hash, save all the exhibits, and when asked for names, give up the goods. Essentially, the Exhibit class is just there to store information for later. 

I had all these plans for ways to display exhibits, but I kept using the Exhibit class less and less as I worked through this.  

But no matter. All the action’s elsewhere. That’s my next post. 


###Read more about this project: 
<a href="{{ site.baseurl }}/exhibitionist-1/">Exhibitionist CLI Gem</a>  
<a href="{{ site.baseurl }}/exhibitionist-3">Exhibitionist 3: Where I Found The Devil</a>

###Watch some videos about this project: 
[--Part of the coding process](https://youtu.be/YSzna66G41E)  
[--The final walk-through](https://youtu.be/xLfatZOHAPE)