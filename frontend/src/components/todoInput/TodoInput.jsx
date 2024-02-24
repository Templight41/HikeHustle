import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import './TodoInput.css'
import AddIcon from '@mui/icons-material/Add';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { useState } from 'react';


export default function TodoInput({buttonText, addTodo}) {

    const [todoInput, setTodoInput] = useState("");
    const [dateInput, setDateInput] = useState("");

    const inputChange = (e) => {
        setTodoInput(e.target.value)
    }

    const dateChange = (e) => {
        setDateInput(e.target.value)
    }

    const submit = (e) => {
        if(todoInput.length > 0) {
            addTodo({task: todoInput})
            setTodoInput("")
        }
    }

  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <Button variant="contained" {...bindTrigger(popupState)}>
            <AddIcon/>{buttonText ? buttonText : null}
          </Button>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <div className='todoInputContainer'>
                <div className='inputBoxContainer'>
                    <label htmlFor="todo">Todo</label>
                    <div className="inputContainer todoInput">
                        <input type="type" id="todo" onChange={inputChange} value={todoInput}/>
                    </div>
                    {/* <label htmlFor="date">Due</label>
                    <div className="inputContainer">
                        <input type="date" id="date" onChange={dateChange} value={dateInput}/>
                    </div> */}
                </div>
                <button onClick={submit} className='todoAddButton'>Add</button>
            </div>
          </Popover>
        </div>
      )}
    </PopupState>
  );
}