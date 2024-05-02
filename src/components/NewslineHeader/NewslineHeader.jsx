import { Div, Headline, IconButton } from "@vkontakte/vkui";
import style from "./NewslineHeader.module.css";
import { Icon16Replay } from "@vkontakte/icons";

function NewslineHeader({ handleUpdateData, isLoading, setIsLoading }) {
  return (
    <Div>
      <div className={style.header}>
        <Headline>Новости</Headline>
        <IconButton
          disabled={isLoading}
          label="Обновить"
          onClick={() => {
            setIsLoading(true);
            handleUpdateData();
          }}
        >
          <Icon16Replay width={16} hanging={16} />
        </IconButton>
      </div>
    </Div>
  );
}

export default NewslineHeader;
