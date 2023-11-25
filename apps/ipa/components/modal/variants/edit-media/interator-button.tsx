import { FC } from 'react';
import { UnstyledButton } from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

type IteratorButtonProps = {
  previous?: boolean;
  handleToggle: boolean | (() => void);
}

const IteratorButton:FC<IteratorButtonProps> = ({ previous, handleToggle }) => {
  const fetch = (move) => {
    if (move == false) {
      return null
    }
    else return move;
  }

  return (
    <>
      {handleToggle && (
      <UnstyledButton
        style={{ position: "absolute", left: previous && 20, right: !previous && 20, top: "50%" }}
        onClick={fetch(handleToggle)}
      >
        {previous ? (
          <IconChevronLeft size={40} strokeWidth={1.4} color={'white'} />
        ) : (
          <IconChevronRight size={40} strokeWidth={1.4} color={'white'} />
        )}
      </UnstyledButton>
      )}
    </>
  );
}
export default IteratorButton;
