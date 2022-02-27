import React, {Component} from 'react';
import Recipe from './Recipe';
import './List.css';

class List extends Component {

  render() {
    const {onDelete} = this.props;
    const recipes = this.props.recipes.map((r) => (
      <Recipe key={r._id} {...r} onDelete={onDelete} />
    ));

    return (
      <div className="recipe-list">
        {recipes}
      </div>
    )

  }
}

export default List;
