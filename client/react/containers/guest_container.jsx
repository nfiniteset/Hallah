import { createContainer } from 'meteor/react-meteor-data';

export default GuestContainer = createContainer((props) => {
  const { id } = props;
  const guest = Guests.findOne(id);

  function updateGuest(props) {
    const guestAttrs = {
      name: props.name
    }
    Guests.update(id, { $set: guestAttrs })
  }

  return {
    guest,
    updateGuest
  };
}, ShowGuest);
