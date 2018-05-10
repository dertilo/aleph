import React, {Component} from 'react';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {Icon} from '@blueprintjs/core';
import {Link} from 'react-router-dom';

import { Date } from 'src/components/common';
import CollectionDeleteDialog from 'src/dialogs/CollectionDeleteDialog/CollectionDeleteDialog';
import { deleteCollection } from 'src/actions';

class CaseTableRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteIsOpen: false,
      color: ''
    };

    this.toggleDeleteCase = this.toggleDeleteCase.bind(this);
  }

  toggleDeleteCase() {
    this.setState({deleteIsOpen: !this.state.deleteIsOpen});
  }

  render() {
    const { collection, color } = this.props;
    return (
      <tr key={collection.id + 1} className='nowrap'>
        <td>
          <Icon icon="square" iconSize={25} color={color} style={{backgroundColor: color, opacity: 0.6}}/>
        </td>
        <td className="schema">
          <Link to={`/cases/${collection.id}`}>{collection.label}</Link>
        </td>
        <td className="schema">
          {collection.summary}
        </td>
        <td className="schema">
        </td>
        <td className="date">
          <Date value={collection.created_at}/>
        </td>
        <td>
          <a onClick={this.toggleDeleteCase}>
            <FormattedMessage id="case.index.remove" defaultMessage="Remove"/>
          </a>
        </td>
        <CollectionDeleteDialog collection={collection}
                                isOpen={this.state.deleteIsOpen}
                                toggleDialog={this.toggleDeleteCase} />
      </tr>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({});
export default connect(mapStateToProps, {deleteCollection})(CaseTableRow);
