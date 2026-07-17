# ⚡ Sparkcode

> A next-generation block-based programming environment combining the simplicity of Blockly with the power of 2D (PixiJS) and 3D (Three.js/React Three Fiber) rendering engines.

---

### ⚠️ Project Status: Alpha Stage
**Sparkcode is currently in active development (Alpha Stage).**
*   **Website Availability**: There is currently **no live hosted version** of the website. 
*   **Running the Project**: To experience Sparkcode, you will need to clone the repository and run it locally on `localhost` (see [Getting Started](#-getting-started) below).
*   **Work in Progress**: The project is not yet fully complete. Some features, blocks, or rendering systems may be incomplete, unoptimized, or subject to breaking changes. We appreciate your feedback as we continue to shape Sparkcode!

---

## 🚀 What is Sparkcode?

Sparkcode is a visual coding platform designed to bridge the gap between simple block programming (like Scratch) and advanced graphics rendering. It allows creators, students, and developers to write logic using drag-and-drop blocks and see their code come to life simultaneously in both **2D** and **3D** canvases. 

Whether you want to build simple pen-drawing games, complex sprite interactions, or full 3D interactive scenes, Sparkcode provides the foundations to learn, experiment, and create.

---

## ✨ Key Features

*   **🧩 Visual Block Editor**: Full Blockly integration for intuitive logic building (loops, variables, movements, colors, and more).
*   **💻 Code View**: Toggle from the block editor directly to generated JavaScript code to understand the underlying logic.
*   **🎨 Dual Rendering Engines**:
    *   **2D Stage**: Responsive PixiJS rendering with support for multiple sprites, pen tracking, layer ordering, and real-time canvas updates.
    *   **3D Stage**: Immersive 3D scene built with React Three Fiber, allowing sprites to operate in three dimensions.
*   **👾 Sprite Manager & Editor**: Easily create, customize, rename, and manage active sprites with custom coordinates, rotations, and styles.
*   **🔌 Modular Add-ons**: Toggle additional toolboxes, helpers, and assets.
*   **⚡ Modern Stack**: Built with Vite, React, and TypeScript for a super-fast, typed development flow.

---

## 🛠️ Tech Stack

*   **Frontend**: [React 18](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vite.dev/)
*   **Visual Logic**: [Blockly](https://developers.google.com/blockly) & [react-blockly](https://github.com/nbaksalyar/react-blockly)
*   **2D Graphics**: [PixiJS](https://pixijs.com/) & [@pixi/react](https://github.com/pixijs/pixi-react)
*   **3D Graphics**: [Three.js](https://threejs.org/) & [React Three Fiber (R3F)](https://github.com/pmndrs/react-three-fiber)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Server**: [Express](https://expressjs.com/) with [tsx](https://github.com/privatenumber/tsx) (watch mode)

---

## ⚙️ Getting Started

To run Sparkcode locally on your machine, follow these instructions:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18 or higher recommended) and `npm` installed.
Go over here and download the SparkCode.tz.tar file https://github.com/Prathamers/SparkCode/releases/tag/v0.1.0-alpha or

### 1. Clone & Install
```bash
# Clone the repository
git clone https://github.com/your-username/Sparkcode.git
cd Sparkcode

# Install dependencies
npm install
```

### 2. Run the Application
You can run Sparkcode either in your web browser or as a native desktop window:

#### Option A: Run in the Web Browser
Start the frontend development server and the backend server:

*   **Start Frontend (Vite)**:
    ```bash
    npm run dev
    ```
    Open **[http://localhost:5173](http://localhost:5173)** in your browser.

*   **Start Backend (Express Server)**:
    ```bash
    npm run server
    ```
    The backend runs on port **3100** (`http://localhost:3100`).

#### Option B: Run as a Native Desktop App (Electron)
1. Ensure your local dev server is running (`npm run dev`).
2. Start the desktop window:
   ```bash
   npm run electron:dev
   ```

### 3. Build Desktop Binaries
To compile and package Sparkcode into a standalone desktop application (`.exe` on Windows, `.AppImage` on Linux):
```bash
npm run electron:build
```
The compiled binaries will be generated inside the `dist_electron/` directory.

---

## 🏗️ Development Scripts

In the project directory, you can run:

| Command | Action |
| :--- | :--- |
| `npm run dev` | Runs the Vite dev server with hot module replacement (HMR). |
| `npm run server` | Starts the Express server using `tsx watch` for active backend development. |
| `npm run build` | Compiles TypeScript and builds the production frontend bundle. |
| `npm run lint` | Lints files using Oxlint for lightning-fast feedback. |
| `npm run preview` | Previews the production build locally. |
| `npm run electron:dev` | Starts the Electron desktop interface in development mode. |
| `npm run electron:build` | Compiles frontend and backend, and packages a standalone desktop binary inside `dist_electron/`. |

---

## 🗺️ Roadmap (Alpha & Beyond)
- [ ] Complete translation blocks for complex Math & Trigonometry.
- [ ] Add sound effects library and Web Audio API block integrations.
- [ ] Implement cloud/local project saving/loading state.
- [ ] Enhance 3D model importer support (GLTF/OBJ).
- [ ] Add multiplayer workspace collaboration features.

---

## 🤝 Contributing

Contributions are welcome! Since Sparkcode is in its **Alpha** stage, feel free to open issues or pull requests to fix bugs, suggest features, or improve documentation.

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
