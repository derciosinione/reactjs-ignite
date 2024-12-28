/* eslint-disable react/prop-types */
import { ThumbsUp, Trash } from "phosphor-react";
import style from "./Comment.module.css";
import { Avatar } from "./Avatar";

export function Comment({ content, contentKey, onDeleteComment }) {
  function handleDeleteComment() {
    onDeleteComment(contentKey);
  }

  return (
    <div className={style.comment}>
      <Avatar
        hasBorder={false}
        src="https://github.com/Paulo-Lopes-Estevao.png"
      />
      <div className={style.commentBox}>
        <div className={style.commentContent}>
          <header>
            <div className={style.authorAndTime}>
              <strong>Paulo Lopes</strong>
              <time title="11 de Maio as 08:23">Cerca de 1h atras</time>
            </div>

            <button onClick={handleDeleteComment} title="Deletar comentario">
              <Trash size={20} />
            </button>
          </header>

          <p>{content}</p>
        </div>

        <footer>
          <button>
            <ThumbsUp size={20} />
            Aplaudir <span>20</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
