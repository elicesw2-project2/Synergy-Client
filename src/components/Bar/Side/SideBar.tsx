import React, { useCallback, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

// css
import 'styles/Bars/SideBar.scss';

// components
import { useQuery } from 'react-query';
import { getChannelCategory } from 'utils/api';
import { useParams } from 'react-router-dom';
import ChannelCategory from './ChannelCategory';
import AddChannelCategory from './AddChannelCategory/AddChannelCategory';

export interface IChannelCategory {
  category_idx: number;
  name: string;
  workspace_idx: number;
}

function SideBar() {
  const { workspaceIdx } = useParams();
  const { isLoading, data: channelCategories } = useQuery<IChannelCategory[]>(
    ['channelCategory', workspaceIdx],
    () => getChannelCategory(Number(workspaceIdx))
  );

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const onClickToggleModal = useCallback(() => {
    setIsOpenModal(!isOpenModal);
  }, [isOpenModal]);

  return (
    <div className="SideBar">
      {/* 워크 스페이스 이름 */}
      <div className="SideBar__category">
        <h1>워크스페이스</h1>
        <FontAwesomeIcon
          icon={faPlusCircle}
          onClick={onClickToggleModal}
          className="SideBar__add-button"
        />
      </div>

      {isOpenModal && (
        <AddChannelCategory
          workspaceIdx={workspaceIdx}
          onClickToggleModal={onClickToggleModal}
        />
      )}

      {/* 채널 카테고리 */}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        channelCategories?.map((category) => (
          <ChannelCategory key={category.category_idx} category={category} />
        ))
      )}
    </div>
  );
}

export default SideBar;
