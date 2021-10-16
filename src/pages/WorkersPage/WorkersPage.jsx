import React, { useState } from 'react';

import ActionWorkersModal from '../../components/Modals/ActionWorkersModal';
import WorkersTable from '../../components/Tables/WorkersTable';

const WorkersPage = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <WorkersTable setShowModal={setShowModal} />
      <ActionWorkersModal setOpen={setShowModal} open={showModal} />
    </>
  );
};

export default WorkersPage;
