import React, { useState } from 'react';
import RequestResetPassword from '../../../components/Auth/RequestResetPassword';
import ResetPassword from '../../../components/Auth/ResetPassword';


function PasswordRecovery() {
  const [isResetRequested, setIsResetRequested] = useState(false);

  return (
    <div>
      {!isResetRequested ? (
        <RequestResetPassword onResetRequested={() => setIsResetRequested(true)} />
      ) : (
        <ResetPassword />
      )}
    </div>
  );
}

export default PasswordRecovery;
