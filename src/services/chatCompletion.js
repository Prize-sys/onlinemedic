import axios from "axios"; // Importing Axios for making HTTP requests

// API key for authentication
const apiKey = "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";

// OpenRouter API endpoint
const endpoint = "https://openrouter.ai/api/v1";

// AI model to be used for chat completions
const model = "qwen/qwen2.5-vl-32b-instruct:free"; 

// Auto-detect environment and set the referer dynamically
const hostname = window.location.hostname;
let referer = "https://onlinemedic-d344d.web.app/"; // Default referer for production

if (hostname === "127.0.0.1" || hostname === "localhost") {
    referer = `http://${hostname}:5173/`; // Use localhost referer for development
}

// Function to send messages to AI chatbot
export async function chatAI(messages) {
    try {
        // Making a POST request to OpenRouter API
        const response = await axios.post(`${endpoint}/chat/completions`, {
            model: model,  // Specifying the AI model
            messages: messages,  // Passing user messages
            temperature: 0.7,  // Controls randomness of response
            max_tokens: 2048,  // Maximum response length
            top_p: 0.9  // Nucleus sampling parameter
        }, {
            headers: {
                "Authorization": `Bearer ${apiKey}`,  // API authentication
                "HTTP-Referer": referer,  // Required for API usage
                "X-Title": "OnlineMedic ChatBot",  // Custom title for API tracking
                "Content-Type": "application/json"  // Indicating JSON request body
            }
        });

        // Returning the AI response if available
        return response.data.choices?.[0]?.message?.content || "No response from AI";
    
    } catch (error) {
        console.error("API Error:", error.response?.data || error.message);  // Log error details
        
        // Handling different API error cases
        if (error.response?.status === 401) {
            throw new Error("Unauthorized: Check API Key.");  // Invalid API key error
        } else if (error.response?.status === 429) {
            throw new Error("Rate limit exceeded. Try again later.");  // Too many requests
        } else if (error.response?.status === 500) {
            throw new Error("Server error. Try again later.");  // Internal server error
        } else {
            throw new Error("Failed to fetch response from OpenRouter API.");  // General error
        }
    }
}
