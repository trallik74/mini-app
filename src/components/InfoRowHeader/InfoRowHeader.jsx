import style from "./InfoRowHeader.module.css";
import { Icon12User } from "@vkontakte/icons";
import { Caption } from "@vkontakte/vkui";

function InfoRowHeader({ story }) {
  return (
    <div className={style.header}>
      <Icon12User />
      <Caption>
        {story?.by} • {new Date(story?.time * 1000).toLocaleString()} • Score:{" "}
        {story?.score}
      </Caption>
    </div>
  );
}

export default InfoRowHeader;
