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
        <table ref={div} className="main-table-tag">
          <tbody>
            <tr>
              <td>
                <table className="main-table-tag general-table">
                  <tbody>
                    <tr
                      className="table-flex"
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "20px",
                      }}
                    >
                      <td
                        className="table-left"
                        style={{
                          maxWidth: "150px",
                        }}
                      >
                        <img
                          style={{ width: "100%" }}
                          className="logo"
                          src={
                            data.photoUrl
                              ? data.photoUrl
                              : "https://media.istockphoto.com/id/1147544807/ru/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F/%D0%BD%D0%B5%D1%82-thumbnail-%D0%B8%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80-%D0%B3%D1%80%D0%B0%D1%84%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B9.jpg?s=612x612&w=0&k=20&c=qA0VzNlwzqnnha_m2cHIws9MJ6vRGsZmys335A0GJW4="
                          }
                          alt="logo"
                        />
                      </td>
                      <td
                        className="table-right"
                        style={{
                          width: "55%",
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                        }}
                      >
                        <table>
                          <tbody>
                            <tr>
                              <td style={{ textAlign: "initial" }}>
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

                                <table>
                                  <tbody>
                                    <tr>
                                      <td
                                        style={{
                                          margin: "5px 0",
                                        }}
                                      >
                                        <img
                                          className="mini-icon"
                                          src="https://cdn2.hubspot.net/hubfs/53/tools/email-signature-generator/icons/phone-icon.png"
                                          color="#000"
                                          alt="Phone icon"
                                          style={{
                                            width: "12px",
                                            display: "block",
                                            backgroundColor: "#000",
                                            marginRight: "15px",
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
                                    marginTop: "-5px",
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
                                          src="https://cdn2.hubspot.net/hubfs/53/tools/email-signature-generator/icons/email-icon.png"
                                          color="#000"
                                          alt="Email icon"
                                          style={{
                                            width: "12px",
                                            display: "block",
                                            backgroundColor: "#000",
                                            marginRight: "15px",
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
                                    marginTop: "-5px",
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
                                          margin: "5px 0",
                                        }}
                                      >
                                        <img
                                          className="mini-icon"
                                          src="https://cdn2.hubspot.net/hubfs/53/tools/email-signature-generator/icons/link-icon.png"
                                          color="#000"
                                          alt="Website URL icon"
                                          style={{
                                            width: "12px",
                                            display: "block",
                                            backgroundColor: "#000",
                                            marginRight: "15px",
                                          }}
                                        />
                                      </td>
                                      <td>
                                        <a
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
                                            https://reputation.house/
                                          </span>
                                        </a>
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
