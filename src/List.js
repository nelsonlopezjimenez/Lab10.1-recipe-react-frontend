import React from 'react';
import Recipe from './Recipe';
import './List.css';

function List (props){
  const {onDelete} = props;
  const recipes = props.recipes.map( recipe => (
    <Recipe key={recipe._id} {...recipe} onDelete={onDelete} />
  ));
  return(
    <div className='recipe-list'>
       {recipes}
    </div>
  )
}

export default List;
