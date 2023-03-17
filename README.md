# 4k Weeks: In Search of a Richer Life

Access the [site](https://4kweeks-eight.vercel.app/) here.

## Project Inspiration

This project was inspired by the book [4,000 Weeks: Time Management For Mortals](https://www.goodreads.com/en/book/show/54785515) by Oliver Burkeman. 

Here are some key quotes that inspired me as I built this:

```"The average human lifespan is absurdly, insultingly brief. Assuming you live to be eighty, you have just over four thousand weeks."```

```"Productivity is a trap. Becoming more efficient just makes you more rushed, and trying to clear the decks simply makes them fill up again faster.”```

```“The real measure of any time management technique is whether or not it helps you neglect the right things.”```

## Web app overview

* On the site, input your age to see how many weeks you have left. 
* If you input your phone number, **you will receive no more than two text messages**; no weekly SMS messages are actually sent in this project, though most of the architecture is there for it.
* Go and live a rich, intentionally neglectful life!

## Known Issues / Future Goals

Occasionally Vercel's cloud functions fail to load, forcing the user to refresh the site to access the content. I'm confident this is my fault, but I'm not sure what's causing this issue or how to fix it. (My suspicion is it's something with the way Sveltekit renders JS serverside => clientside.) Sorry about this! Refreshing the page should fix this problem.

I have no current plans to actually send weekly messages, but I'd be happy to collaborate and add this functionality if someone else has the drive. There are no other implementations plans for this project.

## My project motivations

As an employee of Twilio Segment, I wanted to get the experience of developing with the Twilio SMS api and CDP. This product leverages the NodeJS Twilio implementation and both client- and server-side Segment implementations. An initial journey using Twilio Engage Premier's SMS functionality also sends one message, and it was exciting to explore that during that product beta. I also wanted to experiment with building a full-stack app, and I chose SvelteKit as my framework, with a DB hosted on Supabase and the project hosted on Vercel. (The DB is probably inactive if you're testing this, due to the free tier limitations. Your experience might be slightly degraded as a result of this.)

## Thanks
Thanks to Twilio for the free SMS credits and the sandbox Segment account. <3 to Andy Mills for supporting my exploration (occasionally on company time).

