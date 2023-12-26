import * as clipboard from "clipboard-polyfill";
import { useRef } from "react";
import PropTypes from "prop-types";

import "./preview.scss";

const Preview = (props) => {
  const { data, setMsg, setSuccess } = props;

  const div = useRef(null);

  const copyToClipboard = (isHtml) => {
    const dt = new clipboard.DT();
    const html = div.current.innerHTML.trim();

    if (isHtml) {
      dt.setData("text/plain", html);
      setMsg("✔︎ HTML код подписи успешно скопирован!");
    } else {
      clipboard.suppressWarnings();
      dt.setData("text/html", html);
      setMsg("✔︎ Ваша подпись успешно сформирована!");
    }

    clipboard.write(dt);

    setSuccess(true);
  };

  return (
    <div className="preview-block">
      <div className="content-table">
        <table ref={div} className="main-table-tag" style={{ width: "500px" }}>
          <tbody>
            <tr>
              <td>
                <table
                  className="main-table-tag general-table"
                  style={{ width: "500px" }}
                >
                  <tbody>
                    <tr
                      className="table-flex"
                      style={{
                        width: "500px",
                        height: "100%",
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        marginBottom: "10px",
                      }}
                    >
                      <td
                        className="table-left"
                        style={{
                          width: "35%",
                          maxWidth: "35%",
                          height: "170px",
                        }}
                      >
                        <table>
                          <tbody>
                            <tr>
                              <td>
                                <img
                                  style={{
                                    width: "100%",
                                    borderRadius: "3px",
                                  }}
                                  className="logo"
                                  src={
                                    data.photoUrl
                                      ? data.photoUrl
                                      : "https://media.istockphoto.com/id/1147544807/ru/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F/%D0%BD%D0%B5%D1%82-thumbnail-%D0%B8%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80-%D0%B3%D1%80%D0%B0%D1%84%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B9.jpg?s=612x612&w=0&k=20&c=qA0VzNlwzqnnha_m2cHIws9MJ6vRGsZmys335A0GJW4="
                                  }
                                  alt="logo"
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                      <td
                        className="table-right"
                        style={{
                          width: "65%",
                          height: "170px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          marginLeft: "10px",
                        }}
                      >
                        <table>
                          <tbody>
                            <tr>
                              <td
                                style={{
                                  textAlign: "initial",
                                  position: "relative",
                                }}
                              >
                                <span
                                  style={{
                                    fontWeight: "bold",
                                    fontSize: "18px",
                                    color: "#000",
                                  }}
                                >
                                  {data.firstname ? data.firstname : "Имя"}
                                </span>
                                <span>&nbsp;</span>
                                <span
                                  style={{
                                    fontWeight: "bold",
                                    fontSize: "18px",
                                    color: "#000",
                                  }}
                                >
                                  {data.lastname ? data.lastname : "Фамилия"}
                                </span>
                                <p
                                  style={{
                                    margin: 0,
                                    marginBottom: "5px",
                                    paddingBottom: "10px",
                                    borderBottom: "1px solid #ee1b22",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontSize: "14px",
                                      lineHeight: "22px",
                                      color: "#000",
                                    }}
                                  >
                                    {data.position
                                      ? data.position
                                      : "Должность"}
                                  </span>
                                </p>

                                <table
                                  style={{
                                    width: "100%",
                                  }}
                                >
                                  <tbody>
                                    <tr
                                      style={{
                                        width: "100%",
                                        display: "flex",
                                        height: "100%",
                                        alignItems: "flex-start",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <td>
                                        <table style={{ marginBottom: "3px" }}>
                                          <tbody>
                                            <tr>
                                              <td
                                                style={{
                                                  margin: "5px 0",
                                                }}
                                              >
                                                <img
                                                  className="mini-icon"
                                                  src="https://i.postimg.cc/CMC8JnTP/phone-2.png"
                                                  color="#000"
                                                  alt="Phone icon"
                                                  style={{
                                                    display: "block",
                                                    marginRight: "8px",
                                                  }}
                                                />
                                              </td>
                                              <td>
                                                <span
                                                  style={{
                                                    fontSize: "12px",
                                                    color: "#000",
                                                  }}
                                                >
                                                  {data.phone
                                                    ? data.phone
                                                    : "+7-999-999-99-99"}
                                                </span>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>

                                        <table
                                          style={{
                                            marginTop: "0",
                                            marginBottom: "3px",
                                          }}
                                        >
                                          <tbody>
                                            <tr>
                                              <td
                                                style={{
                                                  margin: "5px 0",
                                                }}
                                              >
                                                <img
                                                  className="mini-icon"
                                                  src="https://i.postimg.cc/pLS5yDzT/envelope-1.png"
                                                  color="#000"
                                                  alt="Email icon"
                                                  style={{
                                                    display: "block",
                                                    marginRight: "8px",
                                                  }}
                                                />
                                              </td>
                                              <td>
                                                <span
                                                  style={{
                                                    fontSize: "12px",
                                                    color: "#000",
                                                    textDecoration: "none",
                                                  }}
                                                >
                                                  {data.email
                                                    ? data.email
                                                    : "yourmail@gmail.com"}
                                                </span>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>

                                        <table
                                          style={{
                                            marginTop: "0",
                                          }}
                                        >
                                          <tbody>
                                            <tr
                                              style={{
                                                cursor: "pointer",
                                              }}
                                            >
                                              <td
                                                style={{
                                                  width: "30px",
                                                  margin: "5px 0",
                                                }}
                                              >
                                                <img
                                                  className="mini-icon"
                                                  src="https://i.postimg.cc/ZnjCm3JJ/arrow-1.png"
                                                  color="#000"
                                                  alt="Website URL icon"
                                                  style={{
                                                    display: "block",
                                                    marginRight: "8px",
                                                  }}
                                                />
                                              </td>
                                              <td>
                                                <a
                                                  target="__blank"
                                                  href="https://reputation.house/"
                                                  style={{
                                                    textDecoration: "none",
                                                    color: "#000",
                                                  }}
                                                >
                                                  <span
                                                    style={{
                                                      fontSize: "12px",
                                                    }}
                                                  >
                                                    reputation.house
                                                  </span>
                                                </a>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                      <td
                                        style={{
                                          height: "100%",
                                        }}
                                      >
                                        <table
                                          className="social-block"
                                          style={{
                                            display: "flex",
                                            height: "100%",
                                            alignItems: "flex-start",
                                            justifyContent: "flex-end",
                                          }}
                                        >
                                          <tbody>
                                            <tr>
                                              <td>
                                                <div>
                                                  <>
                                                    <a
                                                      href="https://www.linkedin.com/company/20417837"
                                                      color="#000"
                                                      style={{
                                                        display: "inline-block",
                                                        padding: "0px",
                                                        margin: "0 5px",
                                                      }}
                                                    >
                                                      <img
                                                        src="https://i.postimg.cc/9FXq4qjT/linkedin-1.png"
                                                        alt="linkedin"
                                                        style={{
                                                          maxWidth: "135px",
                                                          display: "block",
                                                        }}
                                                      />
                                                    </a>
                                                  </>
                                                  <>
                                                    <a
                                                      href="https://www.instagram.com/reputation_house"
                                                      color="#000"
                                                      style={{
                                                        display: "inline-block",
                                                        padding: "0px",
                                                        margin: "0 5px",
                                                      }}
                                                    >
                                                      <img
                                                        src="https://i.postimg.cc/13ktK8bv/instagram-1.png"
                                                        alt="instagram"
                                                        color="#000"
                                                        style={{
                                                          maxWidth: "135px",
                                                          display: "block",
                                                        }}
                                                      />
                                                    </a>
                                                  </>
                                                  <>
                                                    <a
                                                      href="https://www.youtube.com/@ReputationHouse-pr2tq"
                                                      color="#000"
                                                      style={{
                                                        display: "inline-block",
                                                        padding: "0px",
                                                        margin: "0 5px",
                                                      }}
                                                    >
                                                      <img
                                                        src="https://i.postimg.cc/DZd807jB/youtube-1.png"
                                                        alt="youtube"
                                                        color="#000"
                                                        style={{
                                                          maxWidth: "135px",
                                                          display: "block",
                                                        }}
                                                      />
                                                    </a>
                                                  </>
                                                </div>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr style={{ marginTop: "0" }}>
                      <td
                        className="logo-table"
                        style={{
                          width: "100%",
                        }}
                      >
                        <div
                          className="logo-block"
                          style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            backgroundColor: "#ee1b22",
                            padding: "10px 15px",
                            borderRadius: "2px",
                          }}
                        >
                          <img src="https://thumb.tildacdn.com/tild3830-3339-4166-b161-326566336365/-/resize/162x/-/format/webp/logo_white_1.png" />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="buttons-block__wrapper">
        {data.firstname && (
          <div className="buttons-block">
            <button
              type="submit"
              className="generate-btn"
              onClick={() => copyToClipboard(false)}
            >
              Сформировать подпись
            </button>
            <button
              type="submit"
              className="generate-btn"
              onClick={() => copyToClipboard(true)}
            >
              Скопировать HTML
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

Preview.propTypes = {
  data: PropTypes.object.isRequired,
  setMsg: PropTypes.func,
  setSuccess: PropTypes.func,
};

export default Preview;
