import { useRef, useState } from "react";
import PropTypes from "prop-types";
import { Badge, Box, Button, Field, Flex, Heading, Icon, Input, SimpleGrid, Text } from "@chakra-ui/react";
import { AtSign, BriefcaseBusiness, Image, Link2, Phone, UploadCloud, UserRound, X } from "lucide-react";

const fields = [
  { name: "firstname", label: "First name", placeholder: "Anna", icon: UserRound, autoComplete: "given-name" },
  { name: "lastname", label: "Last name", placeholder: "Smirnova", icon: UserRound, autoComplete: "family-name" },
  { name: "position", label: "Job title", placeholder: "Head of Communications", icon: BriefcaseBusiness, autoComplete: "organization-title", wide: true },
  { name: "phone", label: "Phone", placeholder: "+7 999 123-45-67", icon: Phone, autoComplete: "tel", inputMode: "tel", type: "tel", pattern: "[+0-9 ()-]*" },
  { name: "email", label: "Work email", placeholder: "name@reputation.house", icon: AtSign, autoComplete: "email", inputMode: "email", type: "email" },
];

const MAX_PHOTO_SIZE = 2 * 1024 * 1024;
const ACCEPTED_PHOTO_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

const PhotoField = ({ data, onChange }) => {
  const fileInputRef = useRef(null);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const updatePhotoUrl = (event) => {
    const value = event.target.value;
    setError("");
    onChange((currentData) => ({
      ...currentData,
      photoUrl: value,
      photoDataUrl: "",
      photoFileName: "",
    }));
  };

  const selectFile = (file) => {
    if (!file) return;

    if (!ACCEPTED_PHOTO_TYPES.has(file.type)) {
      setError("Please upload a JPG, PNG, or WebP image.");
      return;
    }

    if (file.size > MAX_PHOTO_SIZE) {
      setError("The file is too large. Maximum size is 2 MB.");
      return;
    }

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setError("");
      onChange((currentData) => ({
        ...currentData,
        photoUrl: "",
        photoDataUrl: reader.result,
        photoFileName: file.name,
      }));
    }, { once: true });
    reader.addEventListener("error", () => {
      setError("Could not read the file. Please try another image.");
    }, { once: true });
    reader.readAsDataURL(file);
  };

  const clearFile = () => {
    setError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
    onChange((currentData) => ({
      ...currentData,
      photoDataUrl: "",
      photoFileName: "",
    }));
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    selectFile(event.dataTransfer.files[0]);
  };

  return (
    <Field.Root gridColumn="1 / -1" invalid={Boolean(error)}>
      <Field.Label color="#374139" fontSize="sm" fontWeight="700">Photo</Field.Label>

      <Box position="relative" w="full">
        <Icon as={Link2} boxSize="4.5" color="#7b887a" position="absolute" left="3.5" top="50%" transform="translateY(-50%)" zIndex="1" pointerEvents="none" />
        <Input
          type="url"
          name="photoUrl"
          value={data.photoUrl}
          onChange={updatePhotoUrl}
          placeholder="Google Drive or direct HTTPS link"
          autoComplete="url"
          inputMode="url"
          h="12"
          ps="11"
          bg="#f8faf7"
          borderColor="#dce3d9"
          borderRadius="xl"
          color="#1d251f"
          fontSize="sm"
          _placeholder={{ color: "#9aa49a" }}
          _hover={{ borderColor: "#b6c8af" }}
          css={{ "--focus-color": "#8eab83" }}
        />
      </Box>

      <Flex align="center" w="full" gap="3" my="1">
        <Box h="1px" flex="1" bg="#e2e7df" />
        <Text color="#929c91" fontSize="xs" fontWeight="700" textTransform="uppercase" letterSpacing="0.1em">or</Text>
        <Box h="1px" flex="1" bg="#e2e7df" />
      </Flex>

      <Box
        w="full"
        border="1.5px dashed"
        borderColor={isDragging ? "#7fa574" : data.photoFileName ? "#a7bd9f" : "#cfd8cc"}
        bg={isDragging ? "#edf4e9" : data.photoFileName ? "#f3f7f1" : "#fafbf9"}
        borderRadius="xl"
        p="4"
        transition="background .18s ease, border-color .18s ease"
        onDragEnter={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragOver={(event) => event.preventDefault()}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          hidden
          onChange={(event) => selectFile(event.target.files[0])}
        />

        {data.photoFileName ? (
          <Flex align="center" justify="space-between" gap="3">
            <Flex align="center" gap="3" minW="0">
              <Flex boxSize="9" align="center" justify="center" borderRadius="lg" bg="#dfeadb" color="#567150" flexShrink="0">
                <Icon as={Image} boxSize="4.5" />
              </Flex>
              <Box minW="0">
                <Text fontSize="sm" fontWeight="700" color="#344035" truncate>{data.photoFileName}</Text>
                <Badge mt="1" bg="#dfeadb" color="#536c4d" borderRadius="full" px="2" fontSize="2xs">File uploaded</Badge>
              </Box>
            </Flex>
            <Button type="button" size="xs" variant="ghost" color="#687367" onClick={clearFile} aria-label="Remove photo">
              <Icon as={X} boxSize="4" />
            </Button>
          </Flex>
        ) : (
          <Flex align={{ base: "flex-start", sm: "center" }} justify="space-between" gap="4" direction={{ base: "column", sm: "row" }}>
            <Flex align="center" gap="3">
              <Flex boxSize="9" align="center" justify="center" borderRadius="lg" bg="#edf3ea" color="#607a59" flexShrink="0">
                <Icon as={UploadCloud} boxSize="4.5" />
              </Flex>
              <Box>
                <Text fontSize="sm" fontWeight="700" color="#3f4940">Drop your photo here</Text>
                <Text mt="0.5" fontSize="xs" color="#828c81">JPG, PNG, or WebP up to 2 MB</Text>
              </Box>
            </Flex>
            <Button type="button" size="sm" variant="outline" borderColor="#bfcbbb" color="#4d604b" borderRadius="lg" onClick={() => fileInputRef.current?.click()}>
              Choose file
            </Button>
          </Flex>
        )}
      </Box>

      <Field.HelperText color="#7c867c" fontSize="xs" lineHeight="1.5">
        Use either a link or an uploaded file. For Gmail and maximum compatibility, use a public HTTPS link. Google Drive access must be set to “Anyone with the link”.
      </Field.HelperText>
      {error && <Field.ErrorText fontSize="xs">{error}</Field.ErrorText>}
    </Field.Root>
  );
};

PhotoField.propTypes = {
  data: PropTypes.shape({
    photoUrl: PropTypes.string.isRequired,
    photoDataUrl: PropTypes.string.isRequired,
    photoFileName: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

const SignatureForm = ({ data, onChange }) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    const nextValue = name === "phone"
      ? `+${value.replaceAll("+", "").replace(/[^0-9 ()-]/g, "")}`
      : value;
    onChange((currentData) => ({ ...currentData, [name]: nextValue }));
  };

  const keepPhoneCaretAfterPrefix = (event) => {
    const input = event.currentTarget;

    window.requestAnimationFrame(() => {
      if (!input.isConnected || input.selectionStart === null || input.selectionStart >= 1) return;
      input.setSelectionRange(1, Math.max(1, input.selectionEnd ?? 1));
    });
  };

  const handlePhoneKeyDown = (event) => {
    const input = event.currentTarget;
    const caretIsAtPrefix = input.selectionStart !== null
      && input.selectionStart <= 1
      && input.selectionEnd === input.selectionStart;

    if ((event.key === "Backspace" || event.key === "ArrowLeft") && caretIsAtPrefix) {
      event.preventDefault();
    }

    if (event.key === "Home") {
      event.preventDefault();
      input.setSelectionRange(1, 1);
    }
  };

  return (
    <Box as="section" bg="rgba(255,255,255,.88)" border="1px solid" borderColor="#e1e7de" borderRadius="3xl" p={{ base: "5", md: "7" }} boxShadow="0 22px 70px rgba(47, 65, 46, 0.08)" backdropFilter="blur(14px)">
      <Flex align="center" justify="space-between" gap="4" mb="6">
        <Box>
          <Text color="#718070" fontSize="xs" textTransform="uppercase" letterSpacing="0.14em" fontWeight="800">Step 1</Text>
          <Heading as="h2" mt="1" fontSize="2xl" letterSpacing="-0.025em">Employee details</Heading>
        </Box>
        <Flex boxSize="10" align="center" justify="center" bg="#edf4e9" color="#526d4c" borderRadius="xl" fontWeight="800">01</Flex>
      </Flex>

      <SimpleGrid as="form" columns={{ base: 1, sm: 2 }} gap="5" onSubmit={(event) => event.preventDefault()}>
        {fields.map(({ icon, wide, helper, label, ...field }) => (
          <Field.Root key={field.name} gridColumn={wide ? "1 / -1" : undefined}>
            <Field.Label color="#374139" fontSize="sm" fontWeight="700">{label}</Field.Label>
            <Box position="relative" w="full">
              <Icon as={icon} boxSize="4.5" color="#7b887a" position="absolute" left="3.5" top="50%" transform="translateY(-50%)" zIndex="1" pointerEvents="none" />
              <Input
                {...field}
                value={data[field.name]}
                onChange={handleChange}
                onFocus={field.name === "phone" ? keepPhoneCaretAfterPrefix : undefined}
                onClick={field.name === "phone" ? keepPhoneCaretAfterPrefix : undefined}
                onSelect={field.name === "phone" ? keepPhoneCaretAfterPrefix : undefined}
                onKeyDown={field.name === "phone" ? handlePhoneKeyDown : undefined}
                h="12"
                ps="11"
                bg="#f8faf7"
                borderColor="#dce3d9"
                borderRadius="xl"
                color="#1d251f"
                fontSize="sm"
                _placeholder={{ color: "#9aa49a" }}
                _hover={{ borderColor: "#b6c8af" }}
                css={{ "--focus-color": "#8eab83" }}
              />
            </Box>
            {helper && <Field.HelperText color="#7c867c" fontSize="xs" lineHeight="1.5">{helper}</Field.HelperText>}
          </Field.Root>
        ))}
        <PhotoField data={data} onChange={onChange} />
      </SimpleGrid>
    </Box>
  );
};

SignatureForm.propTypes = {
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
  onChange: PropTypes.func.isRequired,
};

export default SignatureForm;
