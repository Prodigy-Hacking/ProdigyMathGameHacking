# Contributing

### Code of Conduct

See [this](https://github.com/Prodigy-Hacking/ProdigyMathGameHacking/blob/master/CODE_OF_CONDUCT.md) for the main Code of Conduct file.

<details>
<summary>Show Code of Conduct file</summary>
  https://github.com/Prodigy-Hacking/ProdigyMathGameHacking/blob/master/CODE_OF_CONDUCT.md
<br>

# Citizen Code of Conduct

## Purpose (This doesn't have anything to do with our hacking standards)

We are not trying to ruin Prodigy Math Game; we want to fix it. However, Prodigy has ignored *all* of our security reports, and has gone as far as to block a user from their Zendesk support center, simply because they reported hacks. Therefore, we have created this Code of Conduct.

## Code of Conduct

### Under NO circumstances should ANYBODY use these hacks to circumvent the privacy of other users, use explicits within the game, phish, gain access to other accounts without autorization from the original account user, or otherwise go against our purpose.

#### You must not use **any** of the hacks to achieve personal benefit, including but not limited to:
- Real-life currencies
- For the sole purpose of social media followers or other statistics, including but not limited to YouTube viewers, Twitter likes/reposts, and social media followers. **You may make a YouTube video, Twitter post, or other social media post of our hacks if, and only if, you provide credit, state our purpose, link our code of conduct, and link this repository. Do *not* show these hacks without giving a clear method to obtain them. If you are making a YouTube video, follow this format: https://github.com/Prodigy-Hacking/ProdigyMathGameHacking/blob/master/videocredit.md**

#### FAILING TO FOLLOW OUR TERMS WILL RESULT IN LEGAL ACTION
</details>

### Goal
Our main goal in this repository is to bring Prodigy's attention to their game's architecture.
The player object is stored clientside, so "hacking" the gold is as easy as changing a variable.

Since we've started this repository, Prodigy's security has improved by leaps and bounds, but the main issue is still the same;
once you get to the player variable, you can easily change your gold.

Now, we use something called "Redirector" to hack. Our hack comes in three parts.
- Redirector
- Will's Cheat Menu
-Typings

#### Redirector
Redirector was made by Will. Thanks, Will!
It just edits the gamescript so we can bypass any clientside anti-cheats, and expose the special
sauce objects we desire.
Redirector is written in Typescript. It also comes in its own repository!

To build:
```
tsc
```

We usually don't require help with Redirector, but it's pretty important to know.
Because we can edit the game script, we can also import external scripts, such as...

#### WCM (Will's Cheat Menu)
... Will's Cheat Menu.
WCM just looks nice. It allows unexperienced players to use hacks, and unexperienced developers to edit it.
It's a lot easier to edit.

WCM is written in Typescript, then webpack'd.

To build:
```
webpack
```

Pretty simple, right?

#### Typings
We use Typings so we can have pretty pretty Typescript autocompletes!

We will always accept Typings PRs.

### Your contributions are licensed under the MPL 2.0 software license
When you submit anything here, your contributions will be licensesd under [the MPL 2.0 license](https://www.mozilla.org/en-US/MPL/2.0/). Contact a collaborator if this is an issue to you.

### We Develop with GitHub
We use GitHub to host code, to track issues and feature requests, and provide you with this work.
