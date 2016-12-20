---
layout: post
title: Count Occurrences of a Sequence in a String in Ruby (including non-adjacent characters)
date: 2016-07-30
permalink: /count-string-occurrence/
category: blog
tags: code-challenges
tech: ruby
---

I recently came across an interesting coding question that I hadn’t seen before. Wait, that’s not the news here—I’ve only just started studying for technical interviews, so I haven’t seen most of these questions. There actually isn’t any news at all. I’ve just spent some time recently doing a lot of recursion problems in JavaScript and Ruby, after not doing too terribly much of it before, and wanted to blog about what I came up with here.

So the challenge was to write a method that can count the number of occurrences of a certain sequence within a larger text. I’m only working with strings here, but I don’t see why it wouldn’t work with a much larger chunk of text.
Coupla gotchas:


+ The characters in the sequence count even if they’re not adjacent. They have to be present, in sequence.
+ Every distinct combination of the characters counts, so each individual character in the query string might be counted multiple times, depending on what follows it.
  * That's a little bit confusing. Imagine that you have a string like this: "ababab" and you want to count how many times "ab" shows up. Obviously you'd see 3 of them right off the bat. But they don't have to be adjacent, remember? So the first "a" actually shows up in three of these:
    
    ab &#124; a..b &#124; a....b
  * Then the second shows up in two:  
   
    ..ab &#124; ..a..b 


  * And the last in one:

    ....ab

  * If the string instead was "abbabab", but you were still just looking for "ab", things would get a little complicated. If you tossed in some junk characters throughout ("abllkjoiweyocbwoiyaowopiealkcbqpoiaboiuc"), you'd have even more complication. And if you started looking for more letters? It can spiral quickly. And there aren't any obvious short-cuts because of the following point:
+ There are no guarantees about the composition of either string, meaning it could be thousands of random characters we have to query for a particular sequence of four or five, or it could just be this: ‘find and count all instances of ‘ab’ in ‘ababab.’
+ That means an occurrence of any of the query characters tells you nothing about the likelihood of the next one in the remainder of that string.

In fact, the example I describe up above was the example I was given initially. You can do that in basically two steps:

  1. Go through the string and, at each instance of ‘a’, slice out everything from there forward.
  2. Count the letter ‘b’ in each substring.
  3. Add them shits.

Okay, so three steps. But since I’d do the counting in a #collect method and then call #reduce(:+) on the result, it feels like one step to me.

Oh, did I mention I elected to do this in Ruby? I’ve been working with it the longest, figured it’d be in my wheelhouse. But I’ve been using JavaScript on my Project Euler and Interview Cake questions of late and this caused some embarrassing Google searches/Ruby documentation discoveries. I feel like confessing them to you, o internet, can help me expunge the shame.

So, okay. I'm going to have to check, for every damn character in the query sequence, what comes after it in the target string. That's why this is long. Well, that and I'm still green.

I added one more constraint to myself: I wanted to approach this as if I was the first person ever to try to do this, relying mainly on what I already know about Ruby. That’s not a best-practices situation and isn’t how I’d operate in production, but this is a kind of exercise. I needed to pay some more attention to some muscles I haven’t worked out much in the past couple weeks while I’ve been job-hunting. And anyway, going through all the verbosity and confusion of doing something complex with low-level methods actually prepares the ground for understanding the whys and whats of higher-level abstractions.

So anyway, I had to be able to dump a string and a query sequence into the top of this and get a number at the bottom, not entirely unlike a [Mr. Fusion](http://www.thegreenhead.com/imgs/back-to-future-ii-mr-fusion-home-energy-reactor-replica-3.jpg). First order of business: get it working. I’ll leave optimizing for later.

## Code Walk-Through
Enough of that crap. Let’s walk through the code. You can find it [up here on Github](https://github.com/authorbeard/sequence_finder/blob/master/s_finder_blog_version.rb) if you wanna take a look. I tried to keep the line references below in sync with this version; the real one is sequence_finder.rb. If I refactor, it’ll be in there.

The first section (lines 2-9 in the code) are basically some quick checks that pull double-duty. First, they’ll avoid running the rest of the code if something’s fishy with the inputs (the query sequence is longer than the string it’s supposed to search, the first letter of the query doesn’t show up in the string at all, or someone’s using this method to search for one character, for some reason, as opposed to just Ruby’s #count method).

I store the first letter of the query sequence in its own variable up top because, initially, I was going to use it a lot more than I wound up doing. But it makes the later bits, where things get a touch busy, a bit more readable.

Anyway, all of that’s pretty self-explanatory from the code, but I mentioned double-duty and only listed one type of duty (sniffing the inputs). The other is to provide return values for use in the recursion later on.

Get a load of these:

```ruby
return 0 if !string_array.include?(q)
return string.count(q) if query.length ==1
```

This should make sure that I can close all the parallel processes that might be opened up by the recursion. Can’t make assumptions about what comes next based just on what I’ve just 
found, but I gotta make sure I get a return value at some point so this doesn’t just run forever. But I also want to stop and move on the second I encounter a string without the character I’m looking for. Whatever follows at that point just doesn’t matter.

Lotta explanation for something self-explanatory. But it’s my blog, buddy, so whatevs.

Now to the reactor core. If I get to this point in the code, I know I’m looking for a sequence of at least two characters, and the first is present in whatever I’m looking at. Great. Now alls I gotta do is keep looking at what comes after the character I just found for the next character in the sequence.

But hang on: what if the remainder of the query sequence appears a few times in the string? I’d have to count every configuration of it, right? Oh man.

Screw it. I’ll burn that bridge when I come to it. First I want to slice up the main string into smaller ones beginning with the first character of the sequence.

Great, so let’s find the index of that character. I know it’s in there—I just checked up above. Here I run into a problem: I can call ‘string.index(q)’ and get an index, then slice off everything from there to the end of the string back into this method until I run out of query characters. But that #index(n) only finds the *first* occurrence, and I dunno how many I got. So I could do something ugly like

```ruby
x=string.count(q)
x.times do |whut|...  
```

But meh. I’d rather have this step automatically through the entire original string to find all suitable substrings. I’ll need an index when I find a match. So I’m going to use that array version of the string that I created at the very top, so I can use the #each_with_index method. That way the index is just there for me to grab when I need it.

It’d be even better if I could combine all of this with something like #collect or #each_with_object and just automatically get an array of substrings at the bottom, but honestly, rather than fart around with ways to do that, it’s easier to grab something that I know will iterate as many times as I want it to and produce an array of substrings I can work on later.

One problem at a time. If I listened to myself when I say that, I’d code much, much faster. Then again, if I was better at identifying the problem I’m actually dealing with, I wouldn’t get distracted when my brain goes all rainbow-spinner because I’m trying to fix the wrong thing.
So. I’ve got something now that can create a substring. I do that as soon as I find a match, with a call to slice off a bit of the original string.

```ruby
if char == q
sub=string.slice(index..-1)
```

Which, confusingly, doesn’t slice off shit—the thing getting sliced is the same as it was before. Weird. But useful here—I don’t want to alter the string, I just want to look at a section of it.

Next is one more of those checks to make sure I don’t waste time and get garbage in my array of substrings: If what’s left of the string when I match the character I’m looking for is shorter than the rest of the query sequence at this point, there’s no point going further. It’s another chance to dig down until a potentially complex thing becomes very simple and move on with my work.

The recursion happens right here:

```ruby
sub_check = find_query_string(sub, query.slice(1..-1))
```

Why am I slicing off a chunk of the query rather than just moving on to the next character in the query? Why, so I don’t inadvertently get a return value from those checks at the top and stop the recursion before it’s finished. And more importantly, so I can continue walking through the string and the query sequence looking for a complete match.

I didn’t wind up using the return value up on line 9, where I count how many of the query characters I find in any string. Or I haven’t yet. For now, I’m just making sure that, when I either find a missing character or I get to the end of the query sequence, a return value is sent up the chain to the original call, and sub_check’s value is set.

That’s so I can do this:

```ruby
if sub_check != 0
  subs.push(sub)
end
```

So. Now I have an array of strings that contains at least one occurrence of the entire query sequence. Now it gets (potentially) very tricky, which is why I broke this step out into another phase for now. I’m sure there’s a way to recurse or iterate right in place as soon as I find a substring, but I like to understand what’s happening under the hood, and I built this incrementally, checking everything along the way. It’s a little easier to debug when it’s broken up like this.

Problem is, I can’t assume anything about either the string or the query, so I couldn’t come up with an easy shortcut beyond the one at the beginning here:

```ruby
subs.collect{|str|
  if query.length==2
  str.count(query[1])
  else
  sub_counter(str, query)
  end
}.reduce(:+)
```

I could then figure out a relatively simple way to adjust this for three-character sequence and put that in an “elsif” or change the whole thing into a case statement. But since I’m going to have to allow for longer queries somehow, might as well get started on doing that.

And it turned out that creating a helper method made this section of code more readable and gave me a way to use recursion a second time.

What’s more, I could simply feed in a string and a query sequence and go from there.

But I do need to build some more stuff:

+ First, I no longer care about the first character in the query sequence. It’s the only one whose quantity and position I know right from the start. Some of these substrings I’m now iterating through will have more than one occurrence of that first character. Don’t matter; each of them, if touches off another repetition of the sequence, it’ll have its own substring.

  That means ‘q’ is something different now. I’m also going to need the last character in the query sequence later on, so I’ll store that in a variable.

+ Next I make two arrays: one will be altered by a loop later on, but there’s a chance I’ll have to slice off smaller chunks of the main string again (like if query[1] occurs multiple times in the substring). That’s easier to do if I just keep a copy hanging around up here.

That brings me to the point where I know I’ll need to refactor if/when I return to this particular approach, but before I get into that, lemme give you a brief overview. First, lemme lodge an example [from notes.md, in the Github repo](https://github.com/authorbeard/sequence_finder/blob/master/notes.md), that I'll be referring to:

>str="abclkbsldcasboiboicoiudpoiudcd"  
>query="abcd"
>abc.....d &#124; abc...................d &#124; abc.......................d &#124; abc........................d &#124; (4)

1. The only place where it’s useful to just count how many times a character occurs is when I’m looking at the last character in the query sequence.

   * Remember when I said I need *every* occurrence of the query (in this case, ‘abcd’)? Well, that means every occurrence of the rest of the sequence for each character in that sequence. The last character’s the only one that doesn’t have a next character.
   * It’s useful to think of these characters as distinct datapoints, which you can identify handily by their index. Which is why I probably shoulda thought more about creating and using hashes instead of arrays. But arrays are simpler to walk straight through. Without any guarantees about how any string or query is composed, I don’t think I can make a lot of assumptions based on just comparing how frequently every character shows up. I mean, in that case, I could probably just compare factorials in one way or another. I started down this path, in fact, before realizing it doesn’t work. In the substring up above, after all, there are two b’s (‘boiboi’) with the exact same number of ‘c-d’ pairs.
   * Also, I thought about and farted around with Regexp searches, but smelled a rabbit hole coming up, because I haven’t done tons of regexp work, so I’d be adding a layer of potential for errors on top of what dealing with recursion, iteration and nested loops was already presenting me.
   * Also, I didn’t want to make this so complex, but that’s what happens when you deliberately hobble yourself as I did by deciding to use only what I already understood well.


2. That said, I want to make sure I’m looking only at the part of the string that follows the occurence of the next-to-last character of the sequence. In the example from #2, if it started with “adbcd” and I just counted the times “d” shows up in the string after I find a “c”, my count would always be off by at least one.
3. I didn’t want to come up with lots of complex storage, since nesting two loops and using recursion was already getting my stack level pretty deep. So I decided just to shrink the array itself every time I went through.
4. Every character here could show up multiple times and be followed by multiple occurrences of the complete sequence. So I’m really going to have to run this whole deal on ever-smaller sections of the substring, then moving my starting point and starting over.

Hokay. So what this means in practice is that I can set up an inner loop that keeps shifting the first character of the substring out until it finds a match. Since I don’t care about the first character of the query, this starts with the second.
If there’s no match, I just move on and I’ve pruned off that much more junk.

If there is a match, then I keep track of that here:

```ruby
test=test_array.shift
if test==query[n]
  seq += test
  n+=1
end
```

Then I move on to the next letter in the query sequence. What if n gets too high? Doesn’t matter. I immediately compare the length of the sequence to the query sequence and stop just before they match.

When I find the first three characters of the sequence, I actually, finally—*finally*—have useful data:

```ruby
count+=test_array.count(q_last)
```

Great. So the first time through, I’ve found the *first* occurrence of query[1], and then found the first occurrence of query[2] after that.

But what if, for query[1], there are multiple occurrences of query[2] that follow? I’ll need to look past them for any occurrences of query[3], count those, then add all those batches together before moving on to the next occurrence of query[1]. Since I only tested this up to four-character query sequences, that’s where it stops for now. Because I’m really only dealing with the middle two characters of the query sequence here. I don’t care about the first right now and I can simply do a raw count on the last, so all the complexity comes from what’s going on with the other two.

Okay.

Remember what I’m dealing with is the *first* occurrence of query[1] and the first of query[2] after that. What I need to do is move on to the next occurrence of query[2], if it exists. Line 45, at the top of the outer loop, will check whether I need to do that. And since I’m still inside of that loop, I’m still dealing with a version of test_array that has been reduced by all that shiftiness—erm, I mean #shift—on line 46 up above. Which means the first occurrence of query[2] has now been removed from that.

In that case, then, let’s just crank seq—the variable where I’m storing which query characters I’ve found—back one. I haven’t converted this to an array, so I can’t just pop off the last character. And it's not necessary, so I can at least skip one string->array->string->array dance.

Instead, I’ll do a slice but use the three-dot version so as not to include the last character:

```ruby
seq=seq.slice(0...-1)
```

I’ll also roll back n from where it ended up after I found query[2]. That way I’m looking for query[2] again.
The overall count was either passed into this method or it’s set to the default value. Either way, that happens outside of the loops, so I can just increment that after I go through the inner loop again, if need be.
And even after all this, I still haven’t looked at any other occurrences of query[1]. Fortunately, this is pretty simple to handle:

```ruby
if s_array.count(q) > 1
  i=substring.index(q)
  s=substring.slice(i+1..-1)
  sub_counter(s, query, count)
else
  count
end
```

I could do the “if” statement there on just one line, but just thinking about how many parentheses I’d have to keep track of makes me want to unlearn how to read.
I check for “>1” because I know I’m only calling this method on substrings and those will always have at least one occurrence of the query sequence, which means at least one occurrence of query[1]. And I already got to work on that right away.
So I said above I was creating two arrays from the substring because I thought I might have to use the main one later and didn’t want to recreate it? Well, I found out that wasn’t true, once I settled on this approach. I haven’t refactored yet, but here’s how I could do it:

```ruby
test_array=substring.slice(1..-1).split("")
```

That’s an aside. It’s one extra line of code up top and a somewhat less-readable bit of code at the bottom here. I’ll get to it later.
Anyway, calling #index only returns the index of the *first* occurrence of whatever gets passed in. That’s handy here, though: I know there’s another one out there, so I can slice off everything *after* that occurrence and call this method again.
I also need to keep track of the count at this point, so I grab that and hand it on.
And that’s really that. If the next recursion exhausts all the query[1]’s in this substring, then it’ll hit the “else” here and return the count as it stands.
That, in turn, will bounce up to the main method, into the #collect I’m calling, and that’ll store the value, then move on to the next substring.
And then, once this has been done for every substring, back up on line 30, I add them all together using the #reduce(:+) method.
Done and done.

## Recap
So this is how this works at present:

+ The string I’m checking for gets cut up into smaller ones, beginning where the query does and containing the rest of the query sequence at least once. This is all saved in an array.
+ Every string in that array is checked for every occurrence of the rest of the sequence, regardless of whether any of those characters occur adjacent to each other.
+ The sum of each of those checks is collected in an array and then all the values are added together.

Sounds so simple, right?

## Next Steps
+ First, adjust sub_counter, somewhere beginning around line 58, so it doesn’t recurse *only* for the second character in the query string. It really needs to be expandable, so it can keep checking for everything between the first and the next-to-last characters in the sequence.
+ Google a little bit harder to find an example of this question as I understood it. There are a lot of moving parts here, and I suspect that it’s just been so long since I studied any kind of mathematics that I’m not recognizing that this problem is an example of that kind of formula. But I gotta tell you, I’ve spent some time hunting around and I haven’t found exactly this issue yet. Seems like the requirement that I include non-adjacent instances of each part of the query sequence is making the Googling as tricky as it did the coding (seriously, if it was just finding the exact sequence, adjacent, it’s like ten characters of code or something).
+ Take more detailed notes next time something like this comes up. I happened to be running out of time when I heard about it, so I asked as many questions as I could, but then I was also trying to remember to think out loud. They say you should do that in technical interviews. But what you’re looking at right now is what I do instead of thinking out loud, so it’s something to get used to.
+ High-five myself for getting in some recursion practice. After not doing it for a couple months, really, I’ve been doing a lot of it. I need to get better.
+ Figure out the big-O time complexity of this thing, which I think is O(mygodthatsinefficient), and get better at it.

But for now, I’m stopping, because this is a singleton problem—it’s not part of a project I’m working on, it’s not something I need to refine *right now* for production, and I need to find a job. Which looking for those is less fun than feeling my way through problems I haven’t tried to code out, but more important right now. And a brother gotta sleep.