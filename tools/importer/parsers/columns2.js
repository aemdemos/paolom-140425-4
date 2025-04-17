/* global WebImporter */
export default function parse(element, { document }) {
  // Extract content dynamically from the provided HTML element
  // Collect all columns with relevant content
  const columns = Array.from(element.querySelectorAll('.col-md-4, .col-md-6')).map((col) => {
    const icon = col.querySelector('.fa-stack');
    const heading = col.querySelector('.service-heading');

    // Handle cases where elements might be missing
    const iconClone = icon ? icon.cloneNode(true) : document.createTextNode('');
    const headingText = heading ? heading.textContent.trim() : '';

    return [iconClone, headingText];
  });

  // Define the header row based on the example format
  const headerRow = ['Columns'];

  // Structure data for the block table
  const cells = [
    headerRow,
    ...columns,
  ];

  // Create the block table using WebImporter.DOMUtils.createTable()
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}