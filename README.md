# Color Suggestions for UI Design

## Description

This project provides a web service to help UI/UX designers choose color palettes based on user-defined prompts. The service uses OpenAI's GPT API to generate color suggestions using color psychology and theory principles. It also generates a color palette image for visual reference. The service supports Google authentication and manual registration/login.

## Clone the Repository

To clone and run this project locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/Thanusiyan1007/color-sugesstion.git
    cd color-suggestions-ui
    ```

2. Install dependencies and run the project:
    ```bash
    cd frontend
    npm install
    npm start
    ```

    ```bash
    cd backend
    npm install
    node index.js
    ```

## How It Works

1. **User Input:** Users enter a prompt describing their design needs.
2. **Color Suggestions:** The system generates color palettes based on the input.
3. **Color Palette Image:** An image of the generated palette is provided for visualization.
4. **Authentication:** Users can log in with Google or manually register and log in.

## Project Languages

- JavaScript (Node.js, React.js)
- Taiwind CSS
- Firebase (for user authentication)
- OpenAI GPT API (for color suggestions)
