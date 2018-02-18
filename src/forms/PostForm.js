import React, {Component} from 'react';

class PostForm extends Component {
  render() {
    const post = this.props.post;
    const titleClass = "form-group";
    const bodyClass = "form-group";

    return(
      <form onSubmit={this.props.handleSubmit}>
        <div className={titleClass}>
          <label htmlFor="title">Titulo</label>
          <input type="text" className="form-control" id="title" placeholder="Inserta el título" defaultValue={post ? post.title : ''}/>
        </div>

        <div className={bodyClass}>
          <label htmlFor="body">Contenido</label>
          <textarea
            id="body"
            cols="30"
            rows="10"
            className="form-control"
            defaultValue={post ? post.body : ''}
            placeholder="Escribe el contenido"></textarea>
        </div>

        <div className="text-center">
            <button type="submit" className="btn btn-primary" id="createButton">
              {post ? 'Update' : 'Create'}
            </button>
          </div>
      </form>
    );
  }
}

export default PostForm;