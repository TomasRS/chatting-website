# Web Chat
![CI/CD to Azure](https://github.com/TomasRS/chatting-website/workflows/CI/CD%20to%20Azure/badge.svg)
![Node Version](https://img.shields.io/badge/Node-14.14.21-green)
![Angular Version](https://img.shields.io/badge/Angular-11.0.6-red)

## What is it?
It's a Cloud chat app that features the WebSockets communication with users and rooms, all with Socket.io framework both in the backend and frontend.

[Check it out!](https://webchat.tomasrs.dev)

[Check out the Trello board](https://trello.com/b/rQNw0Jh5/chatting-website-app-mvp-1)

## Solution architecture & decisions
![Architecture Diagram](/readme-images/architecture.png?raw=true "Architecture Diagram")

### Decisions:
**Azure static websites** for two main reasons:
- Leverage the almost no cost of hosting a frontend website in a storage account.
- Having custom domain and auto renewable SSL certificates with the CDN in front of the static website.

**Azure App Service** with free tier:
- I needed a stateful backend application, so Azure Functions were not going to be useful because of their stateless manner. There's a way to implement realtime with Azure Functions which is via Azure SignalR service, but it's not used a lot with Azure Functions.

## Tech stack
![Tech Stack Diagram](/readme-images/stack.png?raw=true "Tech Stack Diagram")
