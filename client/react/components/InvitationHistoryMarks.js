import React from 'react';
import cn from 'classnames';
import InvitationStates from '../../../lib/api/InvitationStates';

function InvitationHistoryMarks({invitations}) {
  return <ul className="guest-item__history">
    {invitations.map((invitation) => (
      <li
        className={cn('guest-item__history-item', `guest-item__history-item--${InvitationStates.codeFor(invitation.state)}`)}
        key={invitation._id}
      >
        |
      </li>
    ))}
  </ul>;
}

export default InvitationHistoryMarks;