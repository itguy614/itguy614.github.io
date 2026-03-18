# CLAUDE.md

## Project Overview

Jekyll blog hosted on GitHub Pages. Theme: `bulma-clean-theme` (v1.0.0). Content focuses on RFID technology for pharmaceuticals.

- **Site URL:** https://wolfienet.com
- **Ruby version:** 3.4.4 (see `.ruby-version`)
- **Jekyll version:** ~> 4.4.1

## Local Development

### Prerequisites

- Ruby 3.4.4 (use rbenv, asdf, or similar)
- Bundler (`gem install bundler`)

### Install Dependencies

```bash
bundle install
```

### Build the Site

```bash
bundle exec jekyll build
```

Output goes to `_site/`.

### Serve Locally

```bash
bundle exec jekyll serve
```

Site available at http://localhost:4000. Livereload is enabled.

### Production Build

```bash
JEKYLL_ENV=production bundle exec jekyll build
```

## Testing

No automated test framework is configured. Verify changes by:

1. **Build check** — `bundle exec jekyll build` should complete without errors
2. **Local preview** — `bundle exec jekyll serve` and review in browser at http://localhost:4000
3. **HTML validation** — install `html-proofer` gem and run against `_site/` if needed:
   ```bash
   bundle exec htmlproofer ./_site --disable-external
   ```

## Deployment

Automated via GitHub Actions (`.github/workflows/jekyll.yml`). Pushing to `master` triggers a build and deploy to GitHub Pages.

## Project Structure

```
_posts/          # Blog posts (Markdown)
_includes/       # Reusable HTML partials
_data/           # Data files (navigation.yml, series config)
pages/           # Static pages (home, contact, blog index)
assets/          # CSS (SCSS) and images
blog/            # Blog index page
_config.yml      # Jekyll configuration
```

## Content Conventions

- **Permalink format:** `/:year/:title`
- **Pagination:** 5 posts per page
- **Markdown:** Kramdown with GitHub Flavored Markdown, syntax highlighting via Rouge
- **Posts** go in `_posts/` with filename format `YYYY-MM-DD-title.md`
