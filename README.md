# Geohash_news

---

## Table of Contents
- [Purpose](#purpose)
- [Features of the software](#Features-of-the-software)
- [Installation Instructions](#installation-instructions)
- [Usage Guide](#usage-guide)
- [Contributors](#contributors)

---

## Project Overview
- This project aims to create a dynamic community-based newsletter platform that allows users to share and explore events happening around them in real time. By leveraging user-generated posts, modern data storage solutions, and generative AI, the platform curates the most relevant and engaging content into a daily newsletter. The newsletter provides concise summaries of the day's top events, enhancing community awareness and interaction.

---

## Features of the software
- Ananonymously read & share community news in real time: Users will only be able to see/post news in the area they are currently located in. 
- Receive/give upvote & downvote for posts
- Subscribe to receive daily news digests from areas of your choice

## Installation Instructions

- You will need to install [java](https://www.jetbrains.com/idea/download/?section=mac) to run this program. 
- The program is compatible with OpenJDK 23


To utilize SMS notifications, follow these steps:

1. **Sign up for Twilio**:
    - Visit the [Twilio signup page](https://login.twilio.com/u/signup?state=hKFo2SBqVGtXWkJ3WktFLWlTT3RjRTdDc2ozWDByXy1ES3B2cKFur3VuaXZlcnNhbC1sb2dpbqN0aWTZIDNTcWdTSjlHWUlDb0VPWnN6SmY3NVpzQndMNV9NaGI2o2NpZNkgTW05M1lTTDVSclpmNzdobUlKZFI3QktZYjZPOXV1cks).
    - Be sure to enter the phone number you would like your notifications to be sent to.
    - Complete the verification process to access your `Account SID`, `Auth Token`, and `Twilio Phone Number`.

   Example Screenshot:
    <img src="images_used_for_readme/img_2.png" alt="twilio example" width="500"/>

2. **Set up Twilio credentials**:
    - Navigate to the following file path:
      ```plaintext
      src -> main -> java -> us.jonathans -> app -> AppBuilder
      ```
    - Enter your Twilio credentials in the appropriate fields.

   Example screenshot:

   <img src="images_used_for_readme/img_1.png" alt="enter information" width="600"/>

---

## Usage Guide

1. **Launch the Program**:
    - After installation, run the program to open the Mancala game interface.

2. **Enter Details**:
    - Provide your username.
    - Optionally, enable **SMS notifications** and enter your phone number.

3. **Select AI Difficulty**:
    - Choose the engine difficulty level (`minimax_easy`, `minimax_medium`, or `minimax_hard`).

4. **Start Playing**:
    - Press the **Start** button to initialize the game. Stones will appear on the Mancala board.

5. **Cancel or Stop**:
    - Use the **Cancel** button if you need to stop or reset.

6. **Leaderboard and Notifications**:
    - After each game, your score is submitted to the leaderboard.
    - If SMS notifications are enabled, you will receive updates about your rank.

---

## Contributors
- **Kunal Rishi**: [GitHub](https://github.com/plumedeneko)
- **Anthony Kim**: [GitHub](https://github.com/antmskim)
- **Richard Lin**: [GitHub](https://github.com/richardrLin)
- **Mina Wu**: [GitHub](https://github.com/MW0808)

---

