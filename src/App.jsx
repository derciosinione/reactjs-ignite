import { Header } from "./components/Header.jsx";

import "./global.css";

import styles from "./App.module.css";
import { Sidebar } from "./components/Sidebar.jsx";
import { Post } from "./components/Post.jsx";

export function App() {
  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />

        <main>
          <Post
            autor="Dercio Derone"
            content="Lorem ipsum dolor sit amet consectetur adipisicing elit."
          />

          <Post
            autor="Miguel Joao"
            content="Lorem ipsum dolor sit amet consectetur adipisicing elit."
          />
        </main>
      </div>
    </div>
  );
}
