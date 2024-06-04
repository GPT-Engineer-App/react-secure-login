import React, { useState } from "react";
import { Container, VStack, Input, Button, Text, FormControl, FormLabel, Alert, AlertIcon } from "@chakra-ui/react";
import { FaLock } from "react-icons/fa";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async () => {
    setError("");
    setSuccess("");

    // Simulate a backend call
    const response = await fakeBackendLogin(email, password);

    if (response.success) {
      setSuccess("Login successful!");
      // Store the token in localStorage or any state management library
      localStorage.setItem("token", response.token);
    } else {
      setError(response.message);
    }
  };

  const fakeBackendLogin = (email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email === "user@example.com" && password === "password") {
          resolve({ success: true, token: "fake-jwt-token" });
        } else {
          resolve({ success: false, message: "Invalid email or password" });
        }
      }, 1000);
    });
  };

  return (
    <Container centerContent maxW="container.sm" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">Login</Text>
        {error && (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        )}
        {success && (
          <Alert status="success">
            <AlertIcon />
            {success}
          </Alert>
        )}
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormControl>
        <Button leftIcon={<FaLock />} colorScheme="teal" onClick={handleLogin}>
          Login
        </Button>
      </VStack>
    </Container>
  );
};

export default Index;
