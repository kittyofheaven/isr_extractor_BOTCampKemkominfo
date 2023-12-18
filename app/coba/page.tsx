"use client"

import { useEffect } from 'react';
import axios from 'axios';

interface MyComponentProps {
// Your component props here
}

const MyComponent: React.FC<MyComponentProps> = () => {
useEffect(() => {
    const postData = async () => {
    try {
        const apiUrl = 'https://prod-43.southeastasia.logic.azure.com:443/workflows/6c749de62a844d3dbf2f99e71f45f2fb/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=W7V9OK1t036yvXZcFnbG0VSH9ETgeY8t4i9DDqlNcT8'; // Replace with your API endpoint
        const data = {
        // Your JSON data here
        url: 'https://files.edgestore.dev/5lbtway9gj9npfza/myISRImages/_public/b9fe0802-9dd9-43c0-ba25-8569d1579d08.png',
        };

        const response = await axios.post(apiUrl, data);
        console.log('Response:', response.data);
        // Handle the response or update the state as needed
    } catch (error) {
        console.error('Error posting data:', error);
        // Handle the error
    }
    };

    postData();
}, []); // The empty dependency array ensures the effect runs only once when the component mounts

return (
    <div>
    {/* Your component JSX here */}
    <p>Component content goes here</p>
    </div>
);
};

export default MyComponent;
