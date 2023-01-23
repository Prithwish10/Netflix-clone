<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield]][linkedin-url]
<!-- [![MIT License][license-shield]][license-url] -->

# <h1 align="center">Netflix-clone</h1>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Prithwish10/Netflix-clone">
    <img src="Netflix-logo.png" alt="Logo" width="150" height="100">
  </a>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary><h3>Table of Contents</h3></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#backend-folder-structure">Backend Folder Structure</a></li>
        <li><a href="#project-architecture">Project Architecture</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
<!--     <li><a href="#usage">Usage</a></li> -->
    <li><a href="#contributing">Contributing</a></li>
<!--     <li><a href="#license">License</a></li> -->
    <li><a href="#contact">Contact</a></li>
<!--     <li><a href="#acknowledgments">Acknowledgments</a></li> -->
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
## About The Project
<!-- [![Product Name Screen Shot][product-screenshot]](https://example.com) -->

It is a complete clone of a popular video streaming website like Netflix.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

* ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
* ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
* ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
* ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
* ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
* ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
* ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
* **TypeDI** (A dependency injection tool for typescript and javascript)
* ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
* ![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)
* ![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)
* ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
* ![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Backend Folder Structure

![Screenshot from 2023-01-23 16-28-50](https://user-images.githubusercontent.com/59892611/214023489-b6422240-c910-4530-902c-80491452c176.png)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- PROJECT ARCHITECTURE -->

### Project Architecture

* The backend is based upon the 3 layered architecture. 
* The idea is to use the principle of **separation of concerns** to move the business logic away from the node.js API Routes.
* Controllers receive incoming client requests, and they leverage services
* Services contain all business logic, and can also make calls to the data access layer
* The data access layer interacts with the database by performing queries
* Results are passed back up to the service layer.
* The service layer can then hand everything back to the controller
* The controller can then respond to the client!

![Screenshot from 2023-01-23 16-21-10](https://user-images.githubusercontent.com/59892611/214021924-f7c67ae5-0714-402b-ab89-24881161a60e.png)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

I'm working on Ubuntu 20.04

### Prerequisites

* **nodejs**
  
  To get this version, you can use the apt package manager. Refresh your local package index first by typing:
  ```sh
  sudo apt update
  ```
  Then install Node.js:
  ```sh
  sudo apt install nodejs
  ```
  Check that the install was successful by querying node for its version number:
  ```sh
  node -v
  ```
* **npm**
  
  If the package in the repositories suits your needs, this is all you need to do to get set up with Node.js. In most cases, you’ll also want to also install npm, the   Node.js package manager. You can do this by installing the npm package with apt:
   ```sh
  sudo apt install npm
  ```
* **typescript**
  
  Install typescript globally using the following command in your `cmd`
  ```sh
  npm install -g typescript
  ```
  
### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Prithwish10/Netflix-clone.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
### How to start the backend server

First `cd` on to the backend folder
```sh
cd backend/
```

Run the `build` script. This will compile the typescript code and add the javascript code into a new folder called `dist`.

```sh
npm run build
```

To start `dev` script
```sh
npm run dev

> backend@1.0.0 dev /home/prithwish/Documents/Netflix-clone/backend
> nodemon src/app.ts

[nodemon] 2.0.20
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: ts,json
[nodemon] starting `ts-node src/app.ts`
info:    
      ################################################
      🛡️  Db connected successfully !! 🛡️
      ################################################
    
info:    
      ################################################
      🛡️  Server listening on port: 8000 🛡️
      ################################################
```

To start `prod` script
```sh
npm start

> backend@1.0.0 start /home/prithwish/Documents/Netflix-clone/backend
> pm2 start dist/app.js

[PM2] Spawning PM2 daemon with pm2_home=/home/prithwish/.pm2
[PM2] PM2 Successfully daemonized
[PM2] Starting /home/prithwish/Documents/Netflix-clone/backend/dist/app.js in fork_mode (1 instance)
[PM2] Done.
┌─────┬────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id  │ name   │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
├─────┼────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 0   │ app    │ default     │ 1.0.0   │ fork    │ 16634    │ 0s     │ 0    │ online    │ 0%       │ 27.9mb   │ pri… │ disabled │
└─────┴────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘
```
Here I'm using the **PM2** Process Manager.

If you have used the `npm start` script to start your server, 
* now you want to stop the running instances, then use the following command:
  ```sh
  pm2 delete app
  ```
* To get a detailed list of every instances
  ```sh
  pm2 list
  ```
  Or
  ```sh
  pm2 show
  ```
  Or
  ```sh
  pm2 monit
  ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Name - Prithwish Das

Project Link: https://github.com/Prithwish10/Aucteria

LinkedIn: https://www.linkedin.com/in/prithwishdas60/

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/Prithwish10/Netflix-clone.svg?style=for-the-badge
[contributors-url]: https://github.com/Prithwish10/Netflix-clone/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Prithwish10/Netflix-clone.svg?style=for-the-badge
[forks-url]: https://github.com/Prithwish10/Netflix-clone/network/members
[stars-shield]: https://img.shields.io/github/stars/Prithwish10/Netflix-clone.svg?style=for-the-badge
[stars-url]: https://github.com/Prithwish10/Netflix-clone/stargazers
[issues-shield]: https://img.shields.io/github/issues/Prithwish10/Netflix-clone.svg?style=for-the-badge
[issues-url]: https://github.com/Prithwish10/Netflix-clone/issues
[license-shield]: https://img.shields.io/github/license/Prithwish10/Netflix-clone.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/prithwishdas60/
[product-screenshot]: images/screenshot.png
