# personal-site

Static personal website with a lightweight posts reader (`posts.html`) and an optional Node server (`server.js`) for newsletter signup + archive listing.

## Posts / chapters

By default, `posts.html` tries (in order):

- `files/fired.txt`
- `files/chapters.txt`
- `files/1pilot.txt` (legacy fallback)

### File format

The first non-empty line is the **post title**.
The second non-empty line can be an optional **date** in `YYYY-MM-DD`.
After that is the post body.

To create chapters, add headings in the body like:

```text
Chapter 1: Mercury

...content...

Chapter 2: Venus

...content...
```

### Navigation behavior

- If `Chapter ...` headings exist, the top bar enables chapter switching.
- If no `?chapter=...` is provided, it defaults to the **latest chapter** (the last chapter in the file).

### Loading a different source file

Remember you can render any file under `/files/` by using:

- `posts.html?file=/files/some-post.txt`

## Local development (optional)

If you want archive listing and signup endpoints locally, run the Node server:

```bash
cd server
npm install
npm start
```

Then open:

- `http://localhost:8000/`

## Repo structure

- `index.html`: homepage
- `posts.html`: posts reader (chapter-aware)
- `archive.html`: archive index (uses `/api/archive/list` if available)
- `server/`: optional Node server for `/api/*` (see `server/server.js`)
- `files/`: site files (favicon, PDFs, post sources like `chapters.txt`)
- `pc/`, `mobile/`: static assets for home scene

