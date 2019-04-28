import FormGroup from './form-group';
import PropTypes from 'prop-types';
import { propTypes, withFormsy } from 'formsy-react';
import React from 'react';
import ReactTags from 'react-tag-autocomplete';

require('./tags.css');

class Tags extends React.Component {
	constructor(props) {
		super(props);

		const suggestions = props.suggestions
			? props.suggestions.map((s, i) => ({ id: i, name: s }))
			: [];

		this.state = {
			suggestions,
			validationState: null,
			validationError: null
		};

		this.handleAddition = this.handleAddition.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleValidate = this.handleValidate.bind(this);
	}

	handleAddition(tag) {
		this.setState({
			...this.state,
			validationState: 'success',
			validationError: null
		});
		this.props.setValue([ ...this.props.getValue(), tag.name ]);
	}

	handleDelete(i) {
		const tags = [ ...this.props.getValue() ];
		tags.splice(i, 1);
		this.props.setValue(tags);
	}

	handleValidate(tag) {
		const isValid = /^[a-z0-9 ]{1,50}$/i.test(tag.name);

		if (!isValid) {
			this.setState({
				...this.state,
				validationState: 'error',
				validationError: 'Tags can only contain letters, numbers, and spaces.'
			});
		}

		return isValid;
	}

	render() {
		const tags = (this.props.getValue() || []).map(v => ({ name: v }));

		/* eslint-disable react/jsx-handler-names */
		return (
			<FormGroup
				controlId={ this.props.controlId }
				label={ this.props.label }
				validationState={ this.state.validationState }
				errorMessage={ this.state.validationError }
			>
				<ReactTags
					allowNew
					autofocus={ false }
					delimiters={ [] }
					delimiterChars={ [ '\n', '\t', ',' ] }
					handleAddition={ this.handleAddition }
					handleDelete={ this.handleDelete }
					handleValidate={ this.handleValidate }
					inputAttributes={ { maxLength: 50 } }
					maxSuggestionsLength={ 12 }
					minQueryLength={ 1 }
					placeholder="Type new tag and press &quot;Tab&quot;"
					classNames={ {
						root: 'form-control',
						rootFocused: 'form-control',
						selected: 'react-tags__selected',
						selectedTag: 'react-tags__selected-tag',
						selectedTagName: 'react-tags__selected-tag-name',
						search: 'react-tags__search',
						searchInput: 'react-tags__search-input',
						suggestions: 'react-tags__suggestions',
						suggestionActive: 'is-active',
						suggestionDisabled: 'is-disabled'
					} }
					tags={ tags }
					suggestions={ this.state.suggestions }
				/>
			</FormGroup>
		);
		/* eslint-enable react/jsx-handler-names */
	}
}

Tags.propTypes = {
	suggestions: PropTypes.arrayOf(PropTypes.string),
	...propTypes
};

export default withFormsy(Tags);
