import { observer } from "mobx-react-lite";

const Result = observer(() => {
  const fullUrl = localStorage.getItem("fullUrl");
  const shortUrl = localStorage.getItem("shortUrl");

  return (
    <div>
      Full Url:
      {
        fullUrl === null
          ?
          <div>
            Отсутствует
          </div>
          :
          <div>
            {fullUrl}
          </div>
      }
      <br/>
      Short Url
      {
        shortUrl === null
          ?
          <div>
            Отсутствует
          </div>
          :
          <div>
            {shortUrl}
          </div>
      }
    </div>
  );
});

export { Result };
