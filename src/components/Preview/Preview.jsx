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
        <table
          ref={div}
          className="main-table-tag"
          style={{ width: "500px", maxWidth: "600px" }}
        >
          <tbody>
            <tr>
              <td>
                <table
                  className="main-table-tag general-table"
                  style={{
                    width: "500px",

                    borderCollapse: "collapse",
                  }}
                >
                  <tbody>
                    <tr
                      className="table-flex"
                      style={{
                        width: "500px",
                        display: "flex",
                        height: "100%",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        marginBottom: "0",
                      }}
                    >
                      <td
                        className="table-left"
                        style={{
                          display: "inline",
                          width: "35%",
                          maxWidth: "35%",
                          float: "left",
                          height: "190px",
                          marginRight: "15px",
                        }}
                      >
                        <table
                          style={{ width: "100%", borderCollapse: "collapse" }}
                        >
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
                          width: "60%",
                          display: "inline",
                          float: "right",
                          height: "190px",
                        }}
                      >
                        <table
                          style={{ width: "300px", borderCollapse: "collapse" }}
                        >
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
                                    borderCollapse: "collapse",
                                    marginTop: "15px",
                                  }}
                                >
                                  <tbody>
                                    <tr
                                      style={{
                                        height: "100%",
                                      }}
                                    >
                                      <td>
                                        <table
                                          style={{
                                            marginBottom: "3px",
                                            borderCollapse: "collapse",
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
                                                  //src="https://drive.google.com/uc?export=view&id=1dkjDP1QpeTSbW0k4D5U-cxwEegkfqzIU"
                                                  src="https://drive.google.com/thumbnail?id=1dkjDP1QpeTSbW0k4D5U-cxwEegkfqzIU"
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
                                            borderCollapse: "collapse",
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
                                                  //src="https://drive.google.com/uc?export=view&id=1Vxidzi7f-vMmK8Ij4NGv-S2O6UK--6Wy"
                                                  src="https://drive.google.com/thumbnail?id=1Vxidzi7f-vMmK8Ij4NGv-S2O6UK--6Wy"
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
                                            borderCollapse: "collapse",
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
                                                  //src="https://drive.google.com/uc?export=view&id=1LMcWwXfbjUwaaJT6nlU0lK-wm34VI8_4"
                                                  src="https://drive.google.com/thumbnail?id=1LMcWwXfbjUwaaJT6nlU0lK-wm34VI8_4"
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
                                          verticalAlign: "top",
                                        }}
                                      >
                                        <table
                                          className="social-block"
                                          style={{
                                            width: "100%",
                                            textAlign: "right",
                                            borderCollapse: "collapse",
                                            height: "100%",
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
                                                      }}
                                                    >
                                                      <img
                                                        //src="https://drive.google.com/uc?export=view&id=1z-eHUOGlJFXAKmEQm06RUhy-UVBEspJt"
                                                        src="https://drive.google.com/thumbnail?id=1z-eHUOGlJFXAKmEQm06RUhy-UVBEspJt"
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
                                                        marginLeft: "10px",
                                                      }}
                                                    >
                                                      <img
                                                        //src="https://drive.google.com/uc?export=view&id=1PBrP6IRl_HYBfpVdVTl0huZ9yBLbENq5"
                                                        src="https://drive.google.com/thumbnail?id=1PBrP6IRl_HYBfpVdVTl0huZ9yBLbENq5"
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
                                                        marginLeft: "10px",
                                                      }}
                                                    >
                                                      <img
                                                        //src="https://drive.google.com/uc?export=view&id=1Lexe2dRwtqLzohbKZVdIEChWjWYN7lMS"
                                                        src="https://drive.google.com/thumbnail?id=1Lexe2dRwtqLzohbKZVdIEChWjWYN7lMS"
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
                          <img src="https://drive.google.com/thumbnail?id=1HxghcDi57IpCr-YnqvZls9kaMdO2Usj2" />
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
