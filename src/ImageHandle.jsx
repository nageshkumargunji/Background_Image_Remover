import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Input,
  Text,
} from '@chakra-ui/react';

const ImageBackgroundRemover = () => {
  const [image, setImage] = useState(null);
  const [bgimgremove, setBgimgremove] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImg = () => {
    setLoading(true);

    const APIKEY = 'J7HyVizaK427d8wFtp3hfiWx';
    const url = 'https://api.remove.bg/v1.0/removebg';
    const formData = new FormData();
    formData.append('image_file', image);
    formData.append('size', 'auto');

    fetch(url, {
      method: 'POST',
      headers: {
        'X-Api-Key': APIKEY,
      },
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to remove background. Please try again.');
        }
        return res.blob();
      })
      .then((block) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setBgimgremove(reader.result);
          setLoading(false);
        };
        reader.readAsDataURL(block);
      })
      .catch((error) => {
        console.warn(error);
        setError(error.message);
        setLoading(false);
      });
  };

  return (
    <Container minH="100vh" centerContent>
      <Box
        maxW="md"
        w="full"
        bg="white"
        p={8}
        rounded="md"
        shadow="md"
      >
        <Text fontSize="3xl" fontWeight="bold" mb={4} mt={4} textAlign="center" color="blue.500">
          Image Background Remover
        </Text>

        <Box mb={4}>
          <Input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            border="1px"
            p={3}
            w="full"
            focusBorderColor="blue.500"
            _focus={{ outline: 'none' }}
          />
        </Box>

        <Button
          onClick={handleImg}
          bg="blue.500"
          color="white"
          p={3}
          rounded="md"
          w="full"
          _hover={{ bg: 'blue.600' }}
          _focus={{ outline: 'none' }}
          isDisabled={loading}
        >
          {loading ? 'Processing...' : 'Remove Background'}
        </Button>

        {error && (
          <Box mt={4} color="red.500">
            <Text>{error}</Text>
          </Box>
        )}

        <Flex mt={4} flexWrap="wrap">
          <Box w="full" md={{ base: 'full', md: '48%' }} p={4} border="2px" borderColor="gray.300" rounded="md" overflow="hidden">
            <Text textAlign="center" color="gray.500">Original Image</Text>
            <Box>
              <img
                src={image && URL.createObjectURL(image)}
                alt="Original"
                className="rounded-md shadow-md max-w-full h-auto mx-auto mt-2"
              />
            </Box>
          </Box>

          <Box w="full" md={{ base: 'full', md: '48%' }} p={4} border="2px" borderColor="gray.300" rounded="md" overflow="hidden">
            <Text textAlign="center" color="gray.500">Removed Background</Text>
            {bgimgremove && (
              <Box>
                <img
                  src={bgimgremove}
                  alt="Removed Background"
                  className="rounded-md shadow-md max-w-full h-auto mx-auto mt-2"
                />
              </Box>
            )}
          </Box>
        </Flex>
      </Box>
    </Container>
  );
};

export default ImageBackgroundRemover;
