import { Fragment, forwardRef } from "react";
import PropTypes from "prop-types";
import { normalizePhotoUrl } from "../../lib/photoUrl";
import { EMAIL_DISCLAIMER_LINES } from "../../constants/emailSignature";

const EMAIL_ASSET_VERSION = "20260721-1";
const EMAIL_ASSET_BASE_URL = "https://stellarlay.github.io/email-signature-generator/email-assets/";
const emailAssetUrl = (filename) => `${EMAIL_ASSET_BASE_URL}${filename}?v=${EMAIL_ASSET_VERSION}`;

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/20417837", icon: "linkedin.png" },
  { label: "Instagram", href: "https://www.instagram.com/reputation_house", icon: "instagram.png" },
  { label: "YouTube", href: "https://www.youtube.com/@ReputationHouse-pr2tq", icon: "youtube.png" },
];

const ContactRow = ({ href, icon, children }) => (
  <tr height="22" style={{ height: "22px" }}>
    <td width="18" height="22" style={{ width: "18px", height: "22px", padding: 0, fontSize: "0", lineHeight: "0", verticalAlign: "middle" }}>
      <img src={emailAssetUrl(icon)} alt="" width="18" height="18" style={{ display: "block", width: "18px", minWidth: "18px", maxWidth: "18px", height: "18px", border: 0, verticalAlign: "middle" }} />
    </td>
    <td width="7" height="22" style={{ width: "7px", height: "22px", padding: 0, fontSize: "0", lineHeight: "0" }}>&nbsp;</td>
    <td height="22" style={{ height: "22px", padding: 0, verticalAlign: "middle", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "11px", lineHeight: "18px", msoLineHeightRule: "exactly" }}>
      <a href={href} style={{ display: "block", height: "18px", color: "#515151", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "11px", lineHeight: "18px", textDecoration: "none", verticalAlign: "middle", msoLineHeightRule: "exactly" }}>{children}</a>
    </td>
  </tr>
);

ContactRow.propTypes = {
  href: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const EmailSignature = forwardRef(({ data }, ref) => {
  const firstName = data.firstname.trim() || "First name";
  const lastName = data.lastname.trim() || "Last name";
  const position = data.position.trim() || "Job title";
  const phone = data.phone.trim() || "+7 999 123-45-67";
  const email = data.email.trim() || "name@reputation.house";
  const photo = data.photoDataUrl || normalizePhotoUrl(data.photoUrl) || emailAssetUrl("photo-placeholder.png");

  return (
    <table ref={ref} role="presentation" cellPadding="0" cellSpacing="0" border="0" width="400" style={{ width: "400px", maxWidth: "400px", tableLayout: "fixed", borderCollapse: "collapse", backgroundColor: "#ffffff" }}>
      <tbody>
        <tr>
          <td width="124" height="122" style={{ width: "124px", minWidth: "124px", height: "122px", padding: "0 14px 0 0", verticalAlign: "top" }}>
            <table role="presentation" cellPadding="0" cellSpacing="0" border="0" width="110" style={{ width: "110px", minWidth: "110px", borderCollapse: "collapse" }}>
              <tbody>
                <tr>
                  <td width="110" height="110" style={{ width: "110px", minWidth: "110px", height: "110px", padding: 0, fontSize: "0", lineHeight: "0", verticalAlign: "top" }}>
                    <img
                      src={photo}
                      alt={`${firstName} ${lastName}`}
                      width="110"
                      height="110"
                      onError={(event) => {
                        event.currentTarget.src = emailAssetUrl("photo-placeholder.png");
                      }}
                      style={{ display: "block", width: "110px", minWidth: "110px", maxWidth: "110px", height: "110px", minHeight: "110px", maxHeight: "110px", objectFit: "cover", border: 0, borderRadius: "1px" }}
                    />
                  </td>
                </tr>
                <tr>
                  <td height="12" style={{ height: "12px", padding: 0, fontSize: "0", lineHeight: "12px" }}>&nbsp;</td>
                </tr>
              </tbody>
            </table>
          </td>

          <td width="224" height="122" style={{ width: "224px", height: "122px", padding: "0 8px 0 0", verticalAlign: "top" }}>
            <table role="presentation" cellPadding="0" cellSpacing="0" border="0" width="100%" style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                <tr>
                  <td style={{ padding: "0 0 1px", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "17px", lineHeight: "21px", fontWeight: "700", color: "#383838", whiteSpace: "nowrap" }}>
                    {firstName} {lastName}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "0 0 5px", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "11px", lineHeight: "15px", color: "#3a3a3a", whiteSpace: "nowrap" }}>
                    {position}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "0 0 5px" }}>
                    <table role="presentation" cellPadding="0" cellSpacing="0" border="0" style={{ borderCollapse: "collapse" }}>
                      <tbody>
                        <ContactRow href={`tel:${phone.replace(/[^+\d]/g, "")}`} icon="phone.png">{phone}</ContactRow>
                        <ContactRow href={`mailto:${email}`} icon="envelope.png">{email}</ContactRow>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table role="presentation" cellPadding="0" cellSpacing="0" border="0" style={{ borderCollapse: "collapse" }}>
                      <tbody>
                        <tr>
                          <td style={{ padding: "0 10px 0 0", verticalAlign: "middle" }}>
                            <a href="https://reputation.house/" target="_blank" rel="noreferrer" style={{ display: "inline-block", color: "#484848", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "11px", lineHeight: "18px", textDecoration: "none", borderBottom: "1px solid #484848" }}>
                              reputation.house
                            </a>
                          </td>
                          {socialLinks.map(({ label, href, icon }) => (
                            <td key={label} style={{ padding: "0 5px 0 0", verticalAlign: "middle" }}>
                              <a href={href} target="_blank" rel="noreferrer" title={label} style={{ display: "block", width: "18px", height: "18px", textDecoration: "none" }}>
                                <img src={emailAssetUrl(icon)} alt={label} width="18" height="18" style={{ display: "block", width: "18px", minWidth: "18px", maxWidth: "18px", height: "18px", border: 0 }} />
                              </a>
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>

          <td width="52" height="122" style={{ width: "52px", minWidth: "52px", height: "122px", padding: 0, textAlign: "right", verticalAlign: "top" }}>
            <table role="presentation" cellPadding="0" cellSpacing="0" border="0" width="52" style={{ width: "52px", minWidth: "52px", borderCollapse: "collapse" }}>
              <tbody>
                <tr>
                  <td width="52" height="60" style={{ width: "52px", minWidth: "52px", height: "60px", padding: "4px 0 0", textAlign: "right", verticalAlign: "top" }}>
                    <img src={emailAssetUrl("reputation-house-logo.png")} alt="Reputation House" width="20" height="30" style={{ display: "block", width: "20px", minWidth: "20px", maxWidth: "20px", height: "30px", marginLeft: "auto", border: 0 }} />
                  </td>
                </tr>
                <tr>
                  <td width="52" height="62" style={{ width: "52px", minWidth: "52px", height: "62px", padding: 0, fontSize: "0", lineHeight: "0", textAlign: "right", verticalAlign: "bottom" }}>
                    <img src={emailAssetUrl("reputation-house-shape.png")} alt="" width="52" height="62" style={{ display: "block", width: "52px", minWidth: "52px", maxWidth: "52px", height: "62px", border: 0, verticalAlign: "bottom" }} />
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>

        <tr>
          <td colSpan="3" height="8" style={{ height: "8px", lineHeight: "8px", backgroundColor: "#c0d7b5", borderRadius: "2px", fontSize: "0" }}>&nbsp;</td>
        </tr>
        <tr>
          <td colSpan="3" style={{ padding: "8px 0 0", color: "#777777", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "8px", lineHeight: "11px", fontWeight: "400", textAlign: "left", verticalAlign: "top", msoLineHeightRule: "exactly" }}>
            {EMAIL_DISCLAIMER_LINES.map((line, index) => (
              <Fragment key={line}>
                {line}
                {index < EMAIL_DISCLAIMER_LINES.length - 1 && <br />}
              </Fragment>
            ))}
          </td>
        </tr>
      </tbody>
    </table>
  );
});

EmailSignature.displayName = "EmailSignature";
EmailSignature.propTypes = {
  data: PropTypes.shape({
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    photoUrl: PropTypes.string.isRequired,
    photoDataUrl: PropTypes.string.isRequired,
    photoFileName: PropTypes.string.isRequired,
  }).isRequired,
};

export default EmailSignature;
