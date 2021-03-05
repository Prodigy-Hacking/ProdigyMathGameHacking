# Redirector Hack

## Reasoning

The Redirector hack was made by [Will](https://github.com/TNThacker2015).

In an effort to make hacking easier, and harder to patch, Will made the redirector hack.
To put it simply, it modifies the game files to make it easier to hack. A little bit of voodoo cheat menus are included, and it's done!
There are some occasional patches/fixes that require you to re-import the redirector json, but it's much better than the old `{Boot}` and `{sprintf}` methods.

## Locally hosting Redirector (Advanced)

If for some reason redirector is down, instead of relying on our hosting for modified game files, you can host it locally!

1. Install Node.js, Git is optional.

2. Download the repository.

    ```bash
    git clone https://github.com/Prodigy-Hacking/Redirector.git
    ```

    You can also download it [here](https://github.com/Prodigy-Hacking/Redirector/archive/master.zip) as a zip file.

3. Install the needed packages and dependencies.

    ```bash
    npm install
    ```

4. Run `index.js` with Node.

    ```bash
    node .
    ```

5. Go to the Redirector Plugin > Edit Redirects. Disable `game.min.js`, and `public-game.min.js`. Enable `Localhost game.min.js`, and `Localhost public.game.min.js`.

6. Profit! Redirector should now be pulling files from `localhost:1337`.
