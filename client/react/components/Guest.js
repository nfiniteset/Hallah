import React from 'react';
import PropTypes from 'prop-types';

class ShowGuest extends React.Component {
  static propTypes = {
    guest: PropTypes.shape({
      name: PropTypes.string
    }).isRequired
  }  

  saveName(event){
    this.props.updateGuest({ name: event.target.value });
  }

  saveDietaryRestrictions(event) {
    console.log(event.target.value);
  }

  render() {
    return(
      <form>
        <input type="text" id="guestName" name="guestName" onChange={this.saveName} value={this.props.guest.name}/>
        <select multiple="multiple" onChange={this.saveDietaryRestrictions}>
          <option value="foo">Foo</option>
          <option value="bar">Bar</option>
        </select>
      </form>
    );
  }
}

export default ShowGuest;