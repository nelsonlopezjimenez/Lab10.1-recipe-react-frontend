import React from 'react';
import Recipe from './Recipe';
import './List.css';

function List(props) {
  console.log(props.recipes?.length); // props.recipe.length = 7
  const data = props.recipes?.map(recipe => (
    <Recipe key={recipe.id || recipe._id} {...recipe} onDelete1={props.onDelete1} onEdit={props.onEdit} alertwId={props.alertwId} alertOne={props.alertOne} />
  ));
  return (
    <div className='recipe-list'>
      {data}
    </div>
  )
}
export default List;
