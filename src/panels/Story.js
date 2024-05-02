import { Panel, PanelHeader, PanelHeaderBack } from "@vkontakte/vkui";

import { useParams, useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { useEffect, useState } from "react";
import StoryArea from "../components/StoryArea/StoryArea";

export const Story = ({ id, fetchedList }) => {
  const routeNavigator = useRouteNavigator();
  const { storyId } = useParams();
  const [currentStory, setCurrentStory] = useState();
  const [isErrorId, setIsErrorId] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function getCurrentStory(storyId) {
    fetch(
      `https://hacker-news.firebaseio.com/v0/item/${storyId}.json?print=pretty`
    )
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        if (data.type === "story") {
          setCurrentStory(data);
        } else {
          setCurrentStory(null);
          setIsErrorId(true);
        }
      })
      .catch((err) => {
        setCurrentStory(null);
        setIsErrorId(true);
        console.log(err);
      });
  }

  useEffect(() => {
    if (fetchedList && fetchedList.find((item) => item?.id == storyId)) {
      setCurrentStory(fetchedList.find((item) => item.id == storyId));
    } else {
      getCurrentStory(storyId);
    }
  }, []);

  useEffect(() => {
    console.log(currentStory);
  }, [currentStory]);

  return (
    <Panel id={id}>
      <PanelHeader
        before={<PanelHeaderBack onClick={() => routeNavigator.push("/")} />}
      >
        История
      </PanelHeader>
      <StoryArea
        currentStory={currentStory}
        isErrorId={isErrorId}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        getCurrentStory={() => {
          setIsLoading(true);
          getCurrentStory(storyId);
        }}
      />
    </Panel>
  );
};
