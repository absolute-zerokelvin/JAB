# JAB 2024
Jain Academic Bowl (JAB) Interactive Manual

## About JAB Interactive Manual

The JAB Interactive Manual is a comprehensive digital companion for students preparing for the Jain Academic Bowl competition. Based on the JAB Manual 5th edition (October 2024), this interactive platform transforms traditional learning materials into engaging digital experiences.

### Purpose

- Provide an accessible, interactive way to study and review JAB content
- Support different learning styles through various interactive elements
- Supplement (not replace) the official JAB Manual with digital learning aids
- Make complex concepts more approachable through modern web technologies

### Project Background

This interactive manual was developed with valuable guidance from the JAB Teachers of Jain Center of Northern California (JCNC). It serves as an auxiliary resource to the official JAB Manual, offering alternative ways to engage with the same content.

### Content Generation

Most of the interactive content in this manual was generated offline using Google's Gemini LLM. The process involved:

1. Extracting relevant text from the JAB Manual 
2. Prompting Gemini to transform the content into different interactive formats
3. Creating quizzes, flashcards, and other interactive elements from the source material
4. Spot checking the generated content for accuracy

This approach allowed for rapid development of interactive materials while maintaining alignment with the original manual. While generated content was spot checked, there is a possibility of errors due to LLM hallucinations or prompt issues. If you notice any inaccuracies compared to the original JAB Manual, please report them by creating an issue on [GitHub Issues](https://github.com/absolute-zerokelvin/JAB/issues).

## Content Structure

The JAB Interactive Manual is organized into several key sections:

### Main Sections

1. **Basics (B1-B7)** - Fundamental concepts of Jainism
2. **Legends (L1-L6)** - Stories and legends from Jain tradition
3. **Ethics (E1-E5)** - Ethical principles and practices
4. **Philosophy (F1-F7)** - Key philosophical concepts
5. **Geography (G1-G6)** - Important locations in Jain history
6. **History (H1-H14)** - Historical events and figures
7. **Rituals (I1-I5)** - Important Jain rituals and ceremonies
8. **Jain Symbols (J1-J4)** - Significant symbols in Jainism
9. **Modern Jainism (M1-M3)** - Contemporary Jain practices

### Interactive Features

The manual includes various interactive elements:

- **Quizzes** - Test your knowledge with questions on each topic
- **Flashcards** - Study key terms and concepts in flashcard format
- **Timelines** - Visualize historical events in chronological order
- **Story Visualizations** - Interactive presentations of traditional stories

## Technical Architecture

This project is built using:

- **Pure JavaScript** - No heavy frameworks for fast loading
- **HTML5/CSS3** - Modern web standards for responsive design
- **JSON Data Storage** - Structured content for easy maintenance
- **AI-Generated Content** - Leveraging Google's Gemini LLM for transforming manual content into interactive formats

### Content Organization

The JAB Interactive Manual uses two different approaches for content organization:

1. **Data-Driven Story Pages (Sections E to M)**
   - Content is stored as structured JSON files in the `/data/` directory
   - Each section's story has dedicated JSON files (E1.json, F1.json, etc.)
   - Content is dynamically rendered through the `story.html` template
   - This approach enables consistent formatting and easier content updates

2. **Static HTML Pages (Sections B, L and Timelines)**
   - These sections use individual HTML pages
   - Timeline views are implemented as standalone HTML pages
   - These pages incorporate the shared navigation components
   - This approach is used for content with unique layouts or special formatting needs

## End-to-End Testing

This project includes automated end-to-end testing using [Playwright](https://playwright.dev/). These tests verify that the website loads correctly, navigation functions properly, and interactive features like quizzes and flashcards work as expected.

### Running Tests Locally

To run the end-to-end tests locally:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the tests:
   ```bash
   npm test
   ```

3. To view the test report:
   ```bash
   npm run test:report
   ```

4. To run tests with UI mode:
   ```bash
   npm run test:ui
   ```

### Continuous Integration

These tests are automatically run in GitHub Actions when:
- Code is pushed to the main branch
- A pull request is made against the main branch

The test results are available in the GitHub Actions tab, where you can also download test artifacts like screenshots and traces for failed tests.

### Test Coverage

The automated tests cover:
1. Basic page loading
2. Desktop and mobile navigation functionality
3. Navigation menu expand/collapse features
4. Quiz and flashcard interactive features

## Contributing

Contributions to the JAB Interactive Manual are welcome! Please follow these steps:

1. **Report Issues**: If you find errors or issues, please report them on [GitHub Issues](https://github.com/absolute-zerokelvin/JAB/issues)

2. **Submit Pull Requests**: For code contributions:
   - Fork the repository
   - Create a feature branch (`git checkout -b feature/amazing-feature`)
   - Commit your changes (`git commit -m 'Add some amazing feature'`)
   - Push to the branch (`git push origin feature/amazing-feature`)
   - Open a Pull Request

3. **Content Corrections**: If you notice factual errors or content issues (which can occasionally occur with LLM-generated content), please provide:
   - The page/section where the error appears
   - The incorrect information
   - The suggested correction
   - Reference to the official manual if applicable

## Development

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm (comes with Node.js)

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/absolute-zerokelvin/JAB.git
   cd JAB
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

### Project Structure

- `/data/` - JSON files containing all content
- `/js/` - JavaScript files for interactive features
- `/css/` - Styling for the application
- `/templates/` - HTML templates for content pages
- `/images/` - Images and graphics
- `/tests/` - End-to-end tests

## Deployment

The JAB Interactive Manual is deployed using GitHub Pages. To deploy:

```bash
npm run deploy
```

This will build the site and deploy it to the gh-pages branch.

## License

This project is licensed under the MIT License - see the repository for details.

## Acknowledgements

- JAB Teachers of JCNC for their guidance and expertise
- Contributors to the JAB Manual 5th edition
- Google's Gemini LLM for content transformation
- All volunteers who have contributed to this interactive version
