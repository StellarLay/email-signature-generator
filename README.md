# Email Signature Studio

Reputation House corporate email signature generator built with React, Vite, and Chakra UI.

## Development

```bash
npm install
npm run dev
```

## Checks

```bash
npm run lint
npm run build
```

The “Copy signature” button writes both HTML and plain-text versions to the clipboard. Table layout and inline styles are intentional for compatibility with Gmail, Outlook, and other email clients.

## Email assets

Signature icons use PNG files hosted at absolute public HTTPS URLs because email editors often remove inline SVG. To rebuild the FontAwesome icons and decorative shape from the source SVG:

```bash
npm run assets:email -- /absolute/path/to/shape.svg
```

The command saves the cropped SVG and generated PNG files to `public/email-assets`.
