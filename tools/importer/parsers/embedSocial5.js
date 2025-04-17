/* global WebImporter */
export default function parse(element, { document }) {
  // Critical fix: Extract relative hrefs correctly (e.g., '#why', '#professional')

  // Extract all navigation link elements
  const navLinks = Array.from(element.querySelectorAll('.nav-item a'));

  // Extract relative href attributes dynamically
  const hrefs = navLinks.map(link => link.getAttribute('href')).filter(href => href);

  // Define the header row exactly matching the example
  const headerRow = ['Embed'];

  // Combine extracted hrefs into table format
  const dataRows = hrefs.map(href => [href]);

  const tableData = [headerRow, ...dataRows];

  // Create the table using WebImporter.DOMUtils.createTable
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}