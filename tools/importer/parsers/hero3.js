/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Hero'];

  // Extract title
  const title = element.querySelector('h2.section-heading');
  const titleElement = document.createElement('h1');
  titleElement.textContent = title ? title.textContent.trim() : '';

  // Extract subheading
  const subheading = element.querySelector('h3.section-subheading');
  const subheadingElement = document.createElement('p');
  subheadingElement.textContent = subheading ? subheading.textContent.trim() : '';

  // Extract call-to-action links
  const linksContainer = element.querySelector('h5.text-smaller');
  const links = linksContainer ? Array.from(linksContainer.querySelectorAll('a')) : [];
  const linksGroup = document.createElement('div');
  links.forEach(link => {
    const linkElement = document.createElement('a');
    linkElement.href = link.href;
    linkElement.textContent = link.textContent.trim();
    linksGroup.appendChild(linkElement);
    linksGroup.appendChild(document.createTextNode(' ')); // Add spacing between links
  });

  // Extract additional content
  const additionalText = element.querySelector('p.text-color-wt');
  const additionalTextElement = document.createElement('p');
  additionalTextElement.innerHTML = additionalText ? additionalText.innerHTML.trim() : '';

  // Extract table content
  const tableContent = element.querySelector('table');
  const tableText = tableContent ? tableContent.textContent.trim() : '';
  const tableTextElement = document.createElement('p');
  tableTextElement.textContent = tableText;

  // Create logical structure in the second row
  const cells = [
    headerRow,
    [
      titleElement,
      subheadingElement,
      linksGroup,
      additionalTextElement,
      tableTextElement
    ]
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}