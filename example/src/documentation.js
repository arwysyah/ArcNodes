import { html, ArcComponent } from "../../src";
import marked from "marked";
import "./css/styles.css";

class Documentation extends ArcComponent {
  constructor(props) {
    super(props);
    this.mutableState = {
      content: "",
    };
  }

  // async getReadme() {
  //   await fetch("/node_modules/arc-nodes/README.md")
  //     .then((response) => response.text())
  //     .then((markdown) => {
  //       const htmlContent = marked.parse(markdown);

  //       this.applyChanges({ content: htmlContent });
  //     })
  //     .catch((error) => console.error("Error fetching README.md:", error));
  // }

  // initialize() {
  //   this.getReadme();
  // }
  render() {
    return html`
      <div class="readme-container" id="documentation">
        <p>
          ArcNodes is an experimental minimalist and simplified UI Framework for
          creating web applications using pure JavaScript. It includes core
          concepts of components, state management and utilizing streamlined
          content rendering for a straightforward development experience.. This
          documentation provides an overview of how to use ArcNodes, including
          installation, basic usage, and advanced features.
        </p>
        <div class="markdown-heading">
          <h2 class="heading-element">Features</h2>
          <a
            id="user-content-features"
            class="anchor"
            aria-label="Permalink: Features"
            href="#features"
            ><svg
              aria-hidden="true"
              role="img"
              class="octicon octicon-link"
              viewBox="0 0 16 16"
              width="16"
              height="16"
              fill="currentColor"
              style="display:inline-block;user-select:none;vertical-align:middle"
            >
              <path
                fill-rule="evenodd"
                d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"
              ></path></svg
          ></a>
        </div>
        <ul>
          <li>Component-based architecture</li>
          <li>State management</li>
          <li>Dynamic rendering and nested components</li>
        </ul>
        <div class="markdown-heading">
          <h2 class="heading-element">Getting Started</h2>
          <a
            id="user-content-getting-started"
            class="anchor"
            aria-label="Permalink: Getting Started"
            href="#getting-started"
            ><svg
              aria-hidden="true"
              role="img"
              class="octicon octicon-link"
              viewBox="0 0 16 16"
              width="16"
              height="16"
              fill="currentColor"
              style="display:inline-block;user-select:none;vertical-align:middle"
            >
              <path
                fill-rule="evenodd"
                d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"
              ></path></svg
          ></a>
        </div>
        <div class="markdown-heading">
          <h2 class="heading-element">Installation</h2>
          <a
            id="user-content-installation"
            class="anchor"
            aria-label="Permalink: Installation"
            href="#installation"
            ><svg
              aria-hidden="true"
              role="img"
              class="octicon octicon-link"
              viewBox="0 0 16 16"
              width="16"
              height="16"
              fill="currentColor"
              style="display:inline-block;user-select:none;vertical-align:middle"
            >
              <path
                fill-rule="evenodd"
                d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"
              ></path></svg
          ></a>
        </div>
        <p>To install ArcNodes, use npm:</p>
        <div class="highlight highlight-source-shell">
          <pre tabindex="0">npm install -g arc-nodes</pre>
        </div>
        <p>To create project by ArcNodes, use npm:</p>
        <div class="highlight highlight-source-shell">
          <pre
            tabindex="0"
          >npm <span class="pl-c1">exec</span> create-arcnode <span class="pl-k">&lt;</span>project-name<span class="pl-k">&gt;</span>
or
npx create-arcnode <span class="pl-k">&lt;</span>project-name<span class="pl-k">&gt;</span></pre>
        </div>
        <div class="markdown-heading">
          <h1 class="heading-element">example</h1>
          <a
            id="user-content-example"
            class="anchor"
            aria-label="Permalink: example"
            href="#example"
            ><svg
              aria-hidden="true"
              role="img"
              class="octicon octicon-link"
              viewBox="0 0 16 16"
              width="16"
              height="16"
              fill="currentColor"
              style="display:inline-block;user-select:none;vertical-align:middle"
            >
              <path
                fill-rule="evenodd"
                d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"
              ></path></svg
          ></a>
        </div>
        <div class="highlight highlight-source-shell">
          <pre
            tabindex="0"
          >npm <span class="pl-c1">exec</span> create-arcnode my-app
or
npm create-arcnode my-app</pre>
        </div>
        <p>Run the server:</p>
        <div class="highlight highlight-source-shell">
          <pre tabindex="0">npm start</pre>
        </div>
        <div class="markdown-heading">
          <h2 class="heading-element">Getting Started</h2>
          <a
            id="user-content-getting-started-1"
            class="anchor"
            aria-label="Permalink: Getting Started"
            href="#getting-started-1"
            ><svg
              aria-hidden="true"
              role="img"
              class="octicon octicon-link"
              viewBox="0 0 16 16"
              width="16"
              height="16"
              fill="currentColor"
              style="display:inline-block;user-select:none;vertical-align:middle"
            >
              <path
                fill-rule="evenodd"
                d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"
              ></path></svg
          ></a>
        </div>
        <p>Create a basic project structure with the following:</p>
        <pre lang="plaintext" tabindex="0"><code>my-project/
├── src/
│   └── app.js
│   └── index.js
├── index.html
└── package.json
</code></pre>
      </div>
    `;
  }
}

Documentation.registerComponent("Documentation");
export default Documentation;
