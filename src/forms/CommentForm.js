import React, {Component} from 'react';

class CommentForm extends Component {
  render() {
    const comment = this.props.comment;
    const nameClass = "form-group";
    const emailClass = "form-group";
    const bodyClass = "form-group";

    return(
      <form onSubmit={this.props.handleSubmit}>
        <div className={nameClass}>
          <label htmlFor="name">Nombre</label>
          <input type="text" className="form-control" id="name" placeholder="Nombre" defaultValue={comment ? comment.name : ''}/>
        </div>

        <div className={emailClass}>
          <label htmlFor="email">Email</label>
          <input type="text" className="form-control" id="email" placeholder="Email" defaultValue={comment ? comment.email : ''}/>
        </div>

        <div className={bodyClass}>
          <label htmlFor="body">Contenido</label>
          <textarea
            id="body"
            cols="30"
            rows="10"
            className="form-control"
            defaultValue={comment ? comment.body : ''}
            placeholder="Comentario"></textarea>
        </div>

        <div className="text-center">
            <button type="submit" className="btn btn-primary" id="createButton">
              {comment ? 'Update' : 'Create'}
            </button>
          </div>
      </form>
    );
  }
}

export default CommentForm;