import { ProjectsProps } from '@/common/types/projects';

export const hardcodedProjects: ProjectsProps['projects'] = [
  {
    title: 'Dining-Concierge-Chatbot',
    slug: 'Dining-Concierge-Chatbot',
    description: `This application is a serverless, microservice-driven web application built entirely with Amazon Web Services. This chatbot's main function is to make restaurant recommendations to its customers based on their preferences expressed through conversations.`,
    image: 'https://i.postimg.cc/dVqmTdfF/dcc.jpg',
    stacks: JSON.stringify(['JavaScript', 'React.js', 'Lambda', 'Python', '']),
    is_featured: true,
    is_show: true,
    link_demo: '',
    link_github: 'https://github.com/AnishMane/Dining-Concierge-ChatBot',
    content: `

## Introduction
This application is a serverless, microservice-driven web application built entirely with Amazon Web Services. This chatbot's main function is to make restaurant recommendations to its customers based on their preferences expressed through conversations.

We have support for Yelp-API with suggestions and real time chat. 

## Services Used
1. Amazon S3 - To host the frontend
2. Amazon Lex - To create the bot
3. API Gateway - To set up the API
4. Amazon SQS - to store user requests on a first-come bases
5. OpenSearch Service - To quickly get restaurant ids based on the user preferences of cuisine collected from SQS
6. DynamoDB - To store the restaurant data collected using Yelp API
7. Amazon SNS - to send restaurant suggestions to users through SMS
8. Lambda - To send data from the frontend to API and API to Lex, validation, collecting restaurant data, sending suggestions using SNS.
9. Yelp API - To get suggestions for food

![Architecture](https://github.com/AnishMane/Dining-Concierge-ChatBot/assets/112772218/bec8be8f-f046-4d7d-bab1-ca4b0bf98ec1)


## Steps
1. Build and deploy the frontend of the application<br>

    a. Implement a chat user interface, where the user can write messages and get responses back. You can use open source libraries and frameworks that give you this UI and UX out of the box.<br>

    b. Host your frontend in an AWS S3 bucket
        i. Set the bucket up for website hosting
        ii. https://docs.aws.amazon.com/AmazonS3/latest/dev/HostingWebsiteOnS3Setup.html

2. Build the API for the application

    a. Use API Gateway to setup your API<br>

        i. use the following API/Swagger specification for your API<br>
            * https://github.com/001000001/aics-columbia-s2018/blob/master/aics-swagger.yaml
            * Use http://editor.swagger.io/ to visualize this file
            * You can import the Swagger file into API Gateway
            * https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-import-api.html
            * Create a Lambda function (LF0) that performs the chat operation
            * Use the request/response model (interfaces) specified in the API specification above

        ii. For now, just implement a boilerplate response to all messages:
            * ex. User says anything, Bot responds: "I’m still under development. Please come back later."

    b. Notes<br>

        i. You will need to enable CORS on your API methods<br>
            * https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-cors.html

        ii. API Gateway can generate an SDK for your API, which you can use in your frontend. It will take care of calling your API, as well as session signing the API calls -- an important security feature<br>
            * https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-generate-sdk-javascript.html

3. Build a Dining Concierge chatbot using Amazon Lex.

    a. Create a new bot using the Amazon Lex service. Read up the documentation on all things Lex, for more information: https://docs.aws.amazon.com/lex/latest/dg/getting-started.html<br>

    b. Create a Lambda function (LF1) and use it as a code hook for Lex, which
    essentially entails the invocation of your Lambda before Lex responds to
    any of your requests -- this gives you the chance to manipulate and
    validate parameters as well as format the bot’s responses. More
    documentation on Lambda code hooks at the following link:
    https://docs.aws.amazon.com/lex/latest/dg/using-lambda.html<br>

    c. Bot Requirements:

        i. Implement at least the following three intents:<br>
            * GreetingIntent
            * ThankYouIntent
            * DiningSuggestionsIntent

        ii. The implementation of an intent entails its setup in Amazon Lex as
        well as handling its response in the Lambda function code hook.<br>
            * Example: for the GreetingIntent you need to 
                1. create the intent in Lex, 
                2. train and test the intent in the Lex console, 
                3. implement the handler for the GreetingIntent in the Lambda code hook, such that when you receive a request for the GreetingIntent you compose a response such as “Hi there, how can I help?”

        iii. For the DiningSuggestionsIntent, you need to collect at least the following pieces of information from the user, through conversation:
            * Location
            * Cuisine
            * Dining Time
            * Number of people
            * Phone number

        iv. Based on the parameters collected from the user, push the information collected from the user (location, cuisine, etc.) to an
            SQS queue (Q1). More on SQS queues here:
            https://aws.amazon.com/sqs/

                *  Also confirm to the user that you received their request and
                    that you will notify them over SMS once you have the list of
                    restaurant suggestions.
                    

![Chats](https://github.com/AnishMane/Dining-Concierge-ChatBot/assets/112772218/c8aa471f-229c-40a2-986d-b9fb0060ee94)


4. Integrate the Lex chatbot into your chat API

    a. Use the AWS SDK to call your Lex chatbot from the API Lambda (LF0).

    b. When the API receives a request, you should 
        1. extract the text message from the API request, 
        2. send it to your Lex chatbot, 
        3. wait for the
        response, 
        4. send back the response from Lex as the API response.

5. Use the Yelp API to collect 5,000+ random restaurants from Manhattan.

    a. Use the following tools:

        i. Yelp API
            * Get restaurants by your self-defined cuisine types
            * You can do this by adding cuisine type in the search term ( ex. Term: chinese restaurants)
            * Each cuisine type should have 1,000 restaurants or so.
            * Make sure your restaurants don’t duplicate.

        ii. DynamoDB (a noSQL database)
            * Create a DynamoDB table and named “yelp-restaurants”
            * Store the restaurants you scrape, in DynamoDB (one thing you will notice is that some restaurants might have more or ess fields than others, which makes DynamoDB ideal for storing this data)
            * With each item you store, make sure to attach a key to the object named “insertedAtTimestamp” with the value of the time and date of when you inserted the particular record 
        * Store those that are necessary for your recommendation.(Requirements: Business ID, Name, Address, Coordinates, Number of Reviews, Rating, Zip Code)
    
        iii. Note: you can perform this scraping from your computer or from your AWS account -- your pick.

6. Create an OpenSearch instance using the AWS OpenSearch Service.
    - Create an OpenSearch index called “restaurants”
    - Create an OpenSearch type under the index “restaurants” called “Restaurant”
    - Store partial information for each restaurant scraped in OpenSearch
        under the “restaurants” index, where each entry has a “Restaurant” data
        type. This data type will be of composite type stored as JSON in OpenSearch.
        https://docs.aws.amazon.com/opensearch-service/
    - You only need to store RestaurantID and Cuisine for each restaurant

7. Build a suggestions module, that is decoupled from the Lex chatbot.

    * Create a new Lambda function (LF2) that acts as a queue worker. Whenever it is invoked it<br>
        1. pulls a message from the SQS queue (Q1), <br>
        2. gets a random restaurant recommendation for the cuisine collected through conversation from OpenSearch and DynamoDB, 
        3. formats them and<br>
        4. sends them over text message to the phone number included in the SQS message, using SNS (https://docs.aws.amazon.com/sns/latest/dg/SMSMessages.html).<br>
            i. Use the DynamoDB table “yelp-restaurants” (which you created
                from Step 1) to fetch more information about the restaurants
                (restaurant name, address, etc.), since the restaurants stored in
                OpenSearch will have only a small subset of fields from each
                restaurant.<br>
            ii. Modify the rest of the LF2 function if necessary to send the user text/email.
    * Set up a CloudWatch event trigger that runs every minute and invokes the Lambda function as a result:
        https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/RunLabdaSchedule.html. This automates the queue worker Lambda to poll                and process suggestion requests on its own.
        

    `,
    updated_at: new Date(),
  },
  {
    title: 'Cancer-Associated-Biomarker-Identification',
    slug: 'Cancer-Associated-Biomarker-Identification',
    description:
      'This project aims to identify cancer biomarkers using a Python backend (Flask API) and a React frontend, incorporating machine learning capabilities for predictions.',
    image: 'https://i.postimg.cc/JnvxQ8q3/07-Blog-Cancer-Cells-L.jpg',
    stacks: JSON.stringify([
      'React.js',
      'TailwindCSS',
      'Python',
      'Jupyter',
      'Pandas',
      'JavaScript',
    ]),
    is_featured: true,
    is_show: true,
    link_demo: '',
    link_github:
      'https://github.com/AnishMane/Cancer-Associated-Biomarker-Identification',
    content: `
  ## Introduction
  
  This project aims to identify cancer biomarkers using a Python backend (Flask API) and a React frontend, incorporating machine learning capabilities for predictions.
  
  ## Table of Contents
  - [Project Description](#project-description)
  - [Prerequisites](#prerequisites)
  - [Setup Instructions](#setup-instructions)
    - [1. Clone the Repository](#1-clone-the-repository)
    - [2. Setting Up the Backend (Python and Flask)](#2-setting-up-the-backend-python-and-flask)
    - [3. Setting Up the Frontend (React)](#3-setting-up-the-frontend-react)
  
  ## Project Description
  
  This project provides an interface for identifying potential cancer biomarkers. It uses a Python backend powered by Flask, where the machine learning models are hosted, and a React frontend that allows users to interact with the model and view results.
  
  ## Prerequisites
  
  - **Node.js and npm** (for frontend)
  - **Python 3 and pip** (for backend)
  - \`virtualenv\` (recommended for managing Python dependencies)
  
  ## Setup Instructions
  
  ### 1. Clone the Repository
  
  Clone the repository to your local machine and navigate into the project directory:
  
  \`\`\`bash
  git clone https://github.com/AnishMane/Cancer-Associated-Biomarker-Identification.git
  cd Cancer-Associated-Biomarker-Identification
  \`\`\`
  
  ### 2. Setting Up the Backend (Python and Flask)
  
  \`\`\`bash
  cd backend
  python -m venv venv   # (or \`python3 -m venv venv\` for Mac)
  venv/Scripts/activate  # (or \`source venv/bin/activate\` for Mac)
  pip install -r requirements.txt
  \`\`\`
  
  ### 3. Setting Up the Frontend (React)
  
  \`\`\`bash
  cd frontend
  npm install
  npm start
  \`\`\`
    `,
    updated_at: new Date(),
  },
  {
    title: 'Duplexa',
    slug: 'Duplexa',
    description:
      'Duplexa, powered by React, combines a Python backend and React frontend to streamline data redundancy removal. This web app optimizes storage, enhances data integrity, and provides a user-friendly interface for efficient data management. Simplify redundancy challenges with Duplexa.',
    image:
      'https://i.postimg.cc/Gt9kV5ML/business-intelligence-data-redundancy.png',
    stacks: JSON.stringify([
      'React.js',
      'Python',
      'Pandas',
      'Numpy',
      'Jupyter',
    ]),
    is_featured: true,
    is_show: true,
    link_demo: '',
    link_github: 'https://github.com/AnishMane/Duplexa',
    content: `
  ## 🚀 Duplexa (Data Redundancy Removal Algorithm)
  
  **Description:**  
  Data Redundancy Removal Algorithm is a project aimed at efficiently removing data redundancy from large datasets. The backend is implemented in Python, utilizing the XXHash algorithm to identify and eliminate redundant data. The frontend is developed using ReactJS, providing users with a user-friendly interface to manage and visualize the data.
  
  ### 📄 Our PPT for Bhuvan ISRO Hackathon - [Duplexa.pdf](https://github.com/AnishMane/Duplexa/files/14734767/Duplexa.pdf)
  
  ---
  
  ## Table of Contents
  
  - [Installation](##installation) 🛠️
  - [Getting Started](#getting-started) 🏁
  - [Usage](#usage) 💻
  - [Troubleshooting](#troubleshooting) 🛠️
  - [Contributing](#contributing) 🤝
  - [License](#license) 📝
  - [Acknowledgements](#acknowledgements) 🙏
  - [Contact](#contact) 📬
  - [Version History](#version-history) 📅
  
  ---
  
  ## Installation 🛠️
  
  ### Prerequisites
  - Python 3.x
  - Node.js
  
  ### Installation Steps
  1. Clone the repository: \`git clone https://github.com/AnishMane/Duplexa.git\`
  2. Navigate to the project directory: \`cd Duplexa\`
  3. Install Python dependencies: \`pip install -r requirements.txt\`
  4. Install Node.js dependencies for the frontend: \`npm install\`
  
  ---
  
  ## Getting Started 🏁
  
  After completing the installation steps, follow these instructions to start using the project:
  
  1. Run the Python backend server: \`python app.py\`
  2. Start the React frontend application: \`npm start\`
  3. Access the application in your web browser at \`http://localhost:3000\`
  
  ---
  
  ## Usage 💻
  
  To use the Data Redundancy Removal Algorithm:
  
  1. Upload your dataset to the application.
  2. The algorithm will analyze the dataset and remove redundant data using the XXHash algorithm.
  3. View the optimized dataset and download the processed data if needed.
  
  ---
  
  ## Troubleshooting 🛠️
  
  ### Issue: Backend server fails to start
  - **Solution:** Ensure that Python 3.x is installed and all dependencies are installed correctly. Check for any error messages in the console for further diagnosis.
  
  ### Issue: Frontend application crashes unexpectedly
  - **Solution:** Make sure Node.js is installed and all frontend dependencies are installed using \`npm install\`. Check the console for any error messages to identify the issue.
  
  ---
  
  ## Contributing 🤝
  
  Contributions are welcome! Please follow these guidelines when contributing to the project:
  - Fork the repository and create a new branch for your feature or bug fix.
  - Make your changes and submit a pull request detailing the changes made.
  - Ensure that your code follows the project's coding standards and conventions.
  
  ---
  
  ## Contact 📬
  
  For any questions, feedback, or support, please contact us at [anishmane70@gmail.com](mailto:anishmane70@gmail.com).
    `,
    updated_at: new Date(),
  },
  {
    title: 'Google-Keep-Replica-Project',
    slug: 'Google-Keep-Replica-Project',
    description:
      'Replicate Google Keep using React.js, focusing on dynamic note components, smooth navigation with React Router, and simple state management for a user-friendly experience.',
    image: 'https://i.postimg.cc/7PcsD3Ss/03t5awzh-DYxo5-Qf3-EUytp21-15.webp',
    stacks: JSON.stringify(['JavaScript', 'React.js', 'Node.js', 'MongoDB']),
    is_featured: false,
    is_show: true,
    link_demo: '',
    link_github: 'https://github.com/AnishMane/Google-Keep-Replica-Project',
    content: `
    


  [Video Preview](https://github.com/AnishMane/Google-Keep-Replica-Project/assets/112772218/cb68d059-ad98-4411-8198-f439688fea45)



## Google Keep Replica

**📝 Description:**


-> This project is a replica of Google Keep, a note-taking application developed by Google. It provides similar functionalities for creating, editing, and organizing notes in a user-friendly interface.

## 🚀 Features:


1. Create Notes: Easily create new notes with titles and content.

2. Edit Notes: Edit existing notes to update information.

3. Organize: Categorize notes with labels or color-coding.

4. Search: Quickly find notes using the search functionality.

5. Reminders: Set reminders for important notes.

6. Responsive Design: Ensures optimal viewing and interaction experience across devices.

## 🛠️ Installation:

-> Clone the repository

-> Navigate to the project directory

-> Install dependencies: npm install or yarn install

-> Start the application: npm start or yarn start


## 🔧 Usage:


-> Open the application in your browser.

-> Start creating and managing your notes.


## 👥 Authors:


**AnishMane**

###📧 Contact:


-> For any inquiries or support, please contact us at anishmane70@gmail.com.

**🚨 Disclaimer:**


-> This project is a replica of Google Keep and is intended for educational purposes only. It is not affiliated with or endorsed by Google.

    `,
    updated_at: new Date(),
  },
  {
    title: 'UniStorage',
    slug: 'UniStorage',
    description:
      "UniStorage: A student property management system developed at Vellore Institute of Technology's 12-hour hackathon. It simplifies item tracking within campus housing using the MERN stack, prioritizing efficiency and transparency. Designed to scale effortlessly.",
    image: 'https://i.postimg.cc/WpM8RBb3/student-housin-notebook.png',
    stacks: JSON.stringify(['JavaScript', 'React.js', 'Node.js', 'MongoDB']),
    is_featured: false,
    is_show: true,
    link_demo: '',
    link_github: 'https://github.com/AnishMane/UniStorage',
    content: `
  ## 🏫 UniStorage: Student Property Management System
  
  ## Table of Contents
  - [Preview](#preview)
  - [About The Project](#about-the-project)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Contributing](#contributing)
  - [Contact](#contact)
  
  ## Preview
  
  https://github.com/AnishMane/UniStorage/assets/112772218/a88ae0d8-ea94-44bb-97e2-e59eacbee218
  
  ## About The Project
  ### Overview
  
  ***UniStorage was developed in a 12-hour hackathon held by Vellore Institute of Technology.***
  
  UniStorage is a comprehensive student property management system developed using the MERN stack (MongoDB, Express.js, React, and Node.js). This project aims to streamline the management, tracking, and allocation of student-owned properties such as mattresses, blankets, buckets, and other essential items within a campus or student housing environment. The system is designed to be user-friendly, efficient, and scalable, catering to the needs of both students and administrators.
  
  ### Objectives
  ### 🚀 Efficient Management: 
  To provide a centralized platform for managing student properties, reducing the administrative burden on staff.
  ### 🔍 Transparency: 
  To enhance transparency in the allocation and return of items, ensuring that students and staff can easily track the status of each item.
  ### 🎨 User-Friendly Interface: 
  To offer a simple and intuitive interface for both students and administrators, making the process of borrowing and returning items hassle-free.
  ### ⚖️ Scalability: 
  To ensure the system can handle a growing number of users and properties without compromising performance.
  
  ## Prerequisites
  This is an example of how to list things you need to use the software and how to install them.
  - npm
    \`\`\`sh
    npm install npm@latest -g
    \`\`\`
  
  ### Installation
  
  1. Clone the repo
     \`\`\`sh
     git clone https://github.com/AnishMane/UniStorage.git
     \`\`\`
  2. Install NPM packages
     \`\`\`sh
     npm install
     \`\`\`
  3. Start the client using
     \`\`\`sh
     npm start
     \`\`\`
  4. Start server using
     \`\`\`sh
     npm run dev
     \`\`\`
  
  ## Contributing
  
  Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.
  
  If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
  Don't forget to give the project a star! Thanks again!
  
  1. Fork the Project
  2. Create your Feature Branch
  3. Commit your Changes
  4. Push to the Branch
  5. Open a Pull Request
  
  ## Contact
  
  Anish - anishmane70@gmail.com
    `,
    updated_at: new Date(),
  },
  {
    title: 'PersonHub',
    slug: 'PersonHub',
    description:
      'PersonHub is a MERN stack web app simplifying personal information management. Easily add, view, update, and delete persons with a user-friendly interface. Ideal for learning MERN stack basics and building upon for more complex projects.',
    image: 'https://i.postimg.cc/fyGQ01pk/resume-personal-information.webp',
    stacks: JSON.stringify(['JavaScript', 'React.js', 'Node.js', 'MongoDB']),
    is_featured: false,
    is_show: true,
    link_demo: '',
    link_github: 'https://github.com/AnishMane/PersonHub',
    content: `
## 🧑‍💼 PersonHub

## Table of Contents
- [About The Project](#about-the-project)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Contributing](#contributing)
- [Contact](#contact)

## About The Project
PersonHub is a web application designed to simplify the management of personal information. Built with the MERN stack (MongoDB, Express.js, React.js, Node.js), this project showcases a straightforward implementation of CRUD (Create, Read, Update, Delete) operations.

### Key Features
- **Add New Persons:** Easily add individuals by providing their name, email, and age.
- **View All Persons:** Display a list of all entered persons in an organized manner.
- **Update Details:** Modify the information of any person with ease.
- **Delete Persons:** Remove any person from the list with a single click.

### Purpose
The primary goal of PersonHub is to provide a practical example of a full-stack application using the MERN stack. It demonstrates how to connect a React frontend to a Node.js and Express backend, and how to perform CRUD operations on a MongoDB database.

#### Why PersonHub?
- **Learning Resource:** Ideal for developers who are new to the MERN stack and want to see a complete application in action.
- **Reusable Codebase:** Provides a solid foundation that can be expanded and customized for more complex projects.
- **User-Friendly:** Focuses on simplicity and ease of use, ensuring that even those with minimal technical background can navigate and use the app effectively.

PersonHub exemplifies how modern web development technologies can be leveraged to create efficient, user-friendly applications. It serves as both a learning tool and a base for further development.

## Prerequisites
This is an example of how to list things you need to use the software and how to install them.
- npm
  \`\`\`sh
  npm install npm@latest -g


### Installation

1. Clone the repo
   \`\`\`sh
   git clone https://github.com/AnishMane/MERN-Project.git
   \`\`\`
2. Install NPM packages
   \`\`\`sh
   npm install
   \`\`\`
3. Start the client using
   \`\`\`sh
   npm start
   \`\`\`
4. Start sever using
   \`\`\`sh
   npm run dev
   \`\`\`



## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch
3. Commit your Changes
4. Push to the Branch
5. Open a Pull Request



## Contact

Anish - anishmane70@gmail.com


`,
    updated_at: new Date(),
  },
  {
    title: 'Blog-API-Project',
    slug: 'Blog-API-Project',
    description:
      'Created a Blog API and used it to power my website, making it easy to publish and manage blog content.',
    image: 'https://i.postimg.cc/Ssm6msKx/API-Blog-Hero-banner-2x.png',
    stacks: JSON.stringify(['JavaScript', 'Bootstrap', 'CSS']),
    is_featured: false,
    is_show: true,
    link_demo: '',
    link_github: 'https://github.com/AnishMane/Blog-API-Project',
    content: 'Detailed content about Project Two.',
    updated_at: new Date(),
  },
  // {
  //   title: '123',
  //   slug: '123',
  //   description:
  //     'This project aims to identify cancer biomarkers using a Python backend (Flask API) and a React frontend, incorporating machine learning capabilities for predictions.',
  //   image: 'https://i.postimg.cc/JnvxQ8q3/07-Blog-Cancer-Cells-L.jpg',
  //   stacks: JSON.stringify(['Next.js', 'Tailwind CSS']),
  //   is_featured: true,
  //   is_show: true,
  //   link_demo: 'https://project-two-demo.com',
  //   link_github: 'https://github.com/user/project-two',
  //   content: 'Detailed content about Project Two.',
  //   updated_at: new Date(),
  // },
  // Add more projects as needed
];
