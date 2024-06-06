import { FormEventHandler, useMemo } from 'react';
import { useToggle } from 'react-use';
import { Switch } from '@chakra-ui/react';
import './grid-layout-2.css';

const preventSubmit:FormEventHandler = evt => {
  evt.preventDefault();
};

export const GridLayout2 = () => {
  const [b, t] = useToggle(false);

  const className = useMemo(() => (
    b ? 'grid-auto-flow grid-auto-flow-column' : 'grid-auto-flow'
  ), [b]);

  return (
    <>
      <h1>main auto fill container</h1>
      <div className="layout-root">
        <header>
          header
        </header>
        <main>
          main
        </main>
        <footer>
          footer
        </footer>
      </div>
      <h1>auto justify</h1>
      <form autoComplete="off" onSubmit={preventSubmit}>
        <div className="justify-root">
          <div className="form-field">
            <label htmlFor="name">name</label>
            <input type="text" id="name" />
          </div>
          <div className="form-field">
            <label htmlFor="email">email</label>
            <input type="text" id="email" />
          </div>
          <div className="form-field">
            <label htmlFor="address">address</label>
            <input type="text" id="address" />
          </div>
          <div className="form-filed">
            <input type="submit" value="submit" />
          </div>
        </div>    
      </form>
      <h1>justify-content</h1>
      <div className="grid-justify-content">
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
      </div>
      <h1>justify-items</h1>
      <div className="grid-justify-items">
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
      </div>
      <h1>grid auto flow</h1>
      <label htmlFor="switch">grid-autof-flow: column</label>
      <Switch id="switch" checked={b} onChange={t}/>
      <div className={className}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
      </div>
    </>
  );
};