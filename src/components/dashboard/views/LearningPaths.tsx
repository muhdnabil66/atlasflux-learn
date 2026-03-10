"use client";

import { useState, useEffect } from "react";
import Card from "../../common/Card";
import Modal from "@/components/ui/Modal";
import ReactMarkdown from "react-markdown";
import {
  AcademicCapIcon,
  CheckCircleIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

// ==================== MODULES WITH COMPLETE CONTENT ====================
const moduleContent: Record<string, { title: string; content: string }> = {
  // --- HTML BASICS (24 Modules) ---
  "HTML Basics-1": {
    title: "Introduction to HTML",
    content: `# Introduction to HTML

HTML (HyperText Markup Language) is the standard language for creating web pages. It uses "tags" to build the content structure. Every web page you see is built with HTML, often combined with CSS for styling and JavaScript for interactivity.

HTML documents are plain text files with the \`.html\` extension. They are rendered by web browsers, which parse the markup and display the content accordingly.

## Basic Syntax

- Elements are defined by tags, e.g., \`<tagname>content</tagname>\`.
- Some tags are self-closing, like \`<img>\` or \`<br>\`.
- Tags can have attributes that provide additional information.

\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <title>My First Page</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>This is a paragraph.</p>
</body>
</html>
\`\`\`

The \`<!DOCTYPE html>\` declaration defines that this document is HTML5. The \`<html>\` element is the root. \`<head>\` contains meta-information (like the title), and \`<body>\` holds the visible content.`,
  },
  "HTML Basics-2": {
    title: "The Boilerplate",
    content: `# Basic HTML Structure (Boilerplate)

Every HTML document must have a \`<!DOCTYPE html>\` declaration and the \`<html>\`, \`<head>\`, \`<body>\` elements. This minimal structure is often called the "boilerplate".

## Standard Boilerplate for Modern Websites

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Document</title>
    <!-- Additional meta tags, CSS links, etc. -->
</head>
<body>
    <!-- Page content -->
</body>
</html>
\`\`\`

### Explanation

- \`lang="en"\` specifies the language of the document (English).
- \`charset="UTF-8"\` ensures proper character encoding (supports most characters).
- The viewport meta tag makes the page responsive on mobile devices.
- Always include these for best practices.`,
  },
  "HTML Basics-3": {
    title: "Headings (h1-h6)",
    content: `# Headings

Headings are used to show content hierarchy. \`<h1>\` is the most important (usually the page title), \`<h6>\` the least. Search engines use headings to understand the structure of your content.

\`\`\`html
<h1>Main Heading</h1>
<h2>Subheading</h2>
<h3>Sub-subheading</h3>
<h4>Fourth level</h4>
<h5>Fifth level</h5>
<h6>Sixth level</h6>
\`\`\`

### Best Practices

- Use only one \`<h1>\` per page.
- Do not skip heading levels (e.g., go from \`<h2>\` to \`<h4>\`).
- Headings should be descriptive and reflect the content section.

You can style headings with CSS to change font size, color, etc.`,
  },
  "HTML Basics-4": {
    title: "Paragraphs and Formatting",
    content: `# Paragraphs and Text Formatting

Use \`<p>\` for paragraphs. For bold text, use \`<strong>\` (semantic importance) or \`<b>\` (stylistic bold). For italics, use \`<em>\` (emphasis) or \`<i>\` (alternate voice).

\`\`\`html
<p>This is a normal paragraph.</p>
<p><strong>Bold text with strong importance</strong> and <em>emphasized text</em>.</p>
<p><b>Bold without extra meaning</b> and <i>italic without emphasis</i>.</p>
\`\`\`

Other formatting tags:
- \`<mark>\` highlights text.
- \`<small>\` makes text smaller (e.g., disclaimers).
- \`<del>\` represents deleted text.
- \`<ins>\` represents inserted text.
- \`<sub>\` for subscript, \`<sup>\` for superscript.

\`\`\`html
<p>H<sub>2</sub>O is water. E = mc<sup>2</sup>.</p>
\`\`\``,
  },
  "HTML Basics-5": {
    title: "Unordered Lists",
    content: `# Unordered Lists

Unordered lists are used for items that do not need a specific order. They are created with \`<ul>\` and each list item is wrapped in \`<li>\`.

\`\`\`html
<ul>
    <li>Apple</li>
    <li>Banana</li>
    <li>Cherry</li>
</ul>
\`\`\`

By default, browsers display unordered lists with bullet points. You can change the bullet style with CSS (\`list-style-type\`).

### Nested Lists

You can nest lists inside list items:

\`\`\`html
<ul>
    <li>Fruits
        <ul>
            <li>Apple</li>
            <li>Banana</li>
        </ul>
    </li>
    <li>Vegetables</li>
</ul>
\`\`\``,
  },
  "HTML Basics-6": {
    title: "Ordered Lists",
    content: `# Ordered Lists

Ordered lists are used when the sequence matters. They are created with \`<ol>\` and each item with \`<li>\`. Browsers display numbers by default.

\`\`\`html
<ol>
    <li>First step</li>
    <li>Second step</li>
    <li>Third step</li>
</ol>
\`\`\`

You can change the numbering type with the \`type\` attribute (e.g., \`type="A"\` for uppercase letters, \`type="i"\` for Roman numerals). The \`start\` attribute defines the starting number.

\`\`\`html
<ol type="A" start="3">
    <li>Item C</li>
    <li>Item D</li>
</ol>
\`\`\`

Like unordered lists, ordered lists can also be nested.`,
  },
  "HTML Basics-7": {
    title: "Hyperlinks",
    content: `# Hyperlinks

The \`<a>\` (anchor) tag creates links to other pages or resources. The \`href\` attribute specifies the URL. Links can be absolute (full URL) or relative (within the same site).

\`\`\`html
<a href="https://example.com">Click here to visit Example</a>
<a href="other-page.html">Relative link to another page in the same folder</a>
<a href="#section-id">Jump to a section on the same page</a>
\`\`\`

### Target Attribute

Use \`target="_blank"\` to open the link in a new tab:

\`\`\`html
<a href="https://example.com" target="_blank">Open in new tab</a>
\`\`\`

### Email and Phone Links

\`\`\`html
<a href="mailto:someone@example.com">Email someone</a>
<a href="tel:+1234567890">Call us</a>
\`\`\`

### Title Attribute
Add a tooltip with the \`title\` attribute.

\`\`\`html
<a href="https://example.com" title="Go to Example">Example</a>
\`\`\``,
  },
  "HTML Basics-8": {
    title: "Images",
    content: `# Images

The \`<img>\` tag embeds an image. It is a self-closing tag. The \`src\` attribute is the file path, \`alt\` provides alternative text for accessibility and if the image fails to load.

\`\`\`html
<img src="image.jpg" alt="A beautiful landscape" width="300" height="200">
\`\`\`

### Image Formats
Common web formats: JPEG (photos), PNG (transparency), GIF (animation), SVG (vector), WebP (modern).

### Responsive Images
You can use the \`srcset\` attribute to serve different images based on screen size:

\`\`\`html
<img src="small.jpg"
     srcset="medium.jpg 1000w, large.jpg 2000w"
     alt="Responsive image">
\`\`\`

### Figure and Caption
Use \`<figure>\` and \`<figcaption>\` to associate a caption with an image:

\`\`\`html
<figure>
    <img src="image.jpg" alt="...">
    <figcaption>Caption describing the image.</figcaption>
</figure>
\`\`\``,
  },
  "HTML Basics-9": {
    title: "Tables - Basics",
    content: `# Basic Tables

Tables are used to display data in rows and columns. Use \`<table>\` to create a table, \`<tr>\` for each row, \`<th>\` for header cells, and \`<td>\` for data cells.

\`\`\`html
<table border="1">
    <tr>
        <th>Name</th>
        <th>Age</th>
    </tr>
    <tr>
        <td>Ali</td>
        <td>25</td>
    </tr>
    <tr>
        <td>Sarah</td>
        <td>30</td>
    </tr>
</table>
\`\`\`

### Table Sections
You can group rows with \`<thead>\`, \`<tbody>\`, and \`<tfoot>\`:

\`\`\`html
<table>
    <thead>
        <tr><th>Product</th><th>Price</th></tr>
    </thead>
    <tbody>
        <tr><td>Apple</td><td>$1</td></tr>
        <tr><td>Banana</td><td>$0.5</td></tr>
    </tbody>
    <tfoot>
        <tr><td>Total</td><td>$1.5</td></tr>
    </tfoot>
</table>
\`\`\`

### Spanning Cells
Use \`colspan\` and \`rowspan\` to merge cells:

\`\`\`html
<td colspan="2">Merged columns</td>
\`\`\``,
  },
  "HTML Basics-10": {
    title: "Forms - Introduction",
    content: `# Forms

Forms collect user input and send it to a server. The \`<form>\` element wraps all input controls. Key attributes:
- \`action\`: URL where form data is sent.
- \`method\`: HTTP method (GET or POST).

\`\`\`html
<form action="/submit" method="post">
    <label for="name">Name:</label>
    <input type="text" id="name" name="name">
    
    <label for="email">Email:</label>
    <input type="email" id="email" name="email">
    
    <button type="submit">Submit</button>
</form>
\`\`\`

### Form Controls
Common input types: text, email, password, checkbox, radio, submit, etc. Each input should have a \`name\` attribute; the server receives the data as key-value pairs.

### GET vs POST
- **GET**: Appends data to URL (visible, limited length). Used for searches.
- **POST**: Sends data in the request body (more secure, no size limit). Used for sensitive or large data.`,
  },
  "HTML Basics-11": {
    title: "Input Types",
    content: `# Input Types

HTML5 introduced many input types for better user experience and validation. Here are the most common ones:

\`\`\`html
<!-- Text input -->
<input type="text" placeholder="Enter name">

<!-- Email input (validates email format on supported browsers) -->
<input type="email" placeholder="Email">

<!-- Password (hides characters) -->
<input type="password" placeholder="Password">

<!-- Number with min, max, step -->
<input type="number" min="1" max="10" step="1">

<!-- Checkbox (boolean) -->
<input type="checkbox" id="agree"> <label for="agree">I agree</label>

<!-- Radio buttons (choose one) -->
<input type="radio" name="gender" id="male" value="male">
<label for="male">Male</label>
<input type="radio" name="gender" id="female" value="female">
<label for="female">Female</label>

<!-- Date picker -->
<input type="date">

<!-- Color picker -->
<input type="color">

<!-- File upload -->
<input type="file">

<!-- Range slider -->
<input type="range" min="0" max="100">
\`\`\`

### Placeholder and Value
- \`placeholder\`: hint text inside the field.
- \`value\`: pre-filled value.`,
  },
  "HTML Basics-12": {
    title: "Buttons",
    content: `# Buttons

Buttons are used to trigger actions, such as submitting a form or executing JavaScript. There are two main ways to create buttons:

### \`<button>\` Element
\`\`\`html
<button type="button">Click Me</button>
<button type="submit">Submit Form</button>
<button type="reset">Reset Form</button>
\`\`\`

### \`<input type="submit">\` and \`<input type="button">\`
\`\`\`html
<input type="submit" value="Submit">
<input type="button" value="Click">
<input type="reset" value="Reset">
\`\`\`

### Differences
- \`<button>\` can contain HTML (e.g., images, icons) inside it.
- \`<input>\` is a self-closing tag and its label is set via the \`value\` attribute.

### Styling Buttons
Buttons can be styled with CSS: background, border, padding, hover effects, etc.

\`\`\`html
<button style="background: blue; color: white; padding: 10px;">Styled</button>
\`\`\``,
  },
  "HTML Basics-13": {
    title: "Labels and For",
    content: `# Labels and the 'for' Attribute

Labels improve accessibility by associating descriptive text with an input. Clicking the label focuses the corresponding input.

\`\`\`html
<label for="name">Full Name:</label>
<input type="text" id="name" name="name">
\`\`\`

- The \`for\` attribute must match the \`id\` of the input.
- Without labels, screen readers cannot properly announce the field.

### Implicit Association
You can also wrap the input inside the label:

\`\`\`html
<label>Full Name: <input type="text" name="name"></label>
\`\`\`

This works without \`for\`/\`id\`, but explicit association is more reliable for complex layouts.

### Accessibility
Always use labels for form controls. They also increase the clickable area, which is helpful on touch devices.`,
  },
  "HTML Basics-14": {
    title: "Div and Span",
    content: `# Div and Span

\`<div>\` and \`<span>\` are generic containers used for styling and layout. They have no semantic meaning but are essential for grouping elements.

### \`<div>\` – Block-level
A \`<div>\` takes up the full width available and starts on a new line. It is used to wrap large sections.

\`\`\`html
<div class="container">
    <h2>Section Title</h2>
    <p>Content here...</p>
</div>
\`\`\`

### \`<span>\` – Inline
A \`<span>\` is used to style a part of text or a small inline area.

\`\`\`html
<p>This is <span style="color: red;">important</span> text.</p>
\`\`\`

Both elements are often targeted with CSS classes or IDs. They are crucial for layout techniques like Flexbox and Grid.`,
  },
  "HTML Basics-15": {
    title: "HTML Comments",
    content: `# HTML Comments

Comments are not displayed in the browser. They help developers document the code. Use \`<!-- ... -->\`.

\`\`\`html
<!-- This is a comment -->
<p>This is visible.</p>

<!-- 
    Multi-line
    comment
-->
\`\`\`

### Uses
- Explain complex sections.
- Temporarily disable code (comment out).
- Provide metadata or TODOs.

### Note
Comments can be seen by anyone viewing the page source, so do not put sensitive information inside comments.`,
  },
  "HTML Basics-16": {
    title: "Attributes",
    content: `# Global Attributes

Global attributes can be used on any HTML element. Common ones include:

- \`id\`: Unique identifier for an element.
- \`class\`: Class name(s) for CSS styling.
- \`style\`: Inline CSS.
- \`title\`: Tooltip text on hover.
- \`lang\`: Language of the element's content.
- \`data-*\`: Custom data attributes for storing extra info.

\`\`\`html
<div id="main" class="container" style="color: blue;" title="Tooltip text">
    Content
</div>
<p data-user-id="12345">User info</p>
\`\`\`

### Boolean Attributes
Some attributes are boolean (true if present). Examples: \`disabled\`, \`checked\`, \`readonly\`, \`required\`.

\`\`\`html
<input type="checkbox" checked disabled>
\`\`\``,
  },
  "HTML Basics-17": {
    title: "Semantic HTML - Part 1",
    content: `# Semantic HTML (Part 1)

Semantic elements give meaning to the structure, improving accessibility and SEO. Instead of using \`<div>\` everywhere, use these tags:

- \`<header>\`: introductory content, usually a logo, navigation, heading.
- \`<nav>\`: navigation links.
- \`<footer>\`: footer of a page or section (copyright, contact).
- \`<main>\`: main content of the page (should be unique).

\`\`\`html
<header>
    <h1>My Website</h1>
    <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
    </nav>
</header>
<main>
    <!-- Page-specific content -->
</main>
<footer>
    <p>&copy; 2025 My Website</p>
</footer>
\`\`\`

These elements are block-level and behave like \`<div>\`, but they convey meaning to browsers, assistive technologies, and developers.`,
  },
  "HTML Basics-18": {
    title: "Semantic HTML - Part 2",
    content: `# Semantic HTML (Part 2)

More semantic elements for structuring content:

- \`<article>\`: self-contained composition (blog post, news story).
- \`<section>\`: thematic grouping of content, typically with a heading.
- \`<aside>\`: content tangentially related (sidebar, pull quotes).
- \`<figure>\` and \`<figcaption>\`: for illustrations, diagrams, code snippets.

\`\`\`html
<main>
    <article>
        <h2>Latest News</h2>
        <p>Article content...</p>
    </article>
    <aside>
        <h3>Related Links</h3>
        <ul>
            <li><a href="#">Link 1</a></li>
        </ul>
    </aside>
</main>
\`\`\`

### Why Semantic HTML?
- Better accessibility (screen readers understand the layout).
- Improved SEO (search engines prioritize content).
- Easier to read and maintain code.`,
  },
  "HTML Basics-19": {
    title: "Audio and Video",
    content: `# Audio and Video

HTML5 introduced \`<audio>\` and \`<video>\` elements for embedding media without plugins.

### Audio
\`\`\`html
<audio controls>
    <source src="song.mp3" type="audio/mpeg">
    <source src="song.ogg" type="audio/ogg">
    Your browser does not support the audio element.
</audio>
\`\`\`
Attributes: \`controls\` (play/pause/volume), \`autoplay\`, \`loop\`, \`muted\`.

### Video
\`\`\`html
<video controls width="400" poster="thumbnail.jpg">
    <source src="video.mp4" type="video/mp4">
    <source src="video.webm" type="video/webm">
    <track src="subtitles_en.vtt" kind="subtitles" srclang="en" label="English">
    Your browser does not support video.
</video>
\`\`\`

### Providing Multiple Sources
Use multiple \`<source>\` tags for different formats to ensure cross-browser compatibility. The \`<track>\` element adds subtitles or captions.`,
  },
  "HTML Basics-20": {
    title: "iFrames",
    content: `# iFrame

The \`<iframe>\` element embeds another HTML page within the current page. Common uses: embedding YouTube videos, maps, or third-party widgets.

\`\`\`html
<iframe src="https://example.com" width="600" height="400" title="Example"></iframe>
\`\`\`

### Attributes
- \`src\`: URL of the page to embed.
- \`width\`, \`height\`: dimensions.
- \`title\`: important for accessibility (describes content).
- \`allowfullscreen\`: allow fullscreen mode.
- \`sandbox\`: restricts capabilities for security.

### Security
Be cautious when embedding untrusted content. Use \`sandbox\` to limit permissions.

\`\`\`html
<iframe src="https://untrusted.com" sandbox></iframe>
\`\`\`

### Example: YouTube Video
\`\`\`html
<iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID" frameborder="0" allowfullscreen></iframe>
\`\`\``,
  },
  "HTML Basics-21": {
    title: "Meta Tags",
    content: `# Meta Tags

\`<meta>\` tags in the \`<head>\` provide metadata about the HTML document. They are not displayed but are used by browsers, search engines, and social networks.

### Common Meta Tags
\`\`\`html
<head>
    <meta charset="UTF-8"> <!-- Character encoding -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> <!-- Responsive design -->
    <meta name="description" content="A free HTML tutorial for beginners">
    <meta name="keywords" content="HTML, CSS, tutorial">
    <meta name="author" content="John Doe">
    <meta http-equiv="refresh" content="30"> <!-- Refresh page every 30 seconds -->
</head>
\`\`\`

### Open Graph (for social media)
\`\`\`html
<meta property="og:title" content="My Website">
<meta property="og:description" content="Description for sharing">
<meta property="og:image" content="image.jpg">
\`\`\`

### Twitter Cards
Similar meta tags for Twitter.

Meta tags are essential for SEO and user experience.`,
  },
  "HTML Basics-22": {
    title: "Entities",
    content: `# HTML Entities

Entities are used to display reserved characters (like \`<\`, \`>\`, \`&\`) and special symbols that are not on the keyboard. They start with \`&\` and end with \`;\`.

### Common Entities
| Character | Entity Name | Entity Number |
|-----------|-------------|---------------|
| <         | \`&lt;\`      | \`&#60;\`       |
| >         | \`&gt;\`      | \`&#62;\`       |
| &         | \`&amp;\`     | \`&#38;\`       |
| "         | \`&quot;\`    | \`&#34;\`       |
| '         | \`&apos;\`    | \`&#39;\`       |
| non-breaking space | \`&nbsp;\` | \`&#160;\` |

### Examples
\`\`\`html
<p>To display a <div> tag, use &lt;div&gt;.</p>
<p>&copy; 2025 All rights reserved.</p>
<p>&euro; 100 (Euro symbol)</p>
<p>&#x1F600; (Grinning face emoji)</p>
\`\`\`

Entities ensure that your HTML is valid and characters display correctly.`,
  },
  "HTML Basics-23": {
    title: "Form Validation",
    content: `# Form Validation

HTML5 provides built-in validation attributes to ensure user input meets requirements before submission.

### Common Validation Attributes
- \`required\`: field must not be empty.
- \`minlength\` / \`maxlength\`: minimum/maximum number of characters.
- \`min\` / \`max\`: for numeric inputs.
- \`pattern\`: regular expression pattern the value must match.
- \`type\` like \`email\`, \`url\`, \`number\` provide automatic validation.

\`\`\`html
<form>
    <input type="text" required minlength="3" maxlength="20" placeholder="Username">
    <input type="email" required placeholder="Email">
    <input type="password" pattern="[A-Za-z0-9]{8,}" title="At least 8 alphanumeric characters">
    <input type="number" min="18" max="99" step="1">
    <button type="submit">Submit</button>
</form>
\`\`\`

### Validation Feedback
Browsers display default error messages. You can customize them with JavaScript or use the \`title\` attribute to explain the pattern.

### Disabling Validation
Add \`novalidate\` attribute to the \`<form>\` to turn off built-in validation.

\`\`\`html
<form novalidate>
    <!-- ... -->
</form>
\`\`\``,
  },
  "HTML Basics-24": {
    title: "Best Practices",
    content: `# HTML Best Practices

Writing clean, maintainable HTML is crucial for collaboration and performance.

- **Use consistent indentation** (2 or 4 spaces). Makes code readable.
- **Always include \`alt\` attributes for images** – essential for accessibility and SEO.
- **Use semantic elements** (\`<header>\`, \`<nav>\`, \`<article>\`) instead of generic \`<div>\` where appropriate.
- **Ensure responsive design** with the viewport meta tag: \`<meta name="viewport" content="width=device-width, initial-scale=1.0">\`.
- **Validate your HTML** using tools like the W3C validator.
- **Lowercase tags and attributes** (XHTML-style lowercase is conventional).
- **Quote attribute values** – even if not always required, it's safer.
- **Use meaningful \`id\` and \`class\` names** (e.g., \`class="product-card"\` not \`class="box1"\`).
- **Keep the structure logical**: headings in order, forms properly labeled.
- **Test in multiple browsers** to ensure cross-browser compatibility.
- **Minimize inline styles** – use external CSS.
- **Avoid using too many \`<div>\`s** ("divitis"). Use semantic elements.
- **Write comments** for complex sections, but don't overdo it.`,
  },

  // --- CSS STYLING (18 Modules) ---
  "CSS Styling-1": {
    title: "Intro to CSS",
    content: `# Introduction to CSS

CSS (Cascading Style Sheets) is used to style HTML elements – controlling layout, colors, fonts, and responsiveness.

## How CSS Works
CSS selects HTML elements and applies property-value pairs. Example:

\`\`\`css
body {
    background-color: #f0f0f0;
    font-family: Arial, sans-serif;
}

h1 {
    color: navy;
    text-align: center;
}
\`\`\`

## Adding CSS to HTML
Three methods:
1. **External** (recommended): \`<link rel="stylesheet" href="styles.css">\`
2. **Internal**: \`<style>\` inside \`<head>\`.
3. **Inline**: \`style\` attribute on an element.

## Cascade and Specificity
"Cascading" means rules can override each other based on specificity and order. More specific selectors (e.g., IDs) override general ones.`,
  },
  "CSS Styling-2": {
    title: "Selectors",
    content: `# Selectors

CSS selectors target HTML elements to apply styles.

## Basic Selectors
- **Element selector**: \`p { color: blue; }\` targets all \`<p>\`.
- **Class selector**: \`.highlight { background: yellow; }\` targets elements with \`class="highlight"\`.
- **ID selector**: \`#title { font-size: 24px; }\` targets the element with \`id="title"\`.
- **Universal selector**: \`* { margin: 0; }\` targets all elements.

## Combinators
- **Descendant**: \`div p\` selects \`<p>\` inside a \`<div>\`.
- **Child**: \`div > p\` selects \`<p>\` directly inside \`<div>\`.
- **Adjacent sibling**: \`h1 + p\` selects \`<p>\` immediately after an \`<h1>\`.
- **General sibling**: \`h1 ~ p\` selects all \`<p>\` after an \`<h1>\`.

## Attribute Selectors
\`\`\`css
input[type="text"] { border: 1px solid gray; }
a[href^="https"] { color: green; }
\`\`\`

## Pseudo-classes
\`:hover\`, \`:focus\`, \`:nth-child()\` – style based on state or position.

## Pseudo-elements
\`::before\`, \`::after\` – insert content before/after an element.`,
  },
  "CSS Styling-3": {
    title: "Colors",
    content: `# Colors in CSS

Colors can be specified in several formats.

## Color Formats
- **Named colors**: \`red\`, \`blue\`, \`lightgray\` (140+ names).
- **Hexadecimal**: \`#ff0000\` (red), \`#00ff00\` (green), \`#0000ff\` (blue). Shorthand: \`#f00\`.
- **RGB**: \`rgb(255, 0, 0)\` – values 0–255. Also \`rgba(255,0,0,0.5)\` with alpha (opacity).
- **HSL**: \`hsl(0, 100%, 50%)\` (hue 0–360, saturation%, lightness%). Also \`hsla()\`.

\`\`\`css
.color-examples {
    color: #ff0000;
    background-color: rgb(0, 255, 0);
    border-color: hsl(240, 100%, 50%);
    opacity: 0.8; /* whole element transparency */
}
\`\`\`

## Current Color
The keyword \`currentColor\` refers to the element's \`color\` value, useful for borders or SVGs.

\`\`\`css
.button {
    color: blue;
    border: 1px solid currentColor;
}
\`\`\``,
  },
  "CSS Styling-4": {
    title: "Box Model",
    content: `# Box Model

Every HTML element is a rectangular box consisting of:
- **Content**: text, images, etc.
- **Padding**: space between content and border.
- **Border**: line around padding (if any).
- **Margin**: space outside the border (transparent).

\`\`\`css
.box {
    width: 200px;            /* content width */
    padding: 10px;            /* all sides */
    border: 2px solid black;
    margin: 20px;             /* all sides */
}
\`\`\`

## Box Sizing
By default, \`width\` and \`height\` only apply to content area. To include padding and border in the total width, use \`box-sizing: border-box;\`.

\`\`\`css
* {
    box-sizing: border-box; /* recommended */
}
\`\`\`

## Margin Collapse
Vertical margins of adjacent block elements collapse (the larger margin wins). This does not happen with inline or flex items.`,
  },
  "CSS Styling-5": {
    title: "Typography",
    content: `# Typography

CSS provides many properties to style text.

## Font Properties
- \`font-family\`: specifies typeface (e.g., 'Helvetica', sans-serif). Always provide fallbacks.
- \`font-size\`: can be \`px\`, \`em\`, \`rem\`, \`%\`, \`vw\`. \`rem\` is relative to root font-size.
- \`font-weight\`: normal, bold, or numeric 100–900.
- \`font-style\`: normal, italic, oblique.
- \`line-height\`: space between lines (unitless multiplier or length).
- \`text-align\`: left, right, center, justify.
- \`text-decoration\`: underline, overline, line-through.
- \`text-transform\`: uppercase, lowercase, capitalize.

\`\`\`css
body {
    font-family: 'Helvetica', Arial, sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    color: #333;
}
h1 {
    font-size: 2rem;
    text-align: center;
    text-transform: uppercase;
}
\`\`\`

## Web Fonts
Use \`@font-face\` or Google Fonts to include custom fonts.

\`\`\`css
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
body { font-family: 'Roboto', sans-serif; }
\`\`\``,
  },
  "CSS Styling-6": {
    title: "Backgrounds",
    content: `# Backgrounds

Background properties control the background of an element.

## Background Color
\`\`\`css
div {
    background-color: #eaeaea;
}
\`\`\`

## Background Image
\`\`\`css
div {
    background-image: url('pattern.png');
    background-repeat: repeat-x; /* repeat, no-repeat, repeat-y */
    background-position: center top;
    background-size: cover; /* cover, contain, or dimensions */
}
\`\`\`

## Shorthand
\`\`\`css
div {
    background: #eaeaea url('pattern.png') no-repeat center/cover;
}
\`\`\`

## Gradients
Linear and radial gradients are background images.

\`\`\`css
.linear {
    background: linear-gradient(to right, red, blue);
}
.radial {
    background: radial-gradient(circle, yellow, green);
}
\`\`\`

## Multiple Backgrounds
Separate with commas:
\`\`\`css
div {
    background: url('top.png') no-repeat top, url('bottom.png') no-repeat bottom, #ccc;
}
\`\`\``,
  },
  "CSS Styling-7": {
    title: "Display Property",
    content: `# Display Property

The \`display\` property controls how an element is rendered in the layout.

## Common Values
- **block**: Element starts on a new line and takes full width (e.g., \`<div>\`, \`<h1>\`).
- **inline**: Element stays in line, width/height ignored (e.g., \`<span>\`, \`<a>\`).
- **inline-block**: Inline but can have width/height and padding/margin (best of both).
- **none**: Element is removed from the layout (invisible, not occupying space).

\`\`\`css
.block { display: block; }
.inline { display: inline; }
.inline-block { display: inline-block; }
.hidden { display: none; }
\`\`\`

## Other Display Values
- \`flex\` and \`grid\` create powerful layout contexts (see later modules).
- \`table\`, \`table-row\`, \`table-cell\` for table-like behavior.
- \`list-item\` for list items.

### Visibility: hidden
\`visibility: hidden;\` hides the element but it still occupies space, unlike \`display: none;\`.`,
  },
  "CSS Styling-8": {
    title: "Positioning",
    content: `# Positioning

The \`position\` property changes how an element is placed in the document.

## Values
- **static**: Default. Element follows normal flow.
- **relative**: Position relative to its normal position. Use \`top\`, \`left\`, etc., to shift it.
- **absolute**: Removed from flow, positioned relative to nearest positioned ancestor (non-static). If none, relative to \`<html>\`.
- **fixed**: Removed from flow, positioned relative to viewport; stays during scroll.
- **sticky**: Hybrid; behaves like relative until a scroll threshold, then fixed.

\`\`\`css
.relative {
    position: relative;
    top: 20px;
    left: 10px;
}
.absolute {
    position: absolute;
    top: 0;
    right: 0;
}
.fixed {
    position: fixed;
    bottom: 10px;
    right: 10px;
}
.sticky {
    position: sticky;
    top: 0;
}
\`\`\`

### Z-index
Controls stacking order of positioned elements. Higher value appears on top.

\`\`\`css
.modal {
    position: fixed;
    z-index: 1000;
}
\`\`\``,
  },
  "CSS Styling-9": {
    title: "Flexbox Intro",
    content: `# Introduction to Flexbox

Flexbox (Flexible Box Layout) is a one-dimensional layout model for distributing space and aligning items in a container, either in a row or a column.

## Basic Concepts
- **Flex container**: Element with \`display: flex\`.
- **Flex items**: Direct children of the container.
- Main axis and cross axis.

\`\`\`css
.container {
    display: flex;
    gap: 10px; /* space between items */
}
.item {
    flex: 1; /* each item grows equally */
}
\`\`\`

## Direction
\`flex-direction\` defines the main axis:
- \`row\` (default), \`row-reverse\`
- \`column\`, \`column-reverse\`

\`\`\`css
.container {
    flex-direction: column;
}
\`\`\`

## Wrapping
\`flex-wrap\` controls whether items wrap onto multiple lines.

\`\`\`css
.container {
    flex-wrap: wrap;
}
\`\`\`

Flexbox is ideal for navigation bars, card layouts, and centering elements.`,
  },
  "CSS Styling-10": {
    title: "Flexbox Alignment",
    content: `# Flexbox Alignment

Flexbox provides powerful alignment properties for both main and cross axes.

## Main Axis Alignment (\`justify-content\`)
- \`flex-start\` (default), \`flex-end\`, \`center\`
- \`space-between\`: equal space between items
- \`space-around\`: space around each item
- \`space-evenly\`: equal space around all items

## Cross Axis Alignment (\`align-items\`)
- \`stretch\` (default), \`flex-start\`, \`flex-end\`, \`center\`, \`baseline\`

## Individual Item Alignment (\`align-self\`)
Overrides \`align-items\` for a specific item.

\`\`\`css
.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 200px;
}
.item.special {
    align-self: flex-end;
}
\`\`\`

## Gap
\`gap\`, \`row-gap\`, \`column-gap\` set spacing between items (supported in modern browsers).

\`\`\`css
.container {
    display: flex;
    gap: 20px;
}
\`\`\``,
  },
  "CSS Styling-11": {
    title: "CSS Grid Intro",
    content: `# Introduction to CSS Grid

CSS Grid is a two-dimensional layout system that handles rows and columns simultaneously. It's perfect for complex page layouts.

## Basic Grid
\`\`\`css
.grid {
    display: grid;
    grid-template-columns: 1fr 1fr; /* two equal columns */
    gap: 20px;
}
\`\`\`

### Terminology
- **Grid container**: element with \`display: grid\`.
- **Grid items**: direct children.
- **Grid lines**: the dividing lines.
- **Grid tracks**: rows or columns.
- **Grid cell**: intersection of a row and column.

## Defining Columns and Rows
- \`grid-template-columns\`: e.g., \`100px 1fr 2fr\`
- \`grid-template-rows\`: e.g., \`200px auto\`
- \`fr\` unit represents a fraction of available space.

\`\`\`css
.grid {
    display: grid;
    grid-template-columns: 200px 1fr 1fr;
    grid-template-rows: 100px 200px;
    gap: 10px;
}
\`\`\``,
  },
  "CSS Styling-12": {
    title: "Grid Areas",
    content: `# Grid Areas

Grid areas allow you to name sections of your grid for easier placement.

## Defining Areas
Use \`grid-template-areas\` to assign names to cells. Then assign items with \`grid-area\`.

\`\`\`css
.layout {
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-template-rows: auto 1fr auto;
    grid-template-areas: 
        "header header"
        "sidebar main"
        "footer footer";
    gap: 10px;
}
.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }
\`\`\`

Each row is a string of area names. Use a dot (\`.\`) for an empty cell.

### Example
\`\`\`html
<div class="layout">
    <header class="header">Header</header>
    <aside class="sidebar">Sidebar</aside>
    <main class="main">Main</main>
    <footer class="footer">Footer</footer>
</div>
\`\`\`

Grid areas make layouts intuitive and easy to modify.`,
  },
  "CSS Styling-13": {
    title: "Media Queries",
    content: `# Media Queries

Media queries allow you to apply CSS rules based on device characteristics, such as screen width, orientation, or resolution. They are the foundation of responsive design.

## Syntax
\`\`\`css
@media (condition) {
    /* CSS rules */
}
\`\`\`

### Common Conditions
- \`max-width\`: styles apply if viewport width is less than or equal to value.
- \`min-width\`: styles apply if viewport width is greater than or equal to value.
- \`orientation: portrait\` or \`landscape\`.
- \`hover: hover\` (device supports hover).

\`\`\`css
/* Base styles for mobile first */
body { font-size: 14px; }

/* Tablet and up */
@media (min-width: 768px) {
    body { font-size: 16px; }
    .sidebar { display: block; }
}

/* Desktop */
@media (min-width: 1024px) {
    .container { max-width: 960px; margin: auto; }
}
\`\`\`

### Combining Conditions
Use \`and\`, \`or\` (\`,\`), \`not\`.

\`\`\`css
@media (min-width: 768px) and (orientation: landscape) { ... }
\`\`\`

Always test on real devices or browser dev tools.`,
  },
  "CSS Styling-14": {
    title: "Transitions",
    content: `# Transitions

CSS transitions smoothly animate changes in CSS properties over a given duration.

## Basic Syntax
\`\`\`css
.element {
    property: value;
    transition: property duration timing-function delay;
}
\`\`\`

### Example
\`\`\`css
.button {
    background-color: blue;
    transition: background-color 0.3s ease;
}
.button:hover {
    background-color: red;
}
\`\`\`

## Multiple Properties
\`\`\`css
.box {
    width: 100px;
    height: 100px;
    transition: width 0.5s, height 0.5s, background-color 1s;
}
.box:hover {
    width: 200px;
    height: 200px;
    background-color: green;
}
\`\`\`

### Timing Functions
- \`ease\`, \`linear\`, \`ease-in\`, \`ease-out\`, \`ease-in-out\`
- \`cubic-bezier(n,n,n,n)\` for custom curves.

### Delay
\`transition-delay\` specifies when the transition starts.

Transitions work on animatable properties (e.g., color, size, position).`,
  },
  "CSS Styling-15": {
    title: "Animations",
    content: `# Animations

CSS animations allow more complex, keyframe-based animations compared to transitions.

## Keyframes
Define animation stages with \`@keyframes\`.

\`\`\`css
@keyframes slidein {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100px); opacity: 0.5; }
}

/* or with percentages */
@keyframes bounce {
    0% { transform: translateY(0); }
    50% { transform: translateY(-30px); }
    100% { transform: translateY(0); }
}
\`\`\`

## Applying Animation
\`\`\`css
.element {
    animation-name: slidein;
    animation-duration: 2s;
    animation-timing-function: ease;
    animation-delay: 0s;
    animation-iteration-count: infinite; /* or a number */
    animation-direction: alternate; /* normal, reverse, alternate, alternate-reverse */
}
\`\`\`

### Shorthand
\`\`\`css
.element {
    animation: slidein 2s ease 0s infinite alternate;
}
\`\`\`

### Animation Events
JavaScript can listen for \`animationstart\`, \`animationend\`, \`animationiteration\`.

Use animations for attention-grabbing effects, loading spinners, etc.`,
  },
  "CSS Styling-16": {
    title: "Pseudo-classes",
    content: `# Pseudo-classes

Pseudo-classes target elements based on their state or position.

## Common Pseudo-classes
- **\`:hover\`** – when mouse over.
- **\`:focus\`** – when element has focus (e.g., input).
- **\`:active\`** – during click.
- **\`:visited\`** – link already visited.
- **\`:link\`** – unvisited link.
- **\`:first-child\`** – first child of its parent.
- **\`:last-child\`** – last child.
- **\`:nth-child(n)\`** – nth child (e.g., \`:nth-child(odd)\`).
- **\`:not(selector)\`** – elements not matching selector.
- **\`:checked\`** – checked checkbox/radio.
- **\`:disabled\`** – disabled form element.

\`\`\`css
a:hover { color: red; }
input:focus { border-color: blue; }
tr:nth-child(even) { background: #f2f2f2; }
input:not(:placeholder-shown) { border-color: green; }
\`\`\`

## Pseudo-classes vs Pseudo-elements
Pseudo-elements (\`::before\`, \`::after\`) style a specific part of an element, while pseudo-classes target entire elements based on state.`,
  },
  "CSS Styling-17": {
    title: "Variables",
    content: `# CSS Variables

CSS variables (custom properties) allow you to store values and reuse them throughout your stylesheet. They are especially useful for themes and maintainability.

## Defining Variables
Variables are defined inside a selector, typically \`:root\` for global scope. They start with \`--\`.

\`\`\`css
:root {
    --primary-color: #3498db;
    --secondary-color: #2ecc71;
    --padding: 10px;
    --font-size: 16px;
}
\`\`\`

## Using Variables
Use the \`var()\` function.

\`\`\`css
.button {
    background-color: var(--primary-color);
    padding: var(--padding);
    font-size: var(--font-size);
}

.alert {
    background-color: var(--secondary-color);
}
\`\`\`

### Fallback Values
You can provide a fallback if the variable is not defined:

\`\`\`css
.text {
    color: var(--text-color, black);
}
\`\`\`

## Changing Variables with JavaScript
\`\`\`js
document.documentElement.style.setProperty('--primary-color', 'red');
\`\`\`

Variables are inherited and can be scoped to specific elements, enabling component-level theming.`,
  },
  "CSS Styling-18": {
    title: "CSS Frameworks",
    content: `# CSS Frameworks

Frameworks provide pre-written CSS (and sometimes JavaScript) to speed up development and ensure consistency.

## Popular Frameworks

### Tailwind CSS
Tailwind is a utility-first framework. You apply classes directly in HTML.

\`\`\`html
<div class="p-4 bg-blue-500 text-white rounded shadow-lg">
    Styled with Tailwind
</div>
\`\`\`

### Bootstrap
Bootstrap provides components (navbar, cards, modals) and a responsive grid.

\`\`\`html
<button class="btn btn-primary">Primary Button</button>
<div class="container">
    <div class="row">
        <div class="col-md-6">Column</div>
    </div>
</div>
\`\`\`

### Other Frameworks
- **Bulma**: modern, Flexbox-based.
- **Foundation**: responsive, accessible.
- **Materialize**: implements Material Design.

## Pros and Cons
**Pros**: rapid development, cross-browser consistency, community support.
**Cons**: extra learning curve, may include unused code (but can be customized), less design uniqueness.

Choose a framework based on project needs and team preference.`,
  },

  // --- JAVASCRIPT (12 Modules) ---
  "JavaScript-1": {
    title: "JS Introduction",
    content: `# Introduction to JavaScript

JavaScript is a high-level, interpreted programming language that adds interactivity to web pages. It can manipulate HTML and CSS, handle events, communicate with servers, and much more.

## Where JavaScript Runs
- **Client-side**: In the browser (all modern browsers have JavaScript engines).
- **Server-side**: Using Node.js (runtime outside browser).

## Your First JavaScript
\`\`\`html
<!DOCTYPE html>
<html>
<body>
    <script>
        console.log("Hello, world!");
        alert("Welcome to JavaScript!");
    </script>
</body>
</html>
\`\`\`

## Syntax Basics
- Statements end with semicolons (optional but recommended).
- Case-sensitive.
- Comments: \`// single line\` or \`/* multi-line */\`.

## Including JavaScript
- Inline \`<script>\` tag.
- External file: \`<script src="script.js"></script>\`.

JavaScript is a versatile language with features like functions, objects, and asynchronous programming.`,
  },
  "JavaScript-2": {
    title: "Variables",
    content: `# Variables

Variables store data values. In modern JavaScript, use \`let\` and \`const\` (avoid \`var\` due to scoping issues).

## Declaring Variables
\`\`\`js
let name = "Ali";           // can be reassigned
const age = 25;             // cannot be reassigned
var oldWay = "avoid using"; // function-scoped, hoisted
\`\`\`

### let
- Block-scoped.
- Can be updated but not re-declared in same scope.

### const
- Block-scoped.
- Must be initialized at declaration.
- Cannot be reassigned, but if it's an object or array, its properties/elements can be modified.

\`\`\`js
const person = { name: "Ali" };
person.name = "Sarah"; // allowed
// person = {}; // error
\`\`\`

## Variable Naming
- Can contain letters, digits, underscores, dollar signs.
- Cannot start with a digit.
- Use camelCase by convention.

## Hoisting
\`var\` declarations are hoisted (moved to top) and initialized with \`undefined\`. \`let\` and \`const\` are hoisted but not initialized (Temporal Dead Zone).`,
  },
  "JavaScript-3": {
    title: "Data Types",
    content: `# Data Types

JavaScript has dynamic typing: variables can hold values of any type without type declarations.

## Primitive Types
- **string**: \`"Hello"\`, \`'world'\`, \`\`template\`\`.
- **number**: integers, floats, \`Infinity\`, \`NaN\`.
- **boolean**: \`true\` or \`false\`.
- **null**: intentional absence of value.
- **undefined**: variable declared but not assigned.
- **symbol** (ES6): unique identifier.
- **bigint**: for large integers.

## Reference Types
- **object**: \`{ name: "Ali", age: 25 }\`
- **array**: \`["apple", "banana"]\` (actually objects)
- **function**: \`function() {}\` (also objects)

\`\`\`js
let text = "Hello";
let number = 42;
let bool = true;
let empty = null;
let notDefined;
let id = Symbol("id");
let big = 12345678901234567890n;

let fruits = ["apple", "banana"];
let person = { name: "Ali", age: 25 };
\`\`\`

## typeof Operator
\`\`\`js
typeof "hello"; // "string"
typeof 42;      // "number"
typeof null;    // "object" (historical bug)
\`\`\``,
  },
  "JavaScript-4": {
    title: "Functions",
    content: `# Functions

Functions are reusable blocks of code. They can take parameters and return values.

## Function Declaration
\`\`\`js
function greet(name) {
    return \`Hello, \${name}!\`;
}

console.log(greet("Ali")); // "Hello, Ali!"
\`\`\`

## Function Expression
Assign a function to a variable.
\`\`\`js
const greet = function(name) {
    return \`Hello, \${name}!\`;
};
\`\`\`

## Parameters and Arguments
- Functions can have default parameters (ES6).
\`\`\`js
function multiply(a, b = 1) {
    return a * b;
}
\`\`\`

## Return Value
If no \`return\`, function returns \`undefined\`.

## Scope
Variables declared inside a function are local to that function.

## First-Class Citizens
Functions can be passed as arguments, returned from other functions (higher-order functions).`,
  },
  "JavaScript-5": {
    title: "Arrow Functions",
    content: `# Arrow Functions

Arrow functions provide a shorter syntax and lexically bind \`this\`. They are anonymous and often used as callbacks.

## Syntax
\`\`\`js
// No parameters
const sayHello = () => console.log("Hello");

// One parameter (parentheses optional)
const double = x => x * 2;

// Multiple parameters
const add = (a, b) => a + b;

// Block body (needs explicit return)
const greet = (name) => {
    const message = \`Hello, \${name}\`;
    return message;
};
\`\`\`

## Differences from Regular Functions
- No own \`this\`, \`arguments\`, \`super\`, or \`new.target\`.
- Cannot be used as constructors (no \`new\`).
- No \`prototype\` property.
- Cannot change \`this\` (it inherits from enclosing scope).

## When to Use
Arrow functions are great for short callbacks, especially in array methods like \`map\`, \`filter\`, \`reduce\`.

\`\`\`js
const numbers = [1, 2, 3];
const squares = numbers.map(n => n * n);
\`\`\``,
  },
  "JavaScript-6": {
    title: "Conditionals",
    content: `# Conditionals

Conditionals control the flow of execution based on boolean conditions.

## if...else
\`\`\`js
let age = 18;
if (age >= 18) {
    console.log("Adult");
} else if (age >= 13) {
    console.log("Teenager");
} else {
    console.log("Child");
}
\`\`\`

## Ternary Operator
Shorthand for simple if...else.
\`\`\`js
let status = age >= 18 ? "Adult" : "Minor";
\`\`\`

## switch
Used when comparing one value against many possibilities.
\`\`\`js
let day = "Monday";
switch (day) {
    case "Monday":
    case "Tuesday":
        console.log("Weekday");
        break;
    case "Saturday":
    case "Sunday":
        console.log("Weekend");
        break;
    default:
        console.log("Invalid day");
}
\`\`\`

### Important
- Use \`break\` to prevent fall-through (except when intentional).
- \`default\` runs if no match.

## Truthy and Falsy
In conditions, values are coerced to boolean. Falsy values: \`false\`, \`0\`, \`""\` (empty string), \`null\`, \`undefined\`, \`NaN\`. Everything else is truthy.`,
  },
  "JavaScript-7": {
    title: "Loops",
    content: `# Loops

Loops repeat code until a condition is met.

## for Loop
\`\`\`js
for (let i = 0; i < 5; i++) {
    console.log(i);
}
\`\`\`

## while Loop
\`\`\`js
let i = 0;
while (i < 5) {
    console.log(i);
    i++;
}
\`\`\`

## do...while Loop
Executes at least once.
\`\`\`js
let i = 0;
do {
    console.log(i);
    i++;
} while (i < 5);
\`\`\`

## for...of Loop (ES6)
Iterates over iterable objects (arrays, strings, maps, sets).
\`\`\`js
let fruits = ["apple", "banana", "cherry"];
for (let fruit of fruits) {
    console.log(fruit);
}
\`\`\`

## for...in Loop
Iterates over enumerable properties of an object (including inherited). Use with caution; mainly for debugging.
\`\`\`js
let person = { name: "Ali", age: 25 };
for (let key in person) {
    console.log(key, person[key]);
}
\`\`\`

## Array Methods for Iteration
\`forEach\`, \`map\`, \`filter\`, \`reduce\` (see module JavaScript-10).`,
  },
  "JavaScript-8": {
    title: "DOM Manipulation",
    content: `# DOM Manipulation

The Document Object Model (DOM) is a tree representation of HTML. JavaScript can select and modify elements.

## Selecting Elements
\`\`\`js
// By ID
element = document.getElementById("myId");

// By class (returns HTMLCollection)
elements = document.getElementsByClassName("myClass");

// By tag name
elements = document.getElementsByTagName("p");

// CSS selectors (single)
element = document.querySelector(".myClass"); // first match

// CSS selectors (all)
elements = document.querySelectorAll("p.highlight"); // NodeList
\`\`\`

## Changing Content
\`\`\`js
element.textContent = "New text"; // plain text
element.innerHTML = "<strong>HTML</strong>"; // parses HTML
\`\`\`

## Changing Styles
\`\`\`js
element.style.color = "blue";
element.style.backgroundColor = "red"; // camelCase
\`\`\`

## Adding and Removing Classes
\`\`\`js
element.classList.add("newClass");
element.classList.remove("oldClass");
element.classList.toggle("active");
\`\`\`

## Creating and Inserting Elements
\`\`\`js
let newDiv = document.createElement("div");
newDiv.textContent = "Hello";
document.body.appendChild(newDiv);

// Insert before another element
let parent = document.getElementById("container");
parent.insertBefore(newDiv, parent.firstChild);
\`\`\`

## Removing Elements
\`\`\`js
element.remove(); // or parent.removeChild(child);
\`\`\``,
  },
  "JavaScript-9": {
    title: "Events",
    content: `# Events

Events are actions that happen in the browser (clicks, key presses, form submissions). JavaScript can listen and respond.

## Adding Event Listeners
\`\`\`js
let button = document.getElementById("myButton");
button.addEventListener("click", function() {
    alert("Button clicked!");
});
\`\`\`

## Common Events
- **mouse**: \`click\`, \`dblclick\`, \`mouseenter\`, \`mouseleave\`
- **keyboard**: \`keydown\`, \`keyup\`, \`keypress\`
- **form**: \`submit\`, \`change\`, \`input\`, \`focus\`, \`blur\`
- **document/window**: \`load\`, \`resize\`, \`scroll\`

## Event Object
Event handler receives an \`event\` object with details.
\`\`\`js
button.addEventListener("click", (e) => {
    console.log(e.target); // element that triggered event
    console.log(e.type);   // "click"
});
\`\`\`

## Preventing Default
For form submission or link clicks, you can prevent the default action.
\`\`\`js
document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    // custom validation
});
\`\`\`

## Event Bubbling and Capturing
Events bubble up from target to ancestors. Use \`stopPropagation()\` to prevent bubbling.

\`\`\`js
e.stopPropagation();
\`\`\`

## Removing Listener
\`\`\`js
button.removeEventListener("click", handler);
\`\`\``,
  },
  "JavaScript-10": {
    title: "Arrays Methods",
    content: `# Array Methods

Arrays have powerful built-in methods for functional programming.

## map()
Creates a new array by applying a function to each element.
\`\`\`js
let numbers = [1, 2, 3];
let doubled = numbers.map(n => n * 2); // [2, 4, 6]
\`\`\`

## filter()
Creates a new array with elements that pass a test.
\`\`\`js
let numbers = [1, 2, 3, 4];
let evens = numbers.filter(n => n % 2 === 0); // [2, 4]
\`\`\`

## reduce()
Reduces the array to a single value (from left to right).
\`\`\`js
let numbers = [1, 2, 3, 4];
let sum = numbers.reduce((acc, curr) => acc + curr, 0); // 10
\`\`\`

## forEach()
Executes a function on each element (no new array).
\`\`\`js
numbers.forEach(n => console.log(n));
\`\`\`

## Other Useful Methods
- \`find()\`: returns first element satisfying condition.
- \`some()\`: checks if any element passes test.
- \`every()\`: checks if all elements pass test.
- \`includes()\`: checks if array contains a value.
- \`sort()\`: sorts array (in-place).
- \`slice()\`: returns a shallow copy of a portion.
- \`splice()\`: changes array by removing/replacing elements.

\`\`\`js
let found = numbers.find(n => n > 2); // 3
let hasEven = numbers.some(n => n % 2 === 0); // true
\`\`\``,
  },
  "JavaScript-11": {
    title: "Async/Await",
    content: `# Async/Await

Async/await is modern syntax for handling promises, making asynchronous code look synchronous.

## async Function
Declare a function with \`async\`, which automatically returns a promise.

\`\`\`js
async function fetchData() {
    return "data";
}
// same as: function fetchData() { return Promise.resolve("data"); }
\`\`\`

## await
\`await\` pauses the execution of the async function until the promise settles. It can only be used inside \`async\` functions.

\`\`\`js
async function getUsers() {
    try {
        let response = await fetch('https://jsonplaceholder.typicode.com/users');
        let users = await response.json();
        console.log(users);
    } catch (error) {
        console.error('Error:', error);
    }
}

getUsers();
\`\`\`

## Error Handling
Use \`try...catch\` to handle errors. If not caught, the promise returned by the async function rejects.

## Parallel Execution
Use \`Promise.all\` to run multiple promises concurrently.

\`\`\`js
async function getMultiple() {
    let [users, posts] = await Promise.all([
        fetch('/users').then(r => r.json()),
        fetch('/posts').then(r => r.json())
    ]);
    console.log(users, posts);
}
\`\`\`

Async/await makes code cleaner and easier to debug than raw promises or callbacks.`,
  },
  "JavaScript-12": {
    title: "ES6+ Features",
    content: `# ES6+ Features

ECMAScript 2015 (ES6) and later versions introduced many improvements.

## let and const
Block-scoped variables (already covered).

## Arrow Functions
Concise syntax (already covered).

## Template Literals
Strings with embedded expressions using backticks.
\`\`\`js
let name = "Ali";
console.log(\`Hello, \${name}!\`); // Hello, Ali!
\`\`\`

## Destructuring
Extract values from arrays or objects.
\`\`\`js
let [a, b] = [1, 2]; // a=1, b=2
let { name, age } = { name: "Ali", age: 25 };
\`\`\`

## Spread and Rest Operators
\`...\` spreads elements or collects arguments.
\`\`\`js
let arr1 = [1, 2];
let arr2 = [...arr1, 3, 4]; // [1,2,3,4]

function sum(...numbers) {
    return numbers.reduce((a,b) => a+b, 0);
}
\`\`\`

## Default Parameters
\`\`\`js
function greet(name = "Guest") { ... }
\`\`\`

## Classes
Syntactic sugar over prototypes.
\`\`\`js
class Person {
    constructor(name) { this.name = name; }
    greet() { console.log(\`Hi, I'm \${this.name}\`); }
}
\`\`\`

## Modules
Export and import code.
\`\`\`js
// lib.js
export const pi = 3.14;
// app.js
import { pi } from './lib.js';
\`\`\`

## Promises
Better async handling (predecessor to async/await).

## And more: \`Map\`, \`Set\`, \`Symbol\`, \`for...of\`, etc.`,
  },

  // --- REACT (10 Modules) ---
  "React-1": {
    title: "Why React?",
    content: `# Why React?

React is a JavaScript library for building user interfaces, developed by Facebook. It is based on components and a virtual DOM for efficient updates.

## Key Concepts
- **Components**: Reusable, self-contained pieces of UI.
- **Virtual DOM**: React creates a lightweight copy of the real DOM, computes differences, and updates only what changed.
- **Declarative**: You describe what the UI should look like based on state, and React handles the updates.

## Advantages
- Reusable components reduce code duplication.
- Huge ecosystem and community.
- Strong performance due to virtual DOM.
- Can be used for web (ReactDOM), mobile (React Native), and desktop.

## Simple Example
\`\`\`jsx
function Greeting() {
    return <h1>Hello, World!</h1>;
}

export default Greeting;
\`\`\`

React is often used with JSX, which allows writing HTML-like syntax in JavaScript.`,
  },
  "React-2": {
    title: "JSX",
    content: `# JSX

JSX is a syntax extension that allows writing HTML-like code inside JavaScript. It is not required but makes React code more readable.

## Basic JSX
\`\`\`jsx
const element = <h1>Hello, {name}!</h1>;
\`\`\`

Curly braces \`{}\` embed JavaScript expressions (variables, functions, etc.).

## JSX Attributes
Use camelCase for attribute names (e.g., \`className\` instead of \`class\`, \`htmlFor\` instead of \`for\`).
\`\`\`jsx
const element = <div className="container" tabIndex="0">Content</div>;
\`\`\`

## JSX Children
JSX can have children, and you can nest elements.
\`\`\`jsx
const element = (
    <div>
        <h1>Title</h1>
        <p>Paragraph</p>
    </div>
);
\`\`\`

## JSX Prevents Injection Attacks
React escapes values embedded in JSX by default, helping prevent XSS.

## JSX is Transpiled
Babel transforms JSX into \`React.createElement()\` calls, which produce plain JavaScript objects.`,
  },
  "React-3": {
    title: "Components",
    content: `# Components

React components let you split the UI into independent, reusable pieces. Two types: function components and class components.

## Function Component (modern)
\`\`\`jsx
function Button() {
    return <button>Click</button>;
}

export default Button;
\`\`\`

## Class Component (legacy)
\`\`\`jsx
import { Component } from 'react';

class Button extends Component {
    render() {
        return <button>Click</button>;
    }
}
\`\`\`

## Composing Components
Components can be used inside other components.
\`\`\`jsx
function App() {
    return (
        <div>
            <Button />
            <Button />
        </div>
    );
}
\`\`\`

## Component Names
Always start with a capital letter. React treats lowercase tags as built-in HTML elements.

## Props
Components receive data via props (read-only). (See next module.)`,
  },
  "React-4": {
    title: "Props",
    content: `# Props

Props (short for "properties") are read-only inputs passed to components. They allow data to flow from parent to child.

## Passing Props
\`\`\`jsx
function App() {
    return <Greeting name="Ali" age={25} />;
}
\`\`\`

## Receiving Props
In function components, props are the first parameter.
\`\`\`jsx
function Greeting(props) {
    return <h1>Hello, {props.name}!</h1>;
}
\`\`\`

## Destructuring Props
Common pattern to make code cleaner.
\`\`\`jsx
function Greeting({ name, age }) {
    return <h1>Hello, {name}, you are {age} years old.</h1>;
}
\`\`\`

## Default Props
You can set default values for props.
\`\`\`jsx
function Greeting({ name = "Guest" }) {
    return <h1>Hello, {name}</h1>;
}
\`\`\`

## children Prop
Components can access nested content via the \`children\` prop.
\`\`\`jsx
function Wrapper({ children }) {
    return <div className="wrapper">{children}</div>;
}

<Wrapper><p>Inside</p></Wrapper>
\`\`\``,
  },
  "React-5": {
    title: "useState Hook",
    content: `# useState Hook

\`useState\` is a React Hook that lets function components have local state.

## Syntax
\`\`\`jsx
const [state, setState] = useState(initialValue);
\`\`\`

- \`state\`: current state value.
- \`setState\`: function to update state.
- \`initialValue\`: value on first render.

## Example: Counter
\`\`\`jsx
import { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click
            </button>
        </div>
    );
}
\`\`\`

## Updating State
- State updates are asynchronous and batched.
- Use the functional update form if new state depends on previous state:
\`\`\`jsx
setCount(prevCount => prevCount + 1);
\`\`\`

## State with Objects
When updating objects, spread the previous state to avoid losing fields.
\`\`\`jsx
const [user, setUser] = useState({ name: '', age: 0 });
setUser({ ...user, name: 'Ali' });
\`\`\``,
  },
  "React-6": {
    title: "useEffect Hook",
    content: `# useEffect Hook

\`useEffect\` handles side effects in function components: data fetching, subscriptions, timers, manually changing the DOM.

## Syntax
\`\`\`jsx
useEffect(() => {
    // effect code
    return () => { /* cleanup */ };
}, [dependencies]);
\`\`\`

## Example: Fetching Data
\`\`\`jsx
import { useState, useEffect } from 'react';

function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('https://api.example.com/users')
            .then(res => res.json())
            .then(data => setUsers(data));
    }, []); // empty array = run only once after mount

    return (
        <ul>
            {users.map(user => <li key={user.id}>{user.name}</li>)}
        </ul>
    );
}
\`\`\`

## Dependencies Array
- No array: effect runs after every render.
- Empty array \`[]\`: runs only once after mount.
- With values: runs only when those values change.

## Cleanup
Return a cleanup function to avoid memory leaks (e.g., remove event listeners, clear timers).

\`\`\`jsx
useEffect(() => {
    const timer = setInterval(() => console.log('Tick'), 1000);
    return () => clearInterval(timer);
}, []);
\`\`\``,
  },
  "React-7": {
    title: "Handling Events",
    content: `# Handling Events

Event handling in React is similar to DOM events but with some differences.

## Syntax
- Event names are camelCase (\`onClick\`, \`onSubmit\`).
- Pass a function as the event handler (not a string).

\`\`\`jsx
function Button() {
    function handleClick() {
        console.log('Clicked');
    }

    return <button onClick={handleClick}>Click</button>;
}
\`\`\`

## Event Object
React passes a synthetic event (wrapper around native event) with consistent properties.

\`\`\`jsx
function Input() {
    function handleChange(e) {
        console.log(e.target.value);
    }
    return <input onChange={handleChange} />;
}
\`\`\`

## Preventing Default
Call \`e.preventDefault()\` inside the handler, not \`return false\`.

\`\`\`jsx
function Form() {
    function handleSubmit(e) {
        e.preventDefault();
        // submit logic
    }
    return <form onSubmit={handleSubmit}>...</form>;
}
\`\`\`

## Passing Arguments
Use an arrow function to pass additional arguments.
\`\`\`jsx
<button onClick={() => handleDelete(id)}>Delete</button>
\`\`\`

## Event Pooling (legacy)
In older React versions, synthetic events were pooled. In React 17+, this is no longer an issue.`,
  },
  "React-8": {
    title: "Conditional Rendering",
    content: `# Conditional Rendering

In React, you can render different UI based on conditions using JavaScript.

## if/else
\`\`\`jsx
function Greeting({ isLoggedIn }) {
    if (isLoggedIn) {
        return <h1>Welcome back!</h1>;
    } else {
        return <button>Log In</button>;
    }
}
\`\`\`

## Ternary Operator
\`\`\`jsx
function Greeting({ isLoggedIn }) {
    return (
        <div>
            {isLoggedIn ? (
                <h1>Welcome back!</h1>
            ) : (
                <button>Log In</button>
            )}
        </div>
    );
}
\`\`\`

## Logical && (Short-circuit)
Renders the right side only if the left is true.
\`\`\`jsx
function Notification({ count }) {
    return (
        <div>
            {count > 0 && <p>You have {count} messages.</p>}
        </div>
    );
}
\`\`\`

## Conditional Rendering with Variables
\`\`\`jsx
function LoginButton({ isLoggedIn }) {
    let button;
    if (isLoggedIn) {
        button = <button>Logout</button>;
    } else {
        button = <button>Login</button>;
    }
    return <div>{button}</div>;
}
\`\`\`

## Preventing Component from Rendering
Return \`null\` to hide a component (it still runs lifecycle hooks).`,
  },
  "React-9": {
    title: "Lists and Keys",
    content: `# Lists and Keys

Rendering lists of data is common. Use \`.map()\` to transform array elements into JSX. Each item needs a unique \`key\` prop.

## Basic List
\`\`\`jsx
function FruitList() {
    const fruits = ['Apple', 'Banana', 'Cherry'];

    return (
        <ul>
            {fruits.map((fruit, index) => (
                <li key={index}>{fruit}</li>
            ))}
        </ul>
    );
}
\`\`\`

## Why Keys?
Keys help React identify which items have changed, are added, or removed. They should be stable, unique, and preferably from data (like an ID). Avoid using array index as key if the list can change (reorder, add/remove).

## Example with IDs
\`\`\`jsx
const todos = [
    { id: 1, text: 'Learn React' },
    { id: 2, text: 'Build something' }
];

function TodoList() {
    return (
        <ul>
            {todos.map(todo => (
                <li key={todo.id}>{todo.text}</li>
            ))}
        </ul>
    );
}
\`\`\`

## Key Must Be Unique Among Siblings
Keys only need to be unique among immediate siblings, not globally.

## Fragments
Sometimes you need to return multiple elements without adding extra DOM nodes. Use \`<></>\` or \`<Fragment>\`.

\`\`\`jsx
function List() {
    return (
        <>
            <li>Item 1</li>
            <li>Item 2</li>
        </>
    );
}
\`\`\``,
  },
  "React-10": {
    title: "React Router",
    content: `# React Router

React Router is a standard library for handling navigation and routing in React applications.

## Installation
\`\`\`bash
npm install react-router-dom
\`\`\`

## Basic Setup
\`\`\`jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function Home() { return <h1>Home</h1>; }
function About() { return <h1>About</h1>; }

function App() {
    return (
        <BrowserRouter>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </BrowserRouter>
    );
}
\`\`\`

## Dynamic Routes
\`\`\`jsx
<Route path="/user/:id" element={<User />} />

// In User component
import { useParams } from 'react-router-dom';
function User() {
    let { id } = useParams();
    return <h1>User {id}</h1>;
}
\`\`\`

## Navigation
Use \`<Link>\` or \`<NavLink>\` for declarative navigation. Programmatic navigation with \`useNavigate\` hook.

\`\`\`jsx
import { useNavigate } from 'react-router-dom';

function Login() {
    let navigate = useNavigate();
    function handleLogin() {
        // after success
        navigate('/dashboard');
    }
    // ...
}
\`\`\`

## Nested Routes
You can nest routes to create layouts.
\`\`\`jsx
<Route path="/dashboard" element={<DashboardLayout />}>
    <Route index element={<DashboardHome />} />
    <Route path="settings" element={<Settings />} />
</Route>
\`\`\`

React Router v6 is the current version with hooks and simplified API.`,
  },

  // --- GIT (8 Modules) ---
  "Git-1": {
    title: "What is Git?",
    content: `# What is Git?

Git is a distributed version control system (VCS) that tracks changes in source code during software development. It was created by Linus Torvalds in 2005 for the Linux kernel.

## Key Concepts
- **Repository (repo)**: A directory that contains your project and its entire history.
- **Commit**: A snapshot of your files at a point in time.
- **Branch**: A parallel version of the repository.
- **Remote**: A copy of the repository hosted on a server (e.g., GitHub).

## Why Git?
- Tracks history – you can revert to any previous state.
- Collaboration – multiple developers can work simultaneously.
- Branching and merging – experiment without breaking the main code.
- Distributed – every developer has a full copy of the history.

## Checking Git Version
\`\`\`bash
git --version
\`\`\`

If not installed, download from [git-scm.com](https://git-scm.com/).`,
  },
  "Git-2": {
    title: "Basic Commands",
    content: `# Basic Git Commands

Here are the essential commands to get started.

## Initializing a Repository
\`\`\`bash
git init
\`\`\`
Creates a new Git repository in the current folder.

## Checking Status
\`\`\`bash
git status
\`\`\`
Shows which files are modified, staged, or untracked.

## Adding Files to Staging
Stage files to prepare for a commit.
\`\`\`bash
git add <file>          # add specific file
git add .               # add all changes (new, modified, deleted)
\`\`\`

## Committing
\`\`\`bash
git commit -m "Your commit message"
\`\`\`
Takes a snapshot of the staged changes.

## Viewing Commit History
\`\`\`bash
git log                 # detailed history
git log --oneline       # compact view
\`\`\`

## Example Workflow
\`\`\`bash
git init
git add .
git commit -m "Initial commit"
\`\`\``,
  },
  "Git-3": {
    title: "Branching",
    content: `# Branching

Branches allow you to diverge from the main line of development and work on features or fixes independently.

## Creating a Branch
\`\`\`bash
git branch new-feature
\`\`\`

## Switching Branches
\`\`\`bash
git checkout new-feature
# or, combined:
git checkout -b new-feature  # create and switch
\`\`\`

In Git 2.23+, you can also use \`git switch\`:
\`\`\`bash
git switch new-feature
git switch -c new-feature   # create and switch
\`\`\`

## Listing Branches
\`\`\`bash
git branch          # local branches (* = current)
git branch -a       # all branches (including remote)
\`\`\`

## Deleting a Branch
\`\`\`bash
git branch -d new-feature   # delete if merged
git branch -D new-feature   # force delete
\`\`\`

## Why Branches?
- Isolate development. \- Enable collaboration via pull requests. \- Experiment without affecting stable code.`,
  },
  "Git-4": {
    title: "Merging",
    content: `# Merging

Merging integrates changes from one branch into another.

## Fast-Forward Merge
If the target branch has not diverged, Git simply moves the pointer forward.
\`\`\`bash
git checkout main
git merge new-feature
\`\`\`

## Three-Way Merge
If branches have diverged, Git creates a new merge commit.
\`\`\`bash
git checkout main
git merge new-feature
\`\`\`

## Merge Conflicts
When the same part of a file is modified differently in both branches, a conflict occurs. Git marks the file with \`<<<<<<<\`, \`=======\`, \`>>>>>>>\`. You must manually resolve, then:
\`\`\`bash
git add <resolved-file>
git commit
\`\`\`

## Aborting a Merge
\`\`\`bash
git merge --abort
\`\`\`

## Merge Strategies
Git automatically chooses a strategy (recursive, octopus, etc.). You can specify options like \`--squash\` to combine all commits into one.

\`\`\`bash
git merge --squash new-feature
\`\`\``,
  },
  "Git-5": {
    title: "GitHub/GitLab",
    content: `# GitHub / GitLab

GitHub and GitLab are web-based hosting services for Git repositories. They add collaboration features like pull requests, issues, and CI/CD.

## Cloning a Remote Repository
\`\`\`bash
git clone https://github.com/user/repo.git
\`\`\`

## Adding a Remote
If you created a local repo, link it to a remote:
\`\`\`bash
git remote add origin https://github.com/user/repo.git
\`\`\`

## Pushing to Remote
\`\`\`bash
git push -u origin main   # -u sets upstream, so next time just \`git push\`
\`\`\`

## Pulling from Remote
\`\`\`bash
git pull                  # fetch and merge
git fetch                 # fetch without merging
\`\`\`

## Viewing Remotes
\`\`\`bash
git remote -v
\`\`\`

## Common Workflow
- Clone or pull latest changes.
- Create a branch.
- Commit changes locally.
- Push branch to remote.
- Open a pull request for review.
- Merge after approval.`,
  },
  "Git-6": {
    title: "Pull Requests",
    content: `# Pull Request (PR)

A pull request (or merge request in GitLab) is a way to propose changes to a codebase. It allows team members to review, discuss, and approve before merging.

## Typical PR Workflow
1. Create a new branch from \`main\` (or \`develop\`).
2. Make changes and commit them.
3. Push the branch to the remote repository.
4. On GitHub/GitLab, open a pull request from your branch to the target branch.
5. Add a description, reviewers, and labels.
6. Reviewers comment and approve.
7. If changes are requested, update the branch (push new commits).
8. Once approved, merge the PR (can be done via UI).
9. Delete the branch (optional).

## PR Best Practices
- Keep PRs small and focused.
- Write a clear title and description.
- Reference issues if applicable (e.g., "Fixes #123").
- Ensure CI checks pass before merging.
- Squash commits if desired to keep history clean.`,
  },
  "Git-7": {
    title: "Resolving Conflicts",
    content: `# Resolving Conflicts

Conflicts happen when Git cannot automatically merge changes because two branches modified the same part of a file.

## How to Resolve
1. Run \`git merge\` (or \`git pull\`) and see conflict message.
2. Open the conflicted file(s). Look for conflict markers:
   \`\`\`
   <<<<<<< HEAD
   code from current branch
   =======
   code from incoming branch
   >>>>>>> branch-name
   \`\`\`
3. Edit the file to keep the desired changes and remove the markers.
4. Save the file.
5. Stage the resolved file: \`git add <file>\`.
6. Commit the merge: \`git commit\` (Git may pre-populate a message).

## Using Merge Tools
You can use graphical tools like \`git mergetool\` (configured with e.g., VS Code, Meld).

## Preventing Conflicts
- Regularly pull changes from the main branch into your feature branch.
- Communicate with team about major changes.
- Keep branches short-lived.`,
  },
  "Git-8": {
    title: "Git Best Practices",
    content: `# Git Best Practices

Adopting good habits with Git improves collaboration and project health.

## Commit Messages
- Write clear, concise messages in imperative mood (e.g., "Add login feature").
- First line under 50 characters, then a blank line, then detailed description if needed.

## Commit Often
Make small, focused commits that represent a single logical change. This makes history easier to understand and revert if necessary.

## Use .gitignore
Create a \`.gitignore\` file to exclude build artifacts, dependencies (node_modules), environment files, and sensitive data.

## Branch Naming
Use consistent naming: \`feature/description\`, \`bugfix/issue-number\`, \`hotfix/critical-fix\`.

## Pull Before Pushing
Always pull the latest changes from the remote before pushing to avoid conflicts.

## Don't Commit Sensitive Data
Never commit passwords, API keys, or personal information. If accidentally committed, rotate credentials and use tools like \`git filter-branch\` or BFG to remove.

## Keep History Clean
Use \`git rebase\` interactively to squash or reorder commits before merging (but avoid rebasing public branches).

## Tag Releases
Use \`git tag\` to mark release points (e.g., \`v1.0.0\`).`,
  },

  // --- TESTING (6 Modules) ---
  "Testing-1": {
    title: "Intro to Testing",
    content: `# Introduction to Testing

Testing is the process of verifying that software works as expected. It helps catch bugs, ensures code quality, and facilitates refactoring.

## Why Test?
- Prevents regressions.
- Documents expected behavior.
- Saves time in the long run.
- Enables confident refactoring.

## Types of Tests
- **Unit Tests**: Test individual functions or components in isolation.
- **Integration Tests**: Test interactions between modules.
- **End-to-End (E2E) Tests**: Test the entire application flow from the user's perspective.
- **Snapshot Tests**: Capture rendered output to detect unexpected changes (common in React).

## Testing Pyramid
- Many unit tests, fewer integration tests, few E2E tests. Unit tests are fast and cheap; E2E tests are slow and brittle.

## Popular JavaScript Testing Tools
- **Jest**: All-in-one testing framework.
- **React Testing Library**: For testing React components.
- **Cypress** / **Playwright**: For E2E testing.
- **Vitest**: Vite-native test runner.`,
  },
  "Testing-2": {
    title: "Unit Testing",
    content: `# Unit Testing

Unit testing involves testing the smallest pieces of code (functions, methods) in isolation.

## Characteristics
- Fast.
- No external dependencies (APIs, databases) – use mocks.
- Test one thing at a time.

## Example with Jest

\`\`\`js
// math.js
export function add(a, b) {
    return a + b;
}

// math.test.js
import { add } from './math';

test('adds 1 + 2 to equal 3', () => {
    expect(add(1, 2)).toBe(3);
});

test('adds negative numbers correctly', () => {
    expect(add(-1, -2)).toBe(-3);
});
\`\`\`

## Assertions
Common Jest matchers:
- \`toBe(value)\` for primitive equality.
- \`toEqual(value)\` for deep equality (objects/arrays).
- \`toBeTruthy()\` / \`toBeFalsy()\`.
- \`toContain(item)\` for arrays/strings.
- \`toThrow()\` for error checking.

## Running Tests
\`\`\`bash
npm test
\`\`\`

Unit tests should be placed near the code they test, often with a \`.test.js\` suffix.`,
  },
  "Testing-3": {
    title: "Jest Framework",
    content: `# Jest Framework

Jest is a delightful JavaScript testing framework developed by Facebook. It works with Babel, TypeScript, Node, React, etc.

## Features
- Zero configuration for most projects.
- Fast and sandboxed.
- Built-in code coverage.
- Snapshot testing.
- Powerful mocking.

## Basic Test Structure
\`\`\`js
test('description', () => {
    // setup
    // execute
    // assert
});

// or using describe to group tests
describe('group name', () => {
    test('test 1', () => { ... });
    test('test 2', () => { ... });
});
\`\`\`

## Setup and Teardown
Jest provides hooks: \`beforeEach\`, \`afterEach\`, \`beforeAll\`, \`afterAll\`.

\`\`\`js
beforeEach(() => {
    // runs before each test
});
\`\`\`

## Mocking
Jest can mock modules or functions.
\`\`\`js
jest.mock('axios');
import axios from 'axios';
axios.get.mockResolvedValue({ data: [...] });
\`\`\`

## Code Coverage
\`\`\`bash
jest --coverage
\`\`\`
Generates a report showing which lines are covered by tests.

## Snapshot Testing
\`\`\`jsx
test('component renders correctly', () => {
    const tree = renderer.create(<Component />).toJSON();
    expect(tree).toMatchSnapshot();
});
\`\`\``,
  },
  "Testing-4": {
    title: "Component Testing",
    content: `# Component Testing

Testing React components ensures they render correctly and respond to user interactions. The React Testing Library is the recommended approach.

## Installation
\`\`\`bash
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event
\`\`\`

## Basic Test
\`\`\`jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

test('button click shows message', async () => {
    render(<Button />);
    const button = screen.getByRole('button', { name: /click/i });
    await userEvent.click(button);
    expect(screen.getByText('Clicked!')).toBeInTheDocument();
});
\`\`\`

## Queries
- \`getBy...\` – throws if not found.
- \`queryBy...\` – returns null if not found.
- \`findBy...\` – returns promise, waits for element (useful for async).

Use queries based on accessibility: \`getByRole\`, \`getByLabelText\`, \`getByPlaceholderText\`, \`getByText\`, etc.

## Assertions
\`@testing-library/jest-dom\` adds helpful matchers:
- \`toBeInTheDocument()\`
- \`toHaveClass()\`
- \`toHaveAttribute()\`
- \`toBeDisabled()\`

## Testing Events
Use \`userEvent\` (more realistic than \`fireEvent\`).

\`\`\`jsx
await userEvent.type(input, 'Hello');
await userEvent.click(button);
\`\`\`

## Mocking Props and Context
You can pass props directly. For context, wrap the component in a provider.`,
  },
  "Testing-5": {
    title: "E2E Testing",
    content: `# End-to-End (E2E) Testing

E2E testing simulates real user scenarios, interacting with the application as a whole, including the UI and backend.

## Tools
- **Cypress**: Fast, reliable, with a great UI.
- **Playwright**: Cross-browser automation.
- **Selenium**: Classic but slower.

## Cypress Example
\`\`\`js
// cypress/e2e/spec.cy.js
describe('Visit Site', () => {
    it('visits the homepage and clicks a button', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Welcome').should('be.visible');
        cy.get('button').click();
        cy.url().should('include', '/dashboard');
    });
});
\`\`\`

## Playwright Example
\`\`\`js
import { test, expect } from '@playwright/test';

test('homepage has title', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await expect(page).toHaveTitle('My App');
});
\`\`\`

## Best Practices
- Keep E2E tests few but critical (core user journeys).
- Run them in CI but possibly against a staging environment.
- Use data-testid attributes to select elements reliably.

\`\`\`html
<button data-testid="submit">Submit</button>
\`\`\`
\`\`\`js
cy.get('[data-testid="submit"]').click();
\`\`\``,
  },
  "Testing-6": {
    title: "TDD",
    content: `# Test-Driven Development (TDD)

TDD is a software development process where you write tests before writing the actual code.

## The TDD Cycle (Red-Green-Refactor)
1. **Red**: Write a failing test for the next piece of functionality.
2. **Green**: Write the minimal code to make the test pass.
3. **Refactor**: Improve the code while keeping tests green.

## Benefits
- Ensures code is testable from the start.
- Encourages simple design.
- Provides immediate feedback.
- Creates a safety net for refactoring.

## Example TDD in JavaScript

**Step 1: Write a failing test**
\`\`\`js
test('adds two numbers', () => {
    expect(add(2, 3)).toBe(5);
});
\`\`\`

**Step 2: Write minimal code**
\`\`\`js
function add(a, b) {
    return a + b;
}
\`\`\`

**Step 3: Refactor** (maybe add error handling, but not needed yet).

## When to Use TDD
- For well-defined requirements.
- When building core logic.
- In pair programming.

It can feel unnatural at first but leads to better code and fewer bugs.`,
  },
};

// Helper to generate modules for each category
function generateModules(categoryName: string, count: number) {
  const modules = [];
  for (let i = 1; i <= count; i++) {
    const id = `${categoryName}-${i}`;
    const custom = moduleContent[id];
    modules.push({
      id,
      title: custom?.title || `${categoryName} Module ${i}`,
      content:
        custom?.content ||
        `# ${categoryName} Module ${i}\n\nContent coming soon.`,
    });
  }
  return modules;
}

// ==================== LEARNING PATH DATA ====================
const pathData = {
  id: 1,
  title: "Frontend Developer",
  description:
    "Master HTML, CSS, JavaScript, and React. Build responsive web applications.",
  level: "Beginner",
  duration: "3 months",
  categories: [
    {
      id: 1,
      name: "HTML Basics",
      description: "Learn the structure of web pages.",
      xp: 100,
      modules: generateModules("HTML Basics", 24),
    },
    {
      id: 2,
      name: "CSS Styling",
      description: "Style your pages with CSS.",
      xp: 150,
      modules: generateModules("CSS Styling", 18),
    },
    {
      id: 3,
      name: "JavaScript Fundamentals",
      description: "Make your pages interactive.",
      xp: 200,
      modules: generateModules("JavaScript", 12),
    },
    {
      id: 4,
      name: "React Introduction",
      description: "Build components and manage state.",
      xp: 250,
      modules: generateModules("React", 10),
    },
    {
      id: 5,
      name: "Version Control (Git)",
      description: "Track changes and collaborate.",
      xp: 120,
      modules: generateModules("Git", 8),
    },
    {
      id: 6,
      name: "Testing Basics",
      description: "Write tests for your code.",
      xp: 180,
      modules: generateModules("Testing", 6),
    },
  ],
};

export default function LearningPaths() {
  const [categories, setCategories] = useState(pathData.categories);
  const [userProgress, setUserProgress] = useState<Record<string, boolean>>({});
  const [loadingProgress, setLoadingProgress] = useState(true);
  const [progressError, setProgressError] = useState<string | null>(null);

  // Module modal
  const [isModuleModalOpen, setIsModuleModalOpen] = useState(false);
  const [currentCategoryId, setCurrentCategoryId] = useState<number | null>(
    null,
  );
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);

  // Category modal (list of modules)
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<
    (typeof pathData.categories)[0] | null
  >(null);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch user progress on mount
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await fetch("/api/user/progress");
        if (!res.ok) throw new Error("Failed to load progress");
        const data = await res.json();
        // Assume API returns { completedModules: string[] }
        const completedMap: Record<string, boolean> = {};
        if (Array.isArray(data.completedModules)) {
          data.completedModules.forEach((id: string) => {
            completedMap[id] = true;
          });
        }
        setUserProgress(completedMap);
      } catch (err: any) {
        setProgressError(err.message);
      } finally {
        setLoadingProgress(false);
      }
    };
    fetchProgress();
  }, []);

  const currentCategory = currentCategoryId
    ? categories.find((c) => c.id === currentCategoryId)
    : null;
  const currentModule = currentCategory
    ? currentCategory.modules[currentModuleIndex]
    : null;

  // Check if a module can be opened (previous modules must be completed)
  const canOpenModule = (category: any, moduleIndex: number) => {
    for (let i = 0; i < moduleIndex; i++) {
      if (!userProgress[category.modules[i].id]) return false;
    }
    return true;
  };

  const openModule = (categoryId: number, moduleIndex: number) => {
    const category = categories.find((c) => c.id === categoryId);
    if (!category) return;
    if (!canOpenModule(category, moduleIndex)) {
      alert("Please finish the previous modules first.");
      return;
    }
    setCurrentCategoryId(categoryId);
    setCurrentModuleIndex(moduleIndex);
    setIsModuleModalOpen(true);
  };

  // Mark current module as completed (API call)
  const completeCurrentModule = async () => {
    if (!currentModule) return;
    if (userProgress[currentModule.id]) return; // already completed

    try {
      const res = await fetch("/api/user/progress/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ moduleId: currentModule.id }),
      });
      if (!res.ok) throw new Error("Failed to mark module as complete");
      const data = await res.json();
      // Update local state optimistically
      setUserProgress((prev) => ({ ...prev, [currentModule.id]: true }));
    } catch (err: any) {
      alert("Error completing module: " + err.message);
    }
  };

  // Go to next module (or finish category)
  const goToNextModule = async () => {
    if (!currentCategory) return;

    // Mark current module as completed (if not already)
    if (currentModule && !userProgress[currentModule.id]) {
      await completeCurrentModule();
    }

    const nextIndex = currentModuleIndex + 1;

    if (nextIndex < currentCategory.modules.length) {
      // Open next module
      setCurrentModuleIndex(nextIndex);
    } else {
      // Category finished – check if all modules are now completed
      const allCompleted = currentCategory.modules.every(
        (mod) => userProgress[mod.id] || mod.id === currentModule?.id,
      );
      if (allCompleted) {
        // Award category XP
        try {
          await fetch("/api/user/category/complete", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              categoryName: currentCategory.name,
              xpEarned: currentCategory.xp,
            }),
          });
          // Trigger achievement check
          await fetch("/api/user/achievements/check", { method: "POST" }).catch(
            (err) => console.error("Failed to check achievements:", err),
          );
        } catch (err) {
          console.error("Failed to award category XP:", err);
        }
        setSuccessMessage(
          `🎉 Category "${currentCategory.name}" completed! You earned ${currentCategory.xp} XP.`,
        );
        setShowSuccessModal(true);
      }
      // Close module modal
      setIsModuleModalOpen(false);
      setCurrentCategoryId(null);
      setCurrentModuleIndex(0);
    }
  };

  const handleCloseModuleModal = () => {
    setIsModuleModalOpen(false);
    setCurrentCategoryId(null);
    setCurrentModuleIndex(0);
  };

  const openCategoryModules = (category: (typeof pathData.categories)[0]) => {
    setSelectedCategory(category);
    setIsCategoryModalOpen(true);
  };

  const closeCategoryModal = () => {
    setIsCategoryModalOpen(false);
    setSelectedCategory(null);
  };

  // Sorting: completed categories go to the top
  const sortedCategories = [...categories].sort((a, b) => {
    const aComp = a.modules.every((m) => userProgress[m.id]);
    const bComp = b.modules.every((m) => userProgress[m.id]);
    if (aComp && !bComp) return -1;
    if (!aComp && bComp) return 1;
    return a.id - b.id;
  });

  if (loadingProgress) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (progressError) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
        <p className="text-red-600 dark:text-red-400">
          Error loading progress: {progressError}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-8">
      <div>
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white flex items-center gap-3">
          <AcademicCapIcon className="h-10 w-10 text-blue-600" />
          {pathData.title}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
          {pathData.description}
        </p>
      </div>

      <div className="grid gap-6">
        {sortedCategories.map((category) => {
          const completedCount = category.modules.filter(
            (m) => userProgress[m.id],
          ).length;
          const progress = Math.round(
            (completedCount / category.modules.length) * 100,
          );
          const allDone = completedCount === category.modules.length;

          return (
            <Card
              key={category.id}
              className={`cursor-pointer transition hover:shadow-lg ${
                allDone ? "border-green-500 bg-green-50/30" : ""
              }`}
              onClick={() => openCategoryModules(category)}
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-2xl font-bold">{category.name}</h2>
                  <p className="text-gray-500">{category.description}</p>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-blue-600">
                    {category.xp} XP
                  </span>
                </div>
              </div>

              <div className="w-full bg-gray-200 dark:bg-gray-700 h-3 rounded-full mb-2">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-gray-500">
                {completedCount} / {category.modules.length} modules completed
              </p>
            </Card>
          );
        })}
      </div>

      {/* Category Modal (shows modules list) */}
      <Modal
        isOpen={isCategoryModalOpen}
        onClose={closeCategoryModal}
        title={selectedCategory?.name || "Category"}
        maxWidth="2xl"
      >
        {selectedCategory && (
          <div className="space-y-6">
            <div>
              <p className="text-gray-600 dark:text-gray-400">
                {selectedCategory.description}
              </p>
              <div className="flex justify-between items-center mt-2">
                <span className="font-mono font-bold text-blue-600">
                  {selectedCategory.xp} XP
                </span>
                <span className="text-sm text-gray-500">
                  {
                    selectedCategory.modules.filter((m) => userProgress[m.id])
                      .length
                  }{" "}
                  / {selectedCategory.modules.length} completed
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mt-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{
                    width: `${
                      (selectedCategory.modules.filter(
                        (m) => userProgress[m.id],
                      ).length /
                        selectedCategory.modules.length) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto p-1">
              {selectedCategory.modules.map((mod, idx) => {
                const done = userProgress[mod.id];
                const locked = !canOpenModule(selectedCategory, idx);
                return (
                  <button
                    key={mod.id}
                    disabled={locked}
                    onClick={() => {
                      closeCategoryModal(); // close category modal, module modal will open
                      openModule(selectedCategory.id, idx);
                    }}
                    className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
                      done
                        ? "bg-green-100 border-green-300"
                        : locked
                          ? "opacity-50 grayscale cursor-not-allowed bg-gray-50"
                          : "bg-white hover:shadow-md border-gray-200"
                    }`}
                  >
                    {done ? (
                      <CheckCircleIcon className="h-6 w-6 text-green-600" />
                    ) : (
                      <div className="h-6 w-6 rounded-full border-2 border-gray-300" />
                    )}
                    <span className="font-medium text-left">{mod.title}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-end">
              <button
                onClick={closeCategoryModal}
                className="px-6 py-2 rounded-xl border font-medium"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Module Content Modal */}
      <Modal
        isOpen={isModuleModalOpen}
        onClose={handleCloseModuleModal}
        title={currentModule?.title || "Module"}
        maxWidth="2xl"
      >
        <div className="space-y-6">
          <div className="prose dark:prose-invert max-h-[70vh] overflow-y-auto p-6 border rounded-2xl bg-gray-50 dark:bg-gray-900">
            <ReactMarkdown>{currentModule?.content || ""}</ReactMarkdown>
          </div>

          <div className="flex justify-between items-center pt-4">
            <span className="text-sm text-gray-400">
              Module {currentModuleIndex + 1} of{" "}
              {currentCategory?.modules.length}
            </span>
            <div className="flex gap-3">
              <button
                onClick={handleCloseModuleModal}
                className="px-6 py-2 rounded-xl border font-medium"
              >
                Cancel
              </button>
              <button
                onClick={goToNextModule}
                className="px-6 py-2 bg-blue-600 text-white rounded-xl font-medium flex items-center gap-2"
              >
                {currentModuleIndex ===
                (currentCategory?.modules.length || 0) - 1
                  ? "Finish Category"
                  : "Next"}
                <ArrowRightIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Congratulations!"
        maxWidth="sm"
      >
        <div className="text-center space-y-4">
          <div className="text-5xl">🏆</div>
          <p className="text-lg font-medium">{successMessage}</p>
          <button
            onClick={() => setShowSuccessModal(false)}
            className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold"
          >
            Continue Learning
          </button>
        </div>
      </Modal>
    </div>
  );
}
