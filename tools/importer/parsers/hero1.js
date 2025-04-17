/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Hero'];

  const contentRow = [];

  // Background Image dynamically extracted (if present)
  const backgroundImage = element.querySelector('img');
  if (backgroundImage) {
    const imgElem = document.createElement('img');
    imgElem.src = backgroundImage.src;
    imgElem.alt = backgroundImage.alt || '';
    contentRow.push(imgElem);
  }

  // Title dynamically extracted
  const headingText = element.querySelector('.intro-heading');
  if (headingText) {
    const heading = document.createElement('h1');
    heading.textContent = headingText.textContent.trim();
    contentRow.push(heading);
  }

  // Subheading dynamically extracted
  const subheadingText = element.querySelector('.intro-lead-in');
  if (subheadingText) {
    const subheading = document.createElement('p');
    subheading.textContent = subheadingText.textContent.trim();
    contentRow.push(subheading);
  }

  // Call-to-Action dynamically extracted (if present)
  const ctaLink = element.querySelector('a');
  if (ctaLink) {
    const cta = document.createElement('a');
    cta.href = ctaLink.href;
    cta.textContent = ctaLink.textContent.trim();
    contentRow.push(cta);
  }

  // Create the table structure
  const cells = [
    headerRow,
    contentRow,
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}