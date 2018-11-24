Meteor.Migrations.add('addIdToInvitaionStates', log => {
  InvitationStates.find({"index": { $exists: true }}).forEach( state =>{
    log.info("InvitationState #{state._id}: copying `index` to `id`");
    InvitationStates.update(state._id, { $set: { id: state.index } })
  });

  log.info('Unsetting `index` on all InvitationStates');
  InvitationStates.update({ "index": { $exists: true } },
                          { $unset: { "index": "" } },
                          { multi: true })
});