/* global WebImporter */
export default function parse(element, { document }) {
  // Extract content from the nav element
  const assistanceText = element.querySelector('.navbar-brand').innerHTML;
  const formElement = element.querySelector('form');

  // Create table structure
  const cells = [
    ['Columns'], // Header row with exact text
    [
      assistanceText, // First column - assistance text
      formElement,   // Second column - login form
    ],
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}