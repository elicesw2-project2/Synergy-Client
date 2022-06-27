import React from 'react';
import { useParams } from 'react-router-dom';

import 'styles/Home.scss';

function WorkspaceHome() {
  const { workspaceIdx } = useParams();
  return (
    <div className="Home">
      {workspaceIdx}번 워크스페이스에 오신 것을 환영합니다!
    </div>
  );
}

export default WorkspaceHome;