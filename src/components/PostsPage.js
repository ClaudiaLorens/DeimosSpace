import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {ReactBsTable, BootstrapTable, TableHeaderColumn, SizePerPageDropDown} from 'react-bootstrap-table';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import TextTruncate from 'react-text-truncate';
import _ from 'lodash';

import ReactModal from './ReactModal';
import PostForm from '../forms/PostForm';

export default class PostsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            modalIsOpen: false,
            modalEditOpen: false,
            postSelected: {},
        }

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.buttonFormatter = this.buttonFormatter.bind(this);
        this.closeEditModal = this.closeEditModal.bind(this);
        this.handleEditModal = this.handleEditModal.bind(this);
    }

    componentDidMount() {
        this.getPosts();
    }

    openEditModal(postSelected) {
        this.setState({ modalEditOpen: true, postSelected });
    }

    handleEditModal(evt) {
        evt.preventDefault();

        const title = document.getElementById('title').value;
        const body = document.getElementById('body').value;

        axios.put(`https://jsonplaceholder.typicode.com/posts/${this.state.postSelected.id}`, {title, body}).then((response) => {
            const posts = this.state.posts;
            const index = _.findIndex(posts, { id: this.state.postSelected.id });
            if (index > -1) {
                posts[index].title = title;
                posts[index].body = body;
            }
            this.setState({ posts });
            this.closeEditModal();
        }).catch((err) => {
            console.log(err);
        }); 
    }

    closeEditModal() {
        this.setState({ modalEditOpen: false, postSelected: {} });
    }

    getPosts() {
        axios.get('https://jsonplaceholder.typicode.com/posts').then((response) => {
            this.setState({posts: response.data});
        }).catch((err) => {
            console.log(err);
        }); 
    }

    handleSubmit(evt) {
        evt.preventDefault();   
        const title = document.getElementById('title').value;
        const body = document.getElementById('body').value;
    
        axios.post('https://jsonplaceholder.typicode.com/posts', {title, body}).then((response) => {
            const posts = this.state.posts;
            posts.unshift(response.data);
            this.closeModal();
        }).catch((err) => {
            console.log(err);
        });
    }

    handleRemove(postSelected) {
        axios.delete(`https://jsonplaceholder.typicode.com/posts/${postSelected.id}`).then((response) => {
            const posts = this.state.posts;
            const index = _.findIndex(posts, { id: postSelected.id });
            if (index > -1) {
                posts.splice(index, 1);
            }
            this.setState({ posts });
        }).catch((err) => {
            console.log(err);
        });
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    truncateBody(cell, row) {
        const tooltip = (
            <Tooltip id={row.id}>
                {row.body}
            </Tooltip>
        );


        return (
            <OverlayTrigger placement="bottom" overlay={tooltip}>
                <TextTruncate
                    line={1}
                    truncateText="..."
                    text={row.body}
                />  
            </OverlayTrigger>
        );
    }

    buttonFormatter(cell, row) {
        return (
            <div>
                <button type="button" className="btn btn-default" id='editButton' onClick={() => this.openEditModal(row)}>Editar<i className="fas fa-edit"></i></button>
                <button type="button" className="btn btn-default" id='removeButton' onClick={() => this.handleRemove(row)}><i className="fas fa-trash"></i></button>
            </div>
        );
    }
 
    render() {
        const options = {
            defaultSortName: 'id',
            defaultSortOrder: 'asc'
        };

        return (
            <div className='bottom-space'>
                <h1>Todos los posts</h1>
                <button onClick={this.openModal} type="button" className="btn btn-default" id='newPost'>Nueva entrada<i className="fas fa-plus-square"></i></button>
                <div id='postsTable'>
                    <BootstrapTable data={ this.state.posts } striped hover condensed pagination options={this.options}>
                        <TableHeaderColumn dataField='title' isKey>Titulo</TableHeaderColumn>
                        <TableHeaderColumn dataField='body' dataFormat={this.truncateBody}>Contenido</TableHeaderColumn>
                        <TableHeaderColumn dataField="button" dataFormat={this.buttonFormatter}>Acciones</TableHeaderColumn>
                    </BootstrapTable>
                </div>

                <ReactModal
                    isOpen={this.state.modalIsOpen}
                    onClose={this.closeModal}
                    >
                    <div>
                        <button onClick={this.closeModal} type="button" className="btn btn-default pull-right closeButton"><i className="fas fa-times"></i></button>
                        <PostForm handleSubmit={this.handleSubmit}/>
                    </div>
                </ReactModal>

                <ReactModal
                    isOpen={this.state.modalEditOpen}
                    onClose={this.closeEditModal}
                    >
                    <div>
                    <button onClick={this.closeEditModal} type="button" className="btn btn-default pull-right closeButton"><i className="fas fa-times"></i></button>
                        <PostForm post={this.state.postSelected} handleSubmit={this.handleEditModal}/>
                    </div>
                </ReactModal>
            </div>
        )
    }
}

