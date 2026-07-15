import { useRef, useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import { Code2, Copy, Eye, LoaderCircle } from "lucide-react";

import EmailSignature from "../EmailSignature/EmailSignature";
import { copyRichText, copyText, createPortableHtml } from "../../lib/clipboard";

const Preview = ({ data, onNotify }) => {
  const signatureRef = useRef(null);
  const [copying, setCopying] = useState("");

  const getPlainText = () => [
    `${data.firstname || "Имя"} ${data.lastname || "Фамилия"}`,
    data.position || "Должность",
    data.phone || "+7 999 123-45-67",
    data.email || "name@reputation.house",
    "reputation.house",
  ].join("\n");

  const handleCopy = async (mode) => {
    if (!signatureRef.current || copying) return;

    setCopying(mode);
    try {
      const html = await createPortableHtml(signatureRef.current);

      if (mode === "signature") {
        await copyRichText(html, getPlainText());
        onNotify("Подпись скопирована — вставьте её в настройки почты");
      } else {
        await copyText(html);
        onNotify("HTML-код подписи скопирован");
      }
    } catch {
      onNotify("Не удалось скопировать. Разрешите доступ к буферу обмена");
    } finally {
      setCopying("");
    }
  };

  return (
    <Box as="section" bg="rgba(255,255,255,.88)" border="1px solid" borderColor="#e1e7de" borderRadius="3xl" p={{ base: "5", md: "7" }} boxShadow="0 22px 70px rgba(47, 65, 46, 0.08)" backdropFilter="blur(14px)" minW="0">
      <Flex align="center" justify="space-between" gap="4" mb="6">
        <Box>
          <Text color="#718070" fontSize="xs" textTransform="uppercase" letterSpacing="0.14em" fontWeight="800">Шаг 2</Text>
          <Heading as="h2" mt="1" fontSize="2xl" letterSpacing="-0.025em">Готовая подпись</Heading>
        </Box>
        <Flex boxSize="10" align="center" justify="center" bg="#edf4e9" color="#526d4c" borderRadius="xl">
          <Icon as={Eye} boxSize="5" />
        </Flex>
      </Flex>

      <Box border="1px solid" borderColor="#e4e8e2" borderRadius="2xl" bg="#f7f8f6" p={{ base: "3", md: "4" }} overflow="hidden" h={{ base: "112px", sm: "170px", md: "auto" }}>
        <Box
          bg="white"
          w="564px"
          p="3"
          borderRadius="xl"
          boxShadow="0 12px 40px rgba(28, 35, 29, 0.08)"
          transform={{ base: "scale(0.49)", sm: "scale(0.76)", md: "scale(1)" }}
          transformOrigin="top left"
        >
          <EmailSignature ref={signatureRef} data={data} />
        </Box>
      </Box>

      <Flex mt="5" gap="3" direction={{ base: "column", sm: "row" }}>
        <Button
          flex="1"
          h="12"
          bg="#c0d7b5"
          color="#263525"
          borderRadius="xl"
          fontWeight="750"
          _hover={{ bg: "#afcba3", transform: "translateY(-1px)" }}
          _active={{ bg: "#a2c095", transform: "translateY(0)" }}
          onClick={() => handleCopy("signature")}
          disabled={Boolean(copying)}
        >
          <Icon as={copying === "signature" ? LoaderCircle : Copy} boxSize="4.5" className={copying === "signature" ? "spin" : undefined} />
          Скопировать подпись
        </Button>
        <Button
          flex="1"
          h="12"
          variant="outline"
          borderColor="#cbd5c8"
          color="#435044"
          borderRadius="xl"
          fontWeight="700"
          _hover={{ bg: "#f2f6f0", borderColor: "#afc2a9" }}
          onClick={() => handleCopy("html")}
          disabled={Boolean(copying)}
        >
          <Icon as={copying === "html" ? LoaderCircle : Code2} boxSize="4.5" className={copying === "html" ? "spin" : undefined} />
          Скопировать HTML
        </Button>
      </Flex>
      <Text mt="4" color="#7b857b" fontSize="xs" lineHeight="1.5">
        Для Gmail и Outlook используйте первую кнопку. HTML пригодится для ручной настройки или интеграции.
      </Text>
    </Box>
  );
};

Preview.propTypes = {
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
  onNotify: PropTypes.func.isRequired,
};

export default Preview;
