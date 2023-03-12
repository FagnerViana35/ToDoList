import React from 'react';
import CardToDoList from '../../Card/index'
import NavBar from '../../NavBar/index';
import './index.scss';

function TodoList() {

    return (
        <div className='container'>
            <div className='navBar'>
            <NavBar />
            </div>
            <div className='cards'>
            <CardToDoList />
            </div>
        </div>
    );
}

export default TodoList;