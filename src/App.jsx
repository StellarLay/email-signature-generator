import { useCallback, useEffect, useState } from "react";
import { Badge, Box, Container, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import { CheckCircle2, Sparkles } from "lucide-react";

import Preview from "./components/Preview/Preview";
import SignatureForm from "./components/SignatureForm/SignatureForm";

const initialFormData = {
  firstname: "",
  lastname: "",
  position: "",
  phone: "",
  email: "",
  photoUrl: "",
  photoDataUrl: "",
  photoFileName: "",
};

function App() {
  const [formData, setFormData] = useState(initialFormData);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    if (!notification) return undefined;

    const timeoutId = window.setTimeout(() => setNotification(""), 3200);
    return () => window.clearTimeout(timeoutId);
  }, [notification]);

  const showNotification = useCallback((message) => {
    setNotification("");
    window.requestAnimationFrame(() => setNotification(message));
  }, []);

  return (
    <Box minH="100dvh" bg="#f5f7f3" color="#18211a" position="relative" overflow="hidden">
      <Box
        position="absolute"
        inset="0"
        pointerEvents="none"
        bg="radial-gradient(circle at 10% 0%, rgba(192, 215, 181, 0.48), transparent 32%), radial-gradient(circle at 100% 55%, rgba(192, 215, 181, 0.25), transparent 30%)"
      />

      <Container maxW="1440px" px={{ base: "4", md: "8", xl: "12" }} py={{ base: "7", md: "12" }} position="relative">
        <Flex align={{ base: "flex-start", md: "center" }} justify="space-between" gap="5" mb={{ base: "8", md: "11" }} direction={{ base: "column", md: "row" }}>
          <Box maxW="760px">
            <Badge bg="#c0d7b5" color="#30412f" borderRadius="full" px="3" py="1.5" mb="4" fontWeight="700">
              <Flex align="center" gap="2">
                <Icon as={Sparkles} boxSize="3.5" />
                Reputation House
              </Flex>
            </Badge>
            <Heading as="h1" fontSize={{ base: "3xl", md: "5xl" }} lineHeight="1.04" letterSpacing="-0.045em" fontWeight="750">
              Генератор корпоративной подписи
            </Heading>
            <Text mt="4" color="#5d685f" fontSize={{ base: "md", md: "lg" }} maxW="650px">
              Единый фирменный шаблон Reputation House для почты сотрудников.
            </Text>
          </Box>
          <Badge variant="outline" borderColor="#c8d2c5" color="#526052" px="3" py="2" borderRadius="full" flexShrink="0">
            <Flex align="center" gap="2">
              <Box boxSize="2" borderRadius="full" bg="#7ea172" />
              Фирменный шаблон RH
            </Flex>
          </Badge>
        </Flex>

        <Box display="grid" gridTemplateColumns={{ base: "minmax(0, 1fr)", lg: "minmax(360px, 0.82fr) minmax(560px, 1.18fr)" }} gap={{ base: "6", lg: "8" }} alignItems="start">
          <SignatureForm data={formData} onChange={setFormData} />
          <Preview data={formData} onNotify={showNotification} />
        </Box>
      </Container>

      <Box
        position="fixed"
        zIndex="toast"
        top={{ base: "4", md: "6" }}
        right={{ base: "4", md: "6" }}
        left={{ base: "4", md: "auto" }}
        maxW={{ md: "430px" }}
        bg="#263425"
        color="white"
        px="4"
        py="3.5"
        borderRadius="xl"
        boxShadow="0 18px 55px rgba(24, 33, 26, 0.24)"
        opacity={notification ? 1 : 0}
        transform={notification ? "translateY(0)" : "translateY(-14px)"}
        pointerEvents="none"
        transition="opacity .2s ease, transform .2s ease"
        aria-live="polite"
      >
        <Flex align="center" gap="3">
          <Icon as={CheckCircle2} boxSize="5" color="#c0d7b5" flexShrink="0" />
          <Text fontSize="sm" fontWeight="650">{notification}</Text>
        </Flex>
      </Box>
    </Box>
  );
}

export default App;
