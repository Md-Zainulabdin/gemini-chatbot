interface GenerativePart {
  inlineData: {
    data: string;
    mimeType: string;
  };
}

// Define the async function that processes the file
async function fileToGenerativePart(file: File): Promise<GenerativePart> {
  // Create a Promise to read the file as a Base64 encoded data URL
  const base64EncodedDataPromise = new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    // Define the onloadend event handler
    reader.onloadend = () => {
      const result = reader.result;
      if (typeof result === "string") {
        resolve(result.split(",")[1]); // Extract the Base64 data part
      } else {
        reject(new Error("Failed to read file as data URL"));
      }
    };

    // Define the onerror event handler to catch read errors
    reader.onerror = () => {
      reject(new Error("Error reading file"));
    };

    // Read the file as a data URL
    reader.readAsDataURL(file);
  });

  // Await the Base64 encoded data
  const base64EncodedData = await base64EncodedDataPromise;

  // Return the formatted result
  return {
    inlineData: {
      data: base64EncodedData,
      mimeType: file.type,
    },
  };
}

export { fileToGenerativePart };
export type { GenerativePart };
