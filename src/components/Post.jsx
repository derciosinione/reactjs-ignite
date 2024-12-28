import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

import { Avatar } from "./Avatar";
import { Comment } from "./Comment";
import styles from "./Post.module.css";
import { useState } from "react";

/* eslint-disable react/prop-types */
export function Post({ author, contents, publishedAt }) {
  const [comments, setComment] = useState([]);

  const [newCommentText, setNewCommentText] = useState("");

  const publishedDataFormat = format(
    publishedAt,
    "dd 'de' MMMM 'as' HH:mm'h'",
    { locale: ptBR }
  );

  const publishedDateRelativeNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  function handleCreateNewComment(event) {
    event.preventDefault();

    setComment([...comments, newCommentText]);

    setNewCommentText("");
  }

  function handleNewCommentTextChange(event) {
    event.target.setCustomValidity("");
    setNewCommentText(event.target.value);
  }

  function deleteComment(contentKey) {
    setComment(comments.filter((_, index) => index !== contentKey));
  }

  function handleNewCommentInvalid(event) {
    event.target.setCustomValidity(
      "Por favor, preencha o campo de comentário."
    );
    console.log(event);
  }

  const isNewCommentTextEmpty = newCommentText.length == 0;

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatar} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time title={publishedDataFormat} dateTime={publishedAt.toISOString()}>
          {publishedDateRelativeNow}
        </time>
      </header>

      <div className={styles.content}>
        {contents
          .filter((content) => content.type === "paragraph")
          .map((content, index) => (
            <p key={index}>{content.content}</p>
          ))}

        <p>
          {contents
            .filter((content) => content.type === "link")
            .map((content, index) => (
              <a key={index} href="#" style={{ marginRight: "8px" }}>
                {content.content}
              </a>
            ))}
        </p>
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe o seu feedback</strong>

        <textarea
          required
          name="commentInput"
          value={newCommentText}
          onChange={handleNewCommentTextChange}
          onInvalid={handleNewCommentInvalid}
          placeholder="Deixe o seu comentário..."
        />

        <footer>
          <button disabled={isNewCommentTextEmpty} type="submit">
            Comentar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map((value, index) => (
          <Comment
            key={index}
            contentKey={index}
            content={value}
            onDeleteComment={deleteComment}
          />
        ))}
      </div>
    </article>
  );
}
