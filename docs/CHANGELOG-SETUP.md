# Changelog Content Type Setup

## Overview

The Changelog collection type has been created to manage product updates, feature announcements, and release notes for Carvetka.

## File Structure

```
src/api/changelog/
├── content-types/
│   └── changelog/
│       └── schema.json          # Content type schema definition
├── controllers/
│   └── changelog.js             # API controller
├── routes/
│   └── changelog.js             # API routes
└── services/
    └── changelog.js             # Business logic service
```

## Schema Definition

The changelog content type includes the following fields:

### Required Fields
- **title** (string, max 255 chars) - The changelog entry title
- **slug** (UID, auto-generated from title) - URL-friendly identifier
- **description** (text, max 500 chars) - Summary of the update
- **content** (richtext) - Full changelog entry in Markdown

### Optional Fields
- **tags** (JSON array) - Categorization tags (e.g., ["Feature", "AI", "Mobile"])
- **featured** (boolean, default: false) - Highlight important updates
- **image** (media, images only) - Featured image for the entry

### System Fields (Auto-managed by Strapi)
- **publishedAt** - Publication timestamp
- **createdAt** - Creation timestamp
- **updatedAt** - Last modification timestamp

## Setting Up Permissions

After the Strapi server restarts and recognizes the new content type:

1. Go to **Settings** → **Roles** → **Public**
2. Under **Changelog** permissions, enable:
   - `find` - Allows listing all published changelogs
   - `findOne` - Allows fetching individual changelog entries

3. Save the permissions

## Creating Your First Changelog Entry

1. Go to **Content Manager** → **Changelog**
2. Click **Create new entry**
3. Fill in the required fields:
   - Title: "Introducing Your AI Mechanic - Ask Unlimited Questions About YOUR Car"
   - Description: "We're excited to announce our biggest update yet..."
   - Content: Write your full announcement in Markdown
   - Tags: `["Feature", "AI", "Major Release"]`
   - Featured: Check this box
   - Image: Upload a screenshot or graphic

4. Click **Save** to create a draft
5. Click **Publish** when ready to make it live

## API Endpoints

Once published, the changelog will be available at:

### List all changelogs
```
GET /api/changelogs?populate=*&sort=publishedAt:desc
```

### Get single changelog by slug
```
GET /api/changelogs?populate=*&filters[slug][$eq]=your-slug-here
```

### Pagination
```
GET /api/changelogs?populate=*&pagination[page]=1&pagination[pageSize]=20
```

## Frontend Integration

The Next.js app already has the following pages configured:

- `/changelog` - Listing page (shows all published entries)
- `/changelog/[slug]` - Individual entry page

These pages will automatically fetch data from the Strapi API once entries are published.

## Content Guidelines

### Title Best Practices
- Be descriptive and benefit-focused
- Keep under 100 characters
- Focus on user value

### Description Best Practices
- 1-2 sentences summarizing the update
- 150-300 characters recommended
- Focus on benefits, not technical details

### Content Best Practices
- Use Markdown formatting (headings, lists, bold, links)
- Include screenshots or images
- Add clear CTAs (call-to-actions)
- Break up long content with headings
- Use emojis sparingly

### Tags
Common tag examples:
- `["Feature"]` - New functionality
- `["Improvement"]` - Enhancement to existing feature
- `["Bug Fix"]` - Fixed issues
- `["AI"]` - AI-related updates
- `["Mobile"]` - Mobile app updates
- `["Performance"]` - Speed/performance improvements
- `["Security"]` - Security updates
- `["Breaking Change"]` - Changes that may affect users

## Next Steps

1. Start the Strapi development server:
   ```bash
   cd /Users/aidar/Code/strapi-cloud-template-blog-ac01fc1d41
   npm run develop
   ```

2. The admin panel will be available at `http://localhost:1337/admin`

3. Set up the permissions as described above

4. Create your first changelog entry

5. Deploy to Strapi Cloud to make it live

## Deployment

When deploying to Strapi Cloud:

1. Commit the new changelog files:
   ```bash
   git add src/api/changelog/
   git add docs/CHANGELOG-SETUP.md
   git commit -m "Add changelog content type"
   git push
   ```

2. Strapi Cloud will automatically detect the changes and rebuild

3. Set up permissions in the production admin panel

4. Create your changelog entries

## Troubleshooting

### Content type not showing in admin?
- Restart the Strapi server
- Clear the `.strapi` cache folder
- Rebuild the admin: `npm run build`

### API returning 403 Forbidden?
- Check that public permissions are enabled for `find` and `findOne`
- Ensure the entry is **Published** (not Draft)

### Images not loading?
- Check that the upload plugin has public permissions
- Verify CORS settings in `config/middlewares.js`

## Related Documentation

- [Strapi Content-Type Builder](https://docs.strapi.io/dev-docs/backend-customization/models)
- [Strapi API Reference](https://docs.strapi.io/dev-docs/api/rest)
- Frontend integration: `/Users/aidar/Code/carvetka/docs/strapi-changelog-setup.md`
