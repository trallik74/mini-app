import { Group, InfoRow, SimpleCell, Spinner } from "@vkontakte/vkui";
import NewslineHeader from "../NewslineHeader/NewslineHeader";
import { Icon12Chevron } from "@vkontakte/icons";
import InfoRowHeader from "../InfoRowHeader/InfoRowHeader";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

function Newsline({ fetchedList, handleUpdateData, isLoading, setIsLoading }) {
  const routeNavigator = useRouteNavigator();

  return (
    <Group
      header={
        <NewslineHeader
          handleUpdateData={handleUpdateData}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      }
    >
      {isLoading && <Spinner size="medium" style={{ margin: "0 0 10px" }} />}
      {fetchedList.map((item) => (
        <SimpleCell
          key={item?.id}
          after={<Icon12Chevron width={20} height={20} fill="grey" />}
          onClick={() => routeNavigator.push("storys/" + item.id)}
        >
          <InfoRow header={<InfoRowHeader story={item} />}>
            {item?.title}
          </InfoRow>
        </SimpleCell>
      ))}
    </Group>
  );
}

export default Newsline;
