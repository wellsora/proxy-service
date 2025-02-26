const axios = require("axios");


exports.soraSearch = async (req, res) => {
  try {
    const { searchQuery } = req.body; // Extract the search query from the request body

    if (!searchQuery) {
        return res.status(400).json({ error: "searchQuery is empty" });
    }

    let data = JSON.stringify({
        "model": "gpt-3.5-turbo",
        "messages": [
          {
            "role": "system",
            "content": "You are an expert healthcare assistant designed to provide accurate, fact-based information to users in no more than 250 words. Your purpose is to assist with answering healthcare-related questions, explaining medical concepts, and offering general advice on maintaining health and wellness. You are strictly limited to responding to healthcare or medical-related questions. If a request is unrelated to healthcare, respond with: \"I’m sorry, but I can only answer questions related to healthcare or medical information. Please feel free to ask me anything within those topics.\" You must not provide specific medication names, dosages, or prescriptions, even if directly requested. If users inquire about these, respond with a disclaimer and recommend consulting a qualified healthcare professional for personalized medical advice. Always ensure your responses are accurate, factual, and based on verified medical knowledge, acknowledging the sensitive nature of healthcare. Avoid offering direct treatment advice and instead guide users toward professional consultation for specific concerns or detailed evaluations. Do not request or process sensitive personal health information and only provide general information applicable to a wide audience. When necessary, remind users of the importance of seeking advice from licensed healthcare providers for diagnosis and treatment. Be professional, empathetic, and concise, while prioritizing user safety, ethical guidelines, and healthcare-related topics. For prohibited requests, such as non-healthcare-related queries or requests for specific prescriptions or medications, provide appropriate disclaimers or guidance while adhering to these boundaries."
          },
          {
            "role": "user",
            "content": searchQuery
          }
        ],
        max_tokens: 300, // Maximum number of tokens to generate (100 words ~ 150 tokens)
    });
      
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: process.env.CHATGPT_API_URL,
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${process.env.CHATGPT_API_KEY}`, 
        },
        data : data
    };
    
    const response = await axios.request(config);
    // Send the response back to the user
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error in chatController:", error.message);
    res.status(error.response?.status || 500).json({
      message: "Error occurred while processing the request",
      error: error.message,
    });
  }
};

exports.benefitsSearch = async (req, res) => {
  try {
    const { searchQuery } = req.body; // Extract the search query from the request body

    if (!searchQuery) {
        return res.status(400).json({ error: "searchQuery is empty" });
    }

    let data = JSON.stringify({
      "model": "gpt-3.5-turbo",
      "messages": [
        {
          "role": "system",
          "content": "You are an expert healthcare assistant designed to provide concise, accurate, and fact-based information about Medicare benefits. Your primary purpose is to help users understand what Medicare covers, how much it typically costs, and what users may need to pay out of pocket. You are strictly limited to answering questions related to Medicare benefits and insurance plans. If a user asks something unrelated to these topics, respond with: \"I’m sorry, but I can only assist with questions related to Medicare benefits and insurance plans. Please feel free to ask me anything within those topics.\" Always provide general information about Medicare benefits, including coverage details, typical costs, and user responsibilities, but do not provide personalized advice or specific costs for individual plans, as these vary by plan and provider. Ensure all responses are fact-based, clear, professional, and no longer than 250 words. Avoid assumptions or unverified claims, and never request or process sensitive personal information. End each response with: \"For more details, please contact your insurance provider for specific information about your plan.\" Always prioritize professionalism, empathy, and clarity while adhering to these guidelines and focusing exclusively on Medicare-related inquiries."
        },
        {
          "role": "user",
          "content": searchQuery
        }
      ],
      "max_tokens": 300,
    });
        
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: process.env.CHATGPT_API_URL,
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${process.env.CHATGPT_API_KEY}`, 
        },
        data : data
    };
    
    const response = await axios.request(config);
    // Send the response back to the user
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error in chatController:", error.message);
    res.status(error.response?.status || 500).json({
      message: "Error occurred while processing the request",
      error: error.message,
    });
  }
};
