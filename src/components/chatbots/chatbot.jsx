import React, { useState, useEffect } from "react"; // Import React and necessary hooks
import { chatAI } from "../../services/chatCompletion"; // Import chat completion service
import styles from "../../assets/styles/chatbots/chatbot.module.css"; // Import CSS module for styling

function Chatbot({ headline, servicePrompt }) {
    // State to hold user input
    const [thoughtValue, setThoughtValue] = useState("");
    
    // State to hold messages in the chat
    const [messages, setMessages] = useState([
        {
            role: "system", // Initial system message
            content: servicePrompt, // Service prompt content
        },
    ]);
    
    // State to manage error messages
    const [error, setError] = useState(null);
    
    // State to indicate loading status
    const [loading, setLoading] = useState(false);

    // Function to handle sending a new message
    async function sendNewMessage(e) {
        e.preventDefault(); // Prevent default form submission behavior

        // Validate that input is not empty
        if (!thoughtValue.trim()) {
            setError("Message cannot be empty"); // Set error message
            return;
        }

        try {
            setError(null); // Reset error state
            setLoading(true); // Set loading state to true

            // Create new user message object
            const newMessage = {
                role: "user", // Message role
                content: thoughtValue.trim(), // Trimmed user input
            };

            // Update message state with new user message
            setMessages((prevList) => [...prevList, newMessage]);
            setThoughtValue(""); // Clear input field

            // Filter out system messages before sending to API
            const filteredMessages = messages.filter(msg => msg.role !== "system");
            const response = await chatAI([...filteredMessages, newMessage]); // Call chat AI service

            // Append AI response to chat
            setMessages((prevMsgs) => [
                ...prevMsgs,
                { role: "assistant", content: response } // AI-generated response
            ]);
        } catch (error) {
            setError(error.message); // Set error message in case of failure
        } finally {
            setLoading(false); // Reset loading state
        }
    }

    return (
        <section className={styles.chatArea}> {/* Chat container */}
            <h1 className={styles.ChatHeadline}>{headline}</h1> {/* Chat headline */}

            <div className={styles.messagesContainer}> {/* Chat messages container */}
                {messages
                    .filter((message) => message.role !== "system") // Exclude system messages
                    .map((message, index) => (
                        <p
                            key={index} // Unique key for each message
                            className={`${styles.message} ${
                                message.role === "user"
                                    ? styles.userMessage // Style for user message
                                    : styles.aiMessage // Style for AI message
                            }`}
                        >
                            {message.content} {/* Display message content */}
                        </p>
                    ))}
                {loading && ( // Show typing indicator when loading
                    <p className={`${styles.message} ${styles.aiMessage} ${styles.typingIndicator}`}>
                        Typing...
                    </p>
                )}
            </div>

            {error && <p className={styles.errorMessage}>{error}</p>} {/* Display error messages */}

            <form className={styles.messageInput} onSubmit={sendNewMessage}> {/* Message input form */}
                <input
                    type="text"
                    placeholder="Enter Your Thoughts Here" // Placeholder text
                    value={thoughtValue} // Bind input to state
                    onChange={(e) => setThoughtValue(e.currentTarget.value)} // Update state on change
                />
                <input type="submit" value="Send" /> {/* Submit button */}
            </form>
        </section>
    );
}

export default Chatbot; // Export Chatbot component