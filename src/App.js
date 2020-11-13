import React from 'react';
import './App.css';
import Calculator from './components/Calculator';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  app: {
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
      height: '100vh'
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className={classes.app}>
      <Calculator />
    </div>
  );
}

export default App;