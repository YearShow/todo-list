import { FC, useState } from 'react';
import styles from "./create-todo.module.css";
import ConfettiExplosion from 'react-confetti-explosion';

type Props = {
  onCreate: (text: string) => void;
}

export const CreateTodo: FC<Props> = ({ onCreate }) => {
  const [createText, setCreateText] = useState("");
  const [isExploding, setIsExploding] = useState(false);

  const onTodoCreate = (text: string) => {
    onCreate(createText);
    setCreateText("");
    setIsExploding(true);
  }

  return (
    <div
      className={styles.container}
      onKeyDown={(e) => {
        if (e.key === "Enter" && createText) {
          onTodoCreate(createText);
        }
      }}>
      <input
        type="text"
        value={createText}
        onChange={(e) => setCreateText(e.target.value)}
      />
      <button
        disabled={!createText}
        onClick={() => onTodoCreate(createText)}
      >
        Создать
      </button>
      {isExploding && (
        <ConfettiExplosion
          onComplete={() => setIsExploding(false)}
          force={0.8}
          duration={2000}
          particleCount={250}
          width={1600}
        />
      )}
    </div>
  )
}