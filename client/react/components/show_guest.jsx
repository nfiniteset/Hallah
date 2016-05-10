import React, { PropTypes } from 'react';

ShowGuest = React.createClass({
  propTypes: {
    guest: PropTypes.shape({
      name: PropTypes.string
    }).isRequired
  },

  saveName: function(event){
    this.props.updateGuest({ name: event.target.value });
  },

  saveDietaryRestrictions: function(event){
    console.log(event.target.value);
  },

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
});
