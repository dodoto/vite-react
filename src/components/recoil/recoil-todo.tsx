import { FormEventHandler, useState, MouseEventHandler } from 'react';
import { Link, Text } from "@chakra-ui/react";
import { SunIcon, MoonIcon, AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { RecoilRoot } from 'recoil';
import { TodoItem as TodoItemType, useIsAddingState, useColorModeValue, useColorModeState, useAddTodo, useDoneTodo, useRemoveTodo, useIsAdding, useTodoList } from './todo-atom';
import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion';
import { useEffect, memo } from 'react';
import styles from './todo.module.css';

// edit button
const EditToggleButton = () => {
  const [isAdding, toggle] = useIsAddingState();

  const rotate = isAdding ? 45 : 0;

  return (
    <button className={styles['edit-toggle-btn']} onClick={toggle}>
      <motion.div style={{ background: useColorModeValue('blue-500', 'blue-400') }} animate={{ rotate }}>
        <AddIcon boxSize={6} color="#FFFFFF"/>
      </motion.div>
    </button>
  );
};

// toggle button
const ToggleButton = () => {
  const [mode, toggle] = useColorModeState();
  const isDarkVisible = mode === 'dark';

  return (
    <button onClick={toggle} className={styles['theme-toggle-btn']}>
      {
        isDarkVisible ?
        <motion.div key="light" initial={{ x: 24, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -24, opacity: 0 }}>
          <SunIcon boxSize={6} color="#FFFFFF"/>
        </motion.div> :
        <motion.div key="dark" initial={{ x: -24, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 24, opacity: 0 }}>
          <MoonIcon boxSize={6} color="#FFFFFF"/>
        </motion.div>
      }
    </button>
  );
};

// todo checkbox
const MARGIN = 10
const vWidth = 64 + MARGIN
const vHeight = 64 + MARGIN
const checkMarkPath =
  'M15 31.1977C23.1081 36.4884 29.5946 43 29.5946 43C29.5946 43 37.5 25.5 69 1.5'
const outlineBoxPath =
  'M24 0.5H40C48.5809 0.5 54.4147 2.18067 58.117 5.88299C61.8193 9.58532 63.5 15.4191 63.5 24V40C63.5 48.5809 61.8193 54.4147 58.117 58.117C54.4147 61.8193 48.5809 63.5 40 63.5H24C15.4191 63.5 9.58532 61.8193 5.88299 58.117C2.18067 54.4147 0.5 48.5809 0.5 40V24C0.5 15.4191 2.18067 9.58532 5.88299 5.88299C9.58532 2.18067 15.4191 0.5 24 0.5Z' 


const getDraw = (length: number, duration: number) => ({
  hidden: { pathLength: 0, opacity: 0 },
  visible: () => {
    return {
      pathLength: length,
      opacity: 1,
      transition: {
        pathLength: { type: "linear", duration },
        opacity: { duration: 0.01 }
      }
    };
  }
});

const CheckPath = ({ stroke = 'white', strokeWidth, duration, length }: { stroke?: string, strokeWidth: number, duration: number, length: number}) => {
  const draw = getDraw(length, duration);

  return (
    <motion.path 
      stroke={stroke}
      fill="none" 
      strokeWidth={strokeWidth}
      d={checkMarkPath}
      strokeLinejoin="round"
      strokeLinecap="round"
      variants={draw}/> 
  );
};

export const Checkbox = ({ 
  size = 28,
  strokeWidth = 7, 
  checked,
  outlineColor = 'gray',
  checkedOutlineColor = 'blue',
  onCheck,
}: {
  size: number,
  strokeWidth: number,
  checked: boolean,
  outlineColor: string,
  checkedOutlineColor: string,
  onCheck: MouseEventHandler<SVGSVGElement>,
}) => {
  const stroke = checked ? checkedOutlineColor : outlineColor;

  const fill = checked ? checkedOutlineColor : 'none';

  return (
    <motion.svg 
      width={size} 
      height={size} 
      viewBox={[-MARGIN, -MARGIN, vWidth + MARGIN, vHeight + MARGIN].join(' ')}
      initial="hidden"
      animate="visible"
      onClick={onCheck}>
      <path 
        stroke={stroke}
        fill={fill} 
        strokeWidth={strokeWidth}
        d={outlineBoxPath}/>  
      {
        checked &&
        <>
           <CheckPath strokeWidth={strokeWidth} stroke={stroke} duration={0.7} length={1}/>
           <CheckPath strokeWidth={strokeWidth} duration={0.5} length={0.85}/>
        </>
       
      }
    </motion.svg>
  );
}

// todo masthead
const Masthead = () => {
  return (
    <div className={styles['masthead']}>
      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        What's up, guys!
      </motion.h1>
      <ToggleButton/>
    </div>
  );
};

// todo input
const TodoInput = () => {
  const [text, setText] = useState('');

  const add = useAddTodo();

  const handleSubmit: FormEventHandler = event => {
    event.preventDefault();

    if (text.trim().length > 0) {
      add(text);
    }
    setText('');
  };

  return (
    <motion.div 
      className={styles['todo-input-wrap']} 
      initial={{ height: 0, opacity: 0, padding: 0 }} 
      animate={{ height: 60, opacity: 1, padding: '1rem' }} 
      exit={{ height: 0, opacity: 0, padding: 0 }}>
        <form onSubmit={handleSubmit}>
          <input 
            autoFocus 
            style={{ color: useColorModeValue('dark-text', 'light-text') }} 
            placeholder="Task" 
            value={text} 
            onChange={({ target: { value } }) => setText(value)}/>
        </form>
    </motion.div>
  );
};

// todo item
const RemoveThreshold = -150;

const useDelay = () => {
  const [delay, setDealy] = useState(0.2);

  useEffect(() => {
    setDealy(0);
  }, []);

  return delay;
};

const TodoItem = memo(({ todo, color, doneTextColor }: { todo: TodoItemType, color: string, doneTextColor: string }) => {
  const x = useMotionValue(0);

  const delay = useDelay();

  const textColor = todo.done ? doneTextColor : color;

  const outlineColor = useColorModeValue('muted-500', 'muted-300');

  const checkedOutlineColor = useColorModeValue('blue-500', 'blue-400');

  const complete = useDoneTodo();

  const remove = useRemoveTodo();

  const done = () => {
    complete(todo.id);
  }

  const handleDragEnd = () => {
    if (x.get() < RemoveThreshold) {
      animate(x, -390, {
        duration: 0.2,
        onComplete() {
          remove(todo.id);
        },
      })
    }
  }

  const handleDrag = () => {
    x.set(Math.min(x.get(), 0), true);
  }

  return (
    <div className={styles['todo-list-item-wrap']}>
      <motion.div 
        initial= {{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: '100%' }}
        exit={{ opacity: 0, height: 0 }} // mark transitionDelay
        transition={{ delay }}
      >
        <DeleteIcon boxSize={6} color="#FFFFFF"/>
      </motion.div>  
      <motion.div
        drag="x"
        dragMomentum={false}
        style={{ color: textColor, x, background: useColorModeValue('warm-gray-50', 'primary-900') }}
        className={styles['todo-list-item']}
        initial={{ opacity: 0, scale: 0.5, marginBottom: -46 }}
        animate={{ opacity: 1, scale: 1, marginBottom: 0 }}
        exit={{ opacity: 0, scale: 0.5, marginBottom: -46 }}
        onDragEnd={handleDragEnd}
        onDrag={handleDrag}
        dragConstraints={{ left: 0, right: 0 }}>
        {/* @ts-ignore */}
        <Checkbox 
          outlineColor={outlineColor} 
          checkedOutlineColor={checkedOutlineColor}
          checked={todo.done}
          onCheck={done}/>  
        <input type="checkbox" onChange={done} checked={todo.done} id={todo.id} disabled={todo.done}/>
        <span>
          <motion.label htmlFor={todo.id} animate={{ backgroundSize: todo.done ? '100% 100%' : '0 100%'}}>
            { todo.subject }
          </motion.label>
        </span>
      </motion.div>
    </div>

  );
});

// todo list
const TodoList = () => {
  const isAdding = useIsAdding();
  const todoList = useTodoList();
  const textColor = useColorModeValue('dark-text', 'light-text');
  const doneTextColor = useColorModeValue('muted-600', 'muted-400');

  return (
    <div className={styles['todo-list']} style={{ background: useColorModeValue('warm-gray-50', 'primary-900') }}>
      <AnimatePresence>
        {
          isAdding && <TodoInput />
        }
        {
          todoList.map(todo => (
            <TodoItem key={todo.id} todo={todo} color={textColor} doneTextColor={doneTextColor}/>
          ))
        }
      </AnimatePresence>
    </div>
  );
};

// todo app
const Todo = () => {
  return (
    // <RecoilRoot>
    <div className={`${styles['todo-app']}`} style={{ background: useColorModeValue('warm-gray-50', 'primary-900') }}>
      <Masthead/>
      <TodoList />
      <EditToggleButton/>
    </div>
    // </RecoilRoot>
  );
};

// RecoilRoot 必须要包裹组件, 否则会报错
export const TodoApp = () => {
  return (
    <>
      <Text textAlign="center" fontWeight="semibold">
        this is <Link href="https://github.com/craftzdog/react-native-animated-todo" target="_blank" textDecoration="underline">react-native-animated-todo</Link> web achievement base on framer-motion and recoil
      </Text>
      <RecoilRoot>
        <Todo />
      </RecoilRoot>
    </>
  );
};

