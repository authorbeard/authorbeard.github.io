---
layout: post
title:  "Exhibitionist CLI Gem 3: Where I Found the Devil"
date:   2016-01-27
category: blog
# # permalink: /exhibitionist-3/
---

I’ve already discussed the top menu a little bit. I decided that’s what should do the controlling. Since the CLI is what’s facing the user, it can act as go-between.

I mentioned that I want the user to stay in the program until she wants to leave, but I don’t much like loops, at least not while I’m still building something. Too many infinite ones. So I have a #top_menu method that handles many of the method calls, and also serves as an easily called destination for the sub-menus. Initially, it did all sorts of things: 

<ul>
  <li>talk to the user (obvs)</li>
  <li>get the Scraper scraping</li>
  <li>take that info and initialize a museum with it</li>
  <li>call on each museum to list its exhibits</li>
  <li>grab the user’s input and use that to tell Scraper which detailed exhibit to fetch</li>
  <li>quit the program, if that’s what the user wants (the philistine)</li>
</ul>

I ran into problems pretty quickly with the penultimate one there. I don’t want all of the options displayed all the time. So, in theory, it was easy to just do a #detail_menu that would handle details the way #top_menu handles main functions. 

Here’s how it looks right now: 

```ruby
  def detail_menu
    puts "\n\nEnter a number to fetch a detailed description.\n\n"
    puts "Or:"
    puts "--m for the main menu"
    puts "--q to quit"
    input = gets.strip.downcase

      case input.to_i
      when 0 
        if input == "m"
          top_menu
        elsif input == "q"
          farewell
        else
          huh?
        end
      else
        @exhibit = @current.exhibits[input.to_i - 1] 
        @exhibit.desc || @current.get_exhib(@exhibit)
        system("clear")
        puts "#{@exhibit.title}\n\n #{@exhibit.desc}"
        go_back?         
      end
  end

```

I mentioned earlier that, for #top_menu, having it possible for the user to enter numbers and letters and still provide valid input was a little tricky. But this wound up not being that big of a deal this time. I mention it again because it’s the kind of relatively minor thing that used to make my brain go all rainbow spinner of death, sometimes for hours. Now it doesn't, and I'm not totally sure if that makes me the King of All Computers, but I think there's a pretty good chance that it does make me the King of All Computers. 

###**Functionality: #detail_menu**

I needed a second menu for when the user was looking at each museum’s list of exhibits, but the user has to be able to go up to the main menu and down to the detail menu (oh, and I’m going to need another menu for that. That one, #go_back?, was actually really simple to write and I didn’t have to touch it again, except to tweak when the screen clears, maybe). 

But that also created the same problems:

<ul>
  <li>the user can enter a number or a letter and have it be valid</li>
  <li>the menu needs to be able to expand or contract because not every museum will list the same number of exhibitions</li>
</ul>

This time, I realized it was really easy: Just convert that shit to an integer. If the user input a letter, then it'd return 0. That's a case that's easy to evaluate. It's not pretty code, I don't think, but it works, since #to_i isn’t changing the variable's value. 

This is where I wound up encountering the problem that would eventually lead me to the best couple of solutions:

How do I let the user move in and out of menus but alway see the correct text for the exhibit they wanna see?

With the Bklyn Museum, it was really easy to grab the text. But it had a bunch of newlines and whitespace in it. So I had to screw around for awhile to get this stuff: 

```ruby
whatever.text.gsub(/\s{2,10}/, "\n\n")
```

So this wound up creating the same problem that the Guggenheim’s main page gave me: I need to chain a few methods together to get just the stuff I want. Ideally, I wanted just one method to handle each task, or maybe one module for each museum, at the very most. That would still leave me writing three or more versions of methods for each museum, but it’d be clear enough. 

In short, that never happened. 

But it led me to a couple ideas I liked: 

<ul>
  <li>use constants to store the main URL (each exhibit’s URL is grabbed by the scraper and stored in the appropriate atttribute</li>
  <li>use constants to store the CSS (each museum has two sets of selectors and selector methods, so easy: nest another hash in there, give them standard names)</li>
  <li>move the selection of the right CSS selectors out of the top menu and into methods where it’s absolutely necessary</li>
  <li>bite the bullet and accept that I’m going to have to have unique methods, in both the main scraper and in the scraper that gets the exhibition’s description, for each museum</li>
</ul>

So what I did first was something like this: 

```ruby
URL = { :brooklyn => “http://www.brooklynmuseum.org”
        :guggenheim => “http://www.guggenheim.org”
      }
CSS = {
     :bk => {  :main => “.some-css”
               :exhib => “#other-css”
            }
      }
  

```

And so on. It worked well enough, but I wound up having to hand through three variables sometimes: a name, a nodeset, some CSS selectors. Sometimes that meant wrapping methods in other methods, with each of them getting two more arguments generated the first three. Messy. I mean, if I gotta do it that way, I gotta do it that way, but it just ... bugs me. 

But at least it let me see what was working. After all, I was doing this in #top_menu a lot, too: setting one variable for the nodeset that Nokogiri would return, another for the array produced when I applied more selector methods, another for the hash created when I iterated through that and set keys. 

The main thing was that it worked. Sort of. 

####**Functionality: parsers**

I think I mentioned before that I had a breakthrough when I decided to break scraping and parsing apart. I put all the methods I wanted to chain together into a separate method so that the scraper was just working on one URL and one CSS selector. So I could have one scraper to rule everything, then put the rest of the shit in some other methods somewheres else. 

 This made me realize that I could have #detail_menu make a selection and pass this on to another method, which would select the right scrape/parse combo for the descriptions — and I'd be collapsing five or six lines of code into one, at least in #top_menu.

This still left me with the problem of knowing, when I got into #detail_menu, which museum I was dealing with, so I could call on a Museum object (goddamn I’m glad I made sure I was using objects from the jump). I solved that by having #top_menu reset a class variable, @current, each time the user chose one from #top_menu (I quit having users type in the full name when I kept having to type in the full name every time I wanted to test the goddamned thing). 

Eventually, this sort of worked. 

That left me with the Guggenheim. Actually, I’d started dealing with this pain in the ass as soon as I got the Brooklyn Museum’s scrapers to work properly, which didn’t take very long, actually. It was all the switching between museums that got me hung up.  

Problem here was that the Guggenheim’s main exhibitions page features three varieties of dates, each marked with different CSS selectors: 

<img src="{{ site.baseurl }}/assets/guggs inspector.png">

What got me was the middle display, where it just has "Ongoing," as opposed to the range of the one above it. Displays exactly the same, but marked with totally different CSS. And the last one wound up having an empty date line. So I figured I might as well grab whatever they're calling "online" and set that equal to @date. If you watch the video about this project, you'll hear me getting this wrong. I forgot. Seems like weeks ago that I did this shit. 

As soon as I saw this, I gave up on one of my original ideas -- to let the user view exhibitions according to date (I’d not been deterred by the fact that I was just getting text describing ranges of dates; gotta be some regexp or an iterator or something that could let me turn that into a date variable that Ruby could sort). 

The main problem was that having three different types of dates wreaked havoc with the mass assignment in Museum#new. And it was just a mess. So I wrote a helper method that would make sure that calling #parse_gugg would return a standardized array. 

```ruby
def self.trim_gugg(array)   
  array.each{|ex|   
    if ex[:date].empty? 
      if ex[:ongoing_date].empty?
        ex[:date] = ex[:online_date]
      else
        ex[:date] = ex[:ongoing_date]
      end
    end
    ex.delete(:online_date)
    ex.delete(:ongoing_date)
    }
end

```

Not great, but at least it’s hidden away. It only gets called when the Guggenheim's parser gets called. You never have to think about it. 

###**Final tweaks**

By this point, I was pretty divided: On the one hand, I was sick to death of this goddamned project and really wanted to get all the other stuff done. On the other hand, I liked the way it was coming together and knew that having two constants, and returning to them a couple of times, and having to hand off tons of arguments to all the methods, was a mess. 

So I went back to the idea of building individual museum modules. Then I realized that, since I had all the scraping and parsing and object creation/assignment all working nicely, I could wrap a few things up into a one-line call in #top_menu. I also realized that, in the unlikely event that this ever gets released and used, I’d want to make it easy to add a new museum. 

That didn’t wind up happening, that bit about making it easy, because you have to do all of this: 

<ul>
  <li>find the right URL for the exhibitions page (this is easy, ish, though the Guggenheim makes it needlessly complex, since you have to choose "on display" or something; I forget).</li>
  <li>find the CSS for the exhibitions you want to grab from that page</li>
  <li>find the CSS for the detailed description</li>
  <li>add the URL to one constant</li>
  <li>add the CSS to a second constant (oh yeah, you gotta create a hash for this and nest it in the constant</li>
  <li>figure out what other methods you need to attach to whatever the scraper gives you</li>
  <li>figure out if you need to add any helper methods here</li>
  <li>add the other CSS to the #get_exhib method</li>
</ul>

At least I knew what needed to be done -- and, eventually, added that to the Readme. 

Incidentally, it was around this point that I realized I couldn't just keep ignoring all these references to this Markdown language. 

Know what? I need to come up with something -- some CSS, an image, something -- for every time I learn something. Then an index page that collects and lists just these Then I could just, with one click, get a little burst of inspiration. Maybe even a counter, like an XP system ... gaaah, later. Already been futzing around with Jekyll for a day or two. It's a lotta fun. But I'm getting sucked into rabbig holes. 

Ahem. 

So it was never gonna be easy to add a museum, but I realized at this point that I had a thing that was working the way it was supposed to. I ... had it working. I was substantially done. Always takes me by surprise, that moment. 

Of course I couldn't leave well enough alone, so I figured I could at least deal with these issues: 

<ul>
  <li>just use one constant to hand everything a Museum needs to know about itself over to #initialize</li>
  <li>also add a check into the menus so it doesn’t wind up re-scraping stuff it already scraped. Saves a couple seconds here and there</li>
</ul>

I also decided to have the Museums build themselves, instead of making that a class method, so that I could keep the initial Scraper#scrape call together with all the parsing, mass assignment, exhibit building and so on. So I could just call one method with one argument, wrap a bunch of stuff into one line of that method, and have cleaner-looking code (and shove some of the selection and complexity further back under the hood). 

That left me with an #initialize method I at least like for its brevity: 

```ruby
def initialize(museum_hash)   
    self.build(museum_hash)
    self.save
  end
```

And I could get that one argument to pass in by collapsing the two constants with their nested hashes into one constant: an array of hashes, with each has representing everything a museum needed to build itself out: 

```ruby 
  MUSEUMS = [
          { :name => "brooklyn",
            :url => "https://www.brooklynmuseum.org/exhibitions", #"resources/bk.html",
            :main_css => ".exhibitions .col-md-6, .exhibitions .col-md-4",
            :desc_css => ".exhibition-description"
          },

          { :name => "guggenheim",
            :url => "http://www.guggenheim.org/new-york/exhibitions/on-view", #"resources/gugg.html",
            :main_css => ".row-with-pic",
            :desc_css => "#main-three-center p"
          }

         ]
```

This way, I could build the first menu the user sees like this: 

```ruby
 def top_menu
    
    system("clear")
    puts "Hiya. At the moment, here's what you can do:\n\n"
    display_museums
    puts "#{MUSEUMS.size + 1}. See everything so far."
    puts "#{MUSEUMS.size + 2}. See every museum's top exhibitions."
    puts "(there's more functionality to come)"
    puts "Or type q to quit."
    input = gets.strip
```

So the user automatically sees the correct number of options and their input will call all the right stuff. 

That left just the “see everything” bit to write out. Which actually only took a few minutes. I actually forgot that I’d done that, one day, and found myself, around noon, thinking, “Crap, I’ve gotten nothing done at all today aside from a lot of farting around with Jekyll.”

This is what I came up with, in the case statement that follows what I have up above: 

```ruby
elsif input.to_i == MUSEUMS.size + 1
        system("clear")
        fetching_message
        
        MUSEUMS.each{|m|
          @current = Museum.new(m)
          current.display_exhibits
          }

        puts "\n\nWhich museum do you wanna check out?"
          mus = gets.strip.downcase
          system("clear")
          Museum.all.detect{|m| m.name == mus}.display_exhibits
        detail_menu
```

I still have a problem with this: namely, when it sets the @current attribute the second time through (at present; still haven’t gotten around to loading in the Met), that stays set, so #detail_menu doesn’t work quite right. It seems to help if you first step through the menus (saving each Museum object with all its Exhibit objects). I don’t know why. Frankly, at this point, I don’t care. 

In the mean time, I’ve put my mandatory-for-the-sake-of-sanity walks to good use by sketching out notes for blog posts, then, after a day or two of screwing around with Jekyll, finally fleshing them out — which promptly raised the same problems that put me off blogging to begin with: I go on way too long and I always wind up getting carried away with the freedom of the page and writing all sorts of crap I don’t want anyone ever to see. 

But I do now have a coding blog that I can work with locally and host on my gh-pages account, and I put that off for way too long. Small victories. It's all about the small victories. Wish mine weren't all Pyrrhic.

I also took some time, after several days of waaaayy too much time thinking about/working on this, to record a video of me working on some of this crap. [You can watch that here](https://youtu.be/YSzna66G41E). It’s probably two versions out of date, the code there. So if you wanna see how it evolved, you know, and don’t wanna dig around on Github, there you go. 

####**Wrap-Up**

So there you go. This took way too long. This is something I need to improve upon, and it’s dogged me from day one. The upside is that I know why every mistake I made was a mistake, I understand what each line of my code is doing, and I’m far more comfortable with a lot of things I was so intimidated by just a handful of days ago that I farted around doing all sorts of other stuff. 

And my gem is ... well, kind of functional. 

Now I need to stop doing stupid tricks like directing the user to Dogs Playing Poker and start writing some rspec. 


###Read more about this project: 
<a href="{{ site.baseurl }}/exhibitionist-1/">Exhibitionist CLI Gem</a>  
<a href="{{ site.baseurl }}/exhibitionist-2/">Exhibitionist 2: This Time, It's Codable</a>  

###Watch some videos about this project: 
[--Part of the coding process](https://youtu.be/YSzna66G41E)  
[--The final walk-through](https://youtu.be/xLfatZOHAPE)


