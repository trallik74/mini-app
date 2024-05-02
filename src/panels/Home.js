import { Panel, PanelHeader } from "@vkontakte/vkui";
import { useEffect } from "react";
import Newsline from "../components/Newsline/Newsline";

export const Home = ({
  id,
  fetchedList,
  handleUpdateData,
  isLoading,
  setIsLoading,
}) => {
  useEffect(() => {
    let timerId = setInterval(() => {
      handleUpdateData();
    }, 60000);

    return () => {
      clearInterval(timerId);
    };
  });

  return (
    <Panel id={id}>
      <PanelHeader>Главная</PanelHeader>
      {fetchedList && (
        <Newsline
          fetchedList={fetchedList}
          handleUpdateData={handleUpdateData}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      )}
    </Panel>
  );
};
