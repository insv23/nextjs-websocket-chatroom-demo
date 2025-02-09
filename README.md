# Real-time Chat Application with Next.js and WebSockets

This project is a real-time chat application built using Next.js 15, WebSockets, and Tailwind CSS. It demonstrates a simple, multi-user chat room where users can send and receive messages instantly.  Client IDs are generated using a combination of the browser's User-Agent and a timestamp for display purposes.

## Features

*   **Real-time Messaging:**  Messages are delivered instantly to all connected clients using WebSockets.
*   **User Identification:**  Clients are identified by a generated ID based on their browser's User-Agent and a timestamp.
*   **System Messages:**  The application displays system messages for user joins and leaves.
*   **Responsive Design:**  The UI is built with Tailwind CSS and is responsive across different screen sizes.
*   **Scrollable Chat History:**  The chat history is displayed in a scrollable area.

## Getting Started

### Prerequisites

*   Node.js (LTS version recommended)
*   npm, yarn, pnpm, or bun (package manager)

### Installation and Running

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd <repository_name>
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    # or
    bun install
    ```

3.  **Run the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev
    ```

4.  **Open in your browser:**

    Open [http://localhost:3000](http://localhost:3000) in your browser to access the chat application.  Open multiple browser windows/tabs to simulate multiple users.

## Project Structure

*   **`app/`:**  Contains the main application logic.
    *   **`page.tsx`:**  The main chat room component (client-side).
    *   **`socket/route.ts`:**  Handles WebSocket connections and message broadcasting (server-side).
    *   **`types/message.ts`:** Defines the `Message` interface.
*   **`components/`:**  Contains reusable UI components.
    *   **`ui/`:** Shadcn UI components.
*   **`lib/`:** Utility functions.
    * **`utils.ts`:** Contains the `cn` function for conditional className merging.
*   **`public/`:** Static assets.

## Technologies Used

*   **Next.js 14:**  React framework for building the application.
*   **WebSockets:**  For real-time communication.
*   **Tailwind CSS:**  Utility-first CSS framework for styling.
*   **Shadcn UI:** UI component library.
*   **TypeScript:**  For type safety.

## Deployment

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new).  See the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Contributing
Feel free to submit issues and pull requests.

