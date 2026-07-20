import { forwardRef } from "react";
import PropTypes from "prop-types";
import { normalizePhotoUrl } from "../../lib/photoUrl";

const EMAIL_ASSET_VERSION = "20260715-2";
const EMAIL_ASSET_BASE_URL = "https://stellarlay.github.io/email-signature-generator/email-assets/";
const driveThumbnail = (id, size) => `https://drive.google.com/thumbnail?id=${id}${size ? `&sz=${size}` : ""}`;
const GOOGLE_DRIVE_ASSETS = {
  "instagram.png": driveThumbnail("1LCS8jtE3UklY47lsntua-6aQBJWn2E7c"),
  "envelope.png": driveThumbnail("1TpERKn8dVR2zBJxF_6z64GjMMoNVM_Cu"),
  "phone.png": driveThumbnail("1wUH1AqftP4mPvSf1eZbz6IGryPmd7eTg"),
  "youtube.png": driveThumbnail("1AMmZ3qT3rtlPdgqmpCrR4oCmiRbH1Yo5"),
  "linkedin.png": driveThumbnail("10AVA_GmeklZXRuRBsYgECxIw-vlfTqz5"),
  "reputation-house-logo.png": driveThumbnail("1keeR8xgOoTt0EM0WEuTqsNDLfb_LgwuR"),
  "reputation-house-shape.png": driveThumbnail("1FYIsUt8W2R6E8BzcVsr86GYOI7ecWyCw", "w70-h83-p"),
};

const emailAssetUrl = (filename) => GOOGLE_DRIVE_ASSETS[filename]
  || `${EMAIL_ASSET_BASE_URL}${filename}?v=${EMAIL_ASSET_VERSION}`;

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/20417837", icon: "linkedin.png" },
  { label: "Instagram", href: "https://www.instagram.com/reputation_house", icon: "instagram.png" },
  { label: "YouTube", href: "https://www.youtube.com/@ReputationHouse-pr2tq", icon: "youtube.png" },
];

const ContactRow = ({ href, icon, children }) => (
  <tr height="28" style={{ height: "28px" }}>
    <td width="22" height="28" style={{ width: "22px", height: "28px", padding: 0, fontSize: "0", lineHeight: "0", verticalAlign: "middle" }}>
      <img src={emailAssetUrl(icon)} alt="" width="22" height="22" style={{ display: "block", width: "22px", height: "22px", border: 0, verticalAlign: "middle" }} />
    </td>
    <td width="9" height="28" style={{ width: "9px", height: "28px", padding: 0, fontSize: "0", lineHeight: "0" }}>&nbsp;</td>
    <td height="28" style={{ height: "28px", padding: 0, verticalAlign: "middle", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "12px", lineHeight: "22px", msoLineHeightRule: "exactly" }}>
      <a href={href} style={{ display: "block", height: "22px", color: "#515151", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "12px", lineHeight: "22px", textDecoration: "none", verticalAlign: "middle", msoLineHeightRule: "exactly" }}>{children}</a>
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
    <table ref={ref} role="presentation" cellPadding="0" cellSpacing="0" border="0" width="540" style={{ width: "540px", borderCollapse: "collapse", backgroundColor: "#ffffff" }}>
      <tbody>
        <tr>
          <td width="177" height="171" style={{ width: "177px", height: "171px", padding: "0 22px 0 0", verticalAlign: "top" }}>
            <table role="presentation" cellPadding="0" cellSpacing="0" border="0" width="155" style={{ width: "155px", borderCollapse: "collapse" }}>
              <tbody>
                <tr>
                  <td width="155" height="155" style={{ width: "155px", height: "155px", padding: 0, fontSize: "0", lineHeight: "0", verticalAlign: "top" }}>
                    <img
                      src={photo}
                      alt={`${firstName} ${lastName}`}
                      width="155"
                      height="155"
                      onError={(event) => {
                        event.currentTarget.src = emailAssetUrl("photo-placeholder.png");
                      }}
                      style={{ display: "block", width: "155px", height: "155px", objectFit: "cover", border: 0, borderRadius: "1px" }}
                    />
                  </td>
                </tr>
                <tr>
                  <td height="16" style={{ height: "16px", padding: 0, fontSize: "0", lineHeight: "16px" }}>&nbsp;</td>
                </tr>
              </tbody>
            </table>
          </td>

          <td width="293" height="171" style={{ width: "293px", height: "171px", padding: "0 12px 0 0", verticalAlign: "top" }}>
            <table role="presentation" cellPadding="0" cellSpacing="0" border="0" width="100%" style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                <tr>
                  <td style={{ padding: "0 0 2px", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "21px", lineHeight: "26px", fontWeight: "700", color: "#383838", whiteSpace: "nowrap" }}>
                    {firstName} {lastName}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "0 0 7px", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "13px", lineHeight: "18px", color: "#3a3a3a", whiteSpace: "nowrap" }}>
                    {position}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "0 0 7px" }}>
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
                          <td style={{ padding: "0 14px 0 0", verticalAlign: "middle" }}>
                            <a href="https://reputation.house/" target="_blank" rel="noreferrer" style={{ display: "inline-block", color: "#484848", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "12px", lineHeight: "21px", textDecoration: "none", borderBottom: "1px solid #484848" }}>
                              reputation.house
                            </a>
                          </td>
                          {socialLinks.map(({ label, href, icon }) => (
                            <td key={label} style={{ padding: "0 6px 0 0", verticalAlign: "middle" }}>
                              <a href={href} target="_blank" rel="noreferrer" title={label} style={{ display: "block", width: "22px", height: "22px", textDecoration: "none" }}>
                                <img src={emailAssetUrl(icon)} alt={label} width="22" height="22" style={{ display: "block", width: "22px", height: "22px", border: 0 }} />
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

          <td width="70" height="171" style={{ width: "70px", height: "171px", padding: 0, textAlign: "right", verticalAlign: "top" }}>
            <table role="presentation" cellPadding="0" cellSpacing="0" border="0" width="70" style={{ width: "70px", borderCollapse: "collapse" }}>
              <tbody>
                <tr>
                  <td width="70" height="88" style={{ width: "70px", height: "88px", padding: "6px 0 0", textAlign: "right", verticalAlign: "top" }}>
                    <img src={emailAssetUrl("reputation-house-logo.png")} alt="Reputation House" width="26" height="39" style={{ display: "block", width: "26px", height: "39px", marginLeft: "auto", border: 0 }} />
                  </td>
                </tr>
                <tr>
                  <td width="70" height="83" style={{ width: "70px", height: "83px", padding: 0, fontSize: "0", lineHeight: "0", textAlign: "right", verticalAlign: "bottom" }}>
                    <img src={emailAssetUrl("reputation-house-shape.png")} alt="" width="70" height="83" style={{ display: "block", width: "70px", height: "83px", border: 0, verticalAlign: "bottom" }} />
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>

        <tr>
          <td colSpan="3" height="12" style={{ height: "12px", lineHeight: "12px", backgroundColor: "#c0d7b5", borderRadius: "2px", fontSize: "0" }}>&nbsp;</td>
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
