import React, { useState } from 'react';
import RadioButton from 'components/Button/RadioButton';

import 'styles/Modals/SideBarModal.scss';
import { useMutation, useQueryClient } from 'react-query';
import { postChannel } from 'utils/api';

interface iProps {
  onClickToggleModal: () => void;
}

function SideBarModal({ onClickToggleModal }: iProps) {
  const [channelName, setChannelName] = useState<string>('');
  const [channelType, setChannelType] = useState<string>('document');
  const handleChangeChannelName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChannelName(e.target.value);
  };

  const queryClient = useQueryClient();

  const mutation = useMutation(postChannel, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries('channels');
    },
  });

  const handleSubmit = () => {
    mutation.mutate({
      name: channelName,
      type: channelType,
      category_idx: 1,
    });
    onClickToggleModal();
  };

  return (
    <div className="Modal__Background">
      <div className="Modal__Container">
        {/* 나가기 버튼 */}
        <form className="SideBarModal__Form" onSubmit={handleSubmit}>
          <button
            type="button"
            onClick={onClickToggleModal}
            className="Modal__Form__CloseBtn"
          >
            X
          </button>
          <h1>채널 만들기</h1>
          <RadioButton
            type="document"
            setChannelType={setChannelType}
            checked
            key="1"
          />
          <RadioButton
            type="scheduleboard"
            setChannelType={setChannelType}
            key="2"
          />
          <div className="SideBarModal__Form__Input">
            <h2>채널 이름</h2>
            <input
              placeholder="# 새로운 채널"
              onChange={handleChangeChannelName}
              required
            />
          </div>
          {/* 서버 추가 버튼 */}
          <input
            type="submit"
            className="Modal__Form__SubmitBtn"
            value="제출"
          />
        </form>
      </div>
    </div>
  );
}

export default SideBarModal;
