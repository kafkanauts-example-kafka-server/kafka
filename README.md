<h1 align="center"><strong>Example Kafka Server - Kafkanauts</strong></h1>
<p align="center">
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000" />
  <a href="project documentation URL goes here" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/kafkanauts-example-kafka-server/kafka/blob/main/LICENSE.txt" target="_blank">
    <img alt="License: MIT License" src="https://img.shields.io/badge/License-MIT License-yellow.svg" />
  </a>
</p>

<h2 align="center"><strong>An open source Kafka server to test your monitoring tool</strong></h2>

## 🚀 Features

* #### A simple Producer and Consumer built with Kafka.js
* #### Prometheus exporter for Kafka.js to access metrics
* #### Containerized for easy deployment with Docker

## 🚀 Table of Contents

* [Homepage](https://www.kafkanauts.com/)
* [Installation](#-installation)
* [Engineering Team](#-engineering-team)
* [Guide to Contribution](#-guide-to-contribution)
* [Support](#-thank-you-for-your-support)


## 🚀 Installation

* To downlaod our application, please run the following commands in the respective order:

```sh
npm install
docker compose up

```

* To start your Producer and Consumer, open up two terminals and enter the following pairs of commands separately:

```sh
cd components
node producer.js 

cd components
node consumer.js

```
* To see the metrics on Prometheus, enter localhost:9090 on your browser.
* Enter the query for the desired metrics and execute.


## 🚀 Engineering Team

* 👨‍🚀 [Vince Chin](https://github.com/Vince2c) | vince.chin@kafkanauts.com
* 👩🏿‍🚀 [Vastille Dolcine](https://github.com/vdolcine) | vastille.dolcine@kafkanauts.com
* 👨‍🚀 [David Lee](https://github.com/davidlee7731) | david.lee@kafkanauts.com
* 👩‍🚀 [Jane Park](https://github.com/janesunpark) | jane.park@kafkanauts.com

* LinkedIn: [@LinkedIn username](https://linkedin.com/in/LinkedIn username)

## 🚀 Guide to Contribution

Contributions, issues and feature requests are welcome!<br />Feel free to fork and clone this repo, and check [issues page](https://github.com/kafkanauts-example-kafka-server/kafka/issues). 

## 🚀 Thank You for Your Support

Give a ⭐ if this project helped you!

## 📝 License

Copyright © 2022 [Kafkanauts](https://github.com/oslabs-beta/kafkanauts).<br />
This project is [MIT License](https://github.com/kafkanauts-example-kafka-server/kafka/blob/main/LICENSE.txt) licensed.

***
