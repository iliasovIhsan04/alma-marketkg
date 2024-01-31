import React, { useState } from "react";
import "./Storis.css";
import Stories from "react-insta-stories";
import border from "../img/storis_border.svg";
import bordering from "../img/bordering.svg";

const StorisContent = ({ data }) => {
  const [status, setStatus] = useState(false);
  const [view, setView] = useState(false);

  return (
    <div>
      <>
        <div
          style={{
            background: `url(${
              view ? bordering : border
            }) no-repeat center / cover `,
            padding: 5,
          }}
          onClick={() => setStatus(true) || setView(true)}
          className="storis_content"
        >
          <img
            style={{
              borderRadius: "50%",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
            src={data.img}
            alt=""
          />
        </div>
        {status ? (
          data ? (
            <div className="status">
              <Stories
                stories={data.stories}
                width={"100%"}
                height={"100vh"}
                onAllStoriesEnd={() => setStatus(false)}
              />
            </div>
          ) : (
            <div onClick={() => setStatus(false)} className="not_status"></div>
          )
        ) : (
          ""
        )}
      </>
    </div>
  );
};

export default StorisContent;
