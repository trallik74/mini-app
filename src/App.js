import { useState, useEffect } from "react";
import { View, SplitLayout, SplitCol, ScreenSpinner } from "@vkontakte/vkui";
import { useActiveVkuiLocation } from "@vkontakte/vk-mini-apps-router";
import { Home, Story } from "./panels";
import { DEFAULT_VIEW_PANELS } from "./routes";

export const App = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.HOME } =
    useActiveVkuiLocation();
  const [fetchedList, setList] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [popout, setPopout] = useState(<ScreenSpinner size="large" />);

  async function getData() {
    fetch("https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty")
      .then((response) => response.json())
      .then((data) => {
        return Promise.all(
          data.slice(0, 100).map((item) => {
            return fetch(
              `https://hacker-news.firebaseio.com/v0/item/${item}.json?print=pretty`
            ).then((data) => {
              return data.json();
            });
          })
        );
      })
      .then((data) => {
        setList(data);
      })
      .finally(() => {
        setPopout(null);
        setIsLoading(false);
      });
  }

  function handleUpdateData() {
    getData();
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log(fetchedList);
  }, [fetchedList]);

  return (
    <SplitLayout popout={popout}>
      <SplitCol>
        <View activePanel={activePanel}>
          <Home
            id="home"
            fetchedList={fetchedList}
            handleUpdateData={handleUpdateData}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
          <Story id="storys" fetchedList={fetchedList} />
        </View>
      </SplitCol>
    </SplitLayout>
  );
};
