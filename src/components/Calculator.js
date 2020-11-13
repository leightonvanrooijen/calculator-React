import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { evaluate } from 'mathjs';


const useStyles = makeStyles((theme) => ({
    calcContainer: {
        display: 'flex',
        maxWidth: '300px',
        maxHeight: '400px',
    },
    displayContainer: {
        flexWrap: 'wrap',
        overflowWrap: 'break-word',
        wordWrap: 'break-word',
    },
    displayText: {
        textAlign: 'end',
    },
    calcButton: {
        width: '100%'
    },
}));

let operatorCount = 0
let calcDone = false

export default function Calculator() {
    const classes = useStyles();
    const [num, setNum] = useState('0')
    const [calc, setCalc] = useState('0')
    const [calculated, setCalculated] = useState(0)
    const checkValidNum = /^-?\d+\.?\d*$/gm
    const calcButtonLayout = [

        'CE', '/',
        '7', '8', '9', '*',
        '4', '5', '6', '-',
        '1', '2', '3', '+',
        '0', '.', '=',
    ]
    function setSize(button) {
        if ((['CE', '=', '/'].includes(button))) {
            return 6
        }
        else return 3
    }

    function clearEverything() {
        setNum('0');
        setCalc('0');
        setCalculated(0)
        operatorCount = 0
        calcDone = false
    }

    function addCalc(button) {
        setCalc(calc.split() + button)
    }

    function setNumAndCalc(button) {
        setNum(button)
        setCalc(button)
    }

    function addNum(button) {
        if (checkValidNum.test(num + button) === true) {
            setNum(num.split() + button)
            addCalc(button)
            operatorCount = 0
        }
    }

    function AddOperator(button) {
        console.log(operatorCount)
        if (operatorCount === 0) {
            setNum('')
            addCalc(button)
            operatorCount = 1
        } else if (operatorCount === 1) {
            if (button === '-') {
                addCalc(button)
                operatorCount = 2
            } else {
                setCalc(calc.slice(0, -1) + button)
            }
        }
    }

    function checkCalcDone(button) {
        if (calcDone === true) {
            if (['+', '*', '/', '-',].includes(button)) {
                checkZero(button)
                calcDone = false
            }
        } else {
            checkZero(button)
        }
    }

    function checkZero(button) {
        if (num === '0' && calc === '0') {
            if (!['+', '*', '/', '-', '.'].includes(button)) {
                setNumAndCalc(button)
            } else if (button === '.') {
                setNumAndCalc('0.')
            } else if (button === '-') {
                operatorCount = 2
                setNumAndCalc(button)
            }
        } else {
            if (['+', '*', '/', '-'].includes(button)) {
                AddOperator(button)
            } else {
                addNum(button)
            }
        }
    }

    function calculate() {
        setCalculated(evaluate(calc))
        setCalc(evaluate(calc).toString())
        setNum('0')
        calcDone = true
    }

    function checkCalc() {
        if (['+', '*', '/', '-'].includes(calc.slice(-1)) && calc.length > 1) {
            setCalc(calc.slice(0, -1))
        } else if (calc !== '-') {
            calculate()
        }
    }

    function addExpression(button) {
        switch (button) {
            case '=':
                checkCalc()
                break;
            case 'CE':
                clearEverything()
                break;
            default:
                checkCalcDone(button)
                break;
        }
    }

    return (
        <Grid container className={classes.calcContainer} xs={8} spacing={1}>
            <Grid className={classes.displayContainer} item xs={11}>
                <h2 className={classes.displayText}>{calc}</h2>
            </Grid>
            <Grid className={classes.displayContainer} item xs={11}>
                <p className={classes.displayText}>{calculated}</p>
            </Grid>
            {calcButtonLayout.map((button) => (
                <Grid item xs={setSize(button)}>
                    <Button
                        id={button}
                        className={clsx(classes.calcButton, classes.[button])}
                        onClick={() => {
                            addExpression(button)
                        }}

                        variant='contained' >{button}
                    </Button>
                </Grid>
            ))}
        </Grid>
    )
}

