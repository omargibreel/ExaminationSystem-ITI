# ExaminationSystem-ITI

A comprehensive client-side web application for conducting online examinations with a complete workflow from registration to results.

## Features

- **User Management**: Account registration and secure authentication system
- **Exam Engine**: Timed examinations with question shuffling and navigation
- **Progress Tracking**: Question flagging and real-time progress monitoring
- **Automated Scoring**: Instant result calculation and detailed performance metrics
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS and DaisyUI
- **Offline Capability**: Full functionality using browser localStorage for data persistence

## Technology Stack

| Technology | Purpose |
|------------|---------|
| **Frontend** | Vanilla JavaScript (ES6+) |
| **Styling** | Tailwind CSS + DaisyUI components |
| **Icons** | Font Awesome 6.5.1 |
| **Storage** | Browser localStorage |
| **Deployment** | GitHub Pages compatible |

## Quick Start

### Prerequisites
- Modern web browser with JavaScript enabled
- Local web server (for development)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/omargibreel/ExaminationSystem-ITI.git
cd ExaminationSystem-ITI
```

2. Serve the project locally:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .

# Or any other static web server
```

3. Open `http://localhost:8000` in your browser

## Project Structure

```
ExaminationSystem-ITI/
├── index.html                 # Login page
├── config.js                  # Path configuration utility
├── registration/
│   ├── registration.html
│   └── registration.js
├── start/
│   ├── start.html
│   └── start.js
├── exam/
│   ├── exam.html
│   └── exam.js
├── result/
│   ├── result.html
│   └── result.js
└── TimeComplete/
    ├── timeComplete.html
    └── timeComplete.js
```

## Usage

### Student Workflow

1. **Registration**: Create a new account with email and password
2. **Login**: Authenticate using registered credentials
3. **Exam Instructions**: Review exam details and requirements
4. **Take Exam**: Complete questions within the time limit
5. **View Results**: See score and performance metrics

### Key Features

- **Question Navigation**: Move between questions with previous/next buttons
- **Question Flagging**: Mark questions for review
- **Timer**: Visual countdown with automatic submission on timeout
- **Progress Indicator**: Real-time exam completion status
- **Responsive Design**: Works on desktop and mobile devices

## Deployment

### GitHub Pages

The application is optimized for GitHub Pages deployment with automatic path detection [1](#0-0) :

1. Push code to GitHub repository
2. Enable GitHub Pages in repository settings
3. Select "main" branch as source
4. The `config.js` automatically handles path resolution

### Path Management

The `config.js` file provides intelligent path handling for both local development and production environments [2](#0-1) :

- **Local Development**: Uses root path (`/`)
- **GitHub Pages**: Automatically detects repository path (e.g., `/ExaminationSystem-ITI/`)
- **Navigation**: All internal navigation uses the `navigateTo()` function instead of hardcoded paths

## Configuration

### Environment Detection

The system automatically detects the deployment environment and adjusts paths accordingly [3](#0-2) :

```javascript
// Local Development: BASE_PATH = '/'
// GitHub Pages: BASE_PATH = '/ExaminationSystem-ITI/'
```

### Data Storage

All user data and exam progress is stored in localStorage using the following keys [4](#0-3) :

- `allStudents`: User registration data
- `isLoggedIn`: Authentication status
- `userEmail`: Current user session
- `examInProgress`: Active exam state

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

---

## Notes

- The application requires no backend server or database
- All data is stored locally in the browser
- The recent refactoring improved GitHub Pages compatibility while maintaining all original functionality [5](#0-4) 
- The navigation system was updated to use `navigateTo()` instead of direct `window.location.href` assignments [6](#0-5) 

Wiki pages you might want to explore:
- [ExaminationSystem-ITI Overview (omargibreel/ExaminationSystem-ITI)](/wiki/omargibreel/ExaminationSystem-ITI#1)

### Citations

**File:** REFACTORING_SUMMARY.md (L40-44)
```markdown
BASE_PATH Configuration:

- Local Development: BASE_PATH = '/'
- GitHub Pages (omaro-dev.github.io/ExamJS/): BASE_PATH = '/ExamJS/'
- Automatically detected on page load
```

**File:** REFACTORING_SUMMARY.md (L46-48)
```markdown
Navigation Pattern:
OLD: window.location.href = "../start/start.html"
NEW: navigateTo("start/start.html")
```

**File:** REFACTORING_SUMMARY.md (L50-55)
```markdown
Benefits:
✓ Single source of truth for base path
✓ Works on both local and GitHub Pages
✓ No hardcoded paths
✓ Easy to modify deployment location
✓ Maintains all original functionality
```

**File:** REFACTORING_SUMMARY.md (L66-72)
```markdown
To deploy to GitHub Pages:

1. Push code to GitHub
2. Enable GitHub Pages in repository settings
3. Select "main" branch as source
4. config.js will automatically detect '/ExamJS/' base path
5. All navigation will work correctly
```

**File:** REFACTORING_SUMMARY.md (L81-90)
```markdown

Path Resolution:
✓ Index page (/) → stays on index
✓ Registration redirect → navigateTo("index.html")
✓ Login redirect → navigateTo("start/start.html")
✓ Exam navigation → navigateTo("exam/exam.html")
✓ Results → navigateTo("result/result.html")
✓ Timeout → navigateTo("TimeComplete/timeComplete.html")

All 29 window.location.href instances have been converted to navigateTo()
```
