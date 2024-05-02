import {
  Button,
  Caption,
  ContentCard,
  Group,
  Link,
  Spacing,
  Spinner,
  Title,
} from "@vkontakte/vkui";
import style from "./StoryArea.module.css";
import {
  Icon12User,
  Icon16LikeOutline,
  Icon16CommentOutline,
  Icon16Replay,
  Icon16ArrowTriangleDown,
} from "@vkontakte/icons";
import { useEffect, useState } from "react";

function StoryArea({
  currentStory,
  isErrorId,
  isLoading,
  setIsLoading,
  getCurrentStory,
}) {
  const [comments, setComment] = useState();
  const [childComents, setChildComents] = useState({});
  const [childCommentConfig, setChildComentsConfig] = useState({});

  function getComments(arr) {
    return Promise.all(
      arr.map((item) => {
        return fetch(
          `https://hacker-news.firebaseio.com/v0/item/${item}.json?print=pretty`
        ).then((data) => {
          return data.json();
        });
      })
    );
  }

  useEffect(() => {
    if (currentStory?.kids) {
      getComments(currentStory.kids)
        .then((data) => {
          setComment(
            data.filter((item) => {
              if (item?.deleted) {
                return false;
              }
              return true;
            })
          );
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [currentStory]);

  return (
    <Group>
      {isErrorId && (
        <div className={style.errorContainer}>
          <Title Component="h2" normalize={false}>
            Что то пошло не так...
          </Title>
          <Link href="#/">На главную</Link>
        </div>
      )}
      {currentStory && (
        <>
          <ContentCard
            subtitle={
              <div className={style.container}>
                <div className={style.container}>
                  <Icon12User />
                  <Caption>{currentStory?.by}</Caption>
                </div>
                <span>•</span>
                <Caption>
                  {new Date(currentStory?.time * 1000).toLocaleString()}
                </Caption>
              </div>
            }
            header={currentStory?.title}
            caption={
              currentStory?.url && (
                <Link href={currentStory?.url} target="_blank">
                  {currentStory?.url}
                </Link>
              )
            }
          />
          <div className={style.caption}>
            <div className={style.container}>
              <Icon16LikeOutline />
              <Caption>{currentStory?.score}</Caption>
            </div>
            <div className={style.container}>
              <Icon16CommentOutline />
              <Caption>{currentStory?.descendants}</Caption>
            </div>
            <Button
              size="s"
              label="Обновить"
              loading={isLoading}
              disabled={isLoading}
              onClick={getCurrentStory}
            >
              <Icon16Replay />
            </Button>
          </div>
          {isLoading && (
            <Spinner size="medium" style={{ margin: "0 0 10px" }} />
          )}
          {comments &&
            comments.map((item) => (
              <>
                <ContentCard
                  key={item?.id}
                  subtitle={
                    <div className={style.container}>
                      <div className={style.container}>
                        <Icon12User />
                        <Caption>{item?.by}</Caption>
                      </div>
                      <span>•</span>
                      <Caption>
                        {new Date(item?.time * 1000).toLocaleString()}
                      </Caption>
                    </div>
                  }
                  header={item?.text}
                  caption={
                    item?.kids && (
                      <button
                        type="button"
                        className={style.uncoverButton}
                        aria-label="раскрыть"
                        onClick={() => {
                          getComments(item.kids).then((data) => {
                            const childsArray = data.filter((i) => {
                              if (i?.deleted) {
                                return false;
                              }
                              return true;
                            });

                            setChildComents({
                              ...childComents,
                              [item.id]: childsArray,
                            });
                            setChildComentsConfig({
                              ...childCommentConfig,
                              [item.id]: true,
                            });
                          });
                        }}
                      >
                        <Icon16ArrowTriangleDown />
                      </button>
                    )
                  }
                />
                <Spacing size={12} />
                {item?.kids &&
                  childCommentConfig[item.id] &&
                  childComents[item.id].map((childItem) => (
                    <div key={childItem?.id}>
                      <div style={{ paddingLeft: "20px" }}>
                        <ContentCard
                          subtitle={
                            <div className={style.container}>
                              <div className={style.container}>
                                <Icon12User />
                                <Caption>{childItem?.by}</Caption>
                              </div>
                              <span>•</span>
                              <Caption>
                                {new Date(
                                  childItem?.time * 1000
                                ).toLocaleString()}
                              </Caption>
                            </div>
                          }
                          header={childItem?.text}
                        />
                      </div>
                      <Spacing size={12} />
                    </div>
                  ))}
              </>
            ))}
        </>
      )}
    </Group>
  );
}

export default StoryArea;
