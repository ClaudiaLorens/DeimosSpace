import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {ReactBsTable, BootstrapTable, TableHeaderColumn, SizePerPageDropDown} from 'react-bootstrap-table';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import TextTruncate from 'react-text-truncate';
import _ from 'lodash';

import ReactModal from './ReactModal';
import CommentForm from '../forms/CommentForm';

export default class Comment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            comments: [],
            modalIsOpen: false,
            modalEditOpen: false,
            commentSelected: {},
        }

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.buttonFormatter = this.buttonFormatter.bind(this);
        this.closeEditModal = this.closeEditModal.bind(this);
        this.handleEditModal = this.handleEditModal.bind(this);
    }

    componentDidMount() {
        this.getComments();
    }

    openEditModal(commentSelected) {
        this.setState({ modalEditOpen: true, commentSelected });
    }

    handleEditModal(evt) {
        evt.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const body = document.getElementById('body').value;

        axios.put(`https://jsonplaceholder.typicode.com/comments/${this.state.commentSelected.id}`, {name, email, body}).then((response) => {
            const comments = this.state.comments;
            const index = _.findIndex(comments, { id: this.state.commentSelected.id });
            if (index > -1) {
                comments[index].name = name;
                comments[index].email = email;
                comments[index].body = body;
            }
            this.setState({ comments });
            this.closeEditModal();
        }).catch((err) => {
            console.log(err);
        }); 
    }

    closeEditModal() {
        this.setState({ modalEditOpen: false, commentSelected: {} });
    }

    getComments() {
        axios.get('https://jsonplaceholder.typicode.com/comments').then((response) => {
            this.setState({comments: response.data});
        }).catch((err) => {
            console.log(err);
        }); 
    }

    handleSubmit(evt) {
        evt.preventDefault();   
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const body = document.getElementById('body').value;
    
        axios.post('https://jsonplaceholder.typicode.com/comments', {name, email, body}).then((response) => {
            const comments = this.state.comments;
            comments.unshift(response.data);
            this.closeModal();
        }).catch((err) => {
            console.log(err);
        });
    }

    handleRemove(commentSelected) {
        axios.delete(`https://jsonplaceholder.typicode.com/comments/${commentSelected.id}`).then((response) => {
            const comments = this.state.comments;
            const index = _.findIndex(comments, { id: commentSelected.id });
            if (index > -1) {
                comments.splice(index, 1);
            }
            this.setState({ comments });
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
                <button type="button" className="btn btn-default" id='removeButton' onClick={() => this.handleRemove(row)}>Eliminar<i className="fas fa-trash"></i></button>
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
                <h1>Comments</h1>
                <button onClick={this.openModal} type="button" className="btn btn-default" id='newComment'>Nueva entrada<i class="fas fa-plus"></i></button>
                <div id='commentTable'>
                    <BootstrapTable data={ this.state.comments } height='500' scrollTop={ 'Bottom' } striped hover condensed options={this.options}>
                        <TableHeaderColumn dataField='name' isKey>Name</TableHeaderColumn>
                        <TableHeaderColumn dataField='email'>Email</TableHeaderColumn>
                        <TableHeaderColumn dataField='body' dataFormat={this.truncateBody}>Contenido</TableHeaderColumn>
                        <TableHeaderColumn dataField="button" dataFormat={this.buttonFormatter} id='action_column'>Acciones</TableHeaderColumn>
                    </BootstrapTable>
                </div>

                <ReactModal
                    isOpen={this.state.modalIsOpen}
                    onClose={this.closeModal}
                    >
                    <div>
                        <button onClick={this.closeModal} type="button" className="btn btn-default pull-right closeButton"><i className="fas fa-times"></i></button>
                        <CommentForm handleSubmit={this.handleSubmit} errors={this.state.errors}/>
                    </div>
                </ReactModal>

                <ReactModal
                    isOpen={this.state.modalEditOpen}
                    onClose={this.closeEditModal}
                    >
                    <div>
                        <button onClick={this.closeEditModal} type="button" className="btn btn-default pull-right closeButton"><i className="fas fa-times"></i></button>
                        <CommentForm comment={this.state.commentSelected} handleSubmit={this.handleEditModal} errors={this.state.errors}/>
                    </div>
                </ReactModal>
            </div>
        )
    }
}
