/**
 * Renders a list of items within a container div, allowing for dynamic item rendering.
 *
 * @param {Object} params - The parameters for the Flatlist function.
 * @param {Array<Object>} [params.data=[]] - The array of data items to render. Each item will be passed to the renderItem function.
 * @param {Function} params.renderItem - A function that renders each item. Receives an object with the item and its index, and should return a string of HTML.
 * @param {Object} [params.options={}] - An optional object for additional configurations.
 * @param {string} [params.options.className=""] - The CSS class to apply to the outer container div.
 * @param {Object} [params.options.style={}] - An object representing inline styles to be applied to the outer container div.
 * @param {string} [params.options.componentKey="Flatlist"] - A unique key to distinguish this component instance.
 *
 * @returns {string} - A string representing the HTML structure of the list container with all items rendered inside.
 *
 * @example
 * const data = [
 *   { dataName: 'Devin' },
 *   { dataName: 'Dan' },
 *   { dataName: 'Dominic' },
 *   // ...
 * ];
 *
 * const renderItem = ({ item }) => `<p>${item.dataName}</p>`;
 *
 * const htmlString = Flatlist({ data, renderItem });
 * console.log(htmlString);
 * // Outputs:
 * // <div class="list-container" style="" data-key="Flatlist">
 * //   <p>Devin</p><p>Dan</p><p>Dominic</p>
 * // </div>
 */
function Flatlist({ data = [], renderItem, options = {} }) {
  const {
    className = "",
    style = {},
    componentKey = "Flatlist",
  } = options;

  // Convert the style object into a string for inline styling
  const styleString =
    style !== "{}"
      ? Object.entries(style)
          .map(([key, value]) => `${key}: ${value};`)
          .join(" ")
      : {};

  // Ensure data is an array and map over it to render each item using the renderItem function
  const itemsHTML = data
    .map((item, index) => renderItem({ item }, index))
    .join("");

  // Return the final HTML structure
  return html`
    <div class="${className}" style="${styleString}" data-key="${componentKey}">
      ${itemsHTML}
    </div>
  `;
}

export {Flatlist}