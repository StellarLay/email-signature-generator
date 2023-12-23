import { useRef } from "react";
import PropTypes from "prop-types";

import "./preview.scss";

const Temp = (props) => {
  const { data } = props;

  const div = useRef(null);

  return (
    <div className="content-table">
      <table ref={div}>
        <tbody>
          <tr>
            <td>
              <table>
                <tbody>
                  <tr>
                    <td
                      style={{
                        maxWidth: "150px",
                      }}
                    >
                      <img
                        style={{ width: "100%" }}
                        className="logo"
                        src="https://i.imgur.com/u5RgfpM.png"
                        alt="logo"
                      />
                      <div
                        style={{
                          marginTop: "5px",
                        }}
                      >
                        <div
                          style={{
                            margin: "auto",
                            width: "70%",
                          }}
                        >
                          <>
                            <a
                              href="https://www.facebook.com/bycodersTec"
                              color="#000"
                              style={{
                                display: "inline-block",
                                padding: "0px",
                                backgroundColor: "#000",
                                margin: "0 5px",
                              }}
                            >
                              <img
                                src="https://cdn2.hubspot.net/hubfs/53/tools/email-signature-generator/icons/facebook-icon.png"
                                alt="facebook"
                                color="#000"
                                style={{
                                  backgroundColor: "#000",
                                  maxWidth: "135px",
                                  display: "block",
                                }}
                              />
                            </a>
                          </>
                          <>
                            <a
                              href="https://www.instagram.com/bycoders_/"
                              color="#000"
                              style={{
                                display: "inline-block",
                                padding: "0px",
                                backgroundColor: "#000",
                                margin: "0 5px",
                              }}
                            >
                              <img
                                src="https://cdn2.hubspot.net/hubfs/53/tools/email-signature-generator/icons/instagram-icon.png"
                                alt="facebook"
                                color="#000"
                                style={{
                                  backgroundColor: "#000",
                                  maxWidth: "135px",
                                  display: "block",
                                }}
                              />
                            </a>
                          </>
                          <>
                            <a
                              href="https://www.linkedin.com/company/bycoders-tecnologia/"
                              color="#000"
                              style={{
                                display: "inline-block",
                                padding: "0px",
                                backgroundColor: "#000",
                                margin: "0 5px",
                              }}
                            >
                              <img
                                src="https://cdn2.hubspot.net/hubfs/53/tools/email-signature-generator/icons/linkedin-icon.png"
                                alt="facebook"
                                color="#000"
                                style={{
                                  backgroundColor: "#000",
                                  maxWidth: "135px",
                                  display: "block",
                                }}
                              />
                            </a>
                          </>
                        </div>
                      </div>
                    </td>
                    <td
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "flex-start",
                        margin: "0 20px",
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
                                {data.firstName}
                              </span>
                              <span>&nbsp;</span>
                              <span
                                style={{
                                  fontWeight: "bold",
                                  fontSize: "18px",
                                  color: "#000",
                                }}
                              >
                                {data.lastName}
                              </span>
                              {data.position && (
                                <p
                                  style={{
                                    margin: 0,
                                  }}
                                >
                                  <span
                                    style={{
                                      fontSize: "14px",
                                      lineHeight: "22px",
                                      color: "#000",
                                    }}
                                  >
                                    {data.position}
                                  </span>
                                  {data.position && (
                                    <span
                                      style={{
                                        fontSize: "14px",
                                        lineHeight: "22px",
                                        color: "#000",
                                      }}
                                    >
                                      <span
                                        style={{
                                          color: "#000",
                                        }}
                                      >
                                        &nbsp;|&nbsp;
                                      </span>
                                      <span
                                        style={{
                                          fontSize: "14px",
                                          lineHeight: "22px",
                                          color: "#000",
                                        }}
                                      >
                                        bycoders_
                                      </span>
                                    </span>
                                  )}
                                </p>
                              )}
                              {data.phone && (
                                <table>
                                  <tbody>
                                    <tr>
                                      <td
                                        style={{
                                          margin: "5px 0",
                                        }}
                                      >
                                        <img
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
                                          {data.phone}
                                        </span>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              )}
                              {data.email && (
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
                                          {data.email}
                                        </span>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              )}
                              {data.email && (
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
                                          href="https://www.bycoders.com.br/"
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
                                            https://www.bycoders.com.br/
                                          </span>
                                        </a>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              )}
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
  );
};

Temp.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Temp;
