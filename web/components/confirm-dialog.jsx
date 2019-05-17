import { Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';

class ConfirmDialog extends React.Component {
	render() {
		const { message, onCancel, onConfirm, show, title } = this.props;
		return (
			<Modal show={ show } onHide={ onCancel }>
				<Modal.Header closeButton>
					<Modal.Title>{ title }</Modal.Title>
				</Modal.Header>
				<Modal.Body>{ message }</Modal.Body>
				<Modal.Footer>
					<Button
						id="btn-confirm"
						bsStyle="primary"
						onClick={ onConfirm }
					>
						Yes
					</Button>
					<Button
						id="btn-cancel"
						onClick={ onCancel }
					>
						No
					</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}

ConfirmDialog.propTypes = {
	message: PropTypes.node.isRequired,
	onCancel: PropTypes.func.isRequired,
	onConfirm: PropTypes.func.isRequired,
	show: PropTypes.bool,
	title: PropTypes.string.isRequired
};

export default ConfirmDialog;
